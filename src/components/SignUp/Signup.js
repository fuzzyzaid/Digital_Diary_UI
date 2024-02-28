import React, { useState } from 'react';
import axios from "axios";
import './Signup.css';

function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formErrors,setFormErrors] = useState({});

    
    const validateForm = ()=> {
        const errors={};
    
        if (!fullName) {
          errors.fullName="Full Name is required"
          
        } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(fullName)) {
            errors.fullName="FullName is required"
           
        }
    
        if (!email) {
            errors.email = 'Email is required.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email address.';
        }
    
        if (!password) {
            errors.password = 'Password is required.';
        }
        
        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
          } else if (!/^\d{3}\d{4}\d{3}$/.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number must be in the format XXXXXXXXXX.';
        }
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      }

      async function submit(e) {
        e.preventDefault();

        if(validateForm()){
            const userData = {
                fullName,              
                email,
                password,
                phoneNumber,
            };
        
            try {
                const response = await axios.post("/signup", userData);
        
                if (response.data === "User exists") {
                    console.log("User exists");
                    
                } else if (response.data === "User Does Not Exist") {
                      // Redirect to login page or display success message
                   // path("/login");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }
        }


  return (
    <div>
        <h1>Sign Up</h1>
            <form onSubmit={submit} id="signUp">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" onChange={(e) => setFullName(e.target.value)} name="fullName" id="fullName" />
                    {formErrors.fullName && <p className="errorMsg">{formErrors.fullName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                    {formErrors.email && <p className="errorMsg">{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" id="phoneNumber" />
                    {formErrors.phoneNumber && <p className="errorMsg">{formErrors.phoneNumber}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Create your Password" name="password" />
                    {formErrors.password && <p className="errorMsg" >{formErrors.password}</p>}
                </div>
                
                <input type="submit" value="Signup" />
               
            </form>

    </div>
  )
}

export default Signup