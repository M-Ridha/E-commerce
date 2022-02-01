import React , {useState , useEffect} from 'react';
import axios from 'axios';



const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        if(token){
            const getUser = async () => {

                try {
                    const res = await axios.get('/user/userProfile', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                }catch(err){
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])

    return {
        isLogged : [isLogged, setIsLogged] , 
        isAdmin : [isAdmin, setIsAdmin]
    } ;
}

export default UserAPI;
