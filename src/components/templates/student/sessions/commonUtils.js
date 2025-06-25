import React from 'react';
import * as styles from './styles.module.css';
import moment from "moment"
import { toast } from "react-toastify";
import english from '../../../../assets/flags/english.png';
import CancelModal from './modals/CancelModal';
import { useDispatch } from 'react-redux';
import { getCourseById } from "../../../../store/actions/course/index"
import { getAvailByAId, getAvailByTeacher } from "../../../../store/actions/availability/index"
import { getTeacherDetailByTId } from "../../../../store/actions/teacher/index"
import { useHistory } from 'react-router-dom';
import { cancelVideoSession } from "../../../../store/actions/student/index";
import { filterCourse } from '../../../../store/actions/student/index';
export const SubmitButton = ({ onClick }) => {
    return (
        <div onClick={onClick} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 20px', backgroundColor: '#5bd056', color: '#fffefe', borderRadius: '5px' }}>
                Submit
                <i class="fas fa-check-circle" style={{ fontWeight: 'bold', marginLeft: '10px', color: '#fffefe', }}></i>
            </div>
        </div>
    )
}

export const Card = (props) => {

    const { width, cardInfo, dropDown } = props;
    const dispatch = useDispatch()
    const [isOpen, setIsopen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState()
    const [availDetails, setAvailDetails] = React.useState()
    const [cancelModal, setCancelModal] = React.useState(false);
    const [teacherDetails, setTeacherDetails] = React.useState()
    const [showOtherOptions, setShowOtherOptions] = React.useState(false);
    const [disableBtn, setDisableBtn] = React.useState(false);
    const otherOptions = React.useRef();
    const [btnName, setBtnName] = React.useState("Join Class")
    const history = useHistory()

    React.useEffect(() => {

        if (cardInfo.status === "Need Scheduling") {
            setBtnName("Reschedule")
        }
        async function getCourseDetails(cid) {
            try {
                const res = await dispatch(getCourseById(cid))
                // console.log(res)
                setCourseDetails(res)
            } catch (error) {
                console.log(error)
            }
        }

        async function getTeacherName(tid) {
            try {
                const tname = await dispatch(getTeacherDetailByTId(tid))
                // console.log(tname)
                setTeacherDetails(tname)
            } catch (error) {
                console.log(error)
            }
        }

        async function getAvailTime(aid) {
            // console.log(tid)
            try {
                const availTime = await dispatch(getAvailByAId(aid))
                console.log(availTime);
                let classDate = moment(cardInfo?.to)
                let todayDate = moment(Date.now());
                if (Number(classDate) < Number(todayDate)) {
                    setDisableBtn(true)
                }
                setAvailDetails(availTime)
            } catch (error) {
                console.log(error)
            }
        }
        if (cardInfo?.availabilityIds?.length > 0) {
            getAvailTime(cardInfo.availabilityIds[0])
        }
        getTeacherName(cardInfo.teacherId)
        getCourseDetails(cardInfo.courseId)
    }, [cardInfo])

    React.useEffect(() => {
        console.log(availDetails)
        let classDate = moment(availDetails?.from)
        let todayDate = moment(Date.now())
        console.log(classDate, todayDate)
        console.log(moment.duration(classDate.diff(Date.now())).asHours());
    }, [])

    const openLiveClass = () => {
        history.push({
            pathname: "/liveclass",
            state: {
                role: "Student",
                teacherDetails,
                availDetails,
                courseDetails,
                sessionDetails: cardInfo,
            }
        })
    }

    const handleClick = e => {
        if (otherOptions.current && !otherOptions.current.contains(e.target)) {
            setShowOtherOptions(false);
        }
    };

    const handleBtnClick = async (bname) => {
        console.log(bname);
        if (disableBtn) {
            toast.error("This session time has elapsed.")
        } else {
            if (bname === "Join Class") {
                openLiveClass()
            } else {
                console.log("CourseDetails: ", courseDetails)
                console.log("availInfo: ", availDetails)
                console.log(cardInfo);
                let sessionObj = {};
                sessionObj.teacherId = cardInfo.teacherId;
                sessionObj.studentId = cardInfo.studentId;
                sessionObj.sessionId = cardInfo._id;
                if (availDetails) {
                    sessionObj.availId = availDetails.id;
                } else {
                    sessionObj.availId = '';
                }
                localStorage.setItem('rescheduleObj', JSON.stringify(sessionObj));
                const currFilters = {
                    language: "All",
                    courseT: "All",
                    startPrice: 0,
                    endPrice: 100,
                    country: "",
                    motherT: "",
                    page: 1,
                    limit: 100,
                };
                const apiStr = `?language=${currFilters.language
                    }&courseType=${currFilters.courseT.replace(" ", "%20")}&startPrice=${currFilters.startPrice
                    }&endPrice=${currFilters.endPrice}&motherTongue=${currFilters.motherT
                    }&country=${currFilters.country}&page=${currFilters.page}&limit=${currFilters.limit
                    }`;
                const result = await dispatch(filterCourse(apiStr));
                const list = result.data.courses;
                console.log(list);
                console.log(sessionObj);
                let data = { records: list }
                let ids = [cardInfo.courseId];
                let filteredArray = data.records.filter(function (itm) {
                    return ids.indexOf(itm._id) > -1;
                });
                if (filteredArray.length > 0) {
                    localStorage.setItem("chosenCourse", JSON.stringify(filteredArray[0]));
                    history.push("/bookCalendar");
                }
            }
        }

    }

    window.addEventListener('mousedown', handleClick, false);

    const cancelSession = async () => {
        console.log("cancelling session");
        console.log("CourseDetails: ", courseDetails)
        console.log("availInfo: ", availDetails)
        console.log(cardInfo);
        let sessionObj = {};
        sessionObj.teacherId = cardInfo.teacherId;
        sessionObj.studentId = cardInfo.studentId;
        sessionObj.sessionId = cardInfo._id;
        if (availDetails) {
            sessionObj.availId = availDetails.id;
        } else {
            sessionObj.availId = '';
        }
        console.log(sessionObj);
        const result = await dispatch(cancelVideoSession(sessionObj));
        if (result) {
            setCancelModal(false);
            alert("Session Cancelled Successfully.")
            window.location.reload();
        }
    }
    console.log(cardInfo);
    return (

        <>
            {/* Cancel Modal */}
            {cancelModal ?
                <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails} cardInfo={cardInfo}/>
                :
                <></>
            }

            <div className={styles.cardContainer}>
                <div className={styles.courseimg}>
                    <img src={courseDetails ? courseDetails?.courseImage?.data : english} alt="language_flag" className={styles.cardImg} />
                </div>
                {availDetails ?
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
                        <div style={{ fontSize: '20px', fontWeight: "bold" }}>{availDetails ? moment(availDetails.from).format("hh:mm a") : cardInfo.time}</div>
                        <div style={{ fontSize: '14px' }}>{availDetails ? moment(availDetails.from).format("dddd - MMMM DD, yyyy") : "Not Scheduled"}</div>
                    </div> :
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
                        <div style={{ marginTop: "1rem", fontSize: '14px' }}>Not Scheduled</div>
                    </div>}
                <div className={styles.div2}>
                    <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c" }}>{teacherDetails ? teacherDetails.firstName.data : "Details"}</div>
                    <div style={{ fontSize: '20px', fontWeight: "bold" }}>{courseDetails ? courseDetails.language.data : cardInfo.time}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
                        <i class="far fa-clock"></i>

                        <div>{cardInfo.isFree ? 30 : 60} minutes</div>
                    </div>
                </div>

                {/* {cardInfo.status === "Need Scheduling" ?
                    <div className={styles.btncontainer}>
                        <button className={styles.CancelBtn} onClick={() => {
                            alert("Cancel!");
                        }}
                            style={{
                                color: "#fffefe",
                                backgroundColor: "#f83030"
                            }}><span>Cancel</span> <i class='fas fa-trash'></i></button>
                    </div>
                    :  */}
                {cardInfo && cardInfo.status === 'Cancelled' ?
                    <div className={styles.btncontainer}>
                        <button className={styles.btn1} >Cancelled</button>
                    </div>
                    :
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} onClick={() => handleBtnClick(btnName)}>{btnName}</button>
                        <div className={styles.moreOptions} ref={otherOptions}>
                            <i
                                className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'}
                                onClick={() => {
                                    setShowOtherOptions(true);
                                }}
                            ></i>
                            <ul
                                className={
                                    styles.otherOptions +
                                    ' ' +
                                    (showOtherOptions ? styles.showOptions : '')
                                }
                            >{
                                    dropDown && dropDown.map((item, index) => {
                                        return (<li
                                            onClick={() => {
                                                handleBtnClick('Reschedule')
                                            }}
                                        >
                                            <span>{item.text}</span>
                                        </li>)
                                    })
                                }
                                <li
                                    onClick={() => {
                                        setCancelModal(true)
                                    }}
                                    style={{
                                        color: "#fffefe",
                                        backgroundColor: "#f83030"
                                    }}
                                >
                                    <span>Cancel</span> <i class='fas fa-trash'></i>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export const CardMobile = (props) => {

    const { width, cardInfo, dropDown } = props;
    const [courseDetails, setCourseDetails] = React.useState()
    const [availDetails, setAvailDetails] = React.useState()
    const [isOpen, setIsopen] = React.useState(false);
    const [teacherDetails, setTeacherDetails] = React.useState()
    const history = useHistory()
    const dispatch = useDispatch()
    const [cancelModal, setCancelModal] = React.useState(false);
    const [showOtherOptions, setShowOtherOptions] = React.useState(false);
    const otherOptions = React.useRef();
    const [btnName, setBtnName] = React.useState("Join Class")
    const [disableBtn, setDisableBtn] = React.useState(false);
    React.useEffect(() => {
        // console.log(cardInfo)
        if (cardInfo.status === "Need Scheduling") setBtnName("Reschedule")
        async function getCourseDetails(cid) {
            try {
                const res = await dispatch(getCourseById(cid))
                // console.log(res)
                setCourseDetails(res)
            } catch (error) {
                console.log(error)
            }
        }

        async function getTeacherName(tid) {
            try {
                const tname = await dispatch(getTeacherDetailByTId(tid))
                // console.log(tname)
                setTeacherDetails(tname)
            } catch (error) {
                console.log(error)
            }
        }

        async function getAvailTime(aid) {
            // console.log(tid)
            try {
                const availTime = await dispatch(getAvailByAId(aid))
                // console.log(availTime?.from)
                let classDate = moment(cardInfo?.to)
                let todayDate = moment(Date.now())
                // console.log(classDate, todayDate)
                // console.log(moment.duration(classDate.diff(Date.now())).asHours());
                // if(Number(classDate) < Number(todayDate)){
                //     console.log(Number(classDate));
                //     console.log(Number(todayDate));
                if (Number(classDate) < Number(todayDate)) {
                    setDisableBtn(true)
                }
                setAvailDetails(availTime)
            } catch (error) {
                console.log(error)
            }
        }
        if (cardInfo?.availabilityIds?.length > 0) {
            getAvailTime(cardInfo.availabilityIds[0])
        }
        getTeacherName(cardInfo.teacherId)
        getCourseDetails(cardInfo.courseId)
    }, [cardInfo])

    const openLiveClass = () => {
        history.push({
            pathname: "/liveclass",
            state: {
                role: "Student",
                teacherDetails,
                availDetails,
                courseDetails,
                sessionDetails: cardInfo,
            }
        })
    }

    const handleClick = e => {
        if (otherOptions.current && !otherOptions.current.contains(e.target)) {
            setShowOtherOptions(false);
        }
    };

    const handleBtnClick = async (bname) => {
        console.log(bname);
        if (disableBtn) {
            toast.error("This session time has elapsed.")
        } else {
            if (bname === "Join Class") {
                openLiveClass()
            } else {
                console.log("CourseDetails: ", courseDetails)
                console.log("availInfo: ", availDetails)
                console.log(cardInfo);
                let sessionObj = {};
                sessionObj.teacherId = cardInfo.teacherId;
                sessionObj.studentId = cardInfo.studentId;
                sessionObj.sessionId = cardInfo._id;
                if (availDetails) {
                    sessionObj.availId = availDetails.id;
                } else {
                    sessionObj.availId = '';
                }
                localStorage.setItem('rescheduleObj', JSON.stringify(sessionObj));
                const currFilters = {
                    language: "All",
                    courseT: "All",
                    startPrice: 0,
                    endPrice: 100,
                    country: "",
                    motherT: "",
                    page: 1,
                    limit: 100,
                };
                const apiStr = `?language=${currFilters.language
                    }&courseType=${currFilters.courseT.replace(" ", "%20")}&startPrice=${currFilters.startPrice
                    }&endPrice=${currFilters.endPrice}&motherTongue=${currFilters.motherT
                    }&country=${currFilters.country}&page=${currFilters.page}&limit=${currFilters.limit
                    }`;
                const result = await dispatch(filterCourse(apiStr));
                const list = result.data.courses;
                console.log(list);
                console.log(sessionObj);
                let data = { records: list }
                let ids = [cardInfo.courseId];
                let filteredArray = data.records.filter(function (itm) {
                    return ids.indexOf(itm._id) > -1;
                });
                if (filteredArray.length > 0) {
                    localStorage.setItem("chosenCourse", JSON.stringify(filteredArray[0]));
                    history.push("/bookCalendar");
                }
            }
        }

    }
    window.addEventListener('mousedown', handleClick, false);

    console.log(cardInfo)
    const cancelSession = async () => {
        console.log("cancelling session");
        console.log("CourseDetails: ", courseDetails)
        console.log("availInfo: ", availDetails)
        console.log(cardInfo);
        let sessionObj = {};
        sessionObj.teacherId = cardInfo.teacherId;
        sessionObj.studentId = cardInfo.studentId;
        sessionObj.sessionId = cardInfo._id;
        if (availDetails) {
            sessionObj.availId = availDetails.id;
        } else {
            sessionObj.availId = '';
        }
        console.log(sessionObj);
        const result = await dispatch(cancelVideoSession(sessionObj));
        if (result) {
            setCancelModal(false);
            alert("Session Cancelled Successfully.")
            window.location.reload();
        }
    }
console.log(availDetails);
    return (
        <>
            {/* Cancel Modal */}
            {cancelModal ?
                <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails}/>
                :
                <></>
            }

            <div className={styles.cardMobileContainer} style={{ marginBottom: dropDown ? '' : '20px' }}>
                {availDetails ?
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
                        <div style={{ fontSize: '20px', fontWeight: "bold" }}>{availDetails ? moment(availDetails.from).format("HH:mm a") : cardInfo.time}</div>
                        <div style={{ fontSize: '14px' }}>{availDetails ? moment(availDetails.from).format("dddd - MMMM DD, yyyy") : "Not Scheduled"}</div>
                    </div> :
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
                        <div style={{ marginTop: width >= 992 ? "1rem" : "", fontSize: '14px' }}>Not Scheduled</div>
                    </div>
                }
                <div style={{ fontSize: '16px', fontWeight: "bold", color: "#ed224c", marginTop: width >= 992 ? "" : "1rem" }}>{teacherDetails ? teacherDetails.firstName.data : "Details"}</div>
                <div style={{ fontSize: '20px', fontWeight: "bold" }}>{courseDetails ? courseDetails.language.data : cardInfo.time}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
                    <i class="far fa-clock"></i>

                    <div>{cardInfo.isFree ? 30 : 60} minutes</div>
                </div>

                {/* {cardInfo.status === "Need Scheduling" ?
                    <div className={styles.btncontainer}>
                        <button className={styles.CancelBtn} onClick={() => {
                            alert("Cancel!");
                        }}
                            style={{
                                color: "#fffefe",
                                backgroundColor: "#f83030"
                            }}><span>Cancel</span> <i class='fas fa-trash'></i></button>
                    </div>
                    :  */}
                {cardInfo && cardInfo.status === 'Cancelled' ?
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} >Cancelled</button>
                    </div>
                    :
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} onClick={() => handleBtnClick(btnName)}>{btnName}</button>
                        <div className={styles.moreOptions} ref={otherOptions}>
                            <i
                                className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'}
                                onClick={() => {
                                    setShowOtherOptions(true);
                                }}
                            ></i>
                            <ul
                                className={
                                    styles.otherOptions +
                                    ' ' +
                                    (showOtherOptions ? styles.showOptions : '')
                                }
                            >{
                                    dropDown && dropDown.map((item, index) => {
                                        return (<li
                                            onClick={() => {
                                                handleBtnClick('Reschedule')
                                            }}
                                        >
                                            <span>{item.text}</span>
                                        </li>)
                                    })
                                }
                                <li
                                    onClick={() => {
                                        setCancelModal(true)
                                    }}
                                    style={{
                                        color: "#fffefe",
                                        backgroundColor: "#f83030"
                                    }}
                                >
                                    <span>Cancel</span> <i class='fas fa-trash'></i>
                                </li>

                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}