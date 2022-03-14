import React , {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import ProductItem from '../utils/productItem/ProductItem'
import Filters from './Filters'
import LoadMore from './LoadMore'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const Products = () => {

    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callBack, setCallBack] = state.productsAPI.callBack
    const [loading , setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)


    const handleCheck = (id) => {
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {

        try {
            setLoading(true)
            const dltImg = await axios.post('/api/delete', {public_id},{
                headers : {Authorization: token} 
            })

            const dltPrdct = await axios.delete(`/api/products/${id}`,{
                headers : {Authorization: token} 
            })

            await dltImg
            await dltPrdct
            setCallBack(!callBack)
            setLoading(false)

        } catch (err) {
            Swal.fire({
                width: "30%",
                toast: true,
                icon: 'warning',
                title: err.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const checkAll = () => {
        products.forEach(product=>{
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id , product.images.public_id) 
        })
    }

    if (loading) return (
        <div>
            <Loading/>
        </div>
    ) 

    return (
        <>
            <Filters/> 

            {
                isAdmin && 
                <div className='delete-all'>
                    <span> Select all </span>
                    <input type='checkbox' checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}> Delete ALL </button>
                </div>
            }

            <div className='products'>
                {
                    products.map(product => {
                        return <ProductItem 
                                    key={product._id} 
                                    product={product} 
                                    isAdmin={isAdmin}
                                    deleteProduct = {deleteProduct}
                                    handleCheck = {handleCheck}
                                />
                    })
                }
            </div>

            <LoadMore/>

            {products.length === 0 && <Loading/>}
        </>    
    )
}

export default Products