import React, { useContext , useState } from 'react';
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import EmptyCart from '../utils/emptyCart/EmptyCart';
import IsLogged from '../utils/isLogged/IsLogged';



const Cart = () => {

    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart
    const [isLogged] = state.userAPI.isLogged
    const [total , setTotal] = useState(0)

    if (!isLogged) 
        return(
            <>
                <IsLogged/>
            </>
        )

    if (cart.length == 0)
        return (
            <>
                <EmptyCart />
            </>
        )

    return (

        <div>
            {
                cart.map(product => (
                    <div className='detail cart'>
                        <img src={product.images.url} alt='' />
                        <div className='box-detail'>
                            <h2> {product.title} </h2>
                            <h3> ${product.price * product.quantity} </h3>
                            <p> {product.description} </p>
                            <p> {product.content} </p>
                            <div className="amount">
                                <button> - </button>
                                <span> {product.quantity} </span>
                                <button> + </button>
                            </div>
                            <div className="delete"> X </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3> $ {total} </h3>
                <Link to="#!"> payment </Link>
            </div>

        </div>
    )
}

export default Cart 