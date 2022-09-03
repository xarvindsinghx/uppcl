import React, {useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const Login = ()=> {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    let navigate = useNavigate()
    const API_URL = "http://localhost:8080/users/login"
    const login =  async (e)=>{
        e.preventDefault();
        let email = emailRef.current.value
        let password = passwordRef.current.value

        let response = await axios.post(API_URL, {
            email,
            password
        }).catch((res)=> {
            //alert user about password incorrrect or user not found
            alert(res.response.data.message)
        })

        if(response && response.status == 200) {
            alert("User "+ response.data.firstName + " " + response.data.lastName +" logged in")
            console.log(response.data)
            localStorage.setItem('UPPCL_USER', JSON.stringify(response.data));
            navigate("/")
        }
    }
    return (
        <div>
            <h1 style = {{textAlign: "center"}}>Login</h1>
            <Form style={{width: "50%", margin:"10px auto"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref= {emailRef} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref= {passwordRef} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={login}>
                Submit
            </Button>
            <Link to = "/signup" style = {{marginLeft: "10px"}}>
                <Button variant="primary" type="submit" >
                    Signup
                </Button>
            </Link>
            
            </Form>
        </div>
        
    );
};

export default Login;