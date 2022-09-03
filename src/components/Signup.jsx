import React, {useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';

const Signup = ()=> {
    const emailRef = useRef(null);
    const rePasswordRef = useRef(null);
    const passwordRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const ageRef = useRef(0);

    let navigate = useNavigate()

    const API_URL = "http://localhost:8080/users/signup"
    const signup =  async (e)=>{
        e.preventDefault();

        let user = {
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            age: ageRef.current.valueAsNumber,
            password: passwordRef.current.value,
        }
        let repassword = rePasswordRef.current.value
        
        if(user.email && user.firstName && user.lastName && user.age && user.password && repassword) {
            if(user.age < 10 || user.age > 60) {
                alert('Age should be between 10 and 60')
            }
            else if(user.firstName < 6 || user.firstName > 30) {
                alert('firstname should be min 6 length and max 30')
            }
            else if(user.lastName < 6 || user.lastName > 30) {
                alert('lastname should be min 6 length and max 30')
            }
            else if(user.password.length < 6 | user.password.length > 30) {
                alert('password should be min 6 length and max 30')
            }
            else if(user.password != repassword) {
                alert('Password and re password should match')
            }
            else {

                console.log(user)
                // all fields are correct
                
                let response = await axios.post(API_URL, user).catch((res)=> {
                    //alert user about any error in saving user
                    alert(res.response.data.message)
                })
        
                if(response && response.status == 201) {
                    alert("User "+ response.data.firstName + " " + response.data.lastName +" created")
                    navigate("/login")
                }                
            }
        }
        else {
            alert('Some fields are empty')
        }
    }
    return (
        <div>
            <h1 style = {{textAlign: "center"}}>Signup</h1>
            <Form style={{width: "50%", margin:"10px auto"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref= {emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control ref= {firstNameRef} type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control ref= {lastNameRef} type="text" placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control ref= {ageRef} type="number" placeholder="Age" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref= {passwordRef} type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Re Password</Form.Label>
                    <Form.Control ref= {rePasswordRef} type="password" placeholder="Re Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signup}>
                    Submit
                </Button>

                <Link to = "/" style = {{marginLeft: "10px"}}>
                <Button variant="primary" type="submit" >
                    Login
                </Button>
                </Link>
            </Form>
        </div>
        
    );
};

export default Signup;