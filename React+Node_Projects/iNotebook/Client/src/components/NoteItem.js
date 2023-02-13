import React from "react";

const NoteItem = (props) => {

  const { note, deleteNote, updateNote } = props;

  return (
    <div className="card bg-light rounded m-3" style={{ width: "297px" }}>
      <div className="card-body">
        <h1 className="card-title">{note.title}</h1>
        <p className="card-text">{note.description}</p>
        <div className="d-flex justify-content-end">
          <i className="fa-solid fa-pen-to-square mx-2" role='button' onClick={()=>{updateNote(note)}}></i>
          <i className="fa-solid fa-trash mx-2" role='button' onClick={()=>{deleteNote(note._id)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
