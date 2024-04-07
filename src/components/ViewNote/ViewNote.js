import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './ViewNote.module.css';

function ViewNote() {
  // eslint-disable-next-line 
  const { state } = useLocation(); // getting the full note data from home when cliked on viewDetails
 // eslint-disable-next-line 
  const path = useNavigate();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch('/checkAuth');
        const response = await responseData.json();
        console.log('Checking Auth');
        console.log(response);
        if (response.message === 'Unauthorized') {
          console.log('Please Log in to add a note');
         // eslint-disable-next-line 
          path('/login');
        } else {
          setLoading(false);
          // Set note data if state exists
          // eslint-disable-next-line 
          if (state) {
            // eslint-disable-next-line 
            setNote(state);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    };
    fetchData();
  }, []);

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
                </tr>
              </thead>
              <tbody>
                {/* Check if note is not null before rendering */}
                {note && (
                  <tr>
                    <td>{note.title}</td>
                    <td>{note.description}</td>
                    <td>{note.date}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewNote;
