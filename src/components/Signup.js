import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [cretential, setCretential] = useState({ name: "", email: "", password: "", cpassword: "" });
  let history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = cretential;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        //   'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem('token', json.authToken)
      // localStorage.setItem('auth-token', json.authToken);
      history("/");
      props.showAlert("Successfully Signup", "success");
    }
    else {
      props.showAlert("Invalid Cretentials", "danger");
    }
  }
  const onChange = (e) => {
    setCretential({ ...cretential, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h2 className='text-center mb-4'>CREATE AN ACCOUNT </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <h6>Enter Name :</h6>
          {/* <label htmlFor="name" className="form-label">Email address</label> */}
          <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <h6>Email Address :</h6>
          {/* <label htmlFor="email" className="form-label">Email address</label> */}
          <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <h6>Password :</h6>
          {/* <label htmlFor="password" className="form-label">Password</label> */}
          <input type="password" className="form-control" onChange={onChange} name='password' id="password" required minLength={5} />
        </div>
        <div className="mb-3">
          <h6>Confirm Password :</h6>
          {/* <label htmlFor="cpassword" className="form-label">Confirm Password</label> */}
          <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
