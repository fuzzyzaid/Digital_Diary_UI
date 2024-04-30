import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./ViewNote.module.css";

function ViewNote() {
  const { state } = useLocation();
  const path = useNavigate();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetch("/checkAuth");
        const response = await responseData.json();
        if (response.message === "Unauthorized") {
          path("/login");
        } else {
          setLoading(false);
          if (state) {
            setNote(state);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    };
    fetchData();
  }, [path, state]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <div className={`container mt-4 ${styles.mainContainer}`}>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">{note.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{note.date}</small>
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <Link to="/" className="btn btn-outline-primary">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewNote;
