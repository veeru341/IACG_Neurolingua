import React, { useEffect, useState } from "react";
import { getTeacherEarnings } from "../../../../../store/actions/teacher";
import StatusTable from "../WithdrawalStatus/StatusTable";
import { toast } from "react-toastify";
import BalanceTable from "./BalanceTable";

const Earnings = () => {
  const [earnings, setEarning] = useState([]);

  const getEarning = async () => {
    const data = await getTeacherEarnings();
    if (data?.success) setEarning(data.data);
    else {
      return toast.error("Something went wrong.Please try again");
    }
  };

  useEffect(() => {
    getEarning();
  }, []);

  const columns = [
    "Student Profile",
    "Student Name",
    "Course Name",
    "Date of Booking",
    "Coupon Name",
    "Transaction Id",
    "Amount",
  ];

  return (
    <>
      {earnings && earnings.length > 0 ? (
        <BalanceTable columns={columns} data={earnings} type={"Earnings"} />
      ) : (
        <p>No Earnings</p>
      )}
    </>
  );
};

export default Earnings;
