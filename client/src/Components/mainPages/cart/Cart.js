import React, { useContext, useState, useEffect } from 'react';
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import EmptyCart from '../utils/emptyCart/EmptyCart';
import IsLogged from '../utils/isLogged/IsLogged';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import PaypalButton from './PaypalButton'



const Cart = () => {

    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [isLogged] = state.userAPI.isLogged
    const [callBack , setCallBack] = state.userAPI.callBack
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addCart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        cart.forEach((item, index) => {
            if (item._id === id) {
                cart.splice(index, 1)
            }
        })
        setCart([...cart])
        addToCart(cart)
        setTimeout(() => {
            Swal.fire({
                width: "30%",
                toast: true,
                icon: 'info',
                title: "Product deleted with success",
                showConfirmButton: false,
                timer: 1500
            })
        }, 300)
    }

    const tranSuccess = async(payment) =>{
        const {paymentID , address} = payment;

        await axios.post('/api/payment' , {cart , paymentID , address},{
            headers: {Authorization : token}
        })
        setCart([])
        addToCart([])
        Swal.fire({
            width: "30%",
            toast: true,
            icon: 'success',
            title: "You have successfully placed an order",
            showConfirmButton: false,
            timer: 3000
        })
        setCallBack(!callBack) 

    }  

    if (!isLogged)
        return (
            <>
                <IsLogged />
            </>
        )

    if (cart.length === 0)
        return (
            <>
                <EmptyCart />
            </>
        )

    return (

        <div>
            {
                cart.map(product => (
                    <div className='detail cart' key={product._id}>
                        <img src={product.images.url} alt='' />
                        <div className='box-detail'>
                            <h2> {product.title} </h2>
                            <h3> ${product.price * product.quantity} </h3>
                            <p> {product.description} </p>
                            <p> {product.content} </p>
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span> {product.quantity} </span>
                                <button onClick={() => increment(product._id)} > + </button>
                            </div>
                            <div className="delete" onClick={() => removeProduct(product._id)}> X </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3> $ {total} </h3>
                <PaypalButton total = {total} tranSuccess={tranSuccess}/>
            </div>

        </div>
    )
}

export default Cart 