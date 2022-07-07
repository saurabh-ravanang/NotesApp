import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Successfully Added Note", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
            <div className="container my-3">
                <h2>Add Your Notes</h2>
                <form>
                    <div className="mb-3">
                        {/* <label htmlFor="title" className="form-label">Add Title :</label> */}
                        <h6>Add Title :</h6>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required/>
                        <div id="emailHelp" className="form-text">Please enter Title atleast 3 characters </div>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="description" className="form-label">Add Description :</label> */}
                        <h6>Add Description :</h6>
                        <input type="text" className="form-control" name='description' id="description" onChange={onChange} value={note.description} minLength={5} required/>
                        <div id="emailHelp" className="form-text">Please enter Description atleast 5 characters.</div>
                    </div>
                    <div className="mb-3">
                    <h6>Add Tag :</h6>
                        {/* <label htmlFor="tag" className="form-label">Add Tag :</label> */}
                        <input type="text" className="form-control" value={note.tag} name='tag' id="tag" onChange={onChange}/>
                    </div>
                    
                    <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
    )
}

export default AddNote
