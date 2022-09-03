import React from 'react';
import {useNavigate, Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
const Dashboard = () => {

    let navigate = useNavigate()
    
    let user = localStorage.getItem('UPPCL_USER')
    if(user) {
        console.log(user)
        user = JSON.parse(user)
        console.log(user.firstname)
    }
    
    const logout = ()=> {
        localStorage.removeItem('UPPCL_USER')
        navigate('/login')
    }
    return (
        <div>
            <h1 style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                Welcome {user? user.firstName+" "+user.lastName: ""}
            </h1>
            <div style={{display: "flex", justifyContent: "center"}}>
            {
                user?<Button onClick = {logout}>Logout</Button>:<Link to = '/login'>
                <Button>Login</Button>
                </Link>
            } 
            </div>
            
        </div>
    );
}

export default Dashboard;