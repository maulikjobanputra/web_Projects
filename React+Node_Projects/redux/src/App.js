import React from 'react'
import './App.css';
import { increment, decrement } from './actions';
import { useSelector, useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  const myState = useSelector(state => state.changeTheNumber)

  return (
    <>
      <div className="main-div">
      

      <div className="container">
  
      <h1>Increment/Decrement counter</h1>
      <h4>using React and Redux</h4>
      
      <div className="quantity">
        <a className="quantity__minus" href='/' onClick={ (e) => { e.preventDefault(); dispatch(decrement())}} title="Decrement"><span>-</span></a>
        <input name="quantity" type="text" className="quantity__input" value={myState} />
        <a className="quantity__plus" href='/' onClick={ (e) => { e.preventDefault(); dispatch(increment(5))}} title="Increment" ><span>+</span></a>
      </div>
  
          </div>
        </div>
    </>
  );
}

export default App;
