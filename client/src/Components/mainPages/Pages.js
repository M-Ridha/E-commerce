import React from 'react'
import {Switch , Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import ProductDetails from './productDetails/ProductDetails'
import Products from './products/Products'
import NotFound from './utils/notFound/NotFound'

const Pages = () => {
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/details/:id" exact component={ProductDetails}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>
    )
}

export default Pages
