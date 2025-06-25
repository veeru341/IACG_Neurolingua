import React from "react";

import * as styles from "./styles.module.css";

const UploadMaterial = (props) => {
    // alert(props.showMaterialModal)
  return (
    <>
      {props.showMaterialModal ? (
        <>
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              {props.materialType === "Link" ? (
                <>
                  <div className={styles.addLink}>
                    <h4>Material Link</h4>
                    <input type="url" required />
                    <button
                      onClick={() => {
                        props.setShowMaterialModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button>Add</button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.addFile}>
                    <h4>Upload File</h4>
                    <div className={styles.chooseFiles}>
                      <button>
                        Choose Image <i className="fas fa-upload"></i>
                        <input type="file" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        props.setShowMaterialModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button>Add</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default UploadMaterial;
