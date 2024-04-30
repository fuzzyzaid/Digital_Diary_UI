import React from "react";
import styles from "./NoPageFound.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NoPageFound() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h1>OOPS Page Not Found</h1>
      </div>
    </div>
  );
}

export default NoPageFound;
