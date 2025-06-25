import React from 'react';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export const BookFreeTrialButton = (props) => {
    const history = useHistory();

    const profile = JSON.parse(localStorage.getItem('profile'));
    // localStorage.setItem("chosenCourse", JSON.stringify(props.course));
    // console.log("profile", profile.profile);
    const clickButton = () => {
        if (profile && profile.role === 'Student') {
            
            history.push("/calendar");
            // history.push("/payment");
        }
        else {
            toast.warning("You need to Login first!");
            // history.push("/auth/login");
        }
    }
    
    return (
        <div onClick={clickButton} style={{ textAlign: 'center', margin: '0 auto', width: 'fit-content', cursor: "pointer", backgroundColor: "#fe1848", color: "#fefeff", padding: "10px", borderRadius: "5px" }}>
            Book Free Trial
        </div>
    )
}