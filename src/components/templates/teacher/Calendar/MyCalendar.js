import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Fragment, useMemo } from "react";
import * as dates from "date-arithmetic";
import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment"
import AddEventModal from "./AddEventModal";

import { useWindowDimensions } from "../../../../utils/util";

import {
  addAvailability,
  getTeacherData,
} from "../../../../store/actions/teacher";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditEventModal from "./EditEventModal";

import "./calendar.css";
import {
  addTeacherAvailability,
  getTeacherAvailability,
} from "../../../../store/actions/availability";


const DragAndDropCalendar = withDragAndDrop(Calendar);

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
  const [apiCalled, setApiCalled] = React.useState(false);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  // Modals
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);

  // For Drag select
  const [selectedTimeSlots, setSelectedTimeSlots] = React.useState([]);

  // All Slots for calendar
  const [availability, setAvailability] = React.useState([]);
  const [teacherData, setTeacherData] = React.useState({});

  const [selectedSlot, setSelectedSlot] = React.useState({});

  console.log("teacherData", teacherData);

  const getTeacherLoggedData = async () => {
    const result = await dispatch(getTeacherData());
    if (result) setTeacherData(result);
  };

  const getTeacherAvail = async () => {
    const result = await dispatch(getTeacherAvailability());
    console.log(result)
    if (result?.success) {
      const data = result.data;
      const slots = data.map((el) => {

        return {
          title: "My Availability",
          id: el.id,
          start: new Date(el.from),
          end: new Date(el.to),
          isBooked: el.isBooked,
        };
      });

      setAvailability(slots);
    }
  };
  console.log(availability)

  const addTeacherAvail = async (data) => {
    let result = await dispatch(addTeacherAvailability(data));
    if (result?.success) {
      toast.success("Slot added successfully");
      setAddEventModal(false);
    } else {
      console.log(result);
      toast.error("Something went wrong");
      setAddEventModal(false);
    }
  };

  React.useEffect(() => {
    getTeacherLoggedData();
    getTeacherAvail();
  }, []);

  // React.useEffect(() => {
  //   setApiCalled(true);
  //   async function getCourse() {
  //     return new Promise(async (resolve, reject) => {
  //       try {
  //         const result = await dispatch(getTeacherData());
  //         console.log("result", result);
  //         let slots = [];
  //         result.availability.map((item) => {
  //           let tempDate = new Date(item.date);
  //           item.slots.map((slotItem) => {
  //             // let startTimeTitle = slotItem.from.split(":")[0] + ":" + slotItem.from.split(":")[1];
  //             // let endimeTitle = slotItem.to.split(":")[0] + ":" + slotItem.to.split(":")[1];

  //             // slotItem.from = convertTime12to24(slotItem.from)
  //             // slotItem.to = convertTime12to24(slotItem.to)
  //             // let d1 = new Date(
  //             //   tempDate.getFullYear(),
  //             //   tempDate.getMonth(),
  //             //   tempDate.getDate(),
  //             //   parseInt(slotItem.from.split(":")[0]),
  //             //   parseInt(slotItem.from.split(":")[1])
  //             // );

  //             // let d2 = new Date(
  //             //   tempDate.getFullYear(),
  //             //   tempDate.getMonth(),
  //             //   tempDate.getDate(),
  //             //   parseInt(slotItem.to.split(":")[0]),
  //             //   parseInt(slotItem.to.split(":")[1])
  //             // );

  //             // console.log("ppp", slotItem.from);

  //             let d1 = new Date(slotItem.from);
  //             let d2 = new Date(slotItem.to);

  //             // console.log("aaa", d1)

  //             // var final_d1 = new Date(d1.getTime() + d1.getTimezoneOffset() * 60000);
  //             // var final_d2 = new Date(d2.getTime() + d2.getTimezoneOffset() * 60000);

  //             // console.log("qqq", final_d1);

  //             // console.log("llkl", d1, startTimeTitle);
  //             // console.log("ajkfd", d1.getTimezoneOffset());
  //             // var d1_timezone_T = d1.getTimezoneOffset();
  //             // var d1_timezone_M = d1_timezone_T % 60;
  //             // var d1_timezone_H = d1.getMinutes() > 0 ? Math.floor(d1_timezone_T / 60) : Math.floor(d1_timezone_T / 60)+1;

  //             // var d2_timezone_T = d2.getTimezoneOffset();
  //             // var d2_timezone_M = d2_timezone_T % 60;
  //             // var d2_timezone_H = d2.getMinutes() > 0 ? Math.floor(d2_timezone_T / 60) : Math.floor(d2_timezone_T / 60)+1;

  //             // let startTimeTitle = (d1.getHours()+d1_timezone_H+24)%24 + ":" + (d1.getMinutes()+d1_timezone_M+60)%60;
  //             // let endTimeTitle = (d2.getHours()+d2_timezone_H+24)%24 + ":" + (d2.getMinutes()+d2_timezone_M+60)%60;
  //             // console.log(d1,d2);

  //             // console.log("timezone time", timezone_T, timezone_H, timezone_M);
  //             // console.log("actual", slotItem.to);
  //             // console.log("d1: bofore", d2);
  //             // console.log("er", d2);

  //             // d1.setHours((d1.getHours()+d1_timezone_H+24)%24);
  //             // d1.setMinutes((d1.getMinutes()+d1_timezone_M+60)%60);
  //             // d2.setHours((d2.getHours()+d2_timezone_H+24)%24);
  //             // d2.setMinutes((d2.getMinutes()+d2_timezone_M+60)%60);

  //             // console.log("d1: after", d2);
  //             // console.log("er", d2);

  //             // slots.push({ id: slotItem._id, start: final_d1, end: final_d2, title: startTimeTitle + "-" + endTimeTitle });
  //             slots.push({ id: slotItem._id, start: d1, end: d2, title: "aa" });
  //           });
  //         });

  //         setAvailability(slots);

  //         resolve(result.data);
  //       } catch (e) {
  //         reject(e);
  //         console.log(e);
  //       }
  //     });
  //   }
  //   getCourse().then((data) => {
  //     // console.log(data);
  //     setTeacherData(data);
  //     // console.log(teacherData);
  //   });
  // }, [!apiCalled]);

  // const convertFrom24To12Format = (time24) => {
  //   const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  //   const period = +sHours < 12 ? "am" : "pm";
  //   let hours = +sHours % 12 || 12;
  //   if (hours < 10) {
  //     hours = "0" + hours;
  //   }

  //   return `${hours}:${minutes} ${period}`;
  // };

  const handleAddEvent = (e) => {
    console.log(e);

    const today = new Date();
    if (e.start.getTime() < today.getTime()) {
      return;
    }

    let firstEl = 0;
    let secondEl = 1;

    let slots = [];
    let timestart = e.start
    let endtime = e.end
    //for (let i = 0; i < e.slots.length - 1; i++) {
      while(timestart < endtime){
      slots.push({
        from: moment(timestart).toDate(),
        to: moment(timestart).add(30, 'm').toDate()>endtime?endtime:moment(timestart).add(30, 'm').toDate(),
        sessionDate: new Date(timestart),
        teacherId: teacherData?.teacherId,
      });
      //firstEl++;
      //secondEl++;
      timestart = moment(timestart).add(30, 'm').toDate();
    }
  
    console.log(slots);
    setSelectedTimeSlots(slots);

    setAddEventModal(true);

    // // setSlot(() => {
    // const today = new Date();
    // console.log(e, "E", today);
    // setSelectedSlot(e);
    // console.log("From data", e.start.getTime());
    // console.log("From current", today.getTime());
    // if (e.start.getTime() < today.getTime()) {
    //   return;
    // }
    // if (e.action === "click") {
    //   setSelectionType("click");
    //   if (e.end.getDate() - 1 === e.start.getDate()) {
    //     let endDate = new Date(e.end);
    //     endDate.setHours(9, 30);
    //     endDate.setDate(e.end.getDate() - 1);
    //     setSelectedDate(endDate);
    //     setAddEventModal(true);
    //   } else if (e.end.getDate() === e.start.getDate()) {
    //     let endDate = new Date(e.end);
    //     endDate.setDate(e.end.getDate());
    //     setSelectedDate(endDate);
    //     setAddEventModal(true);
    //   } else {
    //     let startDate = new Date(e.start);
    //     startDate.setDate(e.start.getDate());
    //     setSelectedDate(startDate);
    //     setAddEventModal(true);
    //   }
    // } else if (e.action === "select") {
    //   setSelectionType("select");
    //   if (e.start.getDate() === e.end.getDate()) {
    //     let slotsSelected = Object.values(e.slots);
    //     let temp = [];
    //     for (let i = 0; i < slotsSelected.length - 1; i++) {
    //       let start =
    //         String(slotsSelected[i]).slice(16, 18) +
    //         ":" +
    //         String(slotsSelected[i]).slice(19, 21);
    //       let end =
    //         String(slotsSelected[i + 1]).slice(16, 18) +
    //         ":" +
    //         String(slotsSelected[i + 1]).slice(19, 21);
    //       temp.push({
    //         // start: convertFrom24To12Format(start),
    //         // end: convertFrom24To12Format(end),
    //       });
    //     }
    //     let endDate = new Date(e.end);
    //     endDate.setDate(e.end.getDate());
    //     setSelectedDate(endDate);
    //     setSelectedTimeSlots(temp);
    //     setAddEventModal(true);
    //   } else {
    //     let dates = e.slots;
    //     console.log(dates);
    //     setSelectedDateSlots(dates);
    //     setAddEventModal(true);
    //   }
    // }
  };

  const handleEditEvent = (e) => {
    console.log("edit", e);
    const today = new Date();
    if (e.start.getTime() < today.getTime()) {
      return;
    }

    setSelectedSlot({
      id: e?.id,
      from: e?.start,
      to: e?.end,
    });

    console.log(e.start);
    console.log(e.end);
    console.log(e.id);
    console.log(e.title);

    setEditEventModal(true);
  };

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

  // const resizeEvent = (data) => {
  //   setAvailability(
  //     availability.map((e) => {
  //       if (e.id == data.slot.id) {
  //         // if (data.slot.end.getDate() - 1 < data.slot.start.getDate()) {
  //         //     return { ...e, start: data.start, end: data.end }
  //         // }
  //         // else {
  //         //     var endDate = new Date(data.end);
  //         //     endDate.setDate(data.end.getDate() - 1);
  //         //     return { ...e, start: data.start, end: endDate }
  //         // }
  //         if (data.slot.end.getDate() - 1 === data.slot.start.getDate()) {
  //           var endDate = new Date(data.end);
  //           endDate.setDate(data.end.getDate() - 1);
  //           return { ...e, start: data.start, end: endDate };
  //         } else {
  //           return { ...e, start: data.start, end: data.end };
  //         }
  //       } else {
  //         return e;
  //       }
  //     })
  //   );
  // };

  function Event({ event }) {
    return (
      <div className='event'>
        {/* <p>
          {" "}
          {convertFrom24To12Format(String(event.start).slice(16, 21)) +
            "-" +
            convertFrom24To12Format(String(event.end).slice(16, 21))}
        </p> */}
      </div>
    );
  }
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

    // const goToCurrent = () => {
    //   const now = new Date();
    //   toolbar.date.setMonth(now.getMonth());
    //   toolbar.date.setYear(now.getFullYear());
    //   toolbar.onNavigate("current");
    // };

    // const label = () => {
    //   const date = new Date(toolbar.date);
    //   console.log(date);
    //   return (
    //     <span>
    //       <b>{date.format("MMMM")}</b>
    //       <span> {date.format("YYYY")}</span>
    //     </span>
    //   );
    // };
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
    // const label = () => {
    //   const date = new Date(toolbar.date);
    //   console.log(date);
    //   return (
    //     <span>
    //       <b>{date.format("MMMM")}</b>
    //       <span> {date.format("YYYY")}</span>
    //     </span>
    //   );
    // };
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
    return `${monthNames[date.getMonth()]} ${date.getDate()} - ${
      monthNames[end.getMonth()]
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
      {addEventModal ? (
        <AddEventModal
          setAddEventModal={setAddEventModal}
          slots={selectedTimeSlots}
          addSlots={addTeacherAvail}
          getAvailability={getTeacherAvail}
        />
      ) : (
        <></>
      )}

      {editEventModal ? (
        <>
          <EditEventModal
            setEditEventModal={setEditEventModal}
            selectedSlot={selectedSlot}
            availability={availability}
            setAvailability={setAvailability}
          />
        </>
      ) : (
        <></>
      )}

      <div
        style={{
          marginTop: "10px",
          borderRadius: "10px",
          width: "100%",
          backgroundColor: "#fefeff",
          padding: width >= 700 ? "20px" : "5px",
        }}
        className='teacherCalendar'>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Calendar</div>
        {width >= 992 ? (
          <Calendar
            // step={15}
            localizer={localizer}
            events={availability}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500, margin: width >= 700 ? "50px" : "0px" }}
            selectable
            onSelectEvent={(e) => handleEditEvent(e)}
            onSelectSlot={(e) => handleAddEvent(e)}
            defaultView='week'
            components={{
              event: Event,
              week: { toolbar: CustomToolbar },
            }}
            eventPropGetter={(availability) => {
              const backgroundColor = availability.isBooked ? "gray" : "#3174ad";
              const cursor = availability.isBooked ? "none" : "pointer";
              return { style: { backgroundColor, cursor }} 
            }}
          />
        ) : (
          <Calendar
            defaultDate={new Date()}
            localizer={localizer}
            events={availability}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 500 }}
            selectable
            onSelectEvent={(e) => handleEditEvent(e)}
            onSelectSlot={(e) => handleAddEvent(e)}
            defaultView='week'
            views={views}
            components={{
              event: Event,
              week: { toolbar: CustomMobileToolbar },
            }}
            eventPropGetter={(availability) => {
              const backgroundColor = availability.isBooked ? "gray" : "#3174ad";
              const cursor = availability.isBooked ? "none" : "pointer";
              return { style: { backgroundColor, cursor }} 
            }}
          />
        )}
      </div>
    </>
  );
}

export default MyCalendar;
