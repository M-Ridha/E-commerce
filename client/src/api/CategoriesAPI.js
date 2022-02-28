import {useState, useEffect} from 'react'
import axios from 'axios'



const CategoriesAPI = () => {
    
    const [categories , setCategories] = useState([])
    const [callBack , setCallBack] = useState(false)

    useEffect(()=>{
        const getCategories = async () => {
            const res = await axios.get('/api/categories')
            setCategories(res.data)
        }
        getCategories()
    },[callBack])



    return {
        categories : [categories , setCategories] ,
        callBack : [callBack , setCallBack]
    }
}

export default CategoriesAPI