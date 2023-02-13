import React, { useState, useRef } from "react";
import NoteItem from "./NoteItem";

const Notes = (props) => {

  const { notes, deleteNote, fetchNotes, showAlert } = props;

  const [input, setInput] = useState({ _id: "", title: "", description: "" });

  const ref = useRef(null)

  const refClose = useRef(null)

  const err = useRef({title:{msg:''}, description:{msg:''}})

  const host = "http://localhost:9000";

  const handleChange = (e) => {

    setInput(prev => {
        return {...prev, [e.target.name]: e.target.value}
    })
  }

  const updateNote = (note) => {

    ref.current.click();

    setInput(note);
  };

  const handleClick = async () => {

    err.current = {title:{msg:''}, description:{msg:''}};

    const res = await fetch(`${host}/api/notes/updatenote/${input._id}`, {
      method : 'PATCH',
      headers : {'Content-Type': 'application/json', 'auth_token' : localStorage.getItem('auth_token')},
      body : JSON.stringify(input)
    });
    
    const data = await res.json();

    if(Object.keys(data).length ===0){

      refClose.current.click();
      showAlert('Successfully Updated!','success')
      
    }else{
  
      err.current = {...err.current, ...data};
    };
    

    fetchNotes();
  }


  return (
    <>
      <div className="row">
        <h1 className="mb-3">Your Notes</h1>
        {notes.length === 0 && <div className="mx-2">No Notes to display!</div> }
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            deleteNote={deleteNote}
            updateNote={updateNote}
          />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary d-none"
                  ref={refClose}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
