import React from "react";

import LokkingForCourses from "../../../../assets/images/business_team_looking_for_new_people.jpg";

import TeacherCardHome from "./teacherCardHome/TeacherCardHome";
import TeacherCard from "../teacherProfile/teacherCard/TeacherCard";
import Filters from "./filterTeacher/Filters";

import { useWindowDimensions } from "../../../../utils/util";
import { langOptions } from "./filterTeacher/filterUtils";
import Select from "./filterTeacher/select/Select";

import Navigation from "../../../../landing/components/Nav";
import { useHistory } from "react-router-dom";

import Flag from "../../../../assets/icons/flag_icon.svg";

function FindTeacher(props) {
  const history = useHistory();

  // console.log("aaad", history.location.state.lang);

  const { width } = useWindowDimensions();

  const [showFilter, setShowFilter] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [coursesArr, setCoursesArr] = React.useState([]);
  const [reset, resetCalled] = React.useState(0);
  const resetRef = React.useRef();

  const [flagSrc, setFlagSrc] = React.useState(Flag);

  var allFilters = {
    lang: "Language",
    courseT: "Course",
    availability: "Availability",
    minPrice: 0,
    maxPrice: 200,
    motherT: "Mother Tongue",
    from: "Country",
  };
  localStorage.setItem("allFilters", JSON.stringify(allFilters));

  const [lang, setLang] = React.useState(
    history.location.state ? history.location.state.lang : "Language"
  );

  // console.log("asd", coursesArr);

  return (
    <div
      style={{
        backgroundColor: "#e5e4e4",
        minHeight: "100vh",
        height: "auto",
        paddingTop: "100px",
      }}
    >
      <div>
        <Navigation />
      </div>

      <div
        style={{
          padding: "0 0 20px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "10px 0 0px 0",
            width: width >= 992 ? "90vw" : "100vw",
            backgroundColor: "#fefeff",
            padding: "20px 10px",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "space-around",
            gap: width >= 992 ? "unset" : "10px",
            flexWrap: "wrap",
          }}
        >
          {width >= 2 ? (
            <>
              <Filters
                focus={focus}
                setFocus={setFocus}
                width={width}
                courseArr={coursesArr}
                setCoursesArr={setCoursesArr}
                lang={lang}
                setLang={setLang}
                reset={reset}
                resetRef={resetRef}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100vw",
                }}
              >
                <Select
                  name="lang"
                  options={langOptions}
                  value={lang}
                  setValue={setLang}
                  focus={focus}
                  setFocus={setFocus}
                  width={width}
                  flagSrc={flagSrc}
                  setFlagSrc={setFlagSrc}
                />
                <div
                  style={{
                    cursor: "pointer",
                    padding: "10px 20px",
                    textAlign: "center",
                    backgroundColor: "#fefeff",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 0.1)",
                  }}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  Filters
                </div>
              </div>
              {showFilter ? (
                <div
                  style={{
                    padding: "20px 0",
                    width: "90vw",
                    borderRadius: "10px",
                    marginTop: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid blue",
                  }}
                >
                  <Filters
                    focus={focus}
                    setFocus={setFocus}
                    width={width}
                    courseArr={coursesArr}
                    setCoursesArr={setCoursesArr}
                    lang={lang}
                    setLang={setLang}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        {/* <div style={{ backgroundColor: '#fefeff', width: width >= 992 ? '90vw' : '100vw', borderRadius: '0 0 10px 10px', marginBottom: '20px' }}>
                    <div ref={resetRef} onClick={() => resetCalled(reset+1)} style={{ width: 'fit-content', border: '1px solid blue' ,borderRadius: '10px', margin: '0 auto', marginBottom: '10px' ,cursor: 'pointer', padding: '10px 20px' }}>
                        Reset
                    </div>
                </div> */}

        <div
          style={{
            opacity: focus ? "0.2" : "1",
            width: width >= 992 ? "55vw" : "90vw",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {coursesArr && coursesArr.length !== 0 ? (
            <>
              {coursesArr &&
                coursesArr.map((item, index) =>
                  width >= 992 ? (
                    <TeacherCardHome course={item} width={width} />
                  ) : (
                    <TeacherCard course={item} width={width} showFav />
                  )
                )}
            </>
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <img
                src={LokkingForCourses}
                alt="no_course_found_img"
                style={{ width: width >= 992 ? "40vw" : "80vw" }}
              />
              <div style={{ color: "grey", fontSize: "25px" }}>
                Oops.. We are still looking for the perfect teacher/course for
                you. Please come back soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindTeacher;
