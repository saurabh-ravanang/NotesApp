import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [cretential, setCretential] = useState({ email: "", password: "" });
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                //   'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE'
            },
            body: JSON.stringify({ email: cretential.email, password: cretential.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            //   localStorage.setItem('authtoken', json.authtoken)
            localStorage.setItem('token', json.authToken);
            // localStorage.setItem('auth-token', json.authToken);
            props.showAlert("Successfully Signup", "success")
            history("/");
        }
        else {
            props.showAlert("Invalid Cretential", "danger");
        }
    }
    const onChange = (e) => {
        setCretential({ ...cretential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2 className='text-center mb-4'>LOGIN HERE</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h6>Email address :</h6>
                    {/* <label htmlFor="email" className="form-label">Email address</label> */}
                    <input type="email" className="form-control" onChange={onChange} value={cretential.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <h6>Password :</h6>
                    {/* <label htmlFor="password" className="form-label">Password</label> */}
                    <input type="password" className="form-control" onChange={onChange} value={cretential.password} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
