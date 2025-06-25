import React from "react";
import * as styles from "./styles.module.css";
import UploadMaterial from "./uploadMaterial";

const CreateLesson = (props) => {
  const materialOptions = React.useRef();
  const [materialType, setMaterialType] = React.useState("Link");
  const [showMaterialModal, setShowMaterialModal] = React.useState(false);
  const handleClick = (e) => {
    if (materialOptions.current && !materialOptions.current.contains(e.target)) {
      materialOptions.current.style.display = "none";
    }
  };

  window.addEventListener("mousedown", handleClick, false);

  return (
    <>
      {props.showModal ? (
        <>
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              {/*    -------------------Header-------------------- */}
              <i
                className={styles.closeBtn + " fas fa-close"}
                onClick={() => {
                  props.setModal(false);
                }}
              ></i>
              <h3 className={styles.heading}>Create {props.modalType}</h3>

              {/* -----------------Body ------------------ */}
              <textarea placeholder="Course Description"></textarea>
              {props.modalType === "Lesson" ? <input type="text" placeholder="Course Level" /> : ""}

              <div className={styles.chooseFiles}>
                <button>
                   Cover Image <i className="fas fa-upload"></i>
                  <input type="file" />
                </button>
                <button
                  onClick={() => {
                    materialOptions.current.style.display = "block";
                  }}
                >
                  Add Material <i className="fas fa-add"></i>
                  <ul className={styles.materialOptions} ref={materialOptions}>
                    <li
                      onClick={() => {
                        setMaterialType("Link");
                        setShowMaterialModal(true);
                      }}
                    >
                      Link
                    </li>
                    <li
                      onClick={() => {
                        setMaterialType("File");
                        setShowMaterialModal(true);
                      }}
                    >
                      File
                    </li>
                  </ul>
                </button>
              </div>

              <button className={styles.submitButton}>
                Submit <i class="fas fa-check-circle"></i>
              </button>
            </div>
          </div>

          <UploadMaterial materialType={materialType} showMaterialModal={showMaterialModal} setShowMaterialModal={setShowMaterialModal} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateLesson;
