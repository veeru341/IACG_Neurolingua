/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useWindowDimensions } from '../../../../utils/util';
import CouponCard from './CouponCard/CouponCard';
import * as styles from './styles.module.css';
import moment from "moment"
import CreateModal from './createModal/CreateModal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  deleteCouponSlot,
  viewCouponByUser,
} from '../../../../store/actions/coupon';
import EditModal from './createModal/EditModal';
import english from '../../../../assets/flags/english.png';

function TeacherCoupons(props) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [page, setPage] = React.useState(1);
  const tableHeader = ['All Coupons', 'Redeemed', 'Expired'];

  const [coupons, setCoupons] = React.useState([
    // { name: 'Coupon 1', percentOff: '50%', redeemed: false, isActive: true, country: 'ABC' },
    // { name: 'Coupon 2', percentOff: '30%', redeemed: false, isActive: true, country: 'ABC' },
    // { name: 'Coupon 3', percentOff: '60%', redeemed: true, isActive: true, country: 'ABC' },
    // { name: 'Coupon 4', percentOff: '0%', redeemed: true, isActive: true, country: 'ABC' },
    // { name: 'Coupon 5', percentOff: '10%', redeemed: true, isActive: false, country: 'ABC' },
    // { name: 'Coupon 6', percentOff: '80%', redeemed: false, isActive: true, country: 'ABC' },
    // { name: 'Coupon 7', percentOff: '60%', redeemed: false, isActive: false, country: 'ABC' },
    // { name: 'Coupon 8', percentOff: '30%', redeemed: false, isActive: true, country: 'ABC' },
    // { name: 'Coupon 9', percentOff: '60%', redeemed: true, isActive: true, country: 'ABC' }
  ]);
  const [searchQuery, setSearchQuery] = React.useState('All Coupons');
  const [createModal, setCreateModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [editUser, setEditser] = React.useState();
  const [apiCall, setApiCall] = React.useState(false);
  const [mobileDropdown, setMobileDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Coupons');
  const [teacherName, setTeacherName] = React.useState()

  React.useEffect(async () => {
    const teacherName = JSON.parse(localStorage.getItem('teacherData')).firstName.data
    console.log(teacherName)
    setTeacherName(teacherName)
    setApiCall(true);
    try {
      const result = await dispatch(viewCouponByUser(searchQuery, page));
      // console.log(result)
      setCoupons(result);
    } catch (error) {
      console.log(error);
    }
  }, [!apiCall]);

  return (
    <>
      {createModal ? (
        <CreateModal
          setCreateModal={setCreateModal}
          width={width}
          coupons={coupons}
          setCoupons={setCoupons}
          setApiCall={setApiCall}
        />
      ) : (
        <></>
      )}
      <main className={styles.mainSection}>
        {width >= 992 ? (
          <div className={styles.sessionTabs}>
            <div>
              {' '}
              <h1> Coupons</h1>{' '}
            </div>{' '}
            <div className={styles.sessionshow}>
              {tableHeader.map((item, index) => (
                <div
                  key={index}
                  className={
                    styles.sessionTab
                    //  + ' ' + `${activeTab === item ? styles.sessionTabActive : ''}`
                  }
                  onClick={() => {
                    setSearchQuery(item);
                    setApiCall(false);
                  }}
                >
                  {item}
                </div>
              ))}
              <div
                className={
                  styles.sessionTabAdd
                  //  + ' ' + `${activeTab === item ? styles.sessionTabActive : ''}`
                }
                style={{ margin: '0px 20px' }}
                onClick={() => setCreateModal(true)}
              //  onClick={() => {  setSearchQuery(item)
              // setApiReload(false) }}
              >
                <span className='fa fa-plus'></span>
              </div>
            </div>
          </div>
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
                  {tableHeader.map((item, index) => (
                    <div
                      key={index}
                      className={
                        styles.sessionTab +
                        ' ' +
                        `${activeTab === item
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
                  <div
                    className={styles.sessionTab}
                    onClick={() => setCreateModal(true)}
                  //  onClick={() => {  setSearchQuery(item)
                  // setApiReload(false) }}
                  >
                    Add Course
                    <span className='fa fa-plus'></span>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}

        <div>
          {/* <div style={{ width: '100px', color: '#fff', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', padding: '10px 20px', backgroundColor: '#9fcce6' }}
                        onClick={() => setCreateModal(true)}
                    >
                        Create
                    </div> */}
        </div>

        {/* <table className={styles.tableStyles}>
                    <thead>
                        <tr style={{ fontWeight: 'bold', backgroundColor: '#9fcce6' }}>
                            {tableHeader.map((item, index) => (
                                <th key={index} style={{ padding: '10px 20px', border: '1px solid black' }}>
                                    {item}
                                    <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                                </th>
                            ))}
                        </tr>
                    </thead>

                        </table> */}
        {/* <tbody> */}

        <div>

        </div>
        {coupons ? (
          <>
            {coupons.map((item, index) => {
              // console.log(item)
              let x = new Date(item.validTill);
              let y = `${x.getDate()}-${x.getMonth()}-${x.getFullYear()}`;
              // let y = new Date(x.getTime() + 1800000)

              return (
                <CouponCard
                  CourseName={item.couponCode}
                  teacherName={teacherName}
                  expDate={moment(item.validTill).format("MMMM DD, YYYY")}
                  price={item.discountAmt}
                />
                // <Card
                //   item={item}
                //   index={index}
                //   today={y}
                //   setEditModal={setEditModal}
                //   setEditUser={setEditser}
                //   setApiCall={setApiCall}
                // />
              );
            })}
          </>
        ) : (
          <>No Coupon </>
        )}
        {/* </tbody> */}
        {editModal ? (
          <EditModal
            setEditModal={setEditModal}
            width={width}
            editUser={editUser}
            setEditUser={setEditser}
            setApiCall={setApiCall}
          />
        ) : (
          <></>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20px',
          }}
        >
          {/* <div
            className={styles.sessionTab}
            style={{ width: 200 + 'px' }}
            onClick={() => {
              setPage(page - 1);
              setApiCall(false);
            }}
          >
            {' '}
            Back
          </div>
          <div
            className={styles.sessionTab}
            style={{ width: 200 + 'px' }}
            onClick={() => {
              setPage(page + 1);
              setApiCall(false);
            }}
          >
            {' '}
            Next
          </div> */}
        </div>
      </main>
    </>
  );
}

const TableRow = ({
  item,
  index,
  setEditModal,
  setEditUser,
  setApiCall,
  today,
}) => {
  const dispatch = useDispatch();
  const [showActions, setShowActions] = React.useState(false);
  const handleDelete = async id => {
    try {
      const result = await dispatch(deleteCouponSlot(id));
      console.log(result);
      toast.success(result.msg);
      setApiCall(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <tr key={index} style={{ textAlign: 'center' }}>
      <td style={{ padding: '7px' }}>{item.couponCode}</td>
      <td style={{ padding: '7px' }}>{item.isVerified ? 'Yes' : 'No'}</td>
      <td style={{ padding: '7px' }}>{item.discountAmt}</td>
      <td style={{ padding: '7px' }}>{item.validTill}</td>
      <td style={{ padding: '7px' }}>{item.language}</td>
      <td style={{ padding: '7px' }}>
        <i
          style={{ cursor: 'pointer' }}
          class='fas fa-ellipsis-v'
          onClick={() => setShowActions(!showActions)}
        ></i>
        {showActions ? (
          <div
            style={{
              backgroundColor: '#9fcce6',
              color: '#fff',
              textAlign: 'left',
              border: '1px solid',
              padding: '10px',
              borderRadius: '10px',
              position: 'absolute',
            }}
          >
            {/* <div>Promote</div> */}
            <div
              onClick={() => {
                setEditModal(true);
                setEditUser(item);
              }}
            >
              Edit
            </div>
            <div
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </div>
          </div>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

const Card = props => {
  const { item, index, setEditModal, setEditUser, setApiCall, today } = props;
  const dispatch = useDispatch();
  const [showActions, setShowActions] = React.useState(false);
  const handleDelete = async id => {
    try {
      const result = await dispatch(deleteCouponSlot(id));
      console.log(result);
      toast.success(result.msg);
      setApiCall(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className={styles.cardContainer}>
        <img
          src={english}
          className={styles.cardImg}
          alt='https://images.pexels.com/photos/13064584/pexels-photo-13064584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        />
        <div>
          <h4 className={styles.cardText1}>{item?.couponCode}</h4>
          <div style={{ fontSize: '20px' }}>{item?.language}</div>
          {item?.date}
        </div>
        <div style={{ minWidth: '100px' }}>
          <h4 className={styles.cardText1}>Details</h4>
          {/* <div style={{ fontSize: '20px' }}>{item.language ? item.language : 'language'}</div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i class='far fa-clock'></i>
            <div>{today}</div>
          </div>
        </div>

        <div>
          <div
            className={styles.viewButton}
            onClick={() => setShowActions(!showActions)}
          >
            <div>View</div>
            {showActions ? (
              <i style={{ marginLeft: '10px' }} class='fas fa-caret-up'></i>
            ) : (
              <i style={{ marginLeft: '10px' }} class='fas fa-caret-down'></i>
            )}
          </div>
          {showActions ? (
            <div style={{ position: 'relative' }}>
              <div className={styles.viewDropdown}>
                <div style={{ position: 'sticky' }}>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '10px 10px 0 0',
                      backgroundColor: '#359cd7',
                      color: '#fffefe',
                    }}
                  >
                    <div
                      className={styles.dropdownButton}
                      style={{ marginBottom: '10px' }}
                      onClick={() => {
                        setEditModal(true);
                        setEditUser(item);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className={styles.dropdownButton}
                      style={{ marginBottom: '10px' }}
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '0 0 10px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: '#fffefe',
                      backgroundColor: '#f83030',
                    }}
                    onClick={() => {
                      alert('Cancel!');
                      setShowActions(false);
                    }}
                  >
                    <div className={styles.dropdownButton}>Cancel</div>
                    <i class='fas fa-trash'></i>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherCoupons;
