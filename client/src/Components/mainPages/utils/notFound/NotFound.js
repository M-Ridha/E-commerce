import React from 'react'
import {Link} from 'react-router-dom'
import './notFound.css'
import sim from './icons/sim.png'
import error from './icons/error.png'

const NotFound = () => {
    return (
        <div>
            <div className='simp'>
                <img src={sim} alt="img"/>
            </div>

            <div className='err'>
                <img src={error} alt="img" />
                <h1> ERROR </h1>
                <p> Oops!Page does not found</p>
                <Link to="/"> <button> GO HOME </button> </Link>
            </div>
        </div>
    )
}

export default NotFound 