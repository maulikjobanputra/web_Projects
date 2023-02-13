import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = (props) => {

  const navigate = useNavigate();

  const [add, setAdd] = useState(false);

  const [notes, setNotes] = useState([]);

  const host = "http://localhost:9000";

  const fetchNotes = async () => {

        
    const response = await fetch(`${host}/api/notes/fetch`, {
        method : 'GET',
        headers : {'Content-Type': 'application/json', 'auth_token' : localStorage.getItem('auth_token')}
    })

    const data = await response.json();
   
    setNotes(data);
}


  const deleteNote = async (id) => {

    await fetch(`${host}/api/notes/deletenote/${id}`, {
        method : 'DELETE',
        headers : {'Content-Type': 'application/json', 'auth_token' : localStorage.getItem('auth_token')}
    });

    props.showAlert('Successfully Deleted!', 'success')
    fetchNotes();
  }

  const handleClick = ()=>{
    
    setAdd(true);
  }

  useEffect(()=>{
    if (!localStorage.getItem('auth_token')){
        navigate('/login')
    }else{

      fetchNotes();
    }// eslint-disable-next-line 
  },[])

  return (
    <div className="container my-5">
      <Notes notes={notes} deleteNote={deleteNote} fetchNotes={fetchNotes} showAlert={props.showAlert}/>
      <div className="float-end">
      {!add && <i className="fa-solid fa-circle-plus" style={{fontSize : "75px", margin : '30px 10px' }} role='button' onClick={handleClick}></i>}
      </div>
      {add && <AddNote fetchNotes={fetchNotes} add={add} setAdd={setAdd} showAlert={props.showAlert}/>}
    </div>
  );
};

export default Home;
