import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createConversation } from '../../../../../store/actions/conversations';
import { useWindowDimensions } from '../../../../../utils/util';
import "./currTeachercard.css"

const CurrTeacherCard = ({ tinfo }) => {
  const [showOtherOptions, setShowOtherOptions] = React.useState(false);
  const otherOptions = React.useRef();
  const history = useHistory()
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  // const handleBtnClick = (bname) => {
  //   if (bname === "Join Class") openLiveClass()
  // }

  const openMessage = async () => {
    let userProfile = JSON.parse(window.localStorage.getItem("profile"));
    console.log(userProfile?._id, tinfo.userId)
    const bodyObj = {
      senderId: userProfile?._id,
      receiverId: tinfo.userId
    }
    console.log(bodyObj)
    try {
      const res = await dispatch(createConversation(bodyObj))
      // console.log("reaching here")
      console.log(res)
      setShowOtherOptions(false);
      if (res.status){
        history.push({
          pathname: "/student/messages",
          state: { cchat: res}
        })
      } else {
        history.push({
          pathname: "/student/messages",
          state: { cchat: res.conv[0]}
        })
      }
      

    } catch (err) {
      console.log(err)
    }
    
  }

  const dropDownArr = [
    { text: 'Message the teacher', onclick: openMessage },
    { text: 'View lesson history' },
    { text: 'Remove from this list' },
  ]

  const handleClick = e => {
    if (otherOptions.current && !otherOptions.current.contains(e.target)) {
      setShowOtherOptions(false);
    }
  };
  window.addEventListener('mousedown', handleClick, false);

  return (
    <>
      {width >= 992 ?
        <div className="cardContainer">
          {/* header */}
          <div className="header">
            <div className="pInfo">
              <div className="imgContainer">
                <img src={tinfo.teacherProfilePic?.data} alt="teacher profile picture" style={{ height: "80px", width: "80px", borderRadius: "50%" }} />
                <img src={"/flags/" + tinfo.motherTongue?.data.toLowerCase() + ".png"} className="flag"></img>
              </div>
              <div className="pcontent">
                <div className="teachername">{tinfo.firstName?.data}</div>
                <div className="profession">{tinfo.teacherType?.data}</div>
                <div className="rating">
                  <div className="stars" style={{ color: "gold" }}>
                    <i class="fa-solid fa-star" ></i>
                    <span>4.9</span>
                  </div>
                  <div className="lessons">
                    230 lessons
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* below portion */}
          <div className="belowPortion">
            <div className="selfIntro">
              {tinfo.selfIntro?.data}
            </div>
            <div className="languageSec">
              <div className="teaches">
                <div style={{ marginBottom: "0.1rem", color: "gray" }}>TEACHES</div>
                <div style={{ display: 'flex', gap: "0.2rem" }}>
                  {tinfo.languageTeach.map((item, index) => {
                    return (
                      <div style={{ display: 'flex', gap: "0.2rem" }}>
                        <span key={index}>{item.data}</span>
                        {index + 1 === tinfo.languageTeach.length ? <span></span> : <span>,</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="speaks">
                <div style={{ marginBottom: "0.1rem", color: "gray" }}>ALSO SPEAKS</div>
                <div style={{ display: 'flex', gap: "0.2rem" }}>
                  {tinfo.languageSpeak.map((item, index) => {
                    return (
                      <div style={{ display: 'flex', gap: "0.2rem" }}>
                        <span key={index}>{item.data}</span>
                        {index + 1 === tinfo.languageSpeak.length ? <span></span> : <span>,</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="rate">
                <div style={{ marginBottom: "0.4rem", color: "gray" }}>HOURLY RATE</div>
                <div>INR 555.94</div>
              </div>
            </div>
          </div>
          <div className='btnContainer'>
            <button className="scheduleBtn">Schedule a lesson</button>
            <div className="moreOptions" ref={otherOptions}>
              <i
                className={"moreOptionsIcon" + ' fas fa-ellipsis-h'}
                onClick={() => {
                  setShowOtherOptions(true);
                }}
              ></i>
              <ul
                className={
                  "otherOptions" +
                  ' ' +
                  (showOtherOptions ? "showOptions" : '')
                }
              >{
                  dropDownArr && dropDownArr.map((item, index) => {
                    return (<li
                      onClick={() => {
                        item.onclick();
                      }}
                      key={index}
                    >
                      <div>{item.text}</div>
                    </li>)
                  })
                }

              </ul>
            </div>
          </div>
        </div>
        :
        // Mobile View 
        <div className="cardContainer">
          {/* header */}
          <div className="header">
            <div className="pInfo">
              <div className="imgContainer">
                <img src={tinfo.teacherProfilePic?.data} alt="teacher profile picture" style={{ height: "80px", width: "80px", borderRadius: "50%" }} />
                <img src={"/flags/" + tinfo.motherTongue?.data.toLowerCase() + ".png"} className="flag"></img>
              </div>
              <div className="pcontent">
                <div className="teachername">{tinfo.firstName?.data}</div>
                <div className="profession">{tinfo.teacherType?.data}</div>
                <div className="rating">
                  <div className="stars" style={{ color: "gold" }}>
                    <i class="fa-solid fa-star" ></i>
                    <span>4.9</span>
                  </div>
                  <div className="lessons">
                    230 lessons
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <button className="btn" onClick={() => handleBtnClick()}>{btnName}</button> */}
              <div className="moreOptions" ref={otherOptions}>
                <i
                  className={"moreOptionsIcon" + ' fas fa-ellipsis-h'}
                  onClick={() => {
                    setShowOtherOptions(true);
                  }}
                ></i>
                <ul
                  className={
                    "otherOptions" +
                    ' ' +
                    (showOtherOptions ? "showOptions" : '')
                  }
                >{
                    dropDownArr && dropDownArr.map((item, index) => {
                      return (<li
                        onClick={() => {
                          item.onclick();
                        }}
                      >
                        <div>{item.text}</div>
                      </li>)
                    })
                  }

                </ul>
              </div>
            </div>
          </div>
          {/* below portion */}
          <div className="belowPortion">
            <div className="selfIntro">
              {tinfo.selfIntro?.data}
            </div>
            <div className="languageSec">
              <div className="teaches">
                <div style={{ marginBottom: "0.4rem", color: "gray" }}>TEACHES</div>
                <div style={{ display: 'flex', gap: "0.2rem" }}>
                  {tinfo.languageTeach.map((item, index) => {
                    return (
                      <div style={{ display: 'flex', gap: "0.2rem" }}>
                        <span key={index}>{item.data}</span>
                        {index + 1 === tinfo.languageTeach.length ? <span></span> : <span>,</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="speaks">
                <div style={{ marginBottom: "0.4rem", color: "gray" }}>ALSO SPEAKS</div>
                <div style={{ display: 'flex', gap: "0.2rem" }}>
                  {tinfo.languageSpeak.map((item, index) => {
                    return (
                      <div style={{ display: 'flex', gap: "0.2rem" }}>
                        <span key={index}>{item.data}</span>
                        {index + 1 === tinfo.languageSpeak.length ? <span></span> : <span>,</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="rate">
                <div style={{ marginBottom: "0.4rem", color: "gray" }}>HOURLY RATE</div>
                <div>INR 555.94</div>
              </div>
            </div>
            <div className="scheduleBtnContainer">
              <button className="scheduleBtn">Schedule a lesson</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default CurrTeacherCard