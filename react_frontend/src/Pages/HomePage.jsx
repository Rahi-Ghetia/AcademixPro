
import React, { useState, useEffect } from "react";
import './css/HomePage.css'
function HomePage(props) {

    return (<>
        <div className="home-page-div">
            <div className="container-fluid p-0 border-bottom bg-transparent text-start" style={{ backgroundImage: "url('Images/BackgroundImage.jpg')", backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <label className="fs-1 ms-5 my-2">Hello,</label>
            </div>

            <div className="container p-4 mt-4">
                <div className="container-fluid">
                    <div className="row rounded py-2 shadow header-info-div">
                        <div className="col-xl-3 col-12 text-start">
                            <a href="https://www.youtube.com/" target="_blank" id="Youtube-Video-Link" className="text-decoration-none">
                                <img src="Images/Video_Thumbnail.png" className="rounded" height={'120px'} alt="" />
                            </a>
                        </div>
                        <div className="col-xl-9 col-12">
                            <label htmlFor="Youtube-Video-Link" className="mt-3">
                                <label className="fs-4" style={{ fontWeight: '500' }}>How To Use Academix Pro</label><br />
                                Watch this video to learn the essential details of your semester, and see how AcademixPro can help you take care of your next semester.
                            </label>
                        </div>
                    </div>
                </div>



                <div className="container-fluid rounded mt-5 bg-light shadow">
                    <div className="row rounded-top fs-2 px-4 py-2 border" style={{ backgroundColor: 'rgb(235 245, 255)' }}>
                        Unveiling Your Semester: A Smooth Start with AcademixPro
                    </div>
                    <div className="row border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-primary-subtle rounded-circle">
                                <i className="bi bi-globe2 fs-2 text-primary"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Effortless Overview
                            </label>
                            <br />
                            Gain a comprehensive understanding of your upcoming classes with AcademixPro. View all your classes, exams, and deadlines in one central location. No more juggling scattered notes or emails!
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>
                    <div className="row border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-warning-subtle rounded-circle">
                                <i className="bi bi-envelope-fill fs-2 text-warning"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Stay Informed: Timely Communication with AcademixPro
                            </label>
                            <br />
                            AcademixPro keeps you informed and connected throughout your semester. Stay on top of important announcements, course updates, and deadlines delivered directly to your preferred channels.
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>
                    <div className="row border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-info-subtle rounded-circle">
                                <i className="bi bi-hand-thumbs-up-fill fs-2 text-info"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Streamline Your Workflow: Manage Tasks Effectively
                            </label>
                            <br />
                            AcademixPro empowers you to take control of your semester workload. Prioritize assignments, set reminders, and track your progress – all within a centralized platform. Focus on learning and leave the organization to AcademixPro.
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>
                    <div className="row border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-success-subtle rounded-circle">
                                <i className="bi bi-clock-history fs-2 text-success"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Stay Up-to-Date
                            </label>
                            <br />
                            Ensure your semester details remain accurate. Update relevant information within a designated settings area to reflect any changes.
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-centercol-1 col-lg-2 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>
                    <div className="row border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-primary-subtle rounded-circle">
                                <i className="bi bi-file-earmark-text-fill fs-2 text-primary"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Future Planning
                            </label>
                            <br />
                            Gain more information about your upcoming semester and learn how to improve your next semester results.
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>
                    <div className="row rounded-bottom border py-4 bg-light basic-details-div">
                        <div className="col-xs-1 col-lg-2 col-12 text-center">
                            <div className="d-inline-block px-3 py-2 bg-warning-subtle rounded-circle">
                                <i className="bi bi-git fs-2 text-warning"></i>
                            </div>
                        </div>
                        <div className="col-xs-10 col-lg-8 col-12">
                            <label htmlFor="" className="fs-5" style={{ fontWeight: '500' }}>
                                Connect and Collaborate: Foster a Supportive Learning Environment
                            </label>
                            <br />
                            AcademixPro fosters a collaborative learning environment. Connect with classmates, share study materials, and discuss course content – all within a centralized platform. Enhance your learning experience by working together.
                        </div>
                        <div className="col-xs-1 col-lg-2 col-12 text-center mt-3 text-primary">
                            <a href="" className="btn btn-outline-primary border border-0 rounded-pill">
                                Learn More &gt;
                            </a>
                        </div>
                    </div>

                </div>
                <div className="container mt-5">
                    <label htmlFor="" className="fs-2" style={{ fontWeight: '500' }}>Effortless Upcoming Semester Planning</label>
                    <div className="row p-3">
                        <div className="col rounded shadow p-2 basic-info-div">
                            <div className="row p-3">
                                <div className="col-2 text-center mt-4">
                                    <i className="bi bi bi-calendar2-check fs-2 text-danger"></i>
                                </div>
                                <div className="col-10">
                                    Consolidate your semester schedule within AcademixPro. Effortlessly add classes, exams, and deadlines in one place. View your entire semester at a glance, ensuring you never miss an important date.
                                    <br />
                                    <a href="" target="_blank" className="text-decoration-none" style={{ cursor: 'pointer' }}>
                                        Learn More &gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col offset-1 shadow rounded p-2 basic-info-div">
                            <div className="row p-3">
                                <div className="col-2 text-center mt-4">
                                    <i className="bi bi bi-clock-history fs-2 text-success"></i>
                                </div>
                                <div className="col-10">
                                    AcademixPro empowers you to manage your time effectively. Set due date reminders, prioritize tasks, and create a personalized study schedule. Focus on what matters most and avoid feeling overwhelmed throughout the semester.
                                    <br />
                                    <a href="" target="_blank" className="text-decoration-none" style={{ cursor: 'pointer' }}>
                                        Learn More &gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container-fluid p-3">
                <div className="">
                    <label htmlFor="" className="fs-2 ms-4"> Effortless Accounting for Your Business</label>
                </div>
                <div className="">
                    <label htmlFor="" className="fs-4 ms-5 mt-4">Manage finances, streamline processes, and gain insights - all in one place.</label>
                </div>
                <div className="">
                    <label htmlFor="" className="fs-4 ms-5 mt-4">A high-quality image showcasing the Finsync platform's user interface or a concept representing easy accounting.</label>
                </div>

                <div className="fs-2 mt-5 ms-3">Key Features</div>

                <div className="container-fluid mt-5" style={{height:'500px'}}>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner w-100 align-items-center" data-bs-interval="2000">
                            <div className="carousel-item active">
                                <img src="Images/CarouselImg1.png" className="d-block" alt="..." style={{height:'500px'}} />
                                <div className="carousel-caption d-none d-md-block text-dark bg-white rounded-pill">
                                    <p>Eliminate manual data entry with bank integrations and automatic categorization.</p>
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src="Images/CarouselImg2.png" className="d-block" alt="..." style={{height:'500px'}} />
                                <div className="carousel-caption d-none d-md-block text-dark bg-white rounded-pill">
                                    <h5>Real-time Financial Reports:</h5>
                                    <p>Track your cash flow, income, and expenses in real-time.</p>
                                </div>
                            </div>
                            <div className="carousel-item" >
                                <img src="Images/CarouselImg3.jpg" className="d-block" alt="..." style={{height:'500px'}} />
                                <div className="carousel-caption d-none d-md-block text-dark bg-white rounded-pill">
                                    <p>Create and send professional invoices with ease.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="fs-2 mt-5 ms-3">
                    Benifits
                </div>
                <ul className="fs-4 ms-5">
                    <li>Save Time & Money: Reduce manual work and focus on growing your business. </li>
                    <li>Gain Control: Get a clear view of your finances with comprehensive dashboards and reports.</li>
                    <li>Make Smarter Decisions: Data-driven insights to guide your business strategy.</li>
                    <li>Peace of Mind: Securely store and access your financial data anytime, anywhere.</li>
                </ul>
            </div> */}
        </div>
    </>);
}
export default HomePage;