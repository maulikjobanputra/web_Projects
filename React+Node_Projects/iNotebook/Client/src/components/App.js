import React, { useState } from "react";
import {
  BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './Navbar';
import About from  './About';
import Home from "./Home";
import Login from './Login';
import SignUp from './SignUp';
import Alert from './Alert'
function App() {
const [alert, setAlert] = useState(null);

const showAlert = (msg, type) => {

  setAlert({
    msg: msg,
    type : type
  });
  setTimeout(()=>{
    setAlert(null);
  },3000)
}

  return (
    <>
    <Router>
    
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home showAlert={showAlert} />}/>
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
          <Route exact path='/signup' element={<SignUp showAlert={showAlert} />} />

        </Routes>
    </Router> 
    
    </>
  );
}

export default App;
