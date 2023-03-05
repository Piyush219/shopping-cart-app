
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPage from './components/Pages/AboutPage';
import Cart from './components/Pages/Cart';
import Header from './components/Layouts/Header';
import Products from './components/Layouts/Products';
import Login from './components/Pages/Login';
import { useEffect } from 'react';
import { CartState } from './Context/CartContext';

function App() {

  const {setIsLogin} = CartState()

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsLogin(true)
    }
  },[])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
