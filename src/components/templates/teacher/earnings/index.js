import React, { useEffect, useState } from "react";
import {
  getTeacherPendingEarnings,
  getTeacherWithdrawals,
} from "../../../../store/actions/teacher";
import BalanceSheet from "./BalanceSheet";
import { toast } from "react-toastify";

import * as styles from "./styles.module.css";
import WithdrawalStatus from "./WithdrawalStatus";
import YourEarnings from "./YourEarnings";

function TeacherEarnings() {
  const teacherData = JSON.parse(localStorage.getItem("teacherData"));

  const [withdrawals, setWithdrawals] = useState([]);
  const [teacherPending, setTeacherPending] = useState();

  const getWithdrawals = async () => {
    const data = await getTeacherWithdrawals();
    if (data?.success) setWithdrawals(data.data);
    else {
      // return toast.error("Something went wrong.Please try again");
    }
  };

  const getTeacherPending = async () => {
    const data = await getTeacherPendingEarnings();
    if (data?.success) setTeacherPending(data.data);
    else {
      // return toast.error("Something went wrong.Please try again");
    }
  };

  useEffect(() => {
    getWithdrawals();
    getTeacherPending();
  }, []);

  return (
    <div className={styles.mainSection}>
      <div className={styles.section_first}>
        <YourEarnings pending={teacherPending} />
        <WithdrawalStatus
          teacherData={teacherData}
          handleWithdrawals={getWithdrawals}
          handlePending={getTeacherPending}
        />
      </div>
      <div className={styles.section_second}>
        <BalanceSheet data={withdrawals} handleFunction={getWithdrawals} />
      </div>
    </div>
  );
}

export default TeacherEarnings;

/* <YourEarnings /> */
