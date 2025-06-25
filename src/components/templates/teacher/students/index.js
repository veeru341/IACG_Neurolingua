import React from 'react';
import { useWindowDimensions } from '../../../../utils/util';

import * as styles from "../styles.module.css";

// import CreateModal from './CreateModal';

function TeacherStudents(props) {

    // const { width } = useWindowDimensions();

    // const [mobileDropdown, setMobileDropdown] = React.useState(false);
    // const [activeTab, setActiveTab] = React.useState('All');

    // const tabs = ['All', 'Upcoming', 'Trial', 'Completed', 'Cancelled', 'Issue Reported', 'Need Scheduling'];

    // // const [createModal, setCreateModal] = React.useState(false);
    // const [showActions, setShowActions] = React.useState(false);

    return (
        <>
            {/* {createModal ?
                <CreateModal setCreateModal={setCreateModal} width={width} />
                :
                <></>
            } */}
            <main className={styles.mainSection}>
                Under Development
                {/* {width >= 992 ? */}
                    {/* <> */}
                        {/* <div>
                            <div style={{ width: '100px', color: '#fff', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', padding: '10px 20px', backgroundColor: '#9fcce6' }}
                                // onClick={() => setCreateModal(true)}
                            >
                                Student Name
                            </div>
                        </div> */}

                        {/* <div style={{ marginTop: '60px', fontWeight: 'bold', width: '100%', padding: '10px 20px', backgroundColor: '#9fcce6', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                Student Name
                                <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                            </div>
                            <div>
                                Student Email
                                <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                            </div>
                            <div>
                                Class Taken
                                <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                            </div>
                            <div>
                                Last Course (Date/Time)
                                <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                            </div>
                            <div>
                                <div onClick={() => setShowActions(!showActions)}>
                                    Actions
                                    <i style={{ color: 'grey', marginLeft: '5px' }} className="fas fa-arrow-down"></i>
                                </div>
                                {showActions ?
                                    <div style={{ marginTop: '10px', border: '1px solid', padding: '10px', borderRadius: '10px', position: 'absolute' }}>
                                        <div>See Profile</div>
                                        <div>Message</div>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        </div> */}
                    {/* </> */}
                    {/* : */}
                    {/* <> */}
                        {/* <div className={styles.sessionTabs}>
                            <div className={styles.sessionTabHeading}>{activeTab}</div>
                            <div className={styles.arrowIcon}
                                onClick={() => setMobileDropdown(!mobileDropdown)}
                            >
                                {mobileDropdown ?
                                    <i class="fas fa-caret-up"></i>
                                    :
                                    <i class="fas fa-caret-down"></i>
                                }
                            </div>
                        </div>
                        {mobileDropdown ?
                            <div style={{ position: 'relative' }}>
                                <div className={styles.mobileDropdown}>
                                    {tabs.map((item, index) => (
                                        <div key={index} className={styles.sessionTab + ' ' + `${activeTab == item ? styles.sessionTabActiveDropdown : ''}`}
                                            onClick={() => { setActiveTab(item); setMobileDropdown(false) }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            :
                            <></>
                        } */}
                    {/* </> */}
                {/* } */}
            </main>
        </>
    )
}

export default TeacherStudents;