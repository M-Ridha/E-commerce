import React , {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const Register = () => {

    const [user , setUser] = useState ({
        name : "" ,
        email : "" ,
        password : ""
    })

    const onChangeInput = (e) => {
        const {name , value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await axios.post('/user/register', {...user})    

            localStorage.setItem('firstLogin', true)

            window.location.href = "/"

        } catch (err) {
            Swal.fire({
                width : "30%" , 
                toast : true ,
                icon: 'warning',
                title: err.response.data.msg,
                showConfirmButton: false,
            })
        }
    }

    return (
        <div className='login-page'>

            <form onSubmit={registerSubmit}>
                <h2> Register </h2>

                <input
                    type='text'
                    name='name'
                    required
                    placeholder='Name'
                    value={user.name}
                    onChange={onChangeInput}
                />

                <input
                    type='email'
                    name='email'
                    required
                    placeholder='Email'
                    value={user.email}
                    onChange={onChangeInput}
                />

                <input
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    value={user.password}
                    onChange={onChangeInput}
                />

                <div className='row'>
                    <button type='submit'> Join US ! </button>
                    <Link to="/login"> Login </Link>
                </div>
            </form>

        </div>

    )
}

export default Register
