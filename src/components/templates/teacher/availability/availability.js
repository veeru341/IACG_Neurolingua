import React from "react";
import MyCalendar from "../Calendar/MyCalendar";
import * as styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const Availability = () => {
  const history = useHistory();

  React.useEffect(() => {

    let userObj = JSON.parse(window.localStorage.getItem("profile"));

    if (!userObj.isOnBoarding) {
      toast.warn("Onboarding Pending");
      return history.push("/teacher/onboard");
    }


    let teacherData = JSON.parse(window.localStorage.getItem("teacherData"));
    if (teacherData.approvalStatus !== "verified"){
      toast.warn("Admin Verification Pending");
      return history.push("/teacher/dashboard");
    }
  }, []);

  return (
    <>
      <main className={styles.mainSection} style={{ display: 'flex', justifyContent: 'center'}}>
        <MyCalendar />
      </main>
    </>
  );
};

export default Availability;
