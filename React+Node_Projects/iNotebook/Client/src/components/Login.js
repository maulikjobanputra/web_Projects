import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

  const navigate = useNavigate();

  

  const [err, setError] = useState({email:{msg:''}, password:{msg:''}})

  const [input, setInput] = useState({email:'', password:''});

  const handleChange = event => {

    const {name, value} = event.target;

    setInput(prev => {
      return {...prev, [name] : value}
    })
  }

  const host = "http://localhost:9000";


  const submit = async() => {

    setError({email:{msg:''}, password:{msg:''}});

    const res = await fetch(`${host}/api/auth/login`, {
      method : 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(input)
    });

    const data = await res.json();

    if(data.success===true){

      localStorage.setItem('auth_token', data.auth_token);
      navigate('/', {replace : true});
      props.showAlert('Successfully logged in!', 'success')

    }else if(data.success==='error'){

      setError(prev=>{
        return {...prev, ...data}
      });

    }else{
      
      props.showAlert('Incorrect credentials!', 'danger')
    }
  }
  useEffect(() => {
    if (localStorage.getItem('auth_token')){
      navigate('/');
    };// eslint-disable-next-line 
  }, [])
  

  return (
    <div className="container my-5">
    <h1 className='mb-4'>Please Login or SignUp to use iNotebook!</h1>
    <form onSubmit={e=>{e.preventDefault(); submit()}}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="text" className="form-control" name='email' onChange={handleChange} value={input.email}/>
        <div id="emailHelp" className="form-text">{err.email.msg}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' onChange={handleChange} value={input.password}/>
        <div id="emailHelp" className="form-text">{err.password.msg}</div>
      </div>
      <button type="submit" className="btn btn-secondary">Login</button>
  </form>
  </div>
  )
}

export default Login