import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CartState } from '../../Context/CartContext';

const Products = () => {

    const { cartCtx, setCartCtx, setProducts, displayProducts } = CartState()

    const addToCartHandle = (product) => {
        setCartCtx(prevCart => {
            return [...prevCart, product]
        })
    }

    const removeItemFromCart = (product) => {
        setCartCtx(prevCart => {
            return [...prevCart.filter(item => item.id !== product.id)]
        })
    }

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then((response) => {
            console.log(response)
            return response.json()
        }).then((res) => {
            console.log(res)
            setProducts(res)
        }).catch((err) => {
            alert("Something Went Wrong!",err)
        })
    },[])

  return (
    <div className='productsDisplayClass'>
          
          {displayProducts.map((item) => {
            return (
                    <Card key={item.id} style={{ width: '18rem' }}>
                        
                        <Card.Body className='productsCardBodyClass'>
                            <Card.Img variant="top" src={item.image} className="productsImageClass" />
                            <Card.Title className='mt-4'>{item.title}</Card.Title>
                            <Card.Text className='productsDescriptionClass'>
                                {item.description}
                            </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Price : ${item.price}</ListGroup.Item>
                            <ListGroup.Item>Ratings : {item.rating.rate}</ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                            <Card.Footer className='productsFooterClass'>
                                {cartCtx.some(prod => prod.id === item.id) ? (
                                <Button className='productsAddToCartBtn' variant="danger" onClick={() => removeItemFromCart(item)}>
                                    Remove From Cart
                                </Button>
                                ) : (
                                <Button className='productsAddToCartBtn' variant="primary" onClick={() => addToCartHandle(item)}>
                                    Add To Cart
                                </Button>
                                ) }

                            </Card.Footer>
                    </Card>
            )
          })}
              
    </div>
  )
}

export default Products