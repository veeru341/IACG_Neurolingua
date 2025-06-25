import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../../../../store/actions/course/index';
import * as styles from './styles.module.css';
import { languages } from '../../../../../utils/constants';
var FormData = require('form-data');

const CreateCourseModal = props => {
  const [page, setPage] = useState(1);
  const fileInp = React.useRef();
  const [formValues, setFormValues] = useState({
    courseImage: null,
    language: 'English',
    course: 'Academics',
  });

  // to display programs in input
  const [programs, setPrograms] = React.useState([]);

  const dispatch = useDispatch();

  function setProgramsInput() {
    if (!(formValues.language !== '' && formValues.course !== '')) {
      return;
    }
    let programs = languages[formValues.language][formValues.course];
    setPrograms(programs);
  }

  const handlePageChange = pageNumber => {
    if (pageNumber === 2) {
      if (!formValues.title) {
        return toast.warn('Please add title');
      } else if (!formValues.language) {
        return toast.warn('Please select language');
      } else if (!formValues.course) {
        return toast.warn('Please select course');
      } else if (!formValues.program) {
        return toast.warn('Please select program');
      } else {
        setPage(pageNumber);
      }
    }
  };

  const handleChange = e => {
    //  console.log(e);
    if (
      (e.target.name === 'price' ||
        e.target.name === 'price1' ||
        e.target.name === 'price2') &&
      e.target.value <= 0
    ) {
      setFormValues({ ...formValues, [e.target.name]: '' });
      return;
    }
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileInput = e => {
    // console.log(e);
    if (e.target.files.length > 0) {
      console.log(e.target.files[0])
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    // Validating last page of form
    if (!formValues.price) {
      return toast.warn('Please mention price');
    } else if (!formValues.description) {
      return toast.warn('Please describe the course');
    } else if (!formValues.courseImage) {
      return toast.warn('Please upload cover photo');
    } else if (
      formValues.courseImage.type !== 'image/png' &&
      formValues.courseImage.type !== 'image/jpg' &&
      formValues.courseImage.type !== 'image/png' &&
      formValues.courseImage.type !== 'image/jpeg'
    ) {
      return toast.warn('Image Type is not supported');
    }

    console.log('Creating course///');
    // submit data
    var form = new FormData();
    form.append('title', formValues.title);
    form.append('language', formValues.language);
    form.append('course', formValues.course);
    form.append('program', formValues.program);
    form.append('price', formValues.price);
    form.append('price1', formValues.price1 ? formValues.price1 : 0);
    form.append('price2', formValues.price2 ? formValues.price2 : 0);
    form.append('description', formValues.description);
    form.append('courseImage', formValues.courseImage);

    // show Loader
    document.getElementById('loader').style.display = 'flex';
    const result = await dispatch(createCourse(form));
    props.setApiCalled(false);

    // hide Loader
    document.getElementById('loader').style.display = 'none';
    if (result.msg === 'Course Created Successfully') {
      toast.success('Course Created');
      setFormValues({
        courseImage: null,
        language: 'English',
        course: 'Academics',
      });
      setPage(1);
      props.setModal(false);
    } else if (result.msg === 'Admin Verification Pending') {
      toast.error('Admin Verification Pending');
    } else {
      toast.error('Failed to create course');
    }
    console.log(result, 'RESULT');
  };

  React.useEffect(() => {
    if (formValues.language !== '' && formValues.course !== '') {
      setProgramsInput();
    }
  }, [formValues]);

  React.useEffect(() => {
    setFormValues({ ...formValues, program: programs[0] });
  }, [programs]);
  return (
    <>
      {props.showModal ? (
        <>
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              {/*    -------------------Header-------------------- */}
              <i
                className={styles.closeBtn + ' fas fa-close'}
                onClick={() => {
                  props.setModal(false);
                }}
              ></i>
              <h3 className={styles.heading}>Create Course</h3>

              {/* ---------------------Body---------------------- */}
              {page === 1 ? (
                <>
                  <form className={styles.createCourseForm1}>
                    <input
                      onChange={handleChange}
                      type='text'
                      placeholder='Course Title'
                      name='title'
                      value={formValues.title ? formValues.title : ''}
                    />
                    <select
                      onChange={e => {
                        handleChange(e);
                      }}
                      name='language'
                    >
                      <option value='Select Language' defaultValue disabled>
                        Select Language
                      </option>

                      {Object.keys(languages).map(language => {
                        return (
                          <>
                            <option
                              value={language}
                              selected={
                                formValues.language === language ? true : false
                              }
                            >
                              {language}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <select
                      onChange={e => {
                        handleChange(e);
                      }}
                      name='course'
                    >
                      <option value='Select Course' defaultValue disabled>
                        Select Course
                      </option>
                      <option
                        value='Academics'
                        selected={
                          formValues.course === 'Academics' ? true : false
                        }
                      >
                        Academics
                      </option>
                      <option
                        value='Spoken Languages'
                        selected={
                          formValues.course === 'Spoken Languages'
                            ? true
                            : false
                        }
                      >
                        Spoken Languages
                      </option>
                      <option
                        value='Test Preparation'
                        selected={
                          formValues.course === 'Test Preparation'
                            ? true
                            : false
                        }
                      >
                        Test Preparation
                      </option>
                    </select>
                    <select
                      onChange={e => {
                        handleChange(e);
                      }}
                      name='program'
                    >
                      <option value='Select Language' defaultValue disabled>
                        Select Program
                      </option>
                      {programs &&
                        programs.map(program => {
                          return (
                            <option key={program} value={program}>
                              {program}
                            </option>
                          );
                        })}
                    </select>
                  </form>
                </>
              ) : (
                ''
              )}

              {page === 2 ? (
                <>
                  <form className={styles.createCourseForm2}>
                    <input
                      onChange={handleChange}
                      type='number'
                      placeholder='1 Lesson Price'
                      name='price'
                      value={formValues.price ? formValues.price : ''}
                    />
                    <input
                      onChange={handleChange}
                      type='number'
                      placeholder='5 Lesson Price'
                      name='price1'
                      value={formValues.price1 ? formValues.price1 : ''}
                    />
                    <input
                      onChange={handleChange}
                      type='number'
                      placeholder='10 Lesson Price'
                      name='price2'
                      value={formValues.price2 ? formValues.price2 : ''}
                    />

                    <div
                      className={styles.coverPhotoDiv}
                      onClick={() => {
                        fileInp.current.click();
                      }}
                    >
                      {formValues.courseImage
                        ? formValues.courseImage.name
                        : 'Upload Cover Photo'}
                    </div>
                    <input
                      type='file'
                      name='courseImage'
                      ref={fileInp}
                      className={styles.fileInp}
                      onChange={e => {
                        handleFileInput(e);
                      }}
                    />
                    <textarea
                      onChange={handleChange}
                      placeholder='Course Description'
                      name='description'
                      value={
                        formValues.description ? formValues.description : ''
                      }
                    ></textarea>
                  </form>
                </>
              ) : (
                ''
              )}

              {/* ----------------Footer-------------  */}
              {page === 1 ? (
                <button
                  className={styles.nextButton}
                  onClick={() => {
                    handlePageChange(2);
                  }}
                >
                  Next
                </button>
              ) : (
                <></>
              )}

              {page === 2 ? (
                <>
                  <div className={styles.page2Footer}>
                    <button
                      className={styles.prevButton}
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      Previous
                    </button>
                    <button
                      className={styles.submitButton}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit <i class='fas fa-check-circle'></i>
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default CreateCourseModal;
