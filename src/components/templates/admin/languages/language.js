import React from "react";
import * as styles from "./styles.module.css";
import { languages } from "../../../../utils/constants";

const AdminLanguages = () => {
  // to display all the selected programs
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [formValues, setFormValues] = React.useState({ language: "", course: "" });

  // to display programs in input
  const [programs, setPrograms] = React.useState([]);

 
  function addProgram() {
    let tempProgram = selectedPrograms;
    tempProgram.push();
    setSelectedPrograms(tempProgram);
  }

  function setProgramsInput() {
    if (!(formValues.language !== "" && formValues.course !== "")) {
      return;
    }
    let programs = languages[formValues.language][formValues.course];
    setPrograms(programs);
  }

  return (
    <>
      <main className={styles.mainSection}>
        <h3>Languages</h3>

        <form className={styles.createLanguageForm}>
          <div className={styles.formGroup}>
            <label>Language</label>
            <select
              name="language"
              onChange={(e) => {
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                setProgramsInput();
              }}
              value={formValues.language}
            >
              {Object.keys(languages).map((language) => {
                return (
                  <>
                    <option value={language}>{language}</option>
                  </>
                );
              })}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Course</label>
            <select
              name="course"
              onChange={(e) => {
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                console.log(formValues);
                setProgramsInput();
              }}
              value={formValues.course}
            >
              <option value="Academics">Academics</option>
              <option value="Spoken Languages">Spoken Languages</option>
              <option value="Test Preparation">Test Preparation</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Program</label>
            <div className={styles.programInput}>
              <select>
                {programs.map((program) => {
                  return <option value={program}>{program}</option>;
                })}
              </select>
              <button onClick={addProgram}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className={styles.selectedPrograms}>
            {/* {selectedPrograms.map((program)=>{
  return(
    <> */}
            {/* <div className={styles.program}>
              <p>{"program"}</p>
              <i className="fas fa-trash"></i>
            </div> */}
            {/* </>
  )
})} */}
          </div>
        </form>
        <div className={styles.buttonGroup}>
          <button>Create</button>
        </div>
      </main>
    </>
  );
};

export default AdminLanguages;
