import React, {createContext, useContext, useEffect, useState } from 'react'

const Cart = createContext()

const CartContext = ({ children }) => {
    const [cartCtx, setCartCtx] = useState([]);
    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState(products);
    const [isLogin, setIsLogin] = useState(false);

    const value = {
        cartCtx,
        setCartCtx,
        products,
        setProducts,
        displayProducts,
        setDisplayProducts,
        isLogin,
        setIsLogin,
    }

    useEffect(() => {
        setDisplayProducts([...products])
    },[products])
    

  return (
    <Cart.Provider value={value}>
        {children}
    </Cart.Provider>
  )
}

export default CartContext;

export const CartState = () => {
    return useContext(Cart)
}