import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getStudentDetailById } from '../../../../../store/actions/student'
import "./mobilecard.css"
import moment from 'moment'

const MobileCard = ({ data, type }) => {
  const dispatch = useDispatch()
  const [studentPic, setStudentPic] = useState()
  React.useEffect(() => {
    async function getStudentPic() {
      try {
        const student = await dispatch(getStudentDetailById(data.studentId._id))
        console.log(student)
        setStudentPic(student[0].profilePic.data)
      } catch (error) {
        console.log(error)
      }
    }
    getStudentPic()
  }, [])

  let amount = data?.total - data?.platformFees;

  if (data.couponUsed) {
    amount = data?.totalAfterDiscount - data?.platformFees;
  }

  console.log(type)
  return (
    <>
      {type === "Earnings" &&
        <div className="mobilecard">
          <div className="personalInfo">
            <img src={studentPic} alt="" style={{ height: "30px", width: "30px", borderRadius: "50%" }} />
            <div className="name" style={{ fontWeight: 'bold', fontSize: "1.2rem" }}>{data.studentId.fullName}</div>
          </div>
          <div className="courseInfo">
            <div className="courseName" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Course Name</div>
            <div className="courseName" style={{ marginBottom: "0.8rem" }}>{data.courseId.title.data}</div>
            <div className="dob" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Date of Booking</div>
            <div className="dob" style={{ marginBottom: "0.8rem" }}>{moment(data.createdAt).format("D-MM-YYYY h:mm a")}</div>
          </div>
          <div className="transactionInfo">
            <div className="couponName" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Coupon Name</div>
            <div className="couponName" style={{ marginBottom: "0.8rem" }}>{data.couponName ? data.couponName : "No coupon used"}</div>
            <div className="transId" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Transaction Id</div>
            <div className="transactionId" style={{ marginBottom: "0.8rem" }}>{data._id}</div>
            <div className="amount" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Amount</div>
            <div className="amount">$ {amount}</div>
          </div>
        </div>
      }

      {type === "Withdrawals" &&
        <div className="mobilecard">
          <div className="courseInfo">
            <div className="courseName" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Amount</div>
            <div className="courseName" style={{ marginBottom: "0.8rem" }}>{data?.withdrawalAmount}</div>
            <div className="dob" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Status</div>
            <div className="dob" style={{ marginBottom: "0.8rem" }}>{data?.paymentStatus}</div>
            <div className="couponName" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Transaction Mode</div>
            <div className="couponName" style={{ marginBottom: "0.8rem" }}>{data?.modeOfTransaction}</div>
            <div className="transId" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Bank Referece Id</div>
            <div className="transactionId" style={{ marginBottom: "0.8rem" }}>{data?.bankReferenceId ? data?.bankReferenceId : "-"}</div>
            <div className="amount" style={{ fontWeight: 'bold', marginBottom: "0.1rem" }}>Date of Withdrawal</div>
            <div className="amount">{data.createdAt
              ? moment(data.createdAt).format("D-MM-YYYY h:mm a")
              : "-"}</div>
          </div>
        </div>}


    </>

  )
}

export default MobileCard