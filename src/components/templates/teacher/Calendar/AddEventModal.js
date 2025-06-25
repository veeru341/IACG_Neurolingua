import React from "react";
import * as modalStyles from "./styles.module.css";
import { timeOptions } from "./calendarUtils";
import Slot from "./Slot";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAvailability } from "../../../../store/actions/teacher/index";

const AddEventModal = (props) => {
  const { setAddEventModal, slots, addSlots, getAvailability } = props;
  console.log(props);

  const handleClick = async () => {
    await addSlots(slots);
    await getAvailability();
  };

  // React.useEffect(() => {
  //   let temp = [];
  //   if (props.selectionType === "select") {
  //     console.log(props.selectedTimeSlots);
  //     if (props.selectedTimeSlots.length) setSlots(props.selectedTimeSlots);
  //   }
  //   let newSlot = {
  //     start: convertFrom24To12Format(
  //       String(props.selectedSlot.start).slice(16, 21)
  //     ),
  //     end: convertFrom24To12Format(
  //       String(props.selectedSlot.end).slice(16, 21)
  //     ),
  //     // start: availability.start.getHours() + ":" + availability.start.getMinutes(),
  //     // end: availability.end.getHours() + ":" + availability.end.getMinutes(),
  //   };
  //   temp.push(newSlot);
  //   setSlots(temp);
  // }, []);

  // function addSlot() {
  //   setSlots([...slots, { start: "12:00 am", end: "12:00 am", title: "" }]);
  // }

  // function handleChange(name, value, index) {
  //   console.log(name, value, index);
  //   let newSlot = [...slots];
  //   newSlot[index][name] = value;
  //   setSlots(newSlot);
  // }

  // const deleteSlot = (i) => {
  //   let temp = [...slots];
  //   console.log(temp);
  //   if (temp.length > 0) temp.splice(i, 1);
  //   setSlots(temp);
  // };

  // function verifyFields() {
  //   let status = true;
  //   let toastShown = false;
  //   slots.forEach((slot) => {
  //     let startTime = new Date(
  //       2022,
  //       1,
  //       1,
  //       convertTime12to24(slot.start).split(":")[0],
  //       convertTime12to24(slot.start).split(":")[1]
  //     );

  //     let endTime = new Date(
  //       2022,
  //       1,
  //       1,
  //       convertTime12to24(slot.end).split(":")[0],
  //       convertTime12to24(slot.end).split(":")[1]
  //     );

  //     console.log(startTime, endTime);
  //     console.log((endTime - startTime) / 1000 / 60, "Diff");

  //     if (slot.start === "" || slot.end === "") {
  //       if (!toastShown) toast.warn("Please select start and end time");
  //       status = false;
  //       toastShown = true;
  //     } else if (
  //       ((endTime - startTime) / 1000 / 60 < 30 ||
  //         (endTime - startTime) / 1000 / 60 > 60) &&
  //       (endTime - startTime) / 1000 / 60 !== -660
  //     ) {
  //       if (!toastShown)
  //         toast.warn("Invalid Slot Time, slot diff should be 30 or 60 min");
  //       status = false;
  //       toastShown = true;
  //     }

  //     if (
  //       slot.start.split(" ")[1] === "am" &&
  //       slot.end.split(" ")[1] !== "am"
  //     ) {
  //       if (!toastShown)
  //         toast.warn("Invalid Slot Time, slot diff should be 30 or 60 min");
  //       status = false;
  //       toastShown = true;
  //     } else if (
  //       slot.start.split(" ")[1] === "pm" &&
  //       slot.end.split(" ")[1] !== "pm"
  //     ) {
  //       if (!toastShown)
  //         toast.warn("Invalid Slot Time, slot diff should be 30 or 60 min");
  //       status = false;
  //       toastShown = true;
  //     }
  //     toastShown = false;
  //   });
  //   return status;
  // }

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

  // const overlapping = (a, b) => {
  //   const getMinutes = (s) => {
  //     const p = s.split(":").map(Number);
  //     return p[0] * 60 + p[1];
  //   };
  //   console.log(getMinutes(a.end), getMinutes(b.start));
  //   return (
  //     getMinutes(a.end) > getMinutes(b.start) &&
  //     getMinutes(b.end) > getMinutes(a.start)
  //   );
  // };

  // const isOverlapping = (arr) => {
  //   let i, j;
  //   for (i = 0; i < arr.length - 1; i++) {
  //     for (j = i + 1; j < arr.length; j++) {
  //       if (overlapping(arr[i], arr[j])) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  // const saveSlots = async () => {
  //   if (!verifyFields()) {
  //     return;
  //   }
  //   let temp = slots;

  //   let slots24HourFormat = temp.map((slot) => {
  //     return {
  //       start: convertTime12to24(slot.start),
  //       end: convertTime12to24(slot.end),
  //     };
  //   });

  //   if (isOverlapping(slots24HourFormat)) {
  //     return toast.warn("Slots are overlapping");
  //   }

  //   props.setAvailability([...props.availability, ...temp]);
  //   // console.log(props.selectedDate);
  //   // console.log(slots24HourFormat, "Temp2");

  //   console.log(temp, "Temp1");
  //   if (props.reschedule) {
  //     rescheduleSlot();
  //     return;
  //   }
  //   // alert(1)
  //   // console.log(checkIfSlotExists());
  //   // return;
  //   let body;

  //   // availability: {
  //   //   date: date,
  //   //   slots: temp,
  //   // },

  //   /// FOR Multiple dates selection
  //   if (props.selectedDateSlots.length) {
  //     let response = { status: true, message: "" };
  //     props.selectedDateSlots.forEach(async (date) => {
  //       body = {
  //         availability: {
  //           date: date,
  //           slots: temp,
  //         },
  //       };

  //       body.availability.slots = body.availability.slots.map((slot) => {
  //         let start = new Date(
  //           body.availability.date.setHours(
  //             parseInt(convertTime12to24(slot.start).split(":")[0]),
  //             parseInt(convertTime12to24(slot.start).split(":")[1])
  //           )
  //         );

  //         let end = new Date(
  //           body.availability.date.setHours(
  //             parseInt(convertTime12to24(slot.end).split(":")[0]),
  //             parseInt(convertTime12to24(slot.end).split(":")[1])
  //           )
  //         );

  //         // console.log(new Date(start),"Dateeere");
  //         return { start, end };
  //       });

  //       try {
  //         const result = await dispatch(addAvailability(body));
  //         console.log(result);
  //         if (result.status) {
  //           // toast.success(result.message);
  //           props.setAddEventModal(false);
  //         } else {
  //           response.status = false;
  //           response.message = result.message;
  //         }
  //       } catch (e) {
  //         console.log(e);
  //         toast.error("Failed to Save availability");
  //       }
  //     });
  //     if (response.status) {
  //       toast.success("Slots Added Successfully");
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } else {
  //     /// FOR Single dates selection
  //     body = {
  //       availability: {
  //         date: props.selectedDate,
  //         slots: temp,
  //       },
  //     };

  //     body.availability.slots = body.availability.slots.map((slot) => {
  //       let start = new Date(
  //         body.availability.date.setHours(
  //           parseInt(convertTime12to24(slot.start).split(":")[0]),
  //           parseInt(convertTime12to24(slot.start).split(":")[1])
  //         )
  //       );

  //       let end = new Date(
  //         body.availability.date.setHours(
  //           parseInt(convertTime12to24(slot.end).split(":")[0]),
  //           parseInt(convertTime12to24(slot.end).split(":")[1])
  //         )
  //       );

  //       // console.log(new Date(start),"Dateeere");
  //       return { start, end };
  //     });

  //     try {
  //       const result = await dispatch(addAvailability(body));
  //       console.log(result);
  //       if (result.status) {
  //         toast.success(result.message);
  //         props.setAddEventModal(false);
  //       } else {
  //         toast.error(result.message);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       toast.error("Failed to Save availability");
  //     }
  //   }
  //   props.setApiCalled(false);
  //   // return;
  // };

  // const checkIfSlotExists = () => {
  //   const status = false;
  // };
  // const rescheduleSlot = () => {
  //   alert(2);
  // };

  return (
    <>
      {/* {console.log("zxzx", slotsArr, availability)} */}
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => {
              setAddEventModal(false);
            }}></i>
          <h3 className={modalStyles.modalHeading}>Add Slots</h3>

          {/* Body */}

          <div className={modalStyles.slots}>
            {slots.map((slot, i) => {
              return <Slot slot={slot} i={i} />;
            })}
          </div>

          <button className={modalStyles.saveSlotBtn} onClick={handleClick}>
            Add Slots
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;
