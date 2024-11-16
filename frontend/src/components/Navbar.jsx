//function expression for a component doing ( ) around {} makes it return an object
//rafce
import { Search, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {

    //get state of mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    //toggler function
    const toggleMobileMenu = () => {
        //toggles it to true or false by negating it
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    

     const {user, logout} =  useAuthStore();


  



    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            {/* hold the logo */}
                <div className="flex items-center gap-10 z-50">
                    <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="Netflix logo" className="w-32 sm:w-40"/>
                    </Link>
                    {/* Desktop navbar */}
                    <div className="hidden sm:flex gap-2 items-center">

                        <Link to={"/"} className="hover:underline">
                            Movies
                        </Link>

                        <Link to={"/"} className="hover:underline">
                            Tv Shows
                        </Link>

                        <Link to={"/history"} className="hover:underline">
                            Search History
                        </Link>
                        
                        
                    </div>
                </div>



                <div className="flex gap-2 items-center z-50">
                         {/* Search icon */}
                        <Link to={"/search"}>
                        <Search className="size-6 cursor-pointer"/>
                        </Link>
                        {/*  */}
                        <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer"/>

                        <LogOut className="size-6 cursor-pointer " onClick={logout}/>

                        <div className="sm:hidden">
                            
                            <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu}/>
                        </div>
                      
                    </div>


            {/* Movile nav Bar, conditional react rendering */}
        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4-z-50 bg-black rounded border-gray-800">
                <Link to={"/"}
                className="block hover:underline p-2"
                onClick={toggleMobileMenu}>
                    Mobies
                </Link>

                <Link to={"/"}
                className="block hover:underline p-2"
                onClick={toggleMobileMenu}>
                    Tv shows
                </Link>

                <Link to={"/history"}
                className="block hover:underline p-2"
                onClick={toggleMobileMenu}>
                    Search History
                </Link>
            </div>
        )}

        </header>
    )
}


export default Navbar;