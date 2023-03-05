import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../../Context/CartContext';

const Login = () => {

    const [signUpFlag, setSignUpFlag] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const { setIsLogin } = CartState();
    const navigate = useNavigate();

    const changeToSignUp = () => {
        
        setSignUpFlag(!signUpFlag)
        // setFormValues({})
    }

    const emailAddressChange = (event) => {
        const email = event.target.value;
        setFormValues({...formValues, email:email});
    }

    const passChangeHandler = (event) => {
        const pass = event.target.value;
        setFormValues({...formValues, password:pass})
    }

    const loginFormSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formValues)
        if(signUpFlag){
            const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9mu6HEk-GVp1dLki9a3vTO8AB-N_WvCM";

            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formValues, returnSecureToken :true})
            }
            console.log("Sign Up!", config)

            fetch(url,config).then((response) => {
                if(response.ok){
                    return response.json()
                }
            }).then(response => {
                console.log(response)
                localStorage.setItem("token", response.idToken)
                localStorage.setItem("isLogin", true)
                setIsLogin(true)
                navigate("/")
            })
            .catch((err) => console.log(err))

        } else {
            console.log("Login")
            const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9mu6HEk-GVp1dLki9a3vTO8AB-N_WvCM";
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formValues, returnSecureToken: true })
            }
            console.log("Login Up!", config)

            fetch(url, config).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            }).then(response => {
                console.log(response)
                localStorage.setItem("token", response.idToken)
                localStorage.setItem("isLogin", true)
                setIsLogin(true)
                navigate("/")
            })
                .catch((err) => console.log(err))
            
        }
    }

  return (
    <div className='loginPageConatiner'>
      <Form className="loginPageForm" onSubmit={loginFormSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' onChange={emailAddressChange} required/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name='password' onChange={passChangeHandler} required />
          </Form.Group>

          {signUpFlag && <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="confirmPassword" required/>
          </Form.Group>}

           <Button variant="primary" type="submit">
                {!signUpFlag ? "Login" : "Signup" }
          </Button>
          <Button onClick={changeToSignUp} className='ms-4'>
                  {!signUpFlag ? "or sign up?" : "Login?"}
          </Button>

            <Form.Group>
                <Form.Text>email: test@test.com / </Form.Text>
                <Form.Text> pass: 12345678</Form.Text>
            </Form.Group>
      </Form>
    </div>
  )
}

export default Login
