import React from "react";
import { getTeacherData } from "../../../../store/actions/teacher";
import BasicInfo from "./basicInfo/basicInfo";
import Certifications from "./certifications/certifications";
import LanguageSkills from "./languageSkills/languageSkill";
import ChangePassword from "./password/password";
import SelfIntro from "./selfIntro/selfIntro";
import * as styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useWindowDimensions } from "../../../../utils/util";

const TeacherSettings = () => {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const [apiCalled, setApiCalled] = React.useState(false);
  // Tab Buttons
  const basicInfoButton = React.useRef();
  const languageSkillsButton = React.useRef();
  const selfIntroButton = React.useRef();
  const passwordButton = React.useRef();
  const certificationsButton = React.useRef();

  // Tabs
  const basicInfoTab = React.useRef();
  const languageSkillsTab = React.useRef();
  const selfIntroTab = React.useRef();
  const passwordTab = React.useRef();
  const certificationsTab = React.useRef();

  const [myDetails, setMyDetails] = React.useState();

  const tabList = [
    { btnRef: basicInfoButton, tabRef: basicInfoTab },
    { btnRef: languageSkillsButton, tabRef: languageSkillsTab },
    { btnRef: selfIntroButton, tabRef: selfIntroTab },
    { btnRef: passwordButton, tabRef: passwordTab },
    { btnRef: certificationsButton, tabRef: certificationsTab },
  ];

  React.useEffect(() => {
    setApiCalled(true);
    async function getMyDetails() {
      try {
        const result = await dispatch(getTeacherData());
        setMyDetails(result);
        changeTab(basicInfoButton);
      } catch (e) {
        toast.error("Failed to fetch your details");
        console.log(e);
      }
    }
    getMyDetails();
  }, [dispatch]);

  function changeTab(ref) {
    tabList.forEach((tab) => {
      tab.btnRef.current.classList.remove(styles.active);
      tab.tabRef.current.style.display = "none";

      if (tab.btnRef === ref) {
        tab.btnRef.current.classList.add(styles.active);
        tab.tabRef.current.style.display = "block";
      }
    });
  }

  return (
    <>
      <main className={styles.mainSection} style={{width: width >= 992 ? '100%' : ''}}>
        <div className={styles.tabsContainer}>
          <button
            onClick={() => {
              changeTab(basicInfoButton);
            }}
            ref={basicInfoButton}
            className={styles.active}
          >
            Basic Info
          </button>
          <button
            onClick={() => {
              changeTab(languageSkillsButton);
            }}
            ref={languageSkillsButton}
          >
            Language Skills
          </button>
          <button
            onClick={() => {
              changeTab(selfIntroButton);
            }}
            ref={selfIntroButton}
          >
            Self Intro
          </button>
          <button
            onClick={() => {
              changeTab(passwordButton);
            }}
            ref={passwordButton}
          >
            Password
          </button>
          <button
            onClick={() => {
              changeTab(certificationsButton);
            }}
            ref={certificationsButton}
          >
            Resume
            {/* Resume = Certifications */}
          </button>
        </div>

        <div className={styles.tabs}>
          <div className={styles.tab} ref={basicInfoTab}>
            <BasicInfo myDetails={myDetails} setApiCalled={setApiCalled}/>
          </div>
          <div className={styles.tab} ref={languageSkillsTab}>
            <LanguageSkills myDetails={myDetails} setApiCalled={setApiCalled}/>
          </div>
          <div className={styles.tab} ref={selfIntroTab}>
            <SelfIntro myDetails={myDetails} setApiCalled={setApiCalled}/>
          </div>
          <div className={styles.tab} ref={passwordTab}>
            <ChangePassword />
          </div>
          <div className={styles.tab} ref={certificationsTab}>
            <Certifications myDetails={myDetails} setApiCalled={setApiCalled}/>
          </div>
        </div>
      </main>
    </>
  );
};

export default TeacherSettings;
