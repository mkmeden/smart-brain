import React from 'react';
// import Tilt from 'react-tilted'
import logo from './brain.png'
import './Logo.css'


 export default function Logo()
{
    return(
        <div className='config'>
            <img className='link  dim black  pointer' alt='logo' src={logo}/>
        </div>
    )
}