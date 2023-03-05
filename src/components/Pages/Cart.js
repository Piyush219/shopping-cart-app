import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { CartState } from '../../Context/CartContext'

const Cart = () => {

    const { cartCtx, setCartCtx } = CartState();
    const [totolPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const price = cartCtx.reduce((acc, curr) => acc + curr.price, 0 )
        setTotalPrice(price)
    },[cartCtx])


    const removeItemFromCart = (product) => {
        setCartCtx(prevCart => {
            return [...prevCart.filter(item => item.id !== product.id)]
        })
    }

  return (
    <>
    <div className='cartProductContainer'>
        <div className='cartProducts'>
            <ListGroup>

            {cartCtx.map((prod) => {
                return (
                    <ListGroup.Item key={prod.id}>
                        <Row>
                            <Col md={2}>
                                <Image src={prod.image} alt={prod.name} fluid rounded />
                            </Col>
                            <Col md={2}>
                                <span>{prod.title}</span>
                            </Col>
                            <Col md={2}> ${prod.price}</Col>
                            <Col md={2}>
                                Rating : {prod.rating.rate}
                            </Col>
                            <Col md={2}>
                                <Button variant="danger" onClick={() => removeItemFromCart(prod)}>
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
            })}
            </ListGroup>
        
        </div>
        {cartCtx.length > 0 && <div>
            <Card style={{position: "fixed"}}>
                <Card.Body>
                    <Card.Title>Proceed To Checkout</Card.Title>
                    <Card.Subtitle>Total: ${totolPrice}</Card.Subtitle>
                    <Button className='mt-4' variant='primary'>Checkout</Button>
                </Card.Body>
            </Card>
        </div>}
    </div>

    <div className='text-center'>
        {cartCtx.length == 0 &&
            <div>
                Please Add Some Items From Products Page
            </div>
        }
    </div>
    </>
  )
}

export default Cart