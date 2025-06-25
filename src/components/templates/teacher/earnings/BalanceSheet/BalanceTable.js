import React from "react";
import * as styles from "../styles.module.css";
import moment from "moment";
import { useWindowDimensions } from "../../../../../utils/util";
import MobileCard from "../MobileCard/MobileCard";

const BalanceTable = ({ columns, data, type }) => {
  const { width } = useWindowDimensions()
  return (
    <>
      {width > 769 ? (
        <table className={styles.balance_table}>
          <thead>
            <tr>{columns && columns.map((name, i) => <th key={i}>{name}</th>)}</tr>
          </thead>

          <tbody>
            {data &&
              type === "Earnings" &&
              data.map((el) => {
                let amount = el?.total - el?.platformFees;

                if (el.couponUsed) {
                  amount = el?.totalAfterDiscount - el?.platformFees;
                }
                return (
                  <tr className={styles.table_row}>
                    <td>Photo</td>
                    <td>
                      {el.studentId && el.studentId.fullName
                        ? el.studentId.fullName
                        : "-"}
                    </td>
                    <td>{el.courseId && el.courseId.title.data}</td>
                    <td>
                      {el.createdAt
                        ? moment(el.createdAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                    <td>{el.couponName ? el.couponName : "-"}</td>
                    <td>{el._id}</td>
                    <td>$ {amount}</td>
                  </tr>
                );
              })}


            {data &&
              type === "Withdrawals" &&
              data.map((el) => {
                return (
                  <tr className={styles.table_row}>
                    <td>$ {el?.withdrawalAmount}</td>
                    <td>{el?.paymentStatus}</td>
                    <td>{el?.modeOfTransaction}</td>
                    <td>{el?.bankReferenceId ? el?.bankReferenceId : "-"}</td>
                    <td>
                      {el.createdAt
                        ? moment(el.createdAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

      ) : (
        <div className="mobileWrapper">
          {data &&
            type === "Earnings" &&
            data.map((el) => {
              return <MobileCard data={el} type={type} />
            })
          }

          {data &&
            type === "Withdrawals" &&
            data.map((el) => {
              return <MobileCard data={el} type={type} />
            })
          }
        </div>
      )}
    </>
  )
}



export default BalanceTable;
