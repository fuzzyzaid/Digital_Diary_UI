import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import styles from "./Home.module.css";

function Home() {
  const path = useNavigate();
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [isNotes, setIsNotes] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch(`/getNotes`);
        const response = await responseData.json();

        if (response.message === "Unauthorized") {
          path("/login");
        } else if (response.message === "No notes") {
          setLoading(false);
          setIsNotes(false);
        } else if (response.userNotes) {
          setUserNotes(response.userNotes.notes);
          setLoading(false);
          setIsNotes(true);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
    fetchData();
  }, [backendUrl, path, reload]);

  const handleView = (item) => {
    path("/viewNote", { state: item });
  };

  const handleEdit = (item) => {
    path("/editNote", { state: item });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("/deleteNotesById", { noteId: id });

      if (response.data.message === "Unauthorized") {
        path("/login");
      }
      if (response.data.message === "Notes Deleted") {
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const formatDescription = (description, item) => {
    const words = description.split(" ");
    if (words.length > 50) {
      const truncatedDescription = words.slice(0, 20).join(" ") + "....";
      return (
        <p>
          {truncatedDescription}{" "}
          <button
            className={`btn btn-link ${styles.viewDetailsBtn}`}
            onClick={() => handleView(item)}
          >
            See More
          </button>
        </p>
      );
    } else {
      return <p>{description}</p>;
    }
  };

  const handleAddNote = () => {
    path("/addNote");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <div className={`container mt-4 mb-5 ${styles.mainContainer}`}>
            {!isNotes && <h5>No Notes to display</h5>}
            {isNotes && (
              <div
                className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ${styles.customRow}`}
              >
                {userNotes.map((item, index) => (
                  <div key={item._id} className="col">
                    <div className={`card h-100 ${styles.customCard}`}>
                      <div className="card-body">
                        <h5 className={`card-title ${styles.cardTitle}`}>
                          {item.title}
                        </h5>
                        {formatDescription(item.description, item)}
                        <p className={`card-text ${styles.cardDate}`}>
                          <small className="text-muted">
                            {formatDate(item.date)}
                          </small>
                        </p>
                      </div>
                      <div className="card-footer d-flex justify-content-end mb-4">
                        <button
                          className={`btn btn-outline-dark me-2 ${styles.editBtn}`}
                          onClick={() => handleEdit(item)}
                        >
                          <i className="bi bi-pencil-square"></i>{" "}
                        </button>
                        <button
                          className={`btn btn-outline-danger ${styles.deleteBtn}`}
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="bi bi-trash"></i> {/* Delete icon */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className={`btn btn-lg ${styles.addNoteBtn} position-fixed bottom-0 end-0 m-3`}
            onClick={handleAddNote}
          >
            <i className={`bi bi-plus-lg text-white ${styles.bgColor} `}></i>{" "}
            {/* Plus icon */}
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
