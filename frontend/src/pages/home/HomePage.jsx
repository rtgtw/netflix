import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';


//h- is height

const HomePage = () => {


  const user = false;
  return (
    <div>

      Hi
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
  
}

export default HomePage