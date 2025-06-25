import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import { teacherSidebar } from "../../utils/constants";
// import ProtectedRoute from "../../utils/ProtectedRoute";

import TeacherDashboard from '../../components/templates/teacher/dashboard';
import TeacherCourses from "../../components/templates/teacher/courses/index";
import TeacherSessions from '../../components/templates/teacher/sessions/index';
import Availability from "../../components/templates/teacher/availability/availability";
import TeacherStudents from "../../components/templates/teacher/students/index";
import TeacherBlogs from "../../components/templates/teacher/blogs";
import TeacherCoupons from '../../components/templates/teacher/coupons/index';
import TeacherEarnings from "../../components/templates/teacher/earnings";
import TeacherSettings from "../../components/templates/teacher/settings/settings";
import TeacherOnBoard from '../../components/templates/teacher/onboard'
// import VerifyEmailConfirmation from "../common/verifyEmailConfirmation";
import {useLocation} from 'react-router-dom'
import Messages from "../../components/templates/common/messages";
// import LiveVidStream from '../../components/templates/common/liveStream/liveVidStream';
const Teacher = (props) => {
  const location = useLocation()
  
  return (
    <>
      {location.pathname === "/teacher/onboard" || location.pathname === "/teacher/verifyEmail" ?
        <></>
        :
        <LeftSideBar list={teacherSidebar} />
      }
      <Switch>
        <Route path="/teacher/dashboard" exact component={TeacherDashboard} />
        <Route path="/teacher/courses" component={TeacherCourses} />
        <Route path="/teacher/sessions" component={TeacherSessions} />
        <Route path="/teacher/availability" component={Availability} />
        <Route path="/teacher/students" component={TeacherStudents} />
        <Route path="/teacher/blogs" component={TeacherBlogs} />
        <Route path="/teacher/coupons" component={TeacherCoupons} />
        <Route path="/teacher/earnings" component={TeacherEarnings} />
        <Route path="/teacher/messages" component={Messages} />
        <Route path="/teacher/settings" component={TeacherSettings} />
        {/* <Route path="/teacher/liveclass" exact component={LiveVidStream} /> */}
        <Route path="/teacher/onboard" component={TeacherOnBoard} />
        {/* <Route path="/teacher/verifyEmail" component={VerifyEmailConfirmation} /> */}

        <Redirect to="/teacher/dashboard" />
      </Switch>
    </>
  );
};

export default Teacher;
