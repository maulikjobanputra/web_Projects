import React, {useRef, useState } from "react";

const AddNote = (props) => {

const [input, setInput] = useState({title:'', description:''});

const {setAdd, fetchNotes, showAlert} = props;

const err= useRef({title:{msg:''}, description:{msg:''}})


const handleChange = (e) => {

  setInput(prev => {
      return {...prev, [e.target.name]: e.target.value}
  })
}

const host = "http://localhost:9000";

const addNote = async (obj) => {

  err.current = {title:{msg:''}, description:{msg:''}};

  const res = await fetch(`${host}/api/notes/addnote`, {
    method : 'POST',
    headers : {'Content-Type': 'application/json', 'auth_token' : localStorage.getItem('auth_token')},
    body : JSON.stringify(obj)
  });
  
  const data = await res.json();
  
  if(Object.keys(data).length ===0){

    setAdd(false);
    showAlert('Successfully Added!', 'success')

  }else{

    err.current = {...err.current, ...data};
  }

  fetchNotes();
}

  return (
    <div className="my-5">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            aria-describedby="emailHelp"
            value={input.title} 
            onChange={handleChange}
          />
          <p>{err.current.title.msg}</p>
        </div>
          <p></p>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={input.description} 
            onChange={handleChange}
          />
          <p>{err.current.description.msg}</p>
        </div>
          
        
        <button type="submit" className="btn btn-dark" onClick={(e)=>{
          e.preventDefault(); 
          addNote(input); 
          }}>
          Add Note!
        </button>
      </form>
    </div>
  );
};

export default AddNote;
