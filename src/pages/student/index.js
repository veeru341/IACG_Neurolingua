import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import { studentSidebar } from "../../utils/constants";

import StudentDashboard from '../../components/templates/student/dashboard';
import StudentSessions from '../../components/templates/student/sessions/index';
import StudentTeachers from '../../components/templates/student/teachers/index';
import StudentHomework from '../../components/templates/student/homework';
import StudentWallet from '../../components/templates/student/wallet';
import StudentRefer from '../../components/templates/student/referFriend';
import StudentProgress from '../../components/templates/student/progress';
import StudentSettings from "../../components/templates/student/settings";
import StudentCertificates from '../../components/templates/student/certificates';
import Messages from "../../components/templates/common/messages"

import MyCalendar from '../../components/templates/student/Calendar/MyCalendar';

const Student = props => {
	return (
		<>
			{window.location.pathname === "/student/calendar" || window.location.pathname === "/student/verifyEmail" ?
				<></>
				:
				<LeftSideBar list={studentSidebar} student />
			}
			<Switch>
				<Route path="/student/dashboard" component={StudentDashboard} />
				<Route path="/student/sessions" component={StudentSessions} />
				<Route path="/student/teachers" component={StudentTeachers} />
				<Route path="/student/homework" component={StudentHomework} />
				<Route path="/student/wallet" component={StudentWallet} />
				<Route path="/student/refer" component={StudentRefer} />
				<Route path="/student/progress" component={StudentProgress} />
				<Route path="/student/certificates" component={StudentCertificates} />
				<Route path="/student/messages" component={Messages} />
				<Route path="/student/settings" component={StudentSettings} />
				<Route path="/student/calendar" component={MyCalendar} />

				<Redirect to="/student/dashboard" />
			</Switch>

		</>
	)
}

export default Student