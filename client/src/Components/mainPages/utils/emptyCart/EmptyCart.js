import React from 'react'
import {Link} from 'react-router-dom'
import './emptyCart.css'
import emptycart from './icon/emptycart.png'



const EmptyCart = () => {
    return (
        <div className='cl-1'>

            <div className='cl-img'>
                <img src={emptycart} alt="img"/>
            </div>

            <div className='cl-txt'>
                <h2> Your cart is empty ! </h2>
                <p> Looks like you haven't add any courses to your cart yet </p>
                <Link to="/"> <button> ADD COURSES TO CART </button>  </Link>
            </div>

        </div>
    )
}

export default EmptyCart