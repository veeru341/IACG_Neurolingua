import React, { useState, useRef, useEffect } from 'react';
import './leftSideBar.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import hamburgerIcon from '../../../../assets/icons/hamburger.svg';
import avtar from '../../admin/Avtar.png';
import { toast } from 'react-toastify';
import Logo from '../../../../assets/image/logo.svg';
import { useWindowDimensions } from '../../../../utils/util';

const LeftSideBar = props => {
  const { width } = useWindowDimensions();
  const [teacherData, setTeacherData] = useState()
  const [studentData, setStudentData] = useState()
  const [userProfile, setUserProfile] = useState()
  const [showSideBar, setShowSideBar] = useState(false);
  const nav = useRef();
  const history = useHistory();

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('profile'))
    console.log(userProfile)
    setUserProfile(userProfile)

    if (userProfile.roleModel === "Student") {
      var studentData = JSON.parse(localStorage.getItem('studentData'));
      console.log(studentData)
      setStudentData(studentData?.data)
    } else if (userProfile.roleModel === "Teacher") {
      var teacherData = JSON.parse(localStorage.getItem('teacherData'));
      console.log(teacherData)
      setTeacherData(teacherData)
    }

  }, [])




  const handleClick = e => {
    if (nav.current && !nav.current.contains(e.target)) {
      setShowSideBar(false);
    }
  };

  window.addEventListener('mousedown', handleClick, false);

  // window.addEventListener("scroll", () => {
  //   setShowSideBar(false);
  // });

  const signOut = () => {
    localStorage.clear();
    history.push('/');
    toast.success('Logged out');
  };
  console.log(teacherData && teacherData.teacherProfilePic)
  return (
    <>
      <div
        style={{
          backgroundColor: props.student ? '#FD879F' : '',
          borderRadius: width >= 992 ? '' : '0px',
          paddingTop: width >= 992 ? '' : '20px',
        }}
        className={'sideNav ' + (showSideBar ? 'show-menu' : '')}
        id='navbar'
        ref={nav}
      >
        <nav className='nav__container justify-content-between'>
          {width >= 992 ? (
            <div>
              <NavLink
                className='nav__link nav__logo'
                activeClassName='active'
                to='/'
              >
                <img src={Logo} alt='' style={{ width: '150px' }} />
              </NavLink>
            </div>
          ) : (
            <div
              style={{
                padding: '0 20px',
                marginBottom: '20px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={studentData && studentData.profilePic?.data ? studentData.profilePic?.data : teacherData && teacherData.teacherProfilePic?.data ? teacherData.teacherProfilePic.data : avtar}
                  className='avtar'
                  alt='avtar'
                  style={{ width: '50px' }}
                />
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ fontWeight: '600', fontSize: '24px' }}>
                    {userProfile && userProfile.fullName}
                  </div>
                  <div style={{ fontWeight: '300', fontSize: '18px' }}>
                    <i>{props.student ? 'Student' : 'Teacher'}</i>
                  </div>
                </div>
              </div>

              <div onClick={() => setShowSideBar(false)}>
                <i className='fas fa-times'></i>
              </div>
            </div>
          )}

          <div className='nav__list'>
            <div className='nav__items'>
              {props.list.map((element, i) => {
                return (
                  <>
                    <NavLink
                      onClick={() => setShowSideBar(false)}
                      className='nav__link'
                      activeClassName={
                        props.student
                          ? 'nav__link-active_student'
                          : 'nav__link-active'
                      }
                      to={element.link}
                      style={{
                        width: '100%',
                      }}
                    >
                      <i className={element.iconClass + ' nav__icon'}></i>
                      <span className='nav__name'>{element.name}</span>
                    </NavLink>
                  </>
                );
              })}
              <button className='nav__link signOut' onClick={signOut}>
                <i className='nav__icon fas fa-sign-out-alt'></i>
                <span className='nav__name'>Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {showSideBar ? (
        <></>
      ) : (
        <nav className='navbar mobileNav'>
          <div>
            <img
              src={hamburgerIcon}
              className='hamburgerIcon'
              alt='hamburgerIcon'
              onClick={() => {
                setShowSideBar(true);
              }}
            />
          </div>

          <Link to='/'>
            <div>
              <img src={Logo} alt='' style={{ width: '150px' }} />
            </div>
          </Link>

          <div>
            <img
              src={teacherData && teacherData.teacherProfilePic ? teacherData.teacherProfilePic?.data : studentData && studentData.profilePic ? studentData.profilePic?.data : avtar}
              className='avtar'
              alt='teacher_img'
            />
          </div>
        </nav>
      )}
    </>
  );
};

export default LeftSideBar;
