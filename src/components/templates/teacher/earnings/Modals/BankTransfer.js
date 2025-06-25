import React, { useState } from "react";
import * as styles from "../styles.module.css";

const BankTransfer = ({ handleChange, bankDetails, isIFSCCorrect }) => {
  const [bankLocation, setBankLocation] = useState("");

  return (
    <div className={styles.inputFormat}>
      <input
        type='text'
        placeholder='Account Holder Name'
        name='accountHolderName'
        value={bankDetails.accountHolderName}
        required
        onChange={handleChange}
      />
      <input
        type='Number'
        placeholder='Account Number'
        name='accountNumber'
        value={bankDetails.accountNumber}
        required
        onChange={handleChange}
      />
      <input
        type='Number'
        placeholder='Confirm Account Number'
        name='confirmAccountNumber'
        value={bankDetails.confirmAccountNumber}
        required
        onChange={handleChange}
      />

      {/* <input
        type='text'
        placeholder='Bank Name'
        name='bankName'
        value={bankDetails.bankName}
        required
        onChange={handleChange}
      /> */}
      <div className={styles.input_radios}>
        <p>Bank Location</p>
        <div className={styles.input_radios_group_parent}>
          <div className={styles.input_radios_group}>
            <input
              type='radio'
              id='India'
              name='bankLocation'
              value='India'
              onChange={(e) => {
                handleChange(e);
                setBankLocation(e.target.value);
              }}
            />
            <pre htmlFor='India'>India</pre>
          </div>
          <div className={styles.input_radios_group}>
            <input
              type='radio'
              id='Outside_India'
              name='bankLocation'
              value='Outside India'
              onChange={(e) => {
                handleChange(e);
                setBankLocation(e.target.value);
              }}
            />
            <pre htmlFor='Outside_India' style={{ display: "inline-block" }}>
              Outside India
            </pre>
          </div>
        </div>
      </div>

      {bankLocation === "India" && (
        <input
          type='text'
          placeholder='Bank IFSC code'
          name='bankIFSCode'
          value={bankDetails.bankIFSCode}
          maxLength={11}
          required
          onChange={handleChange}
        />
      )}

      {bankLocation === "Outside India" && (
        <input
          type='text'
          placeholder='Bank Swift code'
          name='bankSwiftCode'
          value={bankDetails.bankSwiftCode}
          required
          onChange={handleChange}
        />
      )}

      {isIFSCCorrect && (
        <>
          <input type='text' value={bankDetails.bankName} disabled />

          <input type='text' value={bankDetails.branchName} disabled />
        </>
      )}

      <div className={styles.input_radios}>
        <p>Bank Account Type</p>
        <div className={styles.input_radios_group_parent}>
          <div className={styles.input_radios_group}>
            <input
              type='radio'
              id='Saving_Account'
              name='bankAccountType'
              value='Saving Account'
              onChange={handleChange}
            />
            <pre htmlFor='Saving_Account'>Saving Account</pre>
          </div>
          <div className={styles.input_radios_group}>
            <input
              type='radio'
              id='Current_Account'
              name='bankAccountType'
              value='Current Account'
              onChange={handleChange}
            />
            <pre htmlFor='Saving_Account' style={{ display: "inline-block" }}>
              Current Account
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
