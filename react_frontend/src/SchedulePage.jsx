import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line } from "react-chartjs-2";

import React, { useEffect, useState } from "react";

function SchedulePage(props) {
    const [timeTable, setTimeTable] = useState([]);
    const [date, setDate] = useState();
    const [subject, setSubject] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [faculty, setFaculty] = useState();
    const [totalHrs, setTotalHrs] = useState();
    const [deletedStatus, setDeletedStatus] = useState(false);

    const [searchByInputValue, setSearchByInputValue] = useState('');

    const [sortSelected, setSortSelected] = useState('Featured');
    const [del_order_num, setDelOrderNum] = useState();
    const [del_sale_date, setDelSaleDate] = useState();
    const [del_product_name, setDelProductName] = useState();
    const [del_product_quan, setDelProductQuan] = useState();

    function checkIfDataPresent(e) {
        setSearchByInputValue(() => e.target.value)
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/searchStudent/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'batch': props.batch, 'user_input': e.target.value }),
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

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/getTimeTableBatch/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'batch': props.batch }),
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
    }, []);

    function sortTTDateHLBatch() {
        setSortSelected('StartTimeHLBatch')
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/sortTTDateHLBatch/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'batch': props.batch }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data)
            } catch (error) {
                console.error(error);
            }

        }
        postData();
    }

    function sortTTDateLHBatch() {
        setSortSelected('StartTimeHLBatch')
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/sortTTDateLHBatch/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'batch': props.batch }),
                });
                if (!response.ok) {
                    throw new Error('')
                }
                const data = await response.json()
                setTimeTable(() => data)
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
                                {/* <button className="btn btn-primary px-4 py-1" type="button" data-bs-toggle="modal" data-bs-target="#newSaleModal">
                                    <i className="bi bi-plus-lg"></i>&nbsp;New
                                </button> */}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-12 mt-4 offset-lg-7">
                        <div className="input-group">
                            <input type="text" name="" id="searchByOrderNum" value={searchByInputValue} onChange={(e) => checkIfDataPresent(e)} className="form-control" />
                            <label htmlFor='searchByOrderNum' className="input-group-text">
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
                                {/* <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartTimeLH') ? 'bg-success-subtle' : 'bg-light')} onClick={sortTTDateLH}>Start Time: Low To High</button></li> */}
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartTimeLH') ? 'bg-success-subtle' : 'bg-light')} onClick={sortTTDateLHBatch}>Start Time: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((sortSelected == 'StartTimeHL') ? 'bg-success-subtle' : 'bg-light')} onClick={sortTTDateHLBatch}>Start Time: High To Low</button></li>
                                {/* <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'TotalLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getTotalLHSort}>Total: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'TotalHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getTotalHLSort}>Total: High To Low</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'DateLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getDateLHSort}>Date: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'DateHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getDateHLSort}>Date: High To Low</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'QuantityLH') ? 'bg-success-subtle' : 'bg-light')} onClick={getQuantityLHSort}>Quantity: Low To High</button></li>
                                <li><button className={"dropdown-item fs-5 border border-0 " + ((filterSelected == 'QuantityHL') ? 'bg-success-subtle' : 'bg-light')} onClick={getQuantityHLSort}>Quantity: High To Low</button></li> */}
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
                                <th>Subject</th>
                                <th>Start&nbsp;Time</th>
                                <th>End&nbsp;Time</th>
                                <th>Faculty</th>
                                <th>Total&nbsp;Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeTable.map(element => {
                                return (
                                    <tr className="fs-5 text-center" key={element.id} id={'saleOrderList' + element.order_num} style={{ textWrap: 'nowrap' }}>
                                        <td id='saleDate'>{element.date}</td>
                                        <td id='productCost'>{element.subject}</td>
                                        <td id='orderNum'>{element.start_time}</td>
                                        <td id='productName'>{element.end_time}</td>
                                        <td id='productQuan'>{element.faculty_name}</td>
                                        <td id='shipDate'>{element.total_hrs}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </>);
}

export default SchedulePage;