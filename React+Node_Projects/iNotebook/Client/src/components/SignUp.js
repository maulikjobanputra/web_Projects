import React, {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = (props) => {
  
  const navigate = useNavigate();

  if (localStorage.getItem('auth_token')){
    navigate('/');
  };

  const [err, setError] = useState({name:{msg:''}, email:{msg:''}, password:{msg:''}})

  const [input, setInput] = useState({name: '', email:'', password:'', cPassword : ''});

  const handleChange = event => {

    const {name, value} = event.target;

    setInput(prev => {
      return {...prev, [name] : value}
    })
  }

  const host = "http://localhost:9000";


  const submit = async() => {


    if(input.password!==input.cPassword){

      props.showAlert('Both passwords do not match!', 'danger');
      return
    }

    setError({name:{msg:''}, email:{msg:''}, password:{msg:''}});

    const res = await fetch(`${host}/api/auth/register`, {
      method : 'POST',
      headers : {'Content-Type': 'application/json'},
      body : JSON.stringify(input)
    });

    const data = await res.json();

    if(data.success === true){

      localStorage.setItem('auth_token', data.auth_token);
      navigate('/');
      props.showAlert('Successfully SignedUp in!', 'success')

    }else{

      setError(prev=>{
        return {...prev, ...data}
      })
    }
  }
  useEffect(() => {
    if (localStorage.getItem('auth_token')){
      navigate('/');
    };// eslint-disable-next-line 
  }, [])
  return (
    <div className="container my-5">
    <h1 className='mb-4'>SignUp to use iNotebook!</h1>
    <form onSubmit={e=>{e.preventDefault(); submit()}}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
        <input type="text" className="form-control" name='name' onChange={handleChange} value={input.name}/>
        <div id="emailHelp" className="form-text">{err.name.msg}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' onChange={handleChange} value={input.email}/>
        <div id="emailHelp" className="form-text">{err.email.msg}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' onChange={handleChange} value={input.password}/>
        <div id="emailHelp" className="form-text">{err.password.msg}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='cPassword' onChange={handleChange} value={input.cPassword}/>
      </div>
      <button type="submit" className="btn btn-secondary">SignUp</button>
  </form>
  </div>
  )
}

export default SignUp;