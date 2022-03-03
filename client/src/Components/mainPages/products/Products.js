import React , {useContext,useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import ProductItem from '../utils/productItem/ProductItem'

const Products = () => {

    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin


    useEffect(() => {
        const getProducts = async() => {
            const res = await axios.get('/api/products')
            setProducts(res.data.products)
        }
        getProducts()
    },[setProducts])


    return (
        <>
            <div className='products'>
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin}/>
                    })
                }
            </div>

            {products.length === 0 && <Loading/>}
        </>    
    )
}

export default Products