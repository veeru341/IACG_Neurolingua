import React from "react";

import Person from "../../../../../assets/icons/boy_icon.svg";
import French from "../../../../../assets/flags/french.png";
import Video from "../../../../../assets/video.mp4";

import "./teacherCardHome.css";

import { useHistory } from "react-router-dom";
import { BookFreeTrialButton } from "../../commonUtils";

function TeacherCardHome(props) {
  const history = useHistory();

  const { course, width } = props;

  const [fav, setFav] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(true);

  const showCalender = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
  };

  const showTeacherProfile = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
    // history.push("/teacher-profile", { course });
    history.push("/teacher-profile");
  };

  return (
    <>
      {width >= 992 ? (
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div
            style={{
              width: "",
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              backgroundColor: "#fefeff",
              borderRadius: "10px 0 0 10px",
              borderRight: "1px solid #c3c2c2",
              padding: "1vw",
              width: "500px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0px",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => showTeacherProfile()}
                style={{ cursor: "pointer", width: "100px", height: "100px" }}
              >
                <img
                  src={course.userId.onType.teacherProfilePic.data}
                  alt="teacher_img"
                  style={{
                    border: "3px solid grey",
                    objectFit: "cover",
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <img
                  src={"/flags/" + course.language.data.toLowerCase() + ".png"}
                  alt="language_flag"
                  style={{ marginLeft: "-35px", width: "30px", height: "30px" }}
                />
              </div>
              <div
                style={{
                  marginTop: "10px",
                  color: "#fe1848",
                  textAlign: "center",
                }}
              >
                {`$${course.price.data}`}
                <br />
                USD/hr
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  // display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => showTeacherProfile()}
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    padding: "5px 15px",
                    width: "fit-content",
                    marginBottom: "10px",
                    borderRadius: "3px",
                    border: "1px solid lightblue",
                  }}
                >
                  {course.title.data}
                </div>
                <div
                  onClick={() => showTeacherProfile()}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  {course.userId.onType.firstName.data +
                    " " +
                    course.userId.onType.lastName.data}{" "}
                  &nbsp;
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <span key={index}>
                    {index < course.userId.onType.avgRating ? (
                      <i class="fas fa-star"></i>
                    ) : (
                      <i class="far fa-star"></i>
                    )}
                  </span>
                ))}
                &nbsp; ({course.userId.onType.expertise.ratings_teacher.length})
              </div>
              <div
                style={{
                  color: "#7b7b7a",
                  borderBottom: "1px solid #fe1848",
                  borderImage:
                    "linear-gradient(to right, #fe1848 30%, #FFF 10%) 100% 1",
                }}
              >
                {course.userId.onType.teacherType.data}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <div style={{ color: "#a4a4a5" }}>Teaches</div>
                  <div style={{ color: "#454544", fontSize: "18px" }}>
                    {course.userId.onType.languageTeach[0].data}
                    {course.userId.onType.languageTeach.length > 1 ? (
                      <>
                        <span style={{ fontSize: "14px" }}>
                          {" "}
                          +{course.userId.onType.languageTeach.length} more
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </span>
                <span style={{ marginLeft: "20px" }}>
                  <div style={{ color: "#a4a4a5" }}>Also Speaks</div>
                  <div style={{ color: "#454544", fontSize: "18px" }}>
                    {course.userId.onType.languageSpeak[0].data}
                    {course.userId.onType.languageSpeak.length > 1 ? (
                      <>
                        <span style={{ fontSize: "14px" }}>
                          {" "}
                          +{course.userId.onType.languageSpeak.length} more
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </span>
              </div>
            </div>
            <div
              onClick={() => showCalender()}
              style={{
                width: "170px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {fav ? (
                <i class="fas fa-heart" onClick={() => setFav(false)}></i>
              ) : (
                <i class="far fa-heart" onClick={() => setFav(true)}></i>
              )}

              <BookFreeTrialButton />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fefeff",
              borderRadius: "0 10px 10px 0",
              padding: "1vw",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "center", gap: "30px" }}
            >
              <div
                onClick={() => setShowVideo(true)}
                style={{
                  cursor: "pointer",
                  borderBottom: showVideo ? "1px solid #fe1848" : "none",
                }}
              >
                Video
              </div>
              {/* <div onClick={() => setShowVideo(false)} style={{ cursor: "pointer", borderBottom: showVideo ? "none" : "1px solid #fe1848" }}>
                Availability
              </div> */}
            </div>

            <div
              style={{
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "16vw",
                height: "150px",
              }}
            >
              {/* <video width="640" height="360" id="player1" preload="none">
                <source type="video/youtube" src="http://www.youtube.com/watch?v=nOEw9iiopwI" />
              </video> */}
              {/* <video controls src={Video} style={{ width: "100%", maxWidth: "200px", borderRadius: "10px" }}></video> */}

              <iframe
                width="250"
                height="120"
                src={
                  "https://www.youtube.com/embed/" +
                  course.userId.onType.videoURL.data.split("?v=")[1]
                }
              ></iframe>
            </div>

            {/* {showVideo ? (
              <div style={{ margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", width: "16vw", height: "150px" }}>
                <video controls src={Video} style={{ width: "100%", maxWidth: "200px", borderRadius: "10px" }}></video>
              </div>
            ) : (
              <div
                style={{
                  fontSize: "0.8em",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "16vw",
                  height: "150px",
                }}
              >
                <div>
                  {["", "Morning", "Afternoon", "Evening", "Night"].map((item1, index1) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ marginRight: "10px" }}>{item1}</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
                        {["Su", "Mo", "Tu", "Th", "We", "Fr", "Sa"].map((item2, index2) =>
                          index1 === 0 ? (
                            <div style={{ marginBottom: "5px", width: "1vw", height: "1vw", textAlign: "center" }}>{item2}</div>
                          ) : (
                            <div
                              style={{
                                width: "1vw",
                                height: "1vw",
                                backgroundColor: index1 === 2 ? "#359cd7" : index1 === "4" ? "#e7f1f9" : "#9fcce6",
                              }}
                            ></div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TeacherCardHome;
