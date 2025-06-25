import React from "react";

import { Card, CardMobile } from "../commonUtils";

function Cancelled(props) {
  let { width, arr } = props;

  //   const arr = [
  //     {
  //       heading: "Cancelled",
  //       time: "8:00 AM",
  //       date: "Tuesday - 7 September, 2021",
  //       lang: "English",
  //       duration: "1 hour",
  //     },
  //     {
  //       heading: "Cancelled",
  //       time: "8:00 AM",
  //       date: "Tuesday - 7 September, 2021",
  //       lang: "English",
  //       duration: "1 hour",
  //     },
  //     {
  //       heading: "Cancelled",
  //       time: "8:00 AM",
  //       date: "Tuesday - 7 September, 2021",
  //       lang: "English",
  //       duration: "1 hour",
  //     },
  //   ];

  //   const arrMobile = [
  //     {
  //       course: "Communication Skill 3",
  //       isVerified: true,
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     },
  //     {
  //       course: "Communication Skill 3",
  //       isVerified: true,
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     },
  //     {
  //       course: "Communication Skill 3",
  //       isVerified: true,
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //     },
  //   ];
  arr = arr?.filter((item) => item.status === "Cancelled" )
  console.log(arr)

  return (
    <>
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {arr && arr.length > 0 ? (
            arr.map((item, index) => ( <Card width={width} cardInfo={item} />
          ))) : (
            <div style={{ textAlign: "center" }}>No Cancelled Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr && arr.length > 0 ? (
            arr.map((item, index) => (
              <CardMobile width={width} cardInfo={item} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Cancelled Sessions</div>
          )}
        </div>
      )}
    </>
  );
}

export default Cancelled;
