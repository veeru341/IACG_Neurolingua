import React from "react";
import { Switch, Route} from "react-router-dom";

import Auth from "./auth";
import Blog from "./blogs";
import Faq from "./faq";
import Privacy from "./privacy";
import Teacher from "./teacher";
import Refund from "./refund";
import CookiePolicy from "./cookie";
import Landing from "./landing";
import ScrollToTop from "./scrollToTop";
import forgotPassword from "./forgotPassword";
import FindTeacher from "../../components/templates/common/findTeacher/FindTeacher";
import Payment from '../../components/templates/common/payment/Payment'
import TeacherProfile from '../../components/templates/common/teacherProfile/TeacherProfile';
import CalendarScreen from "../../components/templates/common/calendar";
import BookScreen from "../../components/templates/common/book";
import Contact from "./conact";
import LiveVidStream from '../../components/templates/common/liveStream/liveVidStream';

const Main = (props) => {
  return (
    <Switch>
      <ScrollToTop>
        <Route path="/auth/login" exact component={Auth} />
        <Route path="/auth/signup" exact component={Auth} />
        <Route path="/auth/forgot-password" exact component={forgotPassword} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/apply-teacher" exact component={Teacher} />
        <Route path="/privacy-policy" exact component={Privacy} />
        <Route path="/refund-policy" exact component={Refund} />
        <Route path="/cookie-policy" exact component={CookiePolicy} />
        <Route path="/find-teacher" exact component={FindTeacher} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/teacher-profile" exact component={TeacherProfile} />
        <Route path="/calendar" exact component={CalendarScreen} />
        <Route path="/bookCalendar" exact component={BookScreen} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/" exact component={Landing} />
        <Route path="/liveclass" exact component={LiveVidStream} />
        {/* <Redirect to="/" /> */}
      </ScrollToTop>
    </Switch>
  );
};

export default Main;
