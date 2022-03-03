import {useState} from 'react';


const ProductsAPI = () => {

    const [products, setProducts] = useState([])

    return {
        products:[products, setProducts]
    }
}

export default ProductsAPI
