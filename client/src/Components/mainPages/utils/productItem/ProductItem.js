import React , {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../../../GlobalState';



const ProductItem = ({product , isAdmin}) => {

    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart

    return (
        <div className='product_card'>

            {
                isAdmin && <input type='checkbox' checked={product.checked}/>
            }

            <img src={product.images.url} alt=''/>

            <div className='product_box'>
                <h2 title={product.title}> {product.title} </h2>
                <span> ${product.price} </span>
                <p> {product.description}</p>
            </div>

            <div className='row_btn'>
                {
                    isAdmin ? 
                            /* for admin */
                        <>
                            <Link id='btn_buy' to="#!" > Delete </Link>
                            <Link id='btn_view' to={`/edit_product/${product._id}`} > Edit </Link>
                        </> 
                        :
                            /* for user */
                        <>
                            <Link id='btn_buy' to="#!" onClick={()=>addCart(product)} > Buy </Link>
                            <Link id='btn_view' to={`/details/${product._id}`} > View </Link>
                        </>
                }
            </div>

        </div>
    )
}

export default ProductItem;
