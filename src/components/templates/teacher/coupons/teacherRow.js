import React from "react";
import * as styles from "./styles.module.css";
const TeacherRow = (props) => {
  React.useState(() => {
  }, [props.selectedCourse, props.selectedTeacher]);
  return (
    <>
      <tr
        key={'teacher '+ props.key}
        className={
          //Course
          (props.selectedCourse && props.selectedCourse.id === props.course.id) ||
          // Teacher
          (props.selectedTeacher && props.selectedTeacher.id === props.teacher.id)
            ? styles.selectedRow
            : ""
        }
        onClick={() => {
          props.verificationType === "Course" ? props.setSelectedCourse(props.course) : props.setSelectedTeacher(props.teacher);
        }}
      >
        <td className={styles.col1}>
          {props.verificationType === "Teacher" ? (
            <>
              <i className={"fas fa-circle " + (props.teacher.approvalStatus === "verified" ? styles.verified : "")}></i>
            </>
          ) : (
            <>
              <i className={"fas fa-circle " + (props.course.isVerified ? styles.verified : "")}></i>
            </>
          )}
        </td>
        <td className={styles.col2}>
          {props.verificationType === "Teacher" ? (
            <>
              <img src={props.teacher.teacherProfilePic.data} alt="" />
              <p>{props.teacher.firstName.data}</p>
            </>
          ) : (
            <>{props.course.title.data}</>
          )}
        </td>
        <td className={styles.col3}>
          {props.verificationType === "Teacher" ? <>{props.teacher.motherTongue.data}</> : <>{props.course.userId.fullName}</>}
        </td>

        <td className={styles.col4}>
          {props.verificationType === "Teacher" ? (
            <>
              <a href={props.teacher.videoURL.data} target="_blank">
                <i className="fab fa-youtube"></i>
              </a>
            </>
          ) : (
            <>{props.course.language.data}</>
          )}
        </td>
        <td className={styles.col5}>
          {props.verificationType === "Teacher" ? (
            <>
              <a href={"mailto:" + props.teacher.userId.email}>
                <i className="fas fa-envelope"></i>
              </a>
              <a href={"tel:" + props.teacher.mobileNumber.data}>
                <i className="fas fa-phone"></i>
              </a>
            </>
          ) : (
            <>$ {props.course.price.data}</>
          )}
        </td>
        <td className={styles.col6}>
          {props.verificationType === "Teacher" ? <>{props.teacher.region.fromCountry.data}</> : <>{new Date().toDateString()}</>}
        </td>
      </tr>
    </>
  );
};

export default TeacherRow;
