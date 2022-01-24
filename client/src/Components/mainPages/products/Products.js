import React , {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'

const Products = () => {

    const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products

    return (
        <div className='products'>
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}/>
                })
            }
        </div>
    )
}

export default Products