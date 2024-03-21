import React,{useEffect,useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";
import Header from '../Header/Header';
import styles from './ViewNote.module.css'

function ViewNote() {
    const {state}=useLocation();
    console.log("Id", state)
    const path = useNavigate();
    const noteId=state;
    const [userNotes, setUserNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await fetch("/checkAuth");
            const response = await responseData.json();  // because fetch does not return the json object thats why we have to convert it into jsona dn then use
            console.log("Checking Auth");
            console.log(response);
            if (response.message === "Unauthorized") {
                console.log("Please Log in to add a note");  
                path("/login");   
            }
             else {
                const response = await axios.post("/viewNoteByUser", {noteId:noteId});
                console.log(response.data);
                if (response.data.message === "Not Found") {
                    alert("Something went wrong")
                } else if (response.data.notes) {
                  setUserNotes(response.data.notes)
                  setLoading(false);
                }  
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
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
        <Header/>
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
                     {userNotes.map((item,index) => (
                         <tr  key={item._id}>
                           <td >{item.title}</td>
                           <td >{item.description}</td>
                           <td >{item.date}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
        </div>
        </div>
     )}

      </>
     
  )
}

export default ViewNote