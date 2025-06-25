import React from "react";
import { Link, useHistory } from "react-router-dom";
//images
import facebook from "../../assets/image/fb.svg";
import insta from "../../assets/image/insta.svg";
import youtube from "../../assets/image/youtube.svg";
import pinterest from "../../assets/image/pinterest.svg";
import twitter from "../../assets/image/twitter.svg";
import linkedin from "../../assets/image/linkedIn.svg";
//React Router
//css
import './Footer.css';

import { useWindowDimensions } from "../../utils/util";

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

import Others from './OtherCountriesModal';

const Footer = () => {

  const { width } = useWindowDimensions();

  return (
    <div className="footer_section">
      <div className="footer_c footer_center">
        {" "}
        {width >= 600 ?
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <NeurolinguaColumn />
            <LangaugesColumn />
            <TestPrepColumn />
            <SocialColumn width={width} />
          </div>
          :
          <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <NeurolinguaColumn />
              <LangaugesColumn />
              <TestPrepColumn />
            </div>
            <div style={{ width: '100%' }}>
              <SocialColumn width={width} />
            </div>
          </>
        }
      </div>
      <div className="footer_cp">
        <h2 >
          &copy;&nbsp;2021 Neurolingua
        </h2>
      </div>
    </div >
  );
};

const NeurolinguaColumn = () => {
  return (
    <ul className="footer_f">
      <li className="footer_head">Neurolingua</li>
      <li>
        <Link className="footer_link" to="/blog">
          Blog
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/apply-teacher">
          Apply to teach
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/faq">
          FAQ
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/contact">
          Contact
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/refund-policy">
          Refund Policy
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/cookie-policy">
          Cookie Policy
        </Link>
      </li>
      <li>
        <Link className="footer_link" to="/privacy-policy">
          Terms | Privacy
        </Link>
      </li>
    </ul>
  )
}

const LangaugesColumn = () => {

  const history = useHistory();
  const [showModal, setShowModal] = React.useState(false);

  const langInModal = [
    { value: 'English', flag: english },
    { value: 'Chinese', flag: chinese },
    { value: 'Spanish', flag: spanish },
    { value: 'French', flag: french },
    { value: 'Hindi', flag: hindi },
    { value: 'Japanese', flag: japanese },
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

  const handleLangClick = (lang) => {
    // var currFilters = JSON.parse(localStorage.getItem('filterStore'));
    console.log('ggg', lang);
    // currFilters.language = lang;
    // console.log('lll', currFilters)
    // localStorage.setItem('filterStore', JSON.stringify(currFilters))
    history.push("/find-teacher", { lang })
  }

  const langInFooter = [
    { value: 'English' },
    { value: 'French' },
    { value: 'Spanish' },
    { value: 'German' },
    { value: 'Italian' },
    { value: 'Portugal' }
  ]

  return (
    <ul className="footer_f">
      {showModal && <Others setShowModal={setShowModal} langInModal={langInModal} handleLangClick={handleLangClick} />}
      <li className="footer_head">Languages</li>
      {langInFooter.map((item, index) => (
        <li onClick={() => handleLangClick(item.value)}>{item.value}</li>
      ))}
      <li onClick={() => setShowModal(true)}>All Languages</li>
    </ul>
  )
}

const TestPrepColumn = () => {
  return (
    <ul className="footer_f">
      <li className="footer_head">Test Preparation</li>
      <li>IELTS</li>
      <li>TOEFL</li>
      <li>ICSE</li>
      <li>CBSE</li>
      <li>IGCSE</li>
      <li>IP</li>
      <li>All Test</li>
    </ul>
  )
}

const SocialColumn = ({ width }) => {
  return (
    <ul className="footer_f" style={{ width: width >= 600 ? '' : '100%' }}>
      <li className="footer_head" style={{ margin: '0 auto' }}>Social</li>
      {width >= 600 ?
        <div style={{}}>
          <li>
            <a
              className="footer_redirect"
              href="https://www.facebook.com/neurolingua.in"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <img className="footer_social" src={facebook} alt="Facebook" />
              Facebook
            </a>
          </li>
          <li>
            <a
              className="footer_redirect"
              href="https://twitter.com/neurolingua_in"
              target="_blank"
              rel="noreferrer"
            >
              <img className="footer_social" src={twitter} alt="twitter" />
              Twitter
            </a>
          </li>
          <li>
            <a
              className="footer_redirect"
              href="https://www.instagram.com/neurolingua.in/"
              target="_blank"
              rel="noreferrer"
            >
              <img className="footer_social" src={insta} alt="insta" />
              Instagram
            </a>
          </li>
          <li>
            <a
              className="footer_redirect"
              href="https://www.youtube.com/channel/UC8PcCNMwz5hpk5Ujj2RewaQ"
              target="_blank"
              rel="noreferrer"
            >
              <img className="footer_social" src={youtube} alt="youtube" />
              YouTube
            </a>
          </li>
          <li>
            <a
              className="footer_redirect"
              href="https://www.linkedin.com/company/neurolingua"
              target="_blank"
              rel="noreferrer"
            >
              <img className="footer_social" src={linkedin} alt="linkedin" />
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="footer_redirect"
              href="https://in.pinterest.com/neurolingua"
              target="_blank"
              rel="noreferrer"
            >
              <img className="footer_social" src={pinterest} alt="pinterest" />
              Pinterest
            </a>
          </li>
        </div>
        :
        <div className="footer_f" style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <div>
            <li>
              <a
                className="footer_redirect"
                href="https://www.facebook.com/neurolingua.in"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <img className="footer_social" src={facebook} alt="Facebook" />
                Facebook
              </a>
            </li>
            <li>
              <a
                className="footer_redirect"
                href="https://twitter.com/neurolingua_in"
                target="_blank"
                rel="noreferrer"
              >
                <img className="footer_social" src={twitter} alt="twitter" />
                Twitter
              </a>
            </li>
            <li>
              <a
                className="footer_redirect"
                href="https://www.instagram.com/neurolingua.in/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="footer_social" src={insta} alt="insta" />
                Instagram
              </a>
            </li>
          </div>
          <div>
            <li>
              <a
                className="footer_redirect"
                href="https://www.youtube.com/channel/UC8PcCNMwz5hpk5Ujj2RewaQ"
                target="_blank"
                rel="noreferrer"
              >
                <img className="footer_social" src={youtube} alt="youtube" />
                YouTube
              </a>
            </li>
            <li>
              <a
                className="footer_redirect"
                href="https://www.linkedin.com/company/neurolingua"
                target="_blank"
                rel="noreferrer"
              >
                <img className="footer_social" src={linkedin} alt="linkedin" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="footer_redirect"
                href="https://in.pinterest.com/neurolingua"
                target="_blank"
                rel="noreferrer"
              >
                <img className="footer_social" src={pinterest} alt="pinterest" />
                Pinterest
              </a>
            </li>
          </div>
        </div>
      }
    </ul>
  )
}

export default Footer;
