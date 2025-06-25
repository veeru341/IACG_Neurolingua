import React, { useState } from "react";
//images
import p1 from "../../assets/image/p1.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import p4 from "../../assets/image/p4.png";
import p5 from "../../assets/image/p5.png";

// import c1 from "../../assets/image/america.svg";
// import c2 from "../../assets/image/china.png";
// import c3 from "../../assets/image/span.svg";
// import c4 from "../../assets/image/france.svg";
// import c5 from "../../assets/image/india1.png";
// import c6 from "../../assets/image/japan.png";
// import c7 from "../../assets/image/german.svg";
// import c8 from "../../assets/image/swahili.png";
// import c9 from "../../assets/image/arab.png";
// import c10 from "../../assets/image/india1.png";
// import c11 from "../../assets/image/russia.png";
// import c12 from "../../assets/image/korea.png";
// import c13 from "../../assets/image/portguse.svg";
// import c14 from "../../assets/image/italy.svg";
// import c15 from "../../assets/image/romanian.png";
// import c16 from "../../assets/image/thailand.png";
// import c17 from "../../assets/image/indonesia.png";
// import c18 from "../../assets/image/turkey.png";
// import c19 from "../../assets/image/vietnam.png";
// import c20 from "../../assets/image/polish.png";
// import c21 from "../../assets/image/india1.png";
// import c22 from "../../assets/image/esparanto.png";
// import c23 from "../../assets/image/tanzania.png";


import english from '../../assets/flags/english.png';
import chinese from '../../assets/flags/chinese.png';
import spanish from '../../assets/flags/spanish.png';
import french from '../../assets/flags/french.png';
import hindi from '../../assets/flags/hindi.png';
import german from '../../assets/flags/german.png';
import dutch from '../../assets/flags/dutch.png';
import arabic from '../../assets/flags/arabic.png';
import japanese from '../../assets/flags/japanese.png';
import russian from '../../assets/flags/russian.png';
import korean from '../../assets/flags/korean.png';
import portuguese from '../../assets/flags/portuguese.png';
import italian from '../../assets/flags/italian.png';
import romanian from '../../assets/flags/romanian.png';
import swahili from '../../assets/flags/swahili.png';
import thai from '../../assets/flags/thai.png';
import indonesia from '../../assets/flags/indonesia.png';
import turkish from '../../assets/flags/turkish.png';
import vietnamese from '../../assets/flags/vietnamese.png';
import polish from '../../assets/flags/polish.png';
import bengali from '../../assets/flags/bengali.png';
import tamil from '../../assets/flags/tamil.png';
import telugu from '../../assets/flags/telugu.png';
import esperanto from '../../assets/flags/esperanto.png';

import arrowForward from '../../assets/image/Vector-3.png';
//Other Modal
import Others from "./OtherCountriesModal";

import { Link, useHistory } from "react-router-dom";

//css
import './main.css'

const Main = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const langOnDisplay = [
    { value: 'English', flag: english },
    { value: 'Chinese', flag: chinese },
    { value: 'Spanish', flag: spanish },
    { value: 'French', flag: french },
    { value: 'Hindi', flag: hindi },
    { value: 'Japanese', flag: japanese },
  ];

  const langInModal = [
    { value: 'German', flag: german },
    { value: 'Dutch', flag: dutch },
    { value: 'Arabic', flag: arabic },
    { value: 'Russian', flag: russian },
    { value: 'Korean', flag: korean },
    { value: 'Portuguese', flag: portuguese },
    { value: 'Italian', flag: italian },
    { value: 'Romanian', flag: romanian },
    { value: 'Swahili', flag: swahili },
    { value: 'Thai', flag: thai },
    { value: 'Indonesian', flag: indonesia },
    { value: 'Turkish', flag: turkish },
    { value: 'Vietnamese', flag: vietnamese },
    { value: 'Polish', flag: polish },
    { value: 'Bengali', flag: bengali },
    { value: 'Tamil', flag: tamil },
    { value: 'Telugu', flag: telugu },
    { value: 'Esparanto', flag: esperanto },
  ]



  // const langOnDisplay = [
  //   { imgSrc: eng, label: 'English', alt: 'english_flag' },
  //   { imgSrc: c2, label: 'Chinese', alt: 'chinese_flag' },
  //   { imgSrc: c3, label: 'Spanish', alt: 'spanish_flag' },
  //   { imgSrc: c4, label: 'French', alt: 'french_flag' },
  //   { imgSrc: c5, label: 'Hindi', alt: 'hindi_flag' },
  //   { imgSrc: c6, label: 'Japanese', alt: 'japanese_flag' },
  // ]

  // const langInModal = [
  //   { imgSrc: c7, label: 'German', alt: 'german_flag' },
  //   { imgSrc: c8, label: 'Swahili', alt: 'swahili_flag' },
  //   { imgSrc: c9, label: 'Arabic', alt: 'arabic_flag' },
  //   { imgSrc: c10, label: 'Sanskrit', alt: 'sanskrit_flag' },
  //   { imgSrc: c11, label: 'Russian', alt: 'russian_flag' },
  //   { imgSrc: c12, label: 'Korean', alt: 'korean_flag' },
  //   { imgSrc: c13, label: 'Portuguese', alt: 'portuguese_flag' },
  //   { imgSrc: c14, label: 'Italian', alt: 'italian_flag' },
  //   { imgSrc: c15, label: 'Romanian', alt: 'romanian_flag' },
  //   { imgSrc: c16, label: 'Thai', alt: 'thai_flag' },
  //   { imgSrc: c17, label: 'Indonesian', alt: 'indonesian_flag' },
  //   { imgSrc: c18, label: 'Turkish', alt: 'turkish_flag' },
  //   { imgSrc: c19, label: 'Vietnamese', alt: 'vietnamese_flag' },
  //   { imgSrc: c20, label: 'Polish', alt: 'polish_flag' },
  //   { imgSrc: c21, label: 'Tamil', alt: 'tamil_flag' },
  //   { imgSrc: c22, label: 'Esparanto', alt: 'esparanto_flag' },
  //   { imgSrc: c23, label: 'Tanzania', alt: 'tanzania_flag' },
  //   { imgSrc: c8, label: 'Dutch', alt: 'dutch_flag' },
  //   { imgSrc: c21, label: 'Bengali', alt: 'bengali_flag' },
  //   { imgSrc: c21, label: 'Telugu', alt: 'telugu_flag' },
  // ]

  const handleLangClick = (lang) => {
    // var currFilters = JSON.parse(localStorage.getItem('filterStore'));
    console.log('ggg', lang);
    // currFilters.language = lang;
    // console.log('lll', currFilters)
    // localStorage.setItem('filterStore', JSON.stringify(currFilters))
    history.push("/find-teacher", { lang })
  }

  return (
    <div className="main_section">
      {showModal && <Others setShowModal={setShowModal} langInModal={langInModal} handleLangClick={handleLangClick} />}
      <div className="main_left">
        <h1 className="main_learn_head main_font-face-gm">Learn&nbsp;</h1>
        <h1 className="main_head font-face-lt">any&nbsp;language</h1>
        <br />
        <h1 className="main_head font-face-lt">with native speakers.</h1>
        <h3 className="font-face-lt">
          Anywhere, anytime. Start learning today!
        </h3>
        <Link to='/find-teacher' style={{textDecoration: 'none'}}>
          <button className="main_free font-face-lt">
            Try free lesson &nbsp;
            <img src={arrowForward} alt="errImg" />
          </button>
        </Link>
        <div className="main_pic">
          <img className="main_person" src={p1} alt="main_person" />
          <img className="main_person main_p2" src={p2} alt="main_person" />
          <img className="main_person main_p3" src={p3} alt="main_person" />
          <img className="main_person main_p4" src={p4} alt="main_person" />
          <img className="main_person main_p5" src={p5} alt="main_person" />
          <h4 className="font-face-lt">1000+ Verified Teachers</h4>
        </div>
      </div>
      <div className="main_right">
        <h3 className="main_l font-face-lt">What do you want to learn today?</h3>
        <div className="main_countries">
          {langOnDisplay.map((item, index) => (
            <div key={index} className="main_country font-face-lt" style={{ cursor: 'pointer' }}
              onClick={() => handleLangClick(item.value)}
            >
              <img src={item.flag} alt='lang_flag' />
              {item.value}
            </div>
          ))}
          <div
            className="main_country font-face-lt main_other"
            onClick={() => setShowModal(true)}
          >
            <div className="main_more">...
            </div>
            Other
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
