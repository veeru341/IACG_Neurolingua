import React, { useState } from "react";
//images
import flexibilityImg from "../../assets/image/flexibilityImg.png";
import buildImg from "../../assets/image/buildImg.png";
import communityImg from "../../assets/image/communityImg.png";
import earnImg from "../../assets/image/earnImg.png";
import securePaymentImg from "../../assets/image/securePaymentImg.png";
import workImg from "../../assets/image/workImg.png";
import arrowForward from "../../assets/image/Vector-3.png";
import arrowDown from "../../assets/icons/down_arrow_icon.svg";
import arrowUp from "../../assets/icons/up-arrow.svg";

import { useHistory } from 'react-router-dom';

//css
import "./Teacher.css";

const Teacher = () => {
  const [clicked, setClicked] = useState(null);
  const history = useHistory();

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  return (
    <div className="teacher_section">
      <div className="teacher_main_banner">
        <span className="teacher_banner_line">
          <span className="teacher_paid">Get paid</span> to help others&nbsp;
        </span>
        <span>speak your language</span>
        <p>connect with new students across the globe.</p>
        <button className="teacher_apply_btn" onClick={() => { history.push('/auth/signup', { role: 'Teacher' }) }}>
          Apply Now &nbsp; <img src={arrowForward} alt="errImg" />
        </button>
      </div>

      <div className="teacher_earn teacher_center">
        <span>
          {" "}
          <p>Earn from home</p> by teaching students
          <br /> across the globe
        </span>
        <div className="teacher_cards teacher_center">
          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={flexibilityImg} alt="img" />
            <div className="teacher_card_right">
              <p className="teacher_card_head">Ultimate Flexibility</p>
              <p className="teacher_card_body">Teach full-time, part-time, or occasionally and set your own hours and session fees.</p>
            </div>
          </div>

          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={workImg} alt="img" />
            {/* <div className="t_card_left"><img src={workImg} alt="img" /></div> */}
            <div className="teacher_card_right">
              <p className="teacher_card_head">Work from anywhere</p>
              <p className="teacher_card_body">Teach students anywhere you live, at any time.</p>
            </div>
          </div>
          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={earnImg} alt="img" />
            {/* <div className="teacher_card_left"><img src={earnImg} alt="img" /></div> */}
            <div className="teacher_card_right">
              <p className="teacher_card_head">Earn from home</p>
              <p className="teacher_card_body">Set your own hourly fees and cash out your earnings at any time.</p>
            </div>
          </div>
          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={securePaymentImg} alt="img" />
            {/* <div className="teacher_card_left"><img src={securePaymentImg} alt="img" /></div> */}
            <div className="teacher_card_right">
              <p className="teacher_card_head">Secure payments</p>
              <p className="teacher_card_body">You wil receive your earnings directly from your Neurolingua account to your bank account.</p>
            </div>
          </div>
          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={buildImg} alt="img" />
            {/* <div className="teacher_card_left"><img src={buildImg} alt="img" /></div> */}
            <div className="teacher_card_right">
              <p className="teacher_card_head">Build your Identity</p>
              <p className="teacher_card_body">Utilize your skills and time to teach students online and build your own identity.</p>
            </div>
          </div>
          <div className="teacher_card teacher_center">
            <img className="teacher_card_image" src={communityImg} alt="img" />
            {/* <div className="teacher_card_left"><img src={communityImg} alt="img" /></div> */}
            <div className="teacher_card_right">
              <p className="teacher_card_head">International community</p>
              <p className="teacher_card_body">Access to international students across the globe.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="teacher_video_container">
        <div className="teacher_section_title">
          <h2>How It Works?</h2>
        </div>
        <div className="teacher_row teacher_center">
          <div className="teacher_row_card teacher_center">
            <div className="teacher_card_icon teacher_bg1 teacher_center">{/* <Search/> */}1</div>
            <div className="teacher_card_content teacher_center">
              <span>Sign up for free</span>
              <p>Create your profile and submit for approval. Once it is approved you will be listed on our website.</p>
            </div>
          </div>
          <div className="teacher_row_card teacher_center">
            <div className="teacher_card_icon teacher_bg2 teacher_center">{/* <Info/> */}2</div>
            <div className="teacher_card_content teacher_center">
              <span>Introduction Video</span>
              <p>Record a video explaining about yourself, your teaching experience and skill set.</p>
            </div>
          </div>
          <div className="teacher_row_card0 teacher_center">
            <div className="teacher_card_icon teacher_bg3 teacher_center">{/* <Like/> */}3</div>
            <div className="teacher_card_content teacher_center">
              <span>Enhance your student base</span>
              <p>Start teaching on Neurolingua platform, reach out to more number of students across the globe.</p>
            </div>
          </div>
        </div>
        <div className="teacher_video">
          {/* <video controls="controls" x-webkit-airplay="allow" data-youtube-id="N9oxmRT2YWw"
            src="https://youtu.be/3zPNkKS98NY">
          </video> */}
          <iframe
            src="https://www.youtube.com/embed/3zPNkKS98NY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="teacher_faq teacher_center">
        <p className="teacher_faq_head">Frequently Asked Question</p>
        <div className="teacher_faq_ques">
          <p className="teacher_faq_title">Application</p>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(1)}>
              How do I apply to teach?
              {clicked === 1 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 1 && <p className="teacher_ans">Sign up for free and submit your application by completing the registration process.</p>}
          </div>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(2)}>
              When I will hear back from Neurolingua?
              {clicked === 2 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 2 && (
              <p className="teacher_ans">
                You will receive an email from our team with the application status within 5 working days of submitting your application.
              </p>
            )}
          </div>
        </div>
        <div className="teacher_faq_ques">
          <p className="teacher_faq_title">Teaching</p>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(3)}>
              Who set fees for my sessions?
              {clicked === 3 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 3 && <p className="teacher_ans">Teachers set their own hourly fee.</p>}
          </div>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(4)}>
              How many private sessions can I take?
              {clicked === 4 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 4 && <p className="teacher_ans">There is no limit to the number of sessions you can take.</p>}
          </div>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(5)}>
              How do I get students on Neurolingua?
              {clicked === 5 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 5 && (
              <p className="teacher_ans">
                Neurolingua is one of the best 1-on-1 online language-learning platforms. The platform has “built-in tools” to carry out the online
                learning process smoothly and allows you to connect to a huge community of students.
              </p>
            )}
          </div>
        </div>
        <div className="teacher_faq_ques teacher_teacher_faq_mar">
          <p className="teacher_faq_title">Payment</p>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(6)}>
              How do I get paid?
              {clicked === 6 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 6 && (
              <p className="teacher_ans">After the student pays for the session, your earnings will get credited to your Neurolingua account.</p>
            )}
          </div>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(7)}>
              When can I withdraw my earnings?
              {clicked === 7 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 7 && (
              <p className="teacher_ans">You can withdraw your earnings after 5 working days from the completion for your session/sessions.</p>
            )}
          </div>
          <div className="teacher_faq_box">
            <p className="teacher_ques teacher_center" onClick={() => toggle(8)}>
              How do I withdraw money from my teacher account?
              {clicked === 8 ? (
                <img className="teacher_arrow_up" src={arrowUp} alt="errImg" />
              ) : (
                <img className="teacher_arrow_down" src={arrowDown} alt="errImg" />
              )}
            </p>
            {clicked === 8 && <p className="teacher_ans">You can withdraw your earnings from your Neurolingua account via PayPal, or net banking.</p>}
          </div>
        </div>
      </div>
      <div className="teacher_teach">
        <h1>Teach a language today</h1>
        <h3>Get ready to learn and speak confidently with our online language teacher</h3>
        <button className="teacher_free_btn" onClick={() => { history.push('/auth/signup', { role: 'Teacher' }) }}>
          Apply Now&nbsp;&nbsp;
          <img src={arrowForward} alt="errImg" />
          {/* <i className="fas fa-arrow-alt-circle-right"></i> */}
        </button>
      </div>
    </div>
  );
};

export default Teacher;
