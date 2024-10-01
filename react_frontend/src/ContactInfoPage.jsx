import React, { useState, useEffect } from "react";

function ContactInfoPage(props) {
    return (<>
        <div className="container-fluid border-top px-5 pt-3 pb-2" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
            <div className="row text-center">
                <div className="col-12 col-md-3">
                    <h5 className="mb-3">
                        Contact Information:
                    </h5>
                    <p>
                        <label style={{ fontWeight: 500 }}>
                            Email:
                        </label>
                        <br />
                        <a href="email:finsync@fin.co" style={{ textDecoration: 'none' }}>
                            academixpro@edu.co
                        </a>
                        <br />
                        <label style={{ fontWeight: 500 }}>
                            Address:
                        </label>
                        <br />
                        101 Sunshine Apartments, Gandhi Road,
                        <br />
                        Navrangpura,
                        Ahmedabad-380009,
                        <br />
                        Gujarat, India
                    </p>
                </div>
                <div className="col-12 col-md-3">
                    <h5 className="mb-3">
                        Feedback Form:
                    </h5>
                    <form action="">
                        {/* <label style={{ fontWeight: 500 }} htmlFor="nameFeedback">
                            Name:
                        </label>
                        <input id='nameFeedback' className="form-control form-control-sm" type="text" name="" /> */}
                        <label style={{ fontWeight: 500 }} htmlFor="emailFeedback">
                            Email:
                        </label>
                        <input id='emailFeedback' className="form-control form-control-sm" type="email" name="" />
                        {/* <label style={{ fontWeight: 500 }} htmlFor="subjectFeedback">
                            Subject:
                        </label>
                        <input id='subjectFeedback' className="form-control form-control-sm" type="text" name="" /> */}
                        <label style={{ fontWeight: 500 }} htmlFor="messageFeedback">
                            Message:
                        </label>
                        <textarea id='messageFeedback' className="form-control form-control-sm" name="" rows="2"></textarea>
                        <br />
                        <button className="btn btn-success" type="button">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="col-12 col-md-3">
                    <h5 className="mb-3">
                        Social Media Links:
                    </h5>
                    <i className="bi bi-instagram"></i>&nbsp;
                    <a href="" style={{ textDecoration: 'none', color: 'black' }}>AcademixPro</a>
                    <br />
                    <i className="bi bi-threads"></i>&nbsp;
                    <a href="" style={{ textDecoration: 'none', color: 'black' }}>AcademixPro</a>
                    <br />
                    <i className="bi bi-facebook"></i>&nbsp;
                    <a href="" style={{ textDecoration: 'none', color: 'black' }}>AcademixPro</a>
                    <br />
                    <i className="bi bi-twitter-x"></i>&nbsp;
                    <a href="" style={{ textDecoration: 'none', color: 'black' }}>AcademixPro</a>
                    <br />
                </div>
                <div className="col-12 col-md-3">
                    <h5 className="mb-3">
                        FAQ Section:
                    </h5>
                    <p style={{ height: '140px' }} className="overflow-auto pe-2">
                        <label style={{ fontWeight: 500 }} className="mt-2">
                            What is AcademixPro?
                        </label>
                        <br />
                        AcademixPro is a web platform designed to streamline communication and information access for students and faculty at your college.
                        <br />
                        <label style={{ fontWeight: 500 }} className="mt-2">
                            Who can use AcademixPro?
                        </label>
                        <br />
                        AcademixPro is intended for currently enrolled students and faculty members.
                        <br />
                        <label style={{ fontWeight: 500 }} className="mt-2">
                            Is AcademixPro free to use?
                        </label>
                        <br />
                        Yes, AcademixPro is a free service offered to enhance the educational experience for its students and faculty.
                        <br />
                        <label style={{ fontWeight: 600 }} className="mt-2">
                            What features does AcademixPro offer?
                        </label>
                        <br />
                        |&nbsp;
                        <label style={{ fontWeight: 500 }} htmlFor="">
                            Subject Management&nbsp;:&nbsp;
                        </label>
                        Students can view their enrolled subjects and faculty can add new subjects, manage course materials, and post announcements.
                        <br />
                        |&nbsp;
                        <label style={{ fontWeight: 500 }} htmlFor="">
                            Grades & Marks&nbsp;:&nbsp;
                        </label>
                        Students can access their marks for various assessments and track their academic performance.
                        <br />
                        |&nbsp;
                        <label style={{ fontWeight: 500 }} htmlFor="">
                            College Information&nbsp;:&nbsp;
                        </label>
                        Find important college resources, department contacts, and announcements on a centralized platform.
                    </p>
                </div>
            </div>
            <div className="row pt-5 pb-3">
                <div className="col-10 offset-1 text-center">
                    <p>
                        You can directly talk to us every
                        <label style={{ fontWeight: 500 }}>
                            &nbsp;Monday to Friday 9:00 AM to 7:00 PM
                        </label>
                        <br />
                        AcademixPro India Helpline:
                        <label style={{ fontWeight: 500 }}>
                            <a href="tel:8824494223" className="text-dark" style={{ textDecoration: 'none' }}>
                                &nbsp;18005726671 (Toll Free)
                            </a>
                        </label>
                    </p>
                </div>
            </div>
        </div>
    </>);
}

export default ContactInfoPage;