import React, {useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Cart from './icon/cart.svg'
import Close from './icon/close.svg'
import axios from 'axios';




const Header = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

        /* if userRole == 1 (admin) display :  */
    const adminRouter = () => {
        return (
            <>
                <li> <Link to="/create_product"> Create Product </Link> </li>
                <li> <Link to="/categories"> Categories </Link> </li>
            </>
        )
    }

        /* logout : */
    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = "/"
    }

        /* if userRole == 0 (user) display :  */
    const loggedRouter = () => {
        return (
            <>
                <li> <Link to="/history"> History </Link> </li>
                <li> <Link to="/" onClick={logoutUser}> Logout </Link> </li>
            </>
        )
    }

    return (
        <header>
            
            <div className='menu'>
                <img src={Menu} alt='' width="30" />
            </div>

            <div className='logo'>
                <h1>
                    <Link to="/"> {isAdmin ? "Admin" : <div> One-Click <span> Pick</span> </div> } </Link>
                </h1>
            </div>

            <ul>
                <li> <Link to="/"> {isAdmin ? "Products" : "Shop"} </Link> </li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : 
                        <>
                            <li> <Link to="/login"> Login </Link> </li>
                            <li> <Link to="/register"> <button> REGISTER </button>  </Link> </li>
                        </>
                }

                <li>
                    <img src={Close} alt='' width="30" className='menu' />
                </li>
            </ul>

            {
                isAdmin ? '' :
                    <div className='cart-icon'>
                        <span> { cart.length }  </span>
                        <Link to="/cart">
                            <img src={Cart} alt='' width="30"/>
                        </Link>
                    </div>
            }


        </header>
    )
}

export default Header