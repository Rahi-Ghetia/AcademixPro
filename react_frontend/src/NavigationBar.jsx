import { useState } from "react";
import HomePage from "./HomePage";
import SchedulePage from "./SchedulePage";
import FacultySchedulePage from "./FacultySchedulePage";
import ContactInfoPage from "./ContactInfoPage";
import RanksPage from "./Pages/RanksPages";
import SignupPage from "./Pages/SignupPage";
// import ProfilePage from "./ProfilePage";

function NavigationBar(props) {

    const [pageInfo, setPageInfo] = useState('home');

    function page() {
        if (pageInfo == 'home') {
            return <HomePage fname={props.fname} batch={props.batch} />
        } else if (pageInfo == 'schedule') {
            console.log(props.batch);
            if (props.position == 'Faculty') {
                return <FacultySchedulePage fname={props.fname} batch={props.batch} />
            }
            return <SchedulePage fname={props.fname} batch={props.batch} />
        } else if (pageInfo == 'events') {
            setPageInfo(() => 'home')
        } else if (pageInfo == 'results') {
            return <RanksPage></RanksPage>
            setPageInfo(() => 'home')
            return <HomePage fname={props.fname} batch={props.batch} />
        } else if (pageInfo == 'signup') {
            return <SignupPage />
        }
    }

    function chageTheme() {
        // if (props.styles.bgColor == 'white' && props.styles.txColor == 'black') {
        //     props.setStyles({ bgColor: 'rgb(60, 60, 60)', txColor: 'rgb(125, 125, 125)' });
        // } else {
        //     props.setStyles({ bgColor: 'white', txColor: 'black' });
        // }
    }

    return (<>
        <nav className="navbar navbar-expand-lg bg-primary sticky-top">
            <div className="container-fluid">
                <button id="homeBtn" className="border-0 bg-primary navbar-brand" onClick={() => setPageInfo('home')}>
                    <img src="AcademixProNoBG.png" id="navBrandLogo" style={{ height: '40px' }} alt="Logo" />
                    <label htmlFor="navBrandLogo" className="text-white fs-3" style={{ cursor: "pointer" }}>
                        &nbsp;AcademixPro
                    </label>
                </button>
                <ul className="navbar-nav ms-auto flex-row">
                    <li className="nav-item m-1">
                        <button id="contactinfoBtn" className="border-0 bg-primary nav-link" onClick={() => chageTheme()}>
                            {(props.styles.bgColor == 'white' && props.styles.txColor == 'black') ?
                                <i className="bi bi-moon-stars text-white"></i> : <i className="bi bi-sun text-white"></i>
                            }
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button id="profileBtn" className="btn border-1 border-secondary rounded-circle bg-secondary" onClick={() => setPageInfo('profile')}>
                            <i className="bi bi-person-fill text-white"></i>
                        </button>
                    </li>
                    <li className="nav-item m-1">
                        <button className="btn btn-danger" onClick={() => props.logOutUser()}>
                            Log&nbsp;Out
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <div className="container-fluid" style={{ backgroundColor: props.styles.bgColor, color: props.styles.txColor }}>
            <div className="row">
                <div className="col-xxl-1 col-lg-2 col-md-3 col-4 text-center fs-4 p-0 p-0 bg-info-subtle" style={{ borderRight: '2px solid rgb(232, 232, 232)' }}>
                    <nav className="navbar navbar-expand-lg p-0 mt-4 ms-2" style={{ position: 'fixed' }}>
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item m-1">
                                <button id="hometBtn" className={"btn text-dark fs-5 border-0 rounded w-100 py-1 ps-3 text-start" + (pageInfo == 'home' ? " btn-primary" : " bg-transparent")} onClick={() => setPageInfo('home')}>
                                    <i className="bi bi-house-door"></i>&nbsp;Home
                                </button>
                            </li>
                            <li className="nav-item m-1">
                                <button id="scheduleBtn" className={"btn text-dark fs-5 border-0 rounded w-100 py-1 ps-3 text-start" + (pageInfo == 'schedule' ? " btn-primary" : " bg-transparent")} onClick={() => setPageInfo('schedule')}>
                                    <i class="bi bi-clipboard-check"></i>&nbsp;Schedule
                                </button>
                            </li>
                            <li className="nav-item m-1">
                                <button id="resultBtn" className={"btn text-dark fs-5 border-0 rounded w-100 py-1 ps-3 text-start" + (pageInfo == 'result' ? " btn-primary" : " bg-transparent")} onClick={() => setPageInfo('result')}>
                                    <i class="bi bi-clipboard-check"></i>&nbsp;Results
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-xxl-11 col-lg-10 col-md-9 col-8 p-0">
                    <div className="">
                        {page()}
                    </div>
                    <div className="">
                        <ContactInfoPage username={props.username} />
                    </div>
                </div>
            </div>

        </div >
    </>);
}

export default NavigationBar;