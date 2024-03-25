import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Home.module.css';
import Header from '../Header/Header';

function Home() {
  const path = useNavigate();
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false); // State variable for triggering reload

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch("/getNotes");
        const response = await responseData.json();
        console.log("Get Notes Response")
        console.log(response);

        if (response.message === "Unauthorized") {
          console.log("Please Log in to View notes");
          path("/login");
        } else if (response.userNotes) {
          setUserNotes(response.userNotes.notes);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
    fetchData();
  }, [reload]); // Add reload to the dependency array

  const handleView = (id) => {
    console.log("While sending")
    console.log(id);
    path("/viewNote", { state: id });
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("/deleteNotesById", { noteId: id });
      console.log(response);
      if (response.data.message === "Unauthorized") {
        console.log("Please Log in to delete a note");
        path("/login");
      }
      if (response.data.message === "Notes Deleted") {
        setReload(!reload); // Toggle the reload trigger
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <div id={styles.mainContainer}>
            <h2>My Notes</h2>
            <table className={`table table-bordered ${styles.customTable}`}>
              <thead className="thead-dark">
                <tr>
                  <th>Titile</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userNotes.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.date}</td>
                    <td>
                      <button className={`btn btn-outline-primary btn-sm ${styles.viewBtn}`} onClick={() => handleView(item._id)}>View Details</button>
                      <button className={`btn btn-outline-dark btn-sm ${styles.editBtn}`}>Edit</button>
                      <button className={`btn btn-outline-danger btn-sm ${styles.deleteBtn}`} onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
