import React, { useState, useEffect } from "react";
import AuthComponent from "./../../components/templates/main/auth";
import RolePopup from "./../../components/organisms/rolePopup";
import { useHistory } from "react-router-dom";

const Authentication = (props) => {
  const history = useHistory();

  const path = props.match.path;

  const [type, setType] = useState(false);
  const [role, setRole] = useState(false);

  useEffect(() => {

    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      if (profile.role === "Teacher") {
        history.push("/teacher/dashboard");
      } else if (profile.role === "Student") {
        history.push("/student/dashboard");
      } else if (profile.role === "Admin" || profile.role === "Payment" || profile.role === "Tutor") {
        history.push("/admin/dashboard");
      }
    }

    if (path === "/auth/signup") {
      setType(true);
      setRole(true);
    } else {
      setRole(false);
      setType(false);
    }
  }, [path, history]);

  function roleModal(status) {
    setRole(status);
  }

  return (
    <>
      {history.location.state && history.location.state.role ==='Teacher' ?
        null :
        <RolePopup shownStatus={role} popupSetter={setRole} />
      } 
      <AuthComponent type={type} typeSetter={setType} roleModal={roleModal} />
    </>
  );
};

export default Authentication;
