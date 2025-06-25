import React from "react";
import * as modalStyles from "./styles.module.css";
import DeleteSlot from "./DeleteSlot";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editAvailability } from "../../../../store/actions/teacher";
import { deleteAvailability } from "../../../../store/actions/availability";

const EditEventModal = ({
  setEditEventModal,
  selectedSlot,
  availability,
  setAvailability,
}) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const data = await deleteAvailability(selectedSlot.id);
    if (data.success) {
      toast.success("Slot Deleted Successfully!");
      setAvailability((prev) => {
        return prev.filter((el) => {
          return el.id !== selectedSlot.id;
        });
      });
      setEditEventModal(false);
    }
  };

  return (
    <>
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => {
              setEditEventModal(false);
            }}></i>
          <h3 className={modalStyles.modalHeading}>Delete Slot</h3>

          {/* Body */}

          <div className={modalStyles.slots}>
            <DeleteSlot slot={selectedSlot} />;
          </div>

          <button className={modalStyles.saveSlotBtn} onClick={handleClick}>
            Delete Slot
          </button>
        </div>
      </div>
    </>
  );
};

export default EditEventModal;

// const convertFrom24To12Format = (time24) => {
//   const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
//   const period = +sHours < 12 ? "am" : "pm";
//   let hours = +sHours % 12 || 12;
//   if (hours < 10) {
//     hours = "0" + hours;
//   }

//   return `${hours}:${minutes} ${period}`;
// };

// React.useEffect(() => {
//   let temp = [];

//   console.log(props.availability);

//   props.availability.forEach((availability) => {
//     console.log(availability);
//     if (
//       new Date(availability.start).getDate() ===
//       new Date(props.selectedSlot.start).getDate()
//     ) {
//       let newSlot = {
//         start: convertFrom24To12Format(
//           String(availability.start).slice(16, 21)
//         ),
//         end: convertFrom24To12Format(String(availability.end).slice(16, 21)),
//         id: availability.id,
//         // start: availability.start.getHours() + ":" + availability.start.getMinutes(),
//         // end: availability.end.getHours() + ":" + availability.end.getMinutes(),
//       };
//       temp.push(newSlot);
//     }
//   });
//   console.log(temp);
//   setSlots(temp);
// }, [props.selectedSlot, props.availability]);

// function addSlot() {
//   setSlots([...slots, { start: "12:00 am", end: "12:00 am", title: "" }]);
// }

// function handleChange(slot, name, value, index) {
//   console.log(name, value, index);

//   console.log("slot", slot);

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

//   slots.forEach((slot) => {
//     let startTime = new Date(
//       2022,
//       1,
//       1,
//       parseInt(slot.start.slice(0, 2)),
//       parseInt(slot.start.slice(3, 5))
//     );
//     let endTime = new Date(
//       2022,
//       1,
//       1,
//       parseInt(slot.end.slice(0, 2)),
//       parseInt(slot.end.slice(3, 5))
//     );

//     console.log((endTime - startTime) / 1000 / 60);
//     if (slot.start === "" || slot.end === "") {
//       toast.warn("Please select start and end time");
//       status = false;
//     } else if (
//       ((endTime - startTime) / 1000 / 60 < 30 ||
//         (endTime - startTime) / 1000 / 60 > 60) &&
//       (endTime - startTime) / 1000 / 60 !== -660
//     ) {
//       toast.warn("Invalid Slot Time, slot diff should be 30 or 60 min");
//       status = false;
//     }
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
//       id: slot.id,
//     };
//   });

//   if (isOverlapping(slots24HourFormat)) {
//     return toast.warn("Slots are overlapping");
//   }

//   // props.setAvailability([...props.availability, ...temp]);
//   console.log(temp);
//   // return;
//   let body = {
//     availability: {
//       date: props.selectedDate,
//       slots: temp,
//     },
//   };

//   body.availability.slots = body.availability.slots.map((slot) => {
//     let start = new Date(
//       body.availability.date.setHours(
//         parseInt(convertTime12to24(slot.start).split(":")[0]),
//         parseInt(convertTime12to24(slot.start).split(":")[1])
//       )
//     );

//     let end = new Date(
//       body.availability.date.setHours(
//         parseInt(convertTime12to24(slot.end).split(":")[0]),
//         parseInt(convertTime12to24(slot.end).split(":")[1])
//       )
//     );

//     // console.log(new Date(start),"Dateeere");
//     return { start, end, id: slot.id };
//   });

//   console.log(body.slots);

//   try {
//     const result = await dispatch(editAvailability(body));
//     console.log(result);
//     if (result.status) {
//       toast.success(result.message);
//       props.setEditEventModal(false);
//     } else {
//       toast.error(result.message);
//     }
//   } catch (e) {
//     console.log(e);
//     toast.error("Failed to Change availability");
//   }
//   props.setApiCalled(false);
// };
