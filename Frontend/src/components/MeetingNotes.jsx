import React, { useState } from 'react';
import './MeetingNotes.css';

function MeetingNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteIndex, setEditNoteIndex] = useState(null);
  const [editedNote, setEditedNote] = useState('');

  const addNote = () => {
    if (newNote) {
      const timestamp = new Date();
      const formattedDate = `${timestamp.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} - ${timestamp.toLocaleTimeString()}`;
      const formattedNote = `${newNote} - ${formattedDate}`;
      setNotes([...notes, formattedNote]);
      setNewNote('');
    }
  };

  const handleEdit = (index) => {
    setEditNoteIndex(index);
    setEditedNote(notes[index].split('-')[0].trim());
  };

  const updateNote = () => {
    if (editedNote) {
      const timestamp = new Date();
      const formattedDate = `${timestamp.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} - ${timestamp.toLocaleTimeString()}`;
      const updatedNotes = [...notes];
      updatedNotes[editNoteIndex] = `${editedNote} - ${formattedDate}`;
      setNotes(updatedNotes);
      setEditNoteIndex(null);
      setEditedNote('');
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setEditNoteIndex(null);
    setEditedNote('');
  };

  return (
    <div className="container mt-5">
      <div className="card meeting-card">
        <div className="card-header">
          <h2 className="card-title text-white text-center">Meeting Notes</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <textarea
              className="form-control stretch-textarea"
              placeholder="Add your meeting notes here"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{ fontSize: '16px' }}
            />
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-primary add-button" onClick={addNote}>
              Add
            </button>
          </div>
          <div className="notes-list mt-4">
            {notes.map((note, index) => (
              <div key={index} className="note-item">
                {editNoteIndex === index ? (
                  <div>
                    <textarea
                      className="form-control edit-textarea"
                      value={editedNote}
                      onChange={(e) => setEditedNote(e.target.value)}
                      style={{ fontSize: '16px' }}
                    />
                    <div className="note-buttons">
                      <button className="btn btn-success" onClick={updateNote}>
                        Update
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditNoteIndex(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="note-content">{note.split('-')[0]}</div>
                    <div className="note-timestamp">{note.split('-')[1]}</div>
                    <div className="note-buttons">
                      <button className="btn btn-warning" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => deleteNote(index)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingNotes;
