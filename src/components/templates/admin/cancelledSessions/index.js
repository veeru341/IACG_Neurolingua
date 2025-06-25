import React, { useEffect, useState } from "react";
import { getCancelledSessions } from "../../../../store/actions/payment/Payment";
import * as adminStyles from "../styles.module.css";
import * as paymentStyles from "./styles.module.css";
import { toast } from "react-toastify";
import CancelledSessionTable from "./CancelledSessionTable";

function AdminCancelledSessions() {
  const [transactions, setTransactions] = useState([]);

  const getPayments = async () => {
    const data = await getCancelledSessions();
    if (data?.success) setTransactions(data.data);
    else {
      return toast.error("Something went wrong.Please try again");
    }
  };

  const columns = [
    "Student Name",
    "Teacher Name",
    "Course Name",
    "Cancelled Date",
    "Refund Amount",
    // "Actions",
  ];

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className={adminStyles.mainSection}>
      <div className={paymentStyles.payment_header}>
        <h1>
          Cancelled <span>Sessions</span>
        </h1>
      </div>

      <div className={paymentStyles.payments_body}>
        <CancelledSessionTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}

export default AdminCancelledSessions;
