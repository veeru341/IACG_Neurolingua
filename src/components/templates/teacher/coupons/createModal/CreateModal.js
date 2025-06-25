import React from 'react';
import * as modalStyles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCouponSlot } from '../../../../../store/actions/coupon';
import reactSelect from 'react-select';
import { getMyCourses } from '../../../../../store/actions/course';

const CreateModal = props => {
  const dispatch = useDispatch();
  const { setCreateModal, width, coupons, setCoupons, setApiCall } = props;

  const [formData, setFormData] = React.useState({
    couponCode: '',
    validTill: '',
    discountAmt: '',
  });
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

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
    // console.log("qw", e);
    const data = {
      ...formData,
      courses: selectedCourses,
    };

    try {
      const result = await dispatch(addCouponSlot(data));
      console.log(result.status);
      if (result.status){
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
      
      setFormData({
        couponCode: '',
        validTill: '',
        discountAmt: '',
        description: '',
      });
      setCreateModal(false);
      setApiCall(false);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  return (
    <>
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + ' fas fa-close'}
            onClick={() => {
              setCreateModal(false);
            }}
          ></i>
          <h3 className={modalStyles.modalHeading}>Create Coupon</h3>
          <div style={{ marginTop: '20px' }}></div>

          {/* {width >= 992 ? (
            <> */}
          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: '30px' }}>
              <div className={modalStyles.inputFormat}>
                <div>
                  {/* <label htmlFor='couponCode'>Coupon Name: </label> */}
                  <input
                    type='text'
                    id='couponCode'
                    placeholder='Coupon Name'
                    value={formData.couponCode}
                    required
                    onChange={e => {
                      setFormData({
                        ...formData,
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
                  placeholder='Percentage Discount'
                  id='discountAmt'
                  value={formData.discountAmt}
                  required
                  onChange={e => {
                    setFormData({
                      ...formData,
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
                  value={formData.validTill}
                  required
                  onChange={e => {
                    setFormData({ ...formData, validTill: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor='language'>Courses </label>

                {courses &&
                  courses?.map(course => (
                    <div>
                      <input
                        type='checkbox'
                        name='courses'
                        value={course.id}
                        id={`language-type-${course.id}`}
                        className='mr-2 mt-1 accent-purple-500'
                        onChange={event => {
                          console.log(event.target.checked);
                          console.log(event.target.value);
                          let coursesSelected = selectedCourses;
                          let check = event.target.checked;
                          let check_course = event.target.value;
                          if (check) {
                            setSelectedCourses([
                              ...selectedCourses,
                              check_course,
                            ]);
                          } else {
                            var index = coursesSelected.indexOf(check_course);
                            if (index > -1) {
                              coursesSelected.splice(index, 1);
                              setSelectedCourses(coursesSelected);
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
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <div
                onClick={() => setCreateModal(false)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '10px',
                  border: '1px solid #9fcce6',
                  padding: '10px 20px',
                }}
              >
                Cancel
              </div>
              <button
                type='submit'
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  backgroundColor: '#9fcce6',
                  borderRadius: '10px',
                  padding: '10px 20px',
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
