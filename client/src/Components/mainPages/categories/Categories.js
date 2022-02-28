import React , {useState , useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'




const Categories = () => {
    const state = useContext(GlobalState)
    const [categories , setCategories] = state.categoriesAPI.categories
    const [category , setCategory ] = useState('')
    const [callBack , setCallBack] = state.categoriesAPI.callBack
    const [onEdit , setOnEdit] = useState(false)
    const [id , setID] = useState('')
    const [token] = state.token
    
    
    const addCategory = async (e) => {
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`./api/categories/${id}`,{name : category} , {
                    headers : {Authorization : token}
                })
                Swal.fire({
                    width : "30%" , 
                    toast : true ,
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
                
            }else{
                const res = await axios.post('./api/categories',{name : category} , {
                    headers : {Authorization : token}
                })
                Swal.fire({
                    width : "30%" , 
                    toast : true ,
                    icon: 'success',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            setOnEdit(false)
            setCategory('')
            setCallBack(!callBack)

        } catch (err) {
            Swal.fire({
                width : "30%" , 
                toast : true ,
                icon: 'error',
                title: err.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const editCategory = async (id,name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/categories/${id}`, {
                headers : {Authorization : token} 
            })
            Swal.fire({
                width : "30%" , 
                toast : true ,
                icon: 'success',
                title: res.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
            setCallBack(!callBack)

        } catch (err) {
            Swal.fire({
                width : "30%" , 
                toast : true ,
                icon: 'error',
                title: err.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    
    return (
        <div className='categories'>
            <form onSubmit={addCategory}>
                <label htmlFor='category'> Category </label>
                <input 
                    type='text' 
                    name='category' 
                    value={category} 
                    onChange={(e)=> setCategory(e.target.value) } 
                    required
                />
                <button type='submit' > {onEdit? "Update" : "SAVE"} </button>
            </form>

            <div className="col">
                {
                    categories.map(category=>(
                        <div className="row" key={category._id}>
                            <p> {category.name} </p>
                            <div>
                                <button className='btn-edt' onClick={()=>editCategory(category._id , category.name)}> Edit  </button>
                                <button className='btn-dlt' onClick={()=>deleteCategory(category._id)}> Delete  </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories