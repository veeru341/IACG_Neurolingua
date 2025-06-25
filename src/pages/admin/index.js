import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { adminSidebar } from "../../utils/constants";

import AdminDashboard from '../../components/templates/admin/dashboard';
import AdminTeachers from '../../components/templates/admin/teachers'
import AdminCourses from '../../components/templates/admin/courses/index'
import AdminLanguages from "../../components/templates/admin/languages/language";
import AdminStudents from "../../components/templates/admin/students";
import AdminBookedCourses from "../../components/templates/admin/bookedCourses";
import AdminCancelledSessions from "../../components/templates/admin/cancelledSessions";
import AdminPayment from "../../components/templates/admin/payment";
import AdminBlog from "../../components/templates/admin/blog";
import AdminNotification from "../../components/templates/admin/notification";
import Messages from "../../components/templates/common/messages";

const Admin = (props) => {

  return (
    <>
      <LeftSideBar list={adminSidebar} />
      <Switch>
        <ProtectedRoute path="/admin/dashboard" authRole={["Admin", "Tutor", "Payment"]}>
          <AdminDashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/teachers" authRole={["Admin", "Tutor"]}>
          <AdminTeachers />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/courses" authRole={["Admin", "Tutor"]}>
          <AdminCourses />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/languages" authRole={["Admin", "Tutor"]}>
          <AdminLanguages />
        </ProtectedRoute>
        <Route path="/admin/students" component={AdminStudents} />
        <Route path="/admin/booked-courses" component={AdminBookedCourses} />
        <Route path="/admin/cancelledSessions" component={AdminCancelledSessions} />
        <Route path="/admin/payment" component={AdminPayment} />
        <Route path="/admin/blog" component={AdminBlog} />
        <Route path="/admin/messages" component={Messages} />
        <Route path="/admin/notification" component={AdminNotification} />

        <Redirect to="/admin/dashboard" />
      </Switch>
    </>
  );
};

export default Admin;
