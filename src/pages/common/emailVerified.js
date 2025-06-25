import React from "react";
import Navigation from "./../../landing/components/Nav";
//import { capitalizeFirstLetter } from "/../../../utils/util";
import classes from "./styles.module.css";
import Blob1 from "../../assets/image/verification_blob.svg";
import Blob2 from "../../assets/image/verification_blob2.svg";
import Svg from "../../assets/image/Mar-Business_18 1.svg";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { createConversation } from "../../store/actions/conversations";


const EmailVerified = (props) => {
  // const dispatch = useDispatch()
  const history = useHistory();
  const path = props.match.path;
  const value = path.split("/")[1];
  React.useEffect(() => {
    
    const profile = JSON.parse(localStorage.getItem("profile"));
    console.log(profile)
    if (profile && profile.role) {
      if (profile.role === "Teacher") {
        // initChatWithAdmin(profile._id)
        history.push("/teacher/dashboard");
      } else if (profile.role === "Student") {
        // initChatWithAdmin(profile._id)
        history.push("/student/dashboard");
      } else if (profile.role === "Admin" || profile.role === "Payment" || profile.role === "Tutor") {
        history.push("/admin/dashboard");
      }
    }

    window.setTimeout(() => {
      history.push("/auth/login");
    }, 5000);
  }, []);
  return (
    <main className={classes.verification_page}>
      <Navigation />
      <div className={classes.verification_section}>
        <img src={Blob2} alt="Blob" className={classes.up_blob} />
        <img src={Blob1} alt="Blob" className={classes.down_blob} />
        <div className={classes.left_section}>
          <h2>Your Account has been verified</h2>

          <h4>Redirecting you to login page....</h4>
        </div>
        <div className={classes.right_section}>
          <img src={Svg} alt="Svg" />
        </div>
      </div>
    </main>
  );
};

export default EmailVerified;
