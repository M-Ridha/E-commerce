import React from 'react'
import {Link} from 'react-router-dom'
import './isLogged.css'
import login from './icon/login.png'

const IsLogged = () => {
    return (
        <div className='cl-1'>

            <div className='cl-img'>
                <img src={login} />
            </div>

            <div className='cl-txt'>
                <h2> You must be logged </h2>
                <p> you must be logged in to access this functionality </p>
                <Link to="/login"> <button> Login </button>  </Link>
            </div>

        </div>
    )
}

export default IsLogged