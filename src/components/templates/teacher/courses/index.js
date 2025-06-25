import React from 'react';
import CourseCard from './courseCard/courseCard';
import CreateCourseModal from './createCourseModal/createCourseModal';
import ViewCourse from './viewCourse/viewCourse';
import * as stylesPrev from './styles.module.css';
import CreateLesson from './createLesson/createLesson';
import DeleteConfirmationModal from '../../common/deleteConfirmationModal/deleteConfirmationModal';
import { getMyCourses } from '../../../../store/actions/course';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useWindowDimensions } from '../../../../utils/util';
import * as styles from '../sessions/styles.module.css';

const TeacherCourses = props => {
  const history = useHistory();

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const [apiCalled, setApiCalled] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] =
    React.useState(false);
  const [showCreateLessonModal, setShowCreateLessonModal] =
    React.useState(false);
  const [createLessonModalType, setCreateLessonModalType] = React.useState();

  const [activeTab, setActiveTab] = React.useState('Courses');
  const [mobileDropdown, setMobileDropdown] = React.useState(false);

  const [tabsPhone, setTabsPhone] = React.useState(false);
  const dashboardTabsPhone = React.useRef();

  const [showViewCourse, setShowViewCourse] = React.useState(false);

  // For changeing ViewCourse Modal Type to view or edit
  const [viewCourseType, setViewCourseType] = React.useState();

  // Courses Data States
  const [myCourses, setMyCourses] = React.useState();
  const [selectedCourse, setSelectedCourse] = React.useState();
  const [page, setPage] = React.useState(1);

  const handleClick = e => {
    if (
      dashboardTabsPhone.current &&
      !dashboardTabsPhone.current.contains(e.target)
    ) {
      setTabsPhone(false);
    }
  };

  window.addEventListener('mousedown', handleClick, false);

  React.useEffect(() => {
    setApiCalled(true);

    let userObj = JSON.parse(window.localStorage.getItem('profile'));

    if (!userObj.isOnBoarding) {
      toast.warn('Onboarding Pending');
      return history.push('/teacher/onboard');
    }

    let teacherData = JSON.parse(window.localStorage.getItem('teacherData'));
    if (teacherData.approvalStatus !== 'verified') {
      toast.warn('Admin Verification Pending');
      return history.push('/teacher/dashboard');
    }
    async function getCourses() {
      try {
        const result = await dispatch(getMyCourses(userObj._id));
        if (result.data) {
          setMyCourses(result.data);
        }
      } catch (e) {
        console.log(e);
        toast.error('Failed to fetch your courses');
      }
    }
    getCourses();
  }, [dispatch, page, !apiCalled]);
  // console.log(selectedCourse);

  const tabs = ['Courses', 'Lesson Plans', 'Homework'];

  return (
    <>
      {showConfirmationModal && selectedCourse ? (
        <>
          <DeleteConfirmationModal
            showModal={showConfirmationModal}
            handleModal={setShowConfirmationModal}
            selectedCourse={selectedCourse}
            setApiCalled={setApiCalled}
          />
        </>
      ) : (
        <></>
      )}

      <CreateCourseModal
        showModal={showCreateCourseModal}
        setModal={setShowCreateCourseModal}
        setApiCalled={setApiCalled}
      />

      <CreateLesson
        showModal={showCreateLessonModal}
        setModal={setShowCreateLessonModal}
        modalType={createLessonModalType}
      />

      {showViewCourse && selectedCourse ? (
        <>
          <ViewCourse
            showModal={showViewCourse}
            setModal={setShowViewCourse}
            modalType={viewCourseType}
            activeTab={activeTab}
            courseData={selectedCourse}
            setApiCalled={setApiCalled}
          />
        </>
      ) : (
        <></>
      )}

      <main className={stylesPrev.mainSection}>
        {width >= 992 ? (
          <>
            <div className={styles.sessionTabs}>
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={
                    styles.sessionTab +
                    ' ' +
                    `${activeTab === item ? styles.sessionTabActive : ''} `
                  }
                  onClick={() => {
                    setActiveTab(item);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className={styles.sessionTabs}>
              <div className={styles.sessionTabHeading}>{activeTab}</div>
              <div
                className={styles.arrowIcon}
                onClick={() => setMobileDropdown(!mobileDropdown)}
              >
                {mobileDropdown ? (
                  <i class='fas fa-caret-up'></i>
                ) : (
                  <i class='fas fa-caret-down'></i>
                )}
              </div>
            </div>
            {mobileDropdown ? (
              <div style={{ position: 'relative' }}>
                <div className={styles.mobileDropdown}>
                  {tabs.map((item, index) => (
                    <div
                      key={index}
                      className={
                        styles.sessionTab +
                        ' ' +
                        `${
                          activeTab === item
                            ? styles.sessionTabActiveDropdown
                            : ''
                        } `
                      }
                      onClick={() => {
                        setActiveTab(item);
                        setMobileDropdown(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}

        <div
          className={styles.scrollBarNone}
          style={{
            marginTop: '10px',
            height: '75vh',
          }}
        >
          <div className={stylesPrev.courses} style={{ height: '100%' }}>
            {activeTab === 'Courses' && myCourses ? (
              <>
                {myCourses.map((course, i) => {
                  return (
                    <>
                      <CourseCard
                        key={i}
                        openViewCourse={setShowViewCourse}
                        setViewCourseType={setViewCourseType}
                        activeTab={activeTab}
                        setShowConfirmationModal={setShowConfirmationModal}
                        courseData={course}
                        setSelectedCourse={setSelectedCourse}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                <h4 style={{ textAlign: 'center', marginTop: '1em' }}>
                  No Courses Found
                </h4>
              </>
            )}
          </div>
          <div className={stylesPrev.createCourse}>
            {/* Create Course Button  */}
            {activeTab === 'Courses' ? (
              <>
                <button
                  onClick={() => {
                    setShowCreateCourseModal(true);
                  }}
                >
                  Create Course
                </button>
              </>
            ) : (
              ''
            )}

            {/* Create Lesson Button  */}
            {activeTab === 'Lesson Plans' ? (
              <>
                <button
                  onClick={() => {
                    setShowCreateLessonModal(true);
                    setCreateLessonModalType('Lesson');
                  }}
                >
                  New Lesson Plan
                </button>
              </>
            ) : (
              ''
            )}

            {/* Create Homework Button  */}
            {activeTab === 'Homework' ? (
              <>
                <button
                  onClick={() => {
                    setShowCreateLessonModal(true);
                    setCreateLessonModalType('Homework');
                  }}
                >
                  New Homework
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default TeacherCourses;
