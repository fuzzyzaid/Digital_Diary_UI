import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import styles from './EditNote.module.css'
function EditNote() {
 // eslint-disable-next-line react-hooks/exhaustive-deps
  const { state } = useLocation(); // getting the full note data from home when cliked on viewDetails
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const path = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch('/checkAuth');
        const response = await responseData.json();
        console.log('Checking Auth');
        console.log(response);
        if (response.message === 'Unauthorized') {
          console.log('Please Log in to add a note');
          path('/login');
        } else {
          // Set note data if state exists
          if (state) {
            setTitle(state.title)
            setDescription(state.description)
            setId(state._id)
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    };
    fetchData();
  }, [path, state])

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
        errors.title = 'Title is required.';
    }

    if (!description.trim()) {
        errors.description = 'Description is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
}

const handleCancel=()=>{
    path("/");
}
  async function submit(e) {
    e.preventDefault();

    if (validateForm()) {
        const userNote = {
            id,
            title,
            description
        };

        try {
            const response = await axios.post("/updateNote", userNote);
            console.log("Note updated successfully")
            console.log(response);
            if (response.data.message === "Note updated successfully") {
                path("/");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    }
  }
  return (
    <div>
        <Header/>
        <div className={styles.mainDiv}>
            <div className={`container ${styles.container}`}>
                <div className={`card ${styles.card}`}>
                    <div className={`card-body ${styles.cardBody}`}>
                        <h2 className={`card-title text-center ${styles.customHeading}`}>Update Note</h2>
                        <form onSubmit={submit} className={styles.saveNote}>
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" name='title' id="title" className={`form-control ${styles.customInput}`} value={title} onChange={(e) => setTitle(e.target.value)} />
                                {formErrors.title && <p className={styles.errorMsg}>{formErrors.title}</p>}
                            </div>
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="description">Description:</label>
                                <textarea name='description' id="description" className={`form-control ${styles.customTextarea}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                                {formErrors.description && <p className={styles.errorMsg}>{formErrors.description}</p>}
                            </div>
                            <div className={`text-center ${styles.buttonGroup}`}>
                                <input type="submit" value="Update" className={`btn btn-outline-primary ${styles.saveButton}`} />
                                <button type="button" onClick={handleCancel} className={`btn btn-outline-danger ${styles.cancelButton}`}>Cancel</button>
                            </div>
                        </form>
                     </div>
                 </div>
              </div>
        </div>
    </div>
  )
}

export default EditNote