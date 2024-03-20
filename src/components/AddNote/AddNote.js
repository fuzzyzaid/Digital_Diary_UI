import React, { useState,useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddNote.module.css";
import Header from '../Header/Header';

function AddNote() {
    const path = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await fetch("/checkAuth");
            const response = await responseData.json();  // because fetch does not return the json object thats why we have to convert it into jsona dn then use
            console.log(response);
            if (response.message === "Unauthorized") {
                console.log("Please Log in to add a note");  
                path("/login");   
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
        };
        fetchData();
      }, []);

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

    const handleClear = () => {
            setTitle('');
            setDescription('');
            setFormErrors({})
    };

    async function submit(e) {
        e.preventDefault();

        if (validateForm()) {
            const userNote = {
                title,
                description
            };

            try {
                const response = await axios.post("/addNote", userNote);
                console.log(response);
                if (response.data.message === "Note saved successfully") {
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
                    <h2 className={`card-title text-center ${styles.customHeading}`}>Add Note</h2>
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
                            <input type="submit" value="Save" className={`btn btn-outline-primary ${styles.saveButton}`} />
                            <button type="button" onClick={handleClear} className={`btn btn-outline-danger ${styles.cancelButton}`}>Clear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       </div>
       </div>
    )
}

export default AddNote;
