import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line } from "react-chartjs-2";

import React, { useEffect, useState } from "react";

function FacultySchedulePage(props) {
    const [timeTable, setTimeTable] = useState([]);
    const [date, setDate] = useState();
    const [batch, setBatch] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [faculty, setFaculty] = useState();
    const [totalHrs, setTotalHrs] = useState();
    const [deletedStatus, setDeletedStatus] = useState(false);

    const [searchByInputValue, setSearchByInputValue] = useState('');

    const [sortSelected, setSortSelected] = useState('Featured');

    const [del_date, setDelDate] = useState();
    const [del_batch, setDelBatch] = useState();
    const [del_startTime, setDelStartTime] = useState();
    const [del_endTime, setDelEndTime] = useState();
    const [del_faculty, setDelFaculty] = useState();
    const [del_totalHrs, setDelTotalHrs] = useState();

    useEffect(() => {
        const getDataTimeTableFac = async () => {
            try {
                console.log('inasdnoasdioasd     :    ', props.fname);
                const response = await fetch('http://localhost:8000/getTimeTableFaculty/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'faculty_name': props.fname }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data);
            } catch (error) {
                console.error(error);
            }
        }
        getDataTimeTableFac();
    }, []);

    function handleNewTimeTableSlot(event) {
        event.preventDefault()
        const postData = async () => {
            try {
                console.log(props.fname);
                const response = await fetch('http://localhost:8000/addTimeTable/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'faculty_name': props.fname, 'date': date, 'batch_subj': batch, 'start_time': startTime, 'end_time': endTime, "total_hrs": totalHrs }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
            } catch (error) {
                console.error(error);
            }
            const getDataTimeTableFac = async () => {
                try {
                    const response = await fetch('http://localhost:8000/getTimeTableFaculty/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'faculty_name': props.fname }),
                    });
                    if (!response.ok) {
                        throw new Error('')
                    }
                    const data = await response.json();
                    setTimeTable(() => data);
                } catch (error) {
                    console.error(error);
                }
            }
            getDataTimeTableFac();
        }
        postData();
    }


    const handleDelTimeTableSlot = (e) => {
        e.preventDefault()
        const sendData = async () => {
            try {
                const response = await fetch('http://localhost:8000/delteTTFacultyData/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "fname": props.fname, "date": del_date, "batch": del_batch, 'start_time': del_startTime, "end_time": del_endTime, "total_hrs": del_totalHrs }),
                });
                if (!response.ok) {
                    throw new Error('Error in Uploading Data')
                }
                const data = await response.json();
                setDeletedStatus(() => data.response);
            } catch (error) {
                console.error(error);
            }

            const getDataTimeTableFac = async () => {
                try {
                    console.log('inasdnoasdioasd     :    ', props.fname);
                    const response = await fetch('http://localhost:8000/getTimeTableFaculty/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 'faculty_name': props.fname }),
                    });
                    if (!response.ok) {
                        throw new Error('')
                    }
                    const data = await response.json()
                    setTimeTable(() => data);
                } catch (error) {
                    console.error(error);
                }
            }
            getDataTimeTableFac();
        }
        sendData();
    }

    const deleteTimeTableSlot = (event) => {
        setDelDate(() => event.target.parentElement.querySelector('#timeTableDate').innerHTML);
        setDelBatch(() => event.target.parentElement.querySelector('#timeTableBatch').innerHTML);
        setDelStartTime(() => event.target.parentElement.querySelector('#timeTableStartTime').innerHTML);
        setDelEndTime(() => event.target.parentElement.querySelector('#timeTableEndTime').innerHTML);
        setDelTotalHrs(() => event.target.parentElement.querySelector('#timeTableTotalTime').innerHTML);
    }

    function checkIfDataPresent(e) {
        setSearchByInputValue(() => e.target.value)
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/searchFaculty/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'faculty_name': props.fname, 'user_input': e.target.value }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data);
            } catch (error) {
                console.error(error);
            }
        }
        postData();
    }

    function sortTTDateLH() {
        setSortSelected('StartTimeLH')
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/sortTTDateLH/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'faculty_name': props.fname }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data);
            } catch (error) {
                console.error(error);
            }

        }
        postData();
    }

    function sortTTDateHL() {
        setSortSelected('StartTimeHL')
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/sortTTDateHL/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'faculty_name': props.fname }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data);
            } catch (error) {
                console.error(error);
            }

        }
        postData();
    }



    return (<>
        <div className="container-fluid p-0">
            <div className="container-fluid p-0">
                <nav className="navbar bg-body-tertiary border-bottom">
                    <div className="container-fluid">
                        <label className="nabar-brand ms-2 fs-1" style={{ fontWeight: "400" }}>
                            Time&nbsp;Table&nbsp;Overview
                        </label>
                        <ul className="navbar-nav flex-row ms-auto">
                            <li className="nav-item m-1">
                                <button className="btn btn-primary px-4 py-1" type="button" data-bs-toggle="modal" data-bs-target="#newSaleModal">
                                    <i className="bi bi-plus-lg"></i>&nbsp;New
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="modal fade" id="newSaleModal" tabindex="-1" aria-labelledby="newSaleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content shadow-lg">
                        <div className="modal-header bg-secondary bg-gradient">
                            <h1 className="modal-title fs-3" id="newSaleModalLabel">Add&nbsp;New&nbsp;Time&nbsp;Table&nbsp;Slot</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-secondary-subtle rounded-bottom">
                            <form onSubmit={(e) => handleNewTimeTableSlot(e)}>
                                <div className="row fs-4 mt-3">
                                    <div className="col-4">
                                        Date
                                    </div>
                                    <div className="col-7">
                                        <input type="date" value={date} onChange={(e) => setDate(() => e.target.value)} name="" id="" className="form-control" />
                                    </div>
                                </div>
                                <div className="row fs-4 mt-4">
                                    <div className="col-4">
                                        Batch
                                    </div>
                                    <div className="col-7">
                                        <input type="text" value={batch} onChange={(e) => setBatch(() => e.target.value)} name="" id="" className="form-control" />
                                    </div>
                                </div>
                                <div className="row fs-4 mt-4">
                                    <div className="col-4">
                                        Start&nbsp;Time
                                    </div>
                                    <div className="col-7">
                                        <input type="time" value={startTime} onChange={(e) => setStartTime(() => e.target.value)} name="" id="" className="form-control" />
                                    </div>
                                </div>
                                <div className="row fs-4 mt-4">
                                    <div className="col-4">
                                        End&nbsp;Time
                                    </div>
                                    <div className="col-7">
                                        <input type="time" value={endTime} onChange={(e) => setEndTime(() => e.target.value)} name="" id="" className="form-control" />
                                    </div>
                                </div>
                                <div className="row fs-4 mt-4">
                                    <div className="col-4">
                                        Total&nbsp;Hours
                                    </div>
                                    <div className="col-7">
                                        <input type="text" value={totalHrs} onChange={(e) => setTotalHrs(() => e.target.value)} name="" id="" className="form-control" />
                                    </div>
                                </div>
                                <div className="row fs-4 mt-4">
                                    <div className="col-6 text-end">
                                        <button type="submit" className="btn btn-success px-5 py-1" data-bs-dismiss="modal">
                                            Add
                                        </button>
                                    </div>
                                    <div className="col-6 text-start">
                                        <button type="button" className="btn px-4 btn-secondary px-5 py-1" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-12 mt-4 offset-lg-7">
                        <div className="input-group">
                            <input type="text" name="" id="searchData" value={searchByInputValue} onChange={(e) => checkIfDataPresent(e)} className="form-control" />
                            <label htmlFor='searchData' className="input-group-text">
                                <i class="bi bi-search fs-5"></i>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-2 col-12 mt-4">
                        <div className="dropdown">
                            <button className="btn btn-primary fs-5 px-5" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-filter-square-fill me-3"></i>&nbsp;Sort
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartTimeLH') ? 'bg-success-subtle' : 'bg-light')} onClick={sortTTDateLH}>Start Time: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartTimeHL') ? 'bg-success-subtle' : 'bg-light')} onClick={sortTTDateHL}>Start Time: High To Low</button></li>
                                {/* <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'TotalLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getTotalLHSort}>Total: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'TotalHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getTotalHLSort}>Total: High To Low</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getStartLHSort}>Date: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getStartHLSort}>Date: High To Low</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'EndLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getEndLHSort}>Date: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'EmdHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getEndHLSort}>Date: High To Low</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'FacultyLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getFacultyLHSort}>Quantity: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'FacultyHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getFacultyHLSort}>Quantity: High To Low</button></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0">
                <h1 className='border-top mt-5'>Time Table</h1>
                <div className="table-responsive mt-3 mb-5">
                    <table className="table table-hover table-bordered text-center">
                        <thead>
                            <tr className="fs-4" style={{ textWrap: 'nowrap' }}>
                                <th>Date <label htmlFor="" className="fs-6">[YYYY-MM-DD]</label></th>
                                {/* <th>Subject</th> */}
                                <th>Batch</th>
                                <th>Start&nbsp;Time</th>
                                <th>End&nbsp;Time</th>
                                <th>Faculty</th>
                                <th>Total&nbsp;Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeTable.map(element => {
                                return (
                                    <tr className="fs-5 text-center" key={element.id} id={'timeTable' + element.date + element.batch_subj} data-bs-toggle="modal" data-bs-target="#staticBackdropSale" onClick={deleteTimeTableSlot} style={{ textWrap: 'nowrap' }}>
                                        <td id='timeTableDate'>{element.date}</td>
                                        {/* <td id='timeTableSubject'>{element.subject}</td> */}
                                        <td id='timeTableBatch'>{element.batch}</td>
                                        <td id='timeTableStartTime'>{element.start_time}</td>
                                        <td id='timeTableEndTime'>{element.end_time}</td>
                                        <td id='timeTableFaculty'>{element.faculty_name}</td>
                                        <td id='timeTableTotalTime'>{element.total_hrs}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal fade" id="staticBackdropSale" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-2" id="staticBackdropLabel">Are You Sure You Want To Delete :</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table className='table table-hover table-bordered text-center'>
                                <thead>
                                    <tr className="fs-4">
                                        <th>Date <label htmlFor="" className="fs-6">[YYYY-MM-DD]</label></th>
                                        <th>Batch</th>
                                        <th>Start&nbsp;Time</th>
                                        <th>End&nbsp;Time</th>
                                        <th>Total&nbsp;Hours</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <tr className='fs-5 p-2'>
                                        <td>{del_date}</td>
                                        <td>{del_batch}</td>
                                        <td>{del_startTime}</td>
                                        <td>{del_endTime}</td>
                                        <td>{del_totalHrs}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary px-5 py-1" data-bs-dismiss="modal">Cancel</button>
                            <form onSubmit={handleDelTimeTableSlot}>
                                <button type="submit" class="btn btn-danger px-5 py-1" data-bs-dismiss="modal">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default FacultySchedulePage;