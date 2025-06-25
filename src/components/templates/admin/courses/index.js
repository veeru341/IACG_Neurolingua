import React from "react";
import Main from "../teachers/mainContainer/main";
import ShowData from "../teachers/teachersData/teachersData";
import * as styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { getCourses } from "../../../../store/actions/admin/course";
import { useWindowDimensions } from "../../../../utils/util";

const AdminCourses = (props) => {
  const { width } = useWindowDimensions()
  const dispatch = useDispatch();
  const [allCourses, setAllCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState();
  // const [page, setPage] = React.useState(1);
  const [courseApiCalled, setCourseApiCalled] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [showpopup, setShowPopUp] = React.useState(false)

  React.useEffect(() => {
    setShowPopUp(true)
  }, [selectedCourse])

  React.useEffect(() => {
    setCourseApiCalled(true);
    async function getAllCourses() {
      try {
        // Show Loader
        document.getElementById("loader").style.display = "flex";
        const result = await dispatch(getCourses(searchInput));
        // Hide Loader
        document.getElementById("loader").style.display = "none";
        if (result.status === 200) {
          setAllCourses(result.data.data);
          setSelectedCourse(result.data.data[0]);
          // console.log(selectedCourse);
        }
        else {
          setAllCourses(null);
          setSelectedCourse(null);
        }
        // console.log(allCourses);
      } catch (e) {
        console.log(e);
      }
    }
    getAllCourses();
    // }, [dispatch, page, !courseApiCalled, searchInput]);
  }, [dispatch, !courseApiCalled, searchInput]);


  return (
    <>
      <div className={styles.coursesDashboard}>
        <Main
          verificationType="Course"
          courses={allCourses}
          setSelectedCourse={setSelectedCourse}
          selectedCourse={selectedCourse}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        {width >= 992 ?
          selectedCourse && <ShowData selectedCourse={selectedCourse} verificationType="Course" setCourseApiCalled={setCourseApiCalled} />
          :
          showpopup && <ShowData selectedCourse={selectedCourse} verificationType="Course" setCourseApiCalled={setCourseApiCalled} setShowPopUp={setShowPopUp}/>
        }
      </div>
    </>
  );
};

export default AdminCourses;
