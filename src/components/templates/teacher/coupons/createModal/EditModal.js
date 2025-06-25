import React from "react";
import * as modalStyles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editCouponSlot } from "../../../../../store/actions/coupon";
import { getMyCourses } from "../../../../../store/actions/course";

const EditModal = (props) => {
  const dispatch = useDispatch();
  const { setEditModal, width, editUser, setEditUser } = props;
  // const [selectedCourses, setSelectedCourses] = React.useState([
  //   ...editUser?.courses,
  // ]);
  const [courses, setCourses] = React.useState([]);

  console.log("editUser", editUser);

  React.useEffect(() => {
    async function getCourses() {
      try {
        const result = await dispatch(getMyCourses());
        if (result.data) {
          setCourses(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCourses();
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    // setEditUser({ ...editUser, courses: selectedCourses });

    try {
      const result = await dispatch(editCouponSlot(editUser, editUser.id));
      console.log(result);
      toast.success(result.msg);

      setEditModal(false);
      props.setApiCall(false);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  // console.log(selectedCourses);

  return (
    <>
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => {
              setEditModal(false);
            }}></i>
          <h3 className={modalStyles.modalHeading}>Edit Coupon</h3>
          <div style={{ marginTop: "20px" }}></div>

          {width >= 992 ? (
            <>
              {/* Body */}
              <form onSubmit={handleSubmit}>
                <div style={{ marginTop: "30px" }}>
                  <div className={modalStyles.inputFormat}>
                    <div>
                      {/* <label htmlFor='couponCode'>Coupon Name: </label> */}
                      <input
                        type='text'
                        id='couponCode'
                        placeholder='Coupon Name'
                        value={editUser.couponCode}
                        onChange={(e) => {
                          setEditUser({
                            ...editUser,
                            couponCode: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={modalStyles.inputFormat}>
                    {/* <label htmlFor='discountAmt'>Percentage Off: </label> */}
                    <input
                      type='number'
                      placeholder='Discount'
                      id='discountAmt'
                      value={editUser.discountAmt}
                      onChange={(e) => {
                        setEditUser({
                          ...editUser,
                          discountAmt: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className={modalStyles.inputFormat}>
                    {/* <label htmlFor='validTill'>Valid Till : </label> */}
                    <input
                      type='date'
                      id='validTill'
                      value={editUser.validTill}
                      onChange={(e) => {
                        setEditUser({ ...editUser, validTill: e.target.value });
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor='language'>Language </label>

                    {courses &&
                      courses.map((course) => (
                        <div>
                          <input
                            type='checkbox'
                            name='courses'
                            value={course.id}
                            id={`language-type-${course.id}`}
                            className='mr-2 mt-1 accent-purple-500'
                            defaultChecked={
                              editUser.courses.includes(course.id)
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              let coursesSelected = editUser.courses;
                              let check = event.target.checked;
                              let check_course = event.target.value;
                              if (check) {
                                setEditUser((prev) => {
                                  return {
                                    ...prev,
                                    courses: [
                                      ...editUser.courses,
                                      check_course,
                                    ],
                                  };
                                });
                              } else {
                                var index =
                                  coursesSelected.indexOf(check_course);
                                if (index > -1) {
                                  coursesSelected.splice(index, 1);
                                  // setSelectedCourses(coursesSelected);
                                  setEditUser((prev) => {
                                    return {
                                      ...prev,
                                      courses: coursesSelected,
                                    };
                                  });
                                }
                              }
                            }}
                          />
                          <label htmlFor={`language-type-${course.id}`}>
                            {course.title.data}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "30px",
                  }}>
                  <div
                    onClick={() => setEditModal(false)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "10px",
                      border: "1px solid #9fcce6",
                      padding: "10px 20px",
                    }}>
                    Cancel
                  </div>
                  <button
                    type='submit'
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      backgroundColor: "#9fcce6",
                      borderRadius: "10px",
                      padding: "10px 20px",
                    }}>
                    Save
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* <SubmitButton onClick={() => { alert("Submit!"); setEditModal(false) }} /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditModal;
