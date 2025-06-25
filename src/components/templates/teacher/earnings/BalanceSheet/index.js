import React from "react";
import * as styles from "../styles.module.css";
import Earnings from "./Earnings";
import Withdrawals from "./Withdrawals";

const BalanceSheet = ({ data, handleFunction }) => {
  const [activeTab, setActiveTab] = React.useState("Withdrawals");

  const tabs = ["Withdrawals", "Earnings"];

  return (
    <div className={styles.section_balance_sheet}>
      <div className={styles.section_balance_sheet_header}>
        <h1>Transactions</h1>
        <div className={styles.sessionTabs}>
          {tabs.map((item, index) => (
            <div
              key={index}
              className={
                styles.sessionTab +
                " " +
                `${activeTab === item ? styles.sessionTabActive : ""} `
              }
              onClick={() => {
                setActiveTab(item);
              }}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section_widthdrawal_body}>
        {
          {
            Withdrawals: (
              <Withdrawals withdrawals={data} handleFunction={handleFunction} />
            ),
            Earnings: <Earnings />,
          }[activeTab]
        }
      </div>
    </div>
  );
};

export default BalanceSheet;
