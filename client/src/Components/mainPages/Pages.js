import React , {useContext} from 'react'
import {Switch , Route} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import ProductDetails from './productDetails/ProductDetails'
import Products from './products/Products'
import NotFound from './utils/notFound/NotFound'
import IsLogged from './utils/isLogged/IsLogged'




const Pages = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged


    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/details/:id" exact component={ProductDetails}/>
            <Route path="/login" exact component={isLogged ? NotFound : Login}/>
            <Route path="/register" exact component={isLogged ? NotFound : Register}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/history" exact component={!isLogged ? IsLogged : OrderHistory}/>
            <Route path="/history/:id" exact component={!isLogged ? IsLogged : OrderDetails}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>
    )
}

export default Pages
