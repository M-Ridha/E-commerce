import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'



const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {

                try {
                    const res = await axios.get('/user/userProfile', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        if (!isLogged) return (
            Swal.fire({
                    width : "30%" , 
                    toast : true ,
                    icon: 'warning',
                    title: "you must login first",
                    showConfirmButton: false,
                    timer: 2000
            })
        )

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            await axios.patch('/user/addCart' , {cart : [...cart, { ...product, quantity: 1}]},{
                headers : {Authorization : token}
            })
        } else {
            Swal.fire({
                width : "30%" , 
                toast : true ,
                icon: 'success',
                title: "product successfully added to your shopping cart",
                showConfirmButton: false,
                timer: 2500
            })
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history : [history, setHistory],
        
    };
}

export default UserAPI;
