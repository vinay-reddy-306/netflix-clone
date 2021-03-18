import React, { useState,useEffect} from 'react'
import Logo from './Netflix-Logo.png'
import Avatar from './Login.jpg'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
              handleShow(true)
          }else handleShow(false)
        })
        return () => {
            window.removeEventListener('scroll');
        } 
    }, [])
    return (
        <div className={`nav ${show && 'nav_black'}`}>
            <img className='nav_logo'
                src={Logo} alt='Netflix-Logo' />
            <img className='nav_avatar'
                src={Avatar} alt='Login' />
        </div>
    )
}

export default Nav
