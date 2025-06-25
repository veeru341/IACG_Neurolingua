import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import PropTypes from "prop-types";
import * as React from "react";
import { Fragment, useMemo } from "react";
import * as dates from "date-arithmetic";
import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
  Views,
} from "react-big-calendar";
import { Navigate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useDispatch } from "react-redux";
// import PopupModal from "./popupModal/popupModal";
import * as modalStyles from "./popupModal/styles.module.css";
import { reSchedule } from "../../../../store/actions/student";
// import AddEventModal from "./AddEventModal";

import { useWindowDimensions } from "../../../../utils/util";

// import { getTeacherData } from "../../../../store/actions/teacher";

// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import EditEventModal from "./EditEventModal";

import "./calendar.css";
import { useHistory } from "react-router-dom";
import { getAvailByTeacher } from "../../../../store/actions/availability";
const DragAndDropCalendar = withDragAndDrop(Calendar);
const eventsList = [
  {
    id: 0,
    title: "Meeting",
    start: new Date(2022, 7, 1, 5, 0, 0, 0),
    end: new Date(2022, 7, 1, 6, 0, 0, 0),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2022, 7, 1, 20, 0, 0, 0),
    end: new Date(2022, 7, 1, 22, 0, 0, 0),
  },
];
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
function MyCalendar(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const rescheduleObj = localStorage.getItem("rescheduleObj") &&
    JSON.parse(localStorage.getItem("rescheduleObj"));
  console.log("props", props);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen((previousOpen) => !previousOpen);
  // };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  // const [arrowRef, setArrowRef] = React.useState(null);
  const history = useHistory();
  console.log("new", history.location.pathname);

  const { width } = useWindowDimensions();

  // console.log(props.teacherData);
  // const dispatch = useDispatch();

  // const [selectedDate, setSelectedDate] = React.useState();

  // // Modals
  // const [addEventModal, setAddEventModal] = useState(false);
  // const [editEventModal, setEditEventModal] = useState(false);

  // // For Drag select
  // const [selectedTimeSlots, setSelectedTimeSlots] = React.useState([]);
  // const [selectedDateSlots, setSelectedDateSlots] = React.useState([]);

  // All Slots for calendar
  const [availability, setAvailability] = React.useState([]);

  // const [selectedSlot, setSelectedSlot] = useState();
  // const [selectionType, setSelectionType] = React.useState("click");
  const [teacherData, setTeacherData] = React.useState();
  const [popupModal, setPopupModal] = React.useState("");
  const [eventPopup, setEventPopup] = React.useState();

  // const convertTime12to24 = (time12h) => {
  //   const [time, modifier] = time12h.split(" ");

  //   let [hours, minutes] = time.split(":");

  //   if (hours === "12") {
  //     hours = "00";
  //   }

  //   if (modifier === "pm") {
  //     hours = parseInt(hours, 10) + 12;
  //   }

  //   return `${hours}:${minutes}`;
  // };
  const closePopup = () => {
    if (popupModal !== "") {
      setPopupModal("");
    }
  };
  // React.useEffect(() => {
  //   async function getCourse() {
  //     // return new Promise(async (resolve, reject) => {
  //     try {
  //       setTeacherData(props.teacherData);

  //       // const result = await dispatch(getTeacherData());
  //       // console.log(props.teacherData);
  //       let slots = [];
  //       props.teacherData.availability.map((item) => {
  //         let tempDate = new Date(item.date);
  //         item.slots.map((slotItem) => {
  //           console.log(slotItem.booked, "Sl");
  //           console.log(slotItem, "item");
  //           if (slotItem.booked) {
  //             return;
  //           }
  //           // let startTimeTitle = slotItem.from.split(":")[0] + ":" + slotItem.from.split(":")[1];
  //           // let endimeTitle = slotItem.to.split(":")[0] + ":" + slotItem.to.split(":")[1];

  //           // slotItem.from = convertTime12to24(slotItem.from);
  //           // slotItem.to = convertTime12to24(slotItem.to);
  //           // let d1 = new Date(
  //           //   tempDate.getFullYear(),
  //           //   tempDate.getMonth(),
  //           //   tempDate.getDate(),
  //           //   parseInt(slotItem.from.split(":")[0]),
  //           //   parseInt(slotItem.from.split(":")[1])
  //           // );
  //           // let d2 = new Date(
  //           //   tempDate.getFullYear(),
  //           //   tempDate.getMonth(),
  //           //   tempDate.getDate(),
  //           //   parseInt(slotItem.to.split(":")[0]),
  //           //   parseInt(slotItem.to.split(":")[1])
  //           // );
  //           let d1 = new Date(slotItem.from);

  //           let d2 = new Date(slotItem.to);

  //           // let startTimeTitle = d1.getHours() + ":" + d1.getMinutes();
  //           // let endTimeTitle = d2.getHours() + ":" + d2.getMinutes();

  //           // var final_d1 = new Date(d1.getTime() + d1.getTimezoneOffset() * 60000);
  //           // var final_d2 = new Date(d2.getTime() + d2.getTimezoneOffset() * 60000);

  //           // console.log(d1,d2);

  //           slots.push({
  //             id: slotItem._id,
  //             start: d1,
  //             end: d2,
  //             title:
  //               convertFrom24To12Format(String(d1).slice(16, 21)) +
  //               "-" +
  //               convertFrom24To12Format(String(d2).slice(16, 21)),
  //           });

  //           // slots.push({
  //           //   id: slotItem._id,
  //           //   start: d1,
  //           //   end: d2,
  //           //   title: convertFrom24To12Format(String(d1).slice(16, 21)) + "-" + convertFrom24To12Format(String(d2).slice(16, 21)),
  //           // });
  //         });
  //       });

  //       setAvailability([...slots]);
  //       console.log(slots);
  //       // resolve(props.teacherData);
  //     } catch (e) {
  //       // reject(e);
  //       console.log(e);
  //     }
  //     // });
  //   }
  //   getCourse();
  // }, []);

  const getTeacherAvail = async () => {
    const result = await getAvailByTeacher(props.teacherData._id);
    // console.log(result?.data)
    if (result.success) {
      const data = result.data.sort((a, b) => moment(a.from).valueOf() - moment(b.from).valueOf());
      console.log(data)
      const slots = []
      for (var index = 0; index < data.length; index++) {
        if (index !== (data.length - 1)) {
          if (data[index].to === data[index + 1].from) {
            slots.push({
              title: "My Availability",
              id: data[index].id,
              start: new Date(data[index].from),
              end: new Date(data[index].to),
            })
            // index += 1
          }
        }
      }
      console.log(slots)
      setAvailability(slots);
    }
  };

  React.useEffect(() => {
    getTeacherAvail();
  }, []);

  const dropEvent = (data) => {
    setAvailability(
      availability.map((e) => {
        if (e.id == data.slot.id) {
          // if (data.slot.end.getDate() - 1 === data.slot.start.getDate()) {
          //     return { ...e, start: data.start, end: data.end }
          // }
          // else {
          //     var endDate = new Date(data.end);
          //     endDate.setDate(data.end.getDate() - 1);
          //     return { ...e, start: data.start, end: endDate }
          // }
          if (data.slot.end.getDate() - 1 === data.slot.start.getDate()) {
            var endDate = new Date(data.end);
            endDate.setDate(data.end.getDate() - 1);
            return { ...e, start: data.start, end: endDate };
          } else {
            return { ...e, start: data.start, end: data.end };
          }
        } else {
          return e;
        }
      })
    );
  };

  const resizeEvent = (data) => {
    setAvailability(
      availability.map((e) => {
        if (e.id == data.slot.id) {
          // if (data.slot.end.getDate() - 1 < data.slot.start.getDate()) {
          //     return { ...e, start: data.start, end: data.end }
          // }
          // else {
          //     var endDate = new Date(data.end);
          //     endDate.setDate(data.end.getDate() - 1);
          //     return { ...e, start: data.start, end: endDate }
          // }
          if (data.slot.end.getDate() - 1 === data.slot.start.getDate()) {
            var endDate = new Date(data.end);
            endDate.setDate(data.end.getDate() - 1);
            return { ...e, start: data.start, end: endDate };
          } else {
            return { ...e, start: data.start, end: data.end };
          }
        } else {
          return e;
        }
      })
    );
  };

  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "am" : "pm";
    let hours = +sHours % 12 || 12;
    if (hours < 10) {
      hours = hours;
    }

    return `${hours}:${minutes} ${period}`;
  };

  console.log("availability", availability);
  const bookSlot = (event) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    console.log(token);
    if (!token) {
      return toast.warn("Please Login to continue");
    }

    let couponDetails;
    if (props?.coupon) {
      couponDetails = props.coupon;
    }

    // return;
    setPopupModal(false);
    localStorage.setItem("chosenEvent", JSON.stringify(event));
    console.log(event);
    if (rescheduleObj) {
      handleCheckout(event, couponDetails);
    } else {
      history.push("/payment", {
        course: props.course,
        teacherData: props.teacherData,
        event,
        trail: false,
        couponDetails,
        availability,
      });
    }

  };
  const handleCheckout = async (eventData, couponDetails) => {
    var currSlot = {
      title: eventData.title,
      id: eventData.id,
      start: eventData.start,
      end: eventData.end,
    };

    const studentData =
      localStorage.getItem("studentData") &&
      JSON.parse(localStorage.getItem("studentData"));
    const course =
      localStorage.getItem("chosenCourse") &&
      JSON.parse(localStorage.getItem("chosenCourse"));

    let body = {
      courseId: course._id,
      studentId: studentData?.data?.userId,
      teacherId: course.userId.onType._id,
      type: "1",
      from: eventData.start,
      to: eventData.end
    };

    console.log(availability);
    if (rescheduleObj) {
      console.log(12345);
      let arr = [];
      arr.push(eventData.id);
      let index = availability.findIndex((el) => el.id === eventData.id);
      if (index !== -1) {
        if (availability[index + 1]) {
          arr.push(availability[index + 1].id);
        }
      }
      body.availabilityIds = arr;
      body.session = rescheduleObj;
      console.log(body);
      try {
        const result = await dispatch(reSchedule(body));
        console.log("result", result);
        if (result.success) {
          toast.success("Session Booked successfully");
          localStorage.removeItem('rescheduleObj');
          localStorage.removeItem('chosenCourse');
          // displayRazorpay();
          history.push("/student/dashboard");
        } else {
          return toast.error(result.message);
        }
      } catch (e) {
        console.log(e);
        toast.error("Failed to Book Slot");
      }
    }
  };
  function PopupModal() {
    return (
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => {
              setPopupModal(false);
            }}></i>
          <h3 className={modalStyles.modalHeading}>Book This Slot</h3>

          <div
            className='popup'
            style={{ textAlign: "center", marginTop: "20px" }}>
            <div className='header'>
              <img
                src={props.teacherData.teacherProfilePic.data}
                alt=''
                style={{ width: "100px" }}
              />
              <h5>
                {props.teacherData.firstName.data +
                  " " +
                  props.teacherData.lastName.data}
              </h5>
            </div>
            <div className='popup-body'>
              <h5>
                Date: <span>{eventPopup.start.toDateString()}</span>{" "}
              </h5>
              <h5>
                Time:{" "}
                <span>
                  {convertFrom24To12Format(
                    String(eventPopup.start).slice(16, 21)
                  ) +
                    "-" +
                    convertFrom24To12Format(
                      String(moment(eventPopup.end).add(30, 'm').toDate()).slice(16, 21)
                    )}
                </span>
              </h5>
            </div>
            {history.location.pathname === "/calendar" ? (
              <div className='slotBtn' style={{ marginTop: "20px" }}>
                <button
                  onClick={() => {
                    bookSlot(eventPopup);
                  }}>
                  Book Now
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }

  function Event({ event }) {
    // console.log(props.teacherData, "T");
    console.log(event);
    const rescheduleObj = localStorage.getItem("rescheduleObj") &&
      JSON.parse(localStorage.getItem("rescheduleObj"));
    return (
      // <div className="event" onClick={() => {
      //   if (history.location.pathname === '/calendar') {
      //     bookSlot(event);
      //   }
      // }}>

      <div className='event'>
        <p>{event.title}</p>
        <div
          id='book-lesson'
          className={`BookLessonHoverCard popover top model-${popupModal === Math.round(event.start.getTime() / 1000)
            ? "show"
            : "hide"
            }`}>
          <div className='arrow' style={{ left: "50%" }}></div>
          <div className='popover-content'>
            <header class='flex flex-direction-row flex-align-center'>
              <img
                src={props.teacherData.teacherProfilePic.data}
                className='ProfilePic verb-profile-pic img-responsive round small'
                alt='Profile Picture'
                style={{ marginRight: "5px" }}
              />
              <div>
                <strong>
                  <font>
                    <font>
                      {props.teacherData.firstName.data +
                        " " +
                        props.teacherData.lastName.data}
                    </font>
                  </font>
                </strong>
              </div>
            </header>
            <div className='BookLessonHoverCard--body flex flex-direction-column flex-align-center'>
              <div className='flex flex-direction-column'>
                <div className='flex flex-direction-row'>
                  <strong>Date:</strong>
                  <div>{event.start.toDateString()}</div>
                </div>
                <div className='flex flex-direction-row'>
                  <strong>Time:</strong>
                  <div>
                    {convertFrom24To12Format(
                      String(event.start).slice(16, 21)
                    ) +
                      "-" +
                      convertFrom24To12Format(String(moment(event.end).add(30, 'm').toDate()).slice(16, 21))}
                  </div>
                </div>
              </div>
              <button
                type='button'
                class='btn btn-default btn-block'
                onClick={() => {
                  bookSlot(event);
                }}>
                {history.location.pathname === "/bookCalendar" && rescheduleObj ? 'Reschedule' : 'Book  Now'}
              </button>
            </div>
            <div style={{ marginBottom: "-12px" }}></div>
          </div>
        </div>
        {/* <div className={`popup model-${popupModal === Math.round(event.start.getTime() / 1000) ? 'show' : 'hide'}`}>
          <div className="header">
            <img src={props.teacherData.teacherProfilePic.data} alt="" />
            <h5>{props.teacherData.firstName.data + " " + props.teacherData.lastName.data}</h5>
          </div>
          <div className="popup-body">
            <h5>
              Date: <span>{event.start.toDateString()}</span>{" "}
            </h5>
            <h5>
              Time:{" "}
              <span>
                {convertFrom24To12Format(String(event.start).slice(16, 21)) + "-" + convertFrom24To12Format(String(event.end).slice(16, 21))}
              </span>
            </h5>
          </div>
          <div className="slotBtn">
            <button
              onClick={() => {
                bookSlot(event);
              }}
            >
              Book now
            </button>
          </div>
        </div> */}
        {/* {event.start && ":  " + event.end} */}
      </div>
      // </div>
    );
  }
  {
    /* function Event({event}) {
    return (
      <div className="event" onMouseOver={(e) => { handleSelect(e) }}>
        <p> event</p>
      </div>
    );
  } */
  }
  const navigate1 = {
    PREVIOUS: "PREV",
    NEXT: "NEXT",
    TODAY: "TODAY",
    DATE: "DATE",
  };
  const handleSelect = (e) => {
    console.log(e);
    const converted = Math.round(e.start.getTime() / 1000);
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (popupModal !== converted) {
      setPopupModal(converted);
    } else {
      setPopupModal("");
    }
    console.log(profile);
  };
  const CustomToolbar = (toolbar) => {
    console.log(toolbar);
    const goToBack = () => {
      toolbar.date.setDate(toolbar.date.getDate() - 7);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setDate(toolbar.date.getDate() + 7);
      toolbar.onNavigate("next");
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate("current");
    };

    const label = () => {
      const date = new Date(toolbar.date);
      console.log(date);
      return (
        <span>
          <b>{date.format("MMMM")}</b>
          <span> {date.format("YYYY")}</span>
        </span>
      );
    };
    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button type='button' class='prev' onClick={goToBack}>
            Prev
          </button>
        </span>
        <span className='rbc-toolbar-label'>{toolbar.label}</span>
        <span className='rbc-btn-group'>
          <button type='button' class='next' onClick={goToNext}>
            Next
          </button>
        </span>
      </div>
    );
  };
  const CustomMobileToolbar = (toolbar) => {
    console.log(toolbar);
    const goToBack = () => {
      toolbar.date.setDate(toolbar.date.getDate() - 3);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setDate(toolbar.date.getDate() + 3);
      toolbar.onNavigate("next");
    };
    const label = () => {
      const date = new Date(toolbar.date);
      console.log(date);
      return (
        <span>
          <b>{date.format("MMMM")}</b>
          <span> {date.format("YYYY")}</span>
        </span>
      );
    };
    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button type='button' class='prev' onClick={goToBack}>
            Prev
          </button>
        </span>
        <span className='rbc-toolbar-label'>{toolbar.label}</span>
        <span className='rbc-btn-group'>
          <button type='button' class='next' onClick={goToNext}>
            Next
          </button>
        </span>
      </div>
    );
  };
  function MyWeek({
    date,
    localizer,
    max = localizer.endOf(new Date(), "day"),
    min = localizer.startOf(new Date(), "day"),
    scrollToTime = localizer.startOf(new Date(), "day"),
    ...props
  }) {
    const currRange = useMemo(
      () => MyWeek.range(date, { localizer }),
      [date, localizer]
    );

    return (
      <TimeGrid
        date={date}
        localizer={localizer}
        max={max}
        min={min}
        range={currRange}
        scrollToTime={scrollToTime}
        {...props}
      />
    );
  }
  MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
  };

  MyWeek.range = (date, { localizer }) => {
    const start = date;
    const endstart = date;
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    const end = dates.add(start, 2, "day");
    let current = start;
    const range = [];
    while (localizer.lte(current, end, "day")) {
      range.push(current);
      current = localizer.add(current, 1, "day");
    }
    console.log(range);
    range[1].setHours(23);
    range[1].setMinutes(59);
    range[1].setSeconds(59);
    range[2].setHours(23);
    range[2].setMinutes(59);
    range[2].setSeconds(59);
    console.log(range);
    return range;
  };

  MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
      case Navigate.PREVIOUS:
        return localizer.add(date, -3, "day");

      case Navigate.NEXT:
        return localizer.add(date, 3, "day");

      default:
        return date;
    }
  };

  MyWeek.title = (date, { localizer }) => {
    // range.push(date)
    const start = date;
    const end = dates.add(start, 2, "day");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[date.getMonth()]} ${date.getDate()} - ${monthNames[end.getMonth()]
      } ${end.getDate()}`;
  };
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        week: MyWeek,
      },
    }),
    []
  );
  return (
    <>
      <div
        style={{
          marginTop: "10px",
          borderRadius: "10px",
          width: width >= 992 ? "100%" : "90%",
          backgroundColor: "#fefeff",
          padding: "20px",
        }}
        className='studentCalendar'>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Calendar</div>
        {width >= 992 ? (
          <Calendar
            localizer={localizer}
            dayLayoutAlgorithm="no-overlap"
            events={availability}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            onSelectSlot={(slotInfo) => {
              console.log(slotInfo);
              closePopup();
            }}
            onSelectEvent={(e) => {
              handleSelect(e);
            }}
            selectable
            defaultDate={new Date()}
            defaultView='week'
            popup={true}
            components={{
              event: Event,
              week: { toolbar: CustomToolbar },
            }}
          />
        ) : (
          <Calendar
            defaultDate={new Date()}
            defaultView='week'
            events={availability}
            localizer={localizer}
            dayLayoutAlgorithm="no-overlap"
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            onSelectSlot={(slotInfo) => {
              console.log(slotInfo);
              closePopup();
            }}
            views={views}
            onSelectEvent={(e) => {
              handleSelect(e);
            }}
            selectable
            components={{
              event: Event,
              week: { toolbar: CustomMobileToolbar },
            }}
          />
        )}

        {/* <Calendar
          localizer={localizer}
          events={availability}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          onSelectSlot={(slotInfo) => {
            console.log(slotInfo);
            closePopup();
          }}
          onSelectEvent={(e) => { handleSelect(e) }}
          selectable
          defaultDate={new Date()}
          defaultView="week"
          popup={true}
          components={{
            event: Event,
            week: { toolbar: CustomToolbar },
          }}
        /> */}
        {/* <DragAndDropCalendar
          // step={15}
          localizer={localizer}
          events={availability}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          selectable
          // onSelectEvent={(e) => handleEditEvent(e)}
          // onSelectSlot={(e) => handleAddEvent(e)}
          // onEventDrop={dropEvent}
          // resizable
          // onEventResize={resizeEvent}
           defaultView="week"
           defaultDate={new Date()}
          components={{
            event: Event,
          }}
        /> */}
      </div>
    </>
  );
}

export default MyCalendar;
