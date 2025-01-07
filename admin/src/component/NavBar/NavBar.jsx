import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets'
function NavBar() {
  return (
    <div className='navbar'>
        <p className="logo"> MealMover  </p>
        <img src={assets.profile_image} alt=""  className='profile'/>
    </div>
  )
}

export default NavBar