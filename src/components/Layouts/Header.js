import React from 'react';
import { Badge, Form, FormGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartState } from '../../Context/CartContext';

const Header = () => {

    const {cartCtx, products ,setDisplayProducts, isLogin, setIsLogin} = CartState();
    const navigate = useNavigate();

    const filterDisplayProducts = (value) => {
        const filterProducts = products.filter(item => {
           return item.title.toLowerCase().includes(value.toLowerCase())
        })
        setDisplayProducts(filterProducts)
    }

    const logoutUser = () => {
        setIsLogin(false)
        localStorage.clear();
        navigate("/login")
    }

  return (
    <div className='navBarClass'>
          <Navbar bg="light" variant="light" fixed="top">
              <Container>
                <Navbar.Brand>
                    <NavLink to="/" style={{textDecoration:"none", color:"gray"}}>
                        ShopZone
                    </NavLink>
                </Navbar.Brand>
                  {isLogin && <Nav className="">
                      <FormGroup>
                        <Form.Control type='text' placeholder='search products' onChange={(e) => filterDisplayProducts(e.target.value)}/>
                      </FormGroup>
                      <Navbar.Text className='ms-4'>

                        <NavLink to="/cart" style={{textDecoration:"none", color:"gray"}}>
                            Cart
                            <Badge className='ms-1' bg="secondary">{cartCtx.length ? cartCtx.length : 0 }</Badge>
                        </NavLink>
                      </Navbar.Text>

                      <Navbar.Text className='ms-3'>
                          <NavLink style={{textDecoration:"none", color:"gray"}} to="/about">About</NavLink>
                      </Navbar.Text>
                      
                      <Navbar.Text style={{cursor: "pointer"}} className='ms-2' onClick={logoutUser}>Logout</Navbar.Text>
                  </Nav>}
              </Container>
          </Navbar>
    </div>
  )
}

export default Header