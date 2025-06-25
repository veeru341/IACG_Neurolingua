import moment from "moment";
import React from "react";
import * as modalStyles from "./styles.module.css";
const Slot = ({ slot, i }) => {
  let startTime = moment(slot.from).format("hh:mm");
  let endTime = moment(slot.to).add(1, 'seconds').startOf('minute').format("hh:mm");
  
  return (
    <>
      <div className={modalStyles.slot}>
        <h4>Slot {i + 1}</h4>
        <div className={modalStyles.slot_time}>{startTime}</div>
        <p>:</p>
        <div className={modalStyles.slot_time}>{ endTime}</div>
      </div>
    </>
  );
};

export default Slot;
