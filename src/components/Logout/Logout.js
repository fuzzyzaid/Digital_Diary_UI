import React,{ useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

function Logout() {
    const path = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await fetch("/logout");
            const response = await responseData.json();  // because fetch does not return the json object thats why we have to convert it into jsona dn then use
            if (response.message === "Logout Successfull") {
                console.log("Logout Successfull");  
                path("/login");   
            }
            else{
                console.log("Logout Failed")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
        };
        fetchData();
      }, []);
  return (
    <div></div>
  )
}

export default Logout