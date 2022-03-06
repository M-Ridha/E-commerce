import React, { useState, useContext, useEffect } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios';
import Loading from '../utils/loading/Loading'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id : ''
}


const CreateProduct = () => {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [products] = state.productsAPI.products
    const [onEdit , setOnEdit] = useState(false)
    const [callBack, setCallBack] = state.productsAPI.callBack

    const history = useHistory()
    const param = useParams()

    useEffect (()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                } 
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id ,products])


    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            if (!isAdmin)
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "We are sorry, but you do not have access to this service !",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            const file = e.target.files[0]

            if (!file)
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "File doesn't exist",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            if (file.size > 3072 * 3072) //3mb
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "The file that you are trying to use is too large",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "The file format in invalid",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            let formData = new FormData()
            formData.append('file', file)
            setLoading(true)

            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            })

            setLoading(false)
            setImages(res.data)

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

    const handleDestroy = async () => {
        try {
            if (!isAdmin)
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "We are sorry, but you do not have access to this service !",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            setLoading(true)

            await axios.post('/api/delete', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })

            setLoading(false)
            setImages(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!isAdmin)
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "We are sorry, but you do not have access to this service !",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            if (!images)
                return (
                    Swal.fire({
                        width: "30%",
                        toast: true,
                        icon: 'warning',
                        title: "No image uploaded !",
                        showConfirmButton: false,
                        timer: 1500
                    })
                )

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product , images},{
                    headers : {Authorization : token}
                })
            }else{
                await axios.post('/api/products', {...product , images},{
                    headers : {Authorization : token}
                })
            }

            setCallBack(!callBack)

            history.push('/')

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

    const styleUpload = {
        display: images ? "block" : "none"
    }



    return (
        <div className='create_product'>

            <div className="upload">
                <input type='file' name='file' id='file_up' onChange={handleUpload} />
                {
                    loading ?
                        <div id="file_img">
                            <Loading />
                        </div>
                        :
                        <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt='' />
                            <span onClick={handleDestroy}> X </span>
                        </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor='product_id'> product ID </label>
                    <input
                        type='text'
                        name='product_id'
                        id='product_id'
                        value={product.product_id}
                        onChange={handleChangeInput}
                        disabled={onEdit}
                        required
                    />
                </div>

                <div className="row">
                    <label htmlFor='title'> Title </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={product.title}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

                <div className="row">
                    <label htmlFor='price'> Price </label>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        value={product.price}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

                <div className="row">
                    <label htmlFor='description'> Description </label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={product.description}
                        required
                        rows='5'
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor='content'> Content </label>
                    <textarea
                        type='text'
                        name='content'
                        id='content'
                        value={product.content}
                        required
                        rows="7"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="row">
                    <label htmlFor='categories'> Categories </label>
                    <select name='category' value={product.category} onChange={handleChangeInput}>
                        <option value=""> please select a category </option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type='submit'> {onEdit? "Update" : "Add Product"} </button>
            </form>

        </div>
    )
}

export default CreateProduct