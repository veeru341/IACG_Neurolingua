import React from 'react';
import * as modalStyles from './styles.module.css';

import english from '../../../../../assets/flags/english.png';
import { SubmitButton } from '../commonUtils';

const RescheduleModal = (props) => {
    const { setRescheduleModal, width } = props;

    const [page, setPage] = React.useState('1');

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setRescheduleModal(false); setPage('1') }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Request to Reschedule</h3>

                    {width >= 992 ?
                        <>
                            {/* Body */}
                            {page === '1' ?
                                <Page1 setPage={setPage} />
                                :
                                <></>
                            }
                            {page === '1A' ?
                                <Page1A setRescheduleModal={setRescheduleModal} />
                                :
                                <></>
                            }
                            {page === '1B' ?
                                <Page1B setRescheduleModal={setRescheduleModal} />
                                :
                                <></>
                            }
                        </>
                        :
                        <>
                            <SubmitButton onClick={() => { alert("Submit!"); setRescheduleModal(false) }} />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

const Page1 = ({ setPage }) => {

    const [option, setOption] = React.useState('');

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '20px' }}>You are about to request a new time for this session.</div>
                <div style={{ paddingLeft: '1.5em', marginTop: '10px' }}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <label for="time1">
                        <input type="radio" name="time" id="time1" value="suggest" />
                        &nbsp; Suggest new time
                    </label>

                    <br />

                    <label for="time2">
                        <input type="radio" name="time" id="time2" value="student" />
                        &nbsp; Let student select new time
                    </label>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '20px' }}>Message</div>
                <textarea rows='6'
                    placeholder="Why are you requesting to reschedule the lesson? Please explain in a message to your student here."
                >
                </textarea>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <span style={{ cursor: 'pointer', color: '#fffefe', borderRadius: '5px', backgroundColor: '#fd869e', padding: '5px 30px' }}
                    onClick={() => { option === '' ? alert('Choose an option!') : option === 'suggest' ? setPage('1A') : setPage('1B') }}
                >
                    Next
                </span>
            </div>
        </>
    )
}

const Page1A = ({ setRescheduleModal }) => {
    return (
        <>
            <div style={{ marginTop: '20px', border: '1px solid #d6d6d7', padding: '10px', backgroundColor: '#f1f1f1', borderRadius: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Reschedue Suggestion</span>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src={english} alt="card_img" style={{ borderRadius: '50%', width: '80px' }} />
                    <div>
                        <div style={{ fontSize: '18px', color: '#ED224C' }}>Unscheduled</div>
                        <div style={{ fontSize: '20px' }}>02 : 00 PM</div>
                        <div style={{ fontSize: '18px' }}>January 02, 2021</div>
                        <div>In 3 days</div>
                    </div>
                    <i style={{ color: '#00b63e', fontSize: '50px' }} class="far fa-arrow-alt-circle-right"></i>
                    <div>
                        <div style={{ fontSize: '18px' }}>Suggested</div>
                        <div style={{ fontSize: '20px' }}>05 : 30 PM</div>
                        <div style={{ fontSize: '18px' }}>January 03, 2021</div>
                        <div>In 4 days</div>
                    </div>
                </div>
            </div>

            <SubmitButton onClick={() => { alert("Submit!"); setRescheduleModal(false) }} />
        </>
    )
}

const Page1B = ({ setRescheduleModal }) => {
    return (
        <>
            <div style={{ margin: '0 auto', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '16vw', height: '150px' }}>
                <div>
                    {['', 'Morning', 'Afternoon', 'Evening', 'Night'].map((item1, index1) => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ marginRight: '10px' }}>{item1}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px' }}>
                                {['Su', 'Mo', 'Tu', 'Th', 'We', 'Fr', 'Sa'].map((item2, index2) => (
                                    index1 === 0 ?
                                        <div style={{ marginBottom: '5px', width: '1.5vw', height: '1.5vw', textAlign: 'center' }}>{item2}</div>
                                        :
                                        <div style={{ width: '1.5vw', height: '1.5vw', backgroundColor: index1 === 2 ? '#359cd7' : index1 === '4' ? '#e7f1f9' : '#9fcce6' }}>
                                        </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SubmitButton onClick={() => { alert("Submit!"); setRescheduleModal(false) }} />
        </>
    )
}

export default RescheduleModal;