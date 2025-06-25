import React from "react";
import * as styles from "./styles.module.css";

import { useWindowDimensions } from "../../../../utils/util";

import graduation_cap from "../../../../assets/icons/graduation-cap-solid.svg";
import class_taken from "../../../../assets/icons/class_learning_from_home_education_icon.svg";
import verified from "../../../../assets/icons/check_checklist_list_mark_ok_icon.svg";
import non_verified from "../../../../assets/icons/close_circled_icon.svg";
// import professor from "../../../../assets/icons/professor_icon.svg";
// import up_arrow from '../../../../assets/icons/up-arrow.svg';
import down_arrow from "../../../../assets/icons/down_arrow_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import notification from "../../../../assets/icons/bell_mobile ui_notification_icon.svg";
// import classroom from '../../../../assets/images/teacher_type.png';

function AdminDashboard({socket}) {
  const { width } = useWindowDimensions();

  const widgets = [
    { title: "Total Students", icon: graduation_cap, number: "4586" },
    { title: "Current Students", icon: class_taken, number: "456" },
    { title: "Total Teachers", icon: verified, number: "589" },
    { title: "Current Teachers", icon: non_verified, number: "0" },
    { title: "Total Courses", icon: non_verified, number: "48" },
    { title: "Visitors", icon: non_verified, number: "0" },
  ];

  const graphOptions = [
    { name: "Courses Impression", values: "" },
    { name: "Per Session Earning", values: "" },
    { name: "Top Student", values: "" },
  ];

  const [graph, setGraph] = React.useState("Courses Impression");

  return (
    <>
      {width >= 992 ? (
        <>
          <main className={styles.mainSection}>
            <TopWidgets widgets={widgets} />

            <div className={styles.row}>
              <FeeCollection />
            </div>

            <div className={styles.row}>
              <GraphCard
                graphOptions={graphOptions}
                graph={graph}
                setGraph={setGraph}
                width={width}
              />
            </div>
          </main>

          <RightAdminCard />
        </>
      ) : (
        <main className={styles.mainSection}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "500",
              textAlign: "center",
              padding: "10px 0",
              border: "1px solid",
              borderRadius: "10px",
            }}>
            Welcome Admin
          </div>
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "21px",
              fontWeight: "600",
            }}>
            Upcoming Class
          </div>

          {/* <MobileUpcomingCard teacherData={teacherData} /> */}

          <FeeCollection />

          <div className={styles.row}>
            <GraphCard
              graphOptions={graphOptions}
              graph={graph}
              setGraph={setGraph}
              width={width}
            />
          </div>
        </main>
      )}
    </>
  );
}

const TopWidgets = ({ widgets }) => {
  const [activeTab, setActiveTab] = React.useState("Class Taken");

  return (
    <div className={styles.row}>
      {widgets.map((item, index) => (
        <div
          className={
            item.title === activeTab
              ? styles.firstRowTabActive
              : styles.firstRowTab
          }
          key={index}
          onClick={() => setActiveTab(item.title)}>
          <div>
            {item.title}
            <div style={{ float: "right" }}>
              <i class='fas fa-ellipsis-h'></i>
            </div>
          </div>
          <div>
            <img
              src={item.icon}
              alt='icon'
              fill='pink'
              style={{
                width: "30px",
                filter:
                  "filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
              }}
            />
            <div style={{ float: "right" }}>{item.number}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FeeCollection = () => {
  return (
    <div className={styles.fee}>
      <div className={styles.secondRowHeadings}>Fee Collection</div>
      <div className={styles.secondRowBody}>Some Data</div>
    </div>
  );
};

const GraphCard = ({ graphOptions, graph, setGraph, width }) => {
  return (
    <div
      style={{
        marginTop: width >= 992 ? "0" : "20px",
        padding: width >= 992 ? "20px" : "10px",
        width: "100%",
        borderRadius: "20px",
        border: "1px solid",
      }}>
      <div
        style={{
          display: width >= 992 ? "flex" : "block",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: width >= 992 ? "70%" : "100%",
          }}>
          {graphOptions.map((item, index) => (
            <div
              className={
                item.name === graph ? styles.graphNameActive : styles.graphName
              }
              key={index}
              onClick={() => setGraph(item.name)}>
              {item.name}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: width >= 992 ? "" : "20px",
            display: width >= 992 ? "" : "flex",
            justifyContent: "center",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
              padding: "5px 20px",
              border: "1px solid #9ECDE6",
              borderRadius: "30px",
            }}>
            Week
            <img
              src={down_arrow}
              alt='down_arrow_img'
              style={{ width: "20px" }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}>
        <img src={graph_img} alt='graph_image' style={{ width: "100%" }} />
      </div>
    </div>
  );
};

const RightAdminCard = ({ teacherData }) => {
  return (
    <div
      style={{ width: "20%", position: "absolute", top: "0", right: "25px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "20px",
          margin: "10px",
          width: "20vw",
          minHeight: "97vh",
          backgroundColor: "rgba(158, 205, 230, 0.15)",
          position: "fixed",
        }}>
        <div
          style={{
            marginTop: "10px",
            alignSelf: "flex-end",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}>
          <i class='far fa-comment fa-2x'></i>
          <img
            src={notification}
            alt='notification_img'
            style={{ width: "35px", marginLeft: "30px", marginRight: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

//  <div>
// <div style={{ textAlign: "center", marginBottom: "20px" }}>
// {/* <img src={teacherData && teacherData.teacherProfilePic.data} style={{ width: '150px' }} /> */}
// <img src={professor} alt='admin_image' style={{ width: "150px" }} />
// </div>
// <div
// style={{ textAlign: "center", marginBottom: "20px" }}>{`Welcome ${
// teacherData && teacherData.firstName.data
// }`}</div>
// <div
// style={{
//   textAlign: "center",
//   fontWeight: "bold",
//   fontSize: "20px",
//   marginBottom: "20px",
// }}>
// Upcoming Class
// </div>
// <div
// style={{
//   padding: "20px 0",
//   color: "#fff",
//   backgroundColor: "#9ECDE6",
//   width: "20vw",
//   borderRadius: "20px",
// }}>
// <div style={{ fontWeight: "bold", textAlign: "center" }}>
//   French
// </div>
// <hr style={{ color: "#fff", margin: "20px 0" }} />
// <div style={{ width: "70%", margin: "0 auto" }}>
//   <div
//     style={{
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//     }}>
//     <i className={styles.teacherCardIcons + " far fa-calendar"}></i>
//     14th September 2021
//   </div>
//   <div
//     style={{
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//     }}>
//     <i className={styles.teacherCardIcons + " far fa-clock"}></i>
//     11:00 AM
//   </div>
//   <div
//     style={{
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//     }}>
//     <i
//       className={
//         styles.teacherCardIcons + " fas fa-circle-notch"
//       }></i>
//     60 Minutes
//   </div>
//   <div
//     style={{
//       marginBottom: "20px",
//       display: "flex",
//       alignItems: "center",
//     }}>
//     <i
//       className={
//         styles.teacherCardIcons + " fas fa-dollar-sign"
//       }></i>
//     $10
//   </div>
// </div>
// <div style={{ display: "flex", justifyContent: "center" }}>
//   <div style={{ fontWeight: "bold" }}>Join</div>
// </div>
// </div>
// </div>
