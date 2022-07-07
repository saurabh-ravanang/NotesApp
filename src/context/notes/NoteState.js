import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // get all note
  const getNote = async() => {
     // api call
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE"
        // "auth-token": localStorage.getItem('token')
        'auth-token': localStorage.getItem('token')
        // "auth-token": localStorage.getItem('auth-token')
      }
    });
    const json = await response.json()
    // console.log(json);
    setNotes(json);
  }
  // add note
  const addNote = async(title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
     method: "POST",
     headers: {
       'Content-Type': 'application/json',
      //  'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE"
      //  "auth-token": localStorage.getItem('token')
      'auth-token': localStorage.getItem('token')
     },
     body: JSON.stringify({title, description, tag})
   });
   const note = await response.json()
  //  console.log(json);

  //  console.log("Adding new note")
  //  const note = json
  //  const note = {
  //    "_id": "6210a3a019e1119e3179afa61",
  //    "user": "620f54ec5bd8e06a0b3427e71",
  //    "title": title,
  //    "description": description,
  //    "tag": tag,
  //    "date": "2022-02-19T08:00:32.364Z",
  //    "__v": 0
  //  }
   setNotes(notes.concat(note))
 }

  // delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE"
        // "auth-token": localStorage.getItem('token')
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);

    console.log("deleting" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // edit note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZjU0ZWM1YmQ4ZTA2YTBiMzQyN2U3In0sImlhdCI6MTY0NTE4Njc0Nn0.97gXTActSLnvNkN7XM8Fb_e6uKsOMyPdwQGXfUHV0lE"
        // "auth-token": localStorage.getItem('token')
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;