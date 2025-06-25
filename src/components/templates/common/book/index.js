import React from "react";
import MyCalendar from "../../student/Calendar/MyCalendar";
import Navigation from "../../../../landing/components/Nav";
import { useHistory } from "react-router-dom";

function BookScreen(props) {
  const history = useHistory();
  const course = JSON.parse(localStorage.getItem("chosenCourse"));

  const coupon = history.location.state?.coupon;
  console.log("coupon", coupon);

  return (
    <div style={{ paddingTop: "100px" }}>
      <div>
        <Navigation />
      </div>
      <MyCalendar teacherData={course.userId.onType} coupon={coupon} />
    </div>
  );
}

export default BookScreen;
