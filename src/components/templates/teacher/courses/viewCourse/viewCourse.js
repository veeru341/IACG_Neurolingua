import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as styles from "./styles.module.css";
import { updateCourse } from "../../../../../store/actions/course";
import { languages } from "../../../../../utils/constants";
var FormData = require("form-data");

const ViewCourse = (props) => {
  const dispatch = useDispatch();
  const courseImgInput = React.useRef();
  const [imgUrl, setImageUrl] = React.useState("");
  const [formValues, setFormValues] = React.useState({
    title: "",
    courseImage: "",
    course: "",
    language: "",
    program: "",
    price: "",
    description: "",
  });
  // to display programs in input
  const [programs, setPrograms] = React.useState([]);

  function setProgramsInput() {
    console.log(formValues.language, formValues.course);
    if (!(formValues.language !== "" && formValues.course !== "")) {
      return;
    }
    let programs = languages[formValues.language][formValues.course];
    setPrograms(programs);
  }

  const handleChange = (e) => {
    // console.log(e);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);

    if (e.target.name === "course" || e.target.name === "language") {
      setProgramsInput();
    }
  };

  const handleFileInput = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
    }
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  function imageClick() {
    if (props.modalType === "Edit") {
      courseImgInput.current.click();
    }
  }
  React.useEffect(() => {
    setFormValues({
      title: props.courseData.title.data ? props.courseData.title.data : "",
      courseImage: props.courseData.courseImage.data ? props.courseData.courseImage.data : "",
      course: props.courseData.course.data ? props.courseData.course.data : "",
      language: props.courseData.language.data ? props.courseData.language.data : "",
      program: props.courseData.program.data ? props.courseData.program.data : "",
      price: props.courseData.price.data ? props.courseData.price.data : "",
      price1: props.courseData.price1.data ? props.courseData.price1.data : "",
      price2: props.courseData.price2.data ? props.courseData.price2.data : "",
      description: props.courseData.description.data ? props.courseData.description.data : "",
    });
    setImageUrl(props.courseData.courseImage.data ? props.courseData.courseImage.data : "");
    let programs = languages[props.courseData.language.data][props.courseData.course.data];
    setPrograms(programs);


  }, []);

  React.useEffect(() => {
    if (formValues.language !== "" && formValues.course !== "") {
      setProgramsInput();
    }
  }, [formValues])

  const handleSubmit = async () => {
    console.log(formValues);
    // Validate data
    if (formValues.title === "") {
      return toast.warn("Please enter title");
    } else if (formValues.course === "") {
      return toast.warn("Please enter course");
    } else if (formValues.language === "") {
      return toast.warn("Please enter language");
    } else if (formValues.program === "") {
      return toast.warn("Please enter program");
    } else if (formValues.price === "") {
      return toast.warn("Please enter price");
    } else if (formValues.description === "") {
      return toast.warn("Please enter description");
    } else if (!formValues.courseImage) {
      return toast.warn("Please upload course image");
    }

    try {
      props.setApiCalled(false)
      // send Data
      var form = new FormData();
      form.append("id", props.courseData.id);
      form.append("title", formValues.title);
      form.append("language", formValues.language);
      form.append("course", formValues.course);
      form.append("program", formValues.program);
      form.append("price", formValues.price);
      form.append("price1", formValues.price1 ? formValues.price1 : 0);
      form.append("price2", formValues.price2 ? formValues.price2 : 0);
      form.append("description", formValues.description);
      form.append("courseImage", formValues.courseImage);

      // show Loader
      document.getElementById("loader").style.display = "flex";

      const result = await dispatch(updateCourse(form));
      // console.log(result, "Update Result");

      // hide Loader
      document.getElementById("loader").style.display = "none";

      if (result.status === 1) {
        toast.success("Course Edited Successfully");
        props.setModal(false);
      } else {
      }

    } catch (e) {
      console.log(e);
      toast.error("Failed to update");
    }
  };

  return (
    <>
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          {/*    -------------------Header-------------------- */}

          <h3 className={styles.heading}>
            {props.activeTab}
            <i
              className={styles.closeBtn + " fas fa-close"}
              onClick={() => {
                props.setModal(false);
              }}
            ></i>
          </h3>
          <form>
            {/* -----------Body-------------- */}
            <div className={styles.course}>
              <img src={imgUrl} className={styles.coverImg} alt="coverImg" onClick={imageClick} />
              <input type="file" name="courseImage" className={styles.courseImgInput} ref={courseImgInput} onChange={handleFileInput} />
              <div className={styles.courseDetails}>
                <div>
                  {" "}
                  <h4>Language: </h4>
                  <select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="language"
                    disabled={props.modalType === "View" ? true : false}
                  >
                    {Object.keys(languages).map((language) => {
                      return (
                        <>
                          <option value={language} selected={formValues.language === language ? true : false}>{language}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div>
                  {" "}
                  <h4>Course: </h4>
                  <select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="course"
                    id="courseInp"
                    disabled={props.modalType === "View" ? true : false}
                  >
                    <option value="Academics" selected={formValues.course === 'Academics' ? true : false}>Academics</option>
                    <option value="Spoken Languages" selected={formValues.course === 'Spoken Languages' ? true : false}>Spoken Languages</option>
                    <option value="Test Preparation" selected={formValues.course === 'Test Preparation' ? true : false}>Test Preparation</option>
                  </select>
                </div>
                <div>
                  {" "}
                  <h4>Program: </h4>
                  <select
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="program"
                    disabled={props.modalType === "View" ? true : false}
                  >
                    {programs &&
                      programs.map((program) => {
                        return (
                          <option value={program} selected={formValues.program === program ? true : false}>
                            {program}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {props.activeTab === "Courses" ? (
                  <>
                    <div>
                      {" "}
                      <h4>Price ($) : </h4>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="price"
                        value={formValues.price ? formValues.price : ""}
                        disabled={props.modalType === "View" ? true : false}
                      />{" "}
                    </div>
                    <div>
                      {" "}
                      <h4>Price1 ($) : </h4>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="price1"
                        value={formValues.price1 ? formValues.price1 : ""}
                        disabled={props.modalType === "View" ? true : false}
                      />{" "}
                    </div>
                    <div>
                      {" "}
                      <h4>Price2 ($) : </h4>
                      <input
                        onChange={handleChange}
                        type="number"
                        name="price2"
                        value={formValues.price2 ? formValues.price2 : ""}
                        disabled={props.modalType === "View" ? true : false}
                      />{" "}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <input
              onChange={handleChange}
              name="title"
              disabled={props.modalType === "View" ? true : false}
              className={styles.courseName}
              value={formValues.title ? formValues.title : ""}
              placeholder="title"
              style={{ padding: '10px', width: '100%', textAlign: 'center' }}
            />
            <textarea
              disabled={props.modalType === "View" ? true : false}
              className={styles.courseDesc}
              name="description"
              onChange={handleChange}
              placeholder="Description"
              value={formValues.description ? formValues.description : ""}
              style={{ padding: '10px', width: '100%' }}
            ></textarea>
          </form>
          {props.modalType === "Edit" ? (
            <>
              <div className={styles.submitButtonContainer}>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
