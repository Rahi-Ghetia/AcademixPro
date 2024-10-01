import React, { useState, useEffect } from "react";

function UserLogin(props) {

    const [fname, setFname] = useState();
    const [password, setPassword] = useState();
    const [userAccount, setUserAccount] = useState();

    function checkForUserDet() {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/logInUser/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'fname': fname, 'password': password }),
                });
                if (!response.ok) {
                    throw new Error('HTTP Response Error');
                }
                const data = await response.json();
                props.setFName(fname);
                props.setUPassword(password);
                props.setUPosition(data.position);
                props.setUBatch(data.batch_subj);
                props.changeLoginState(data.user_status);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    function showPass() {
        let inpField = document.getElementById('floatingInputPass');
        let eyeImage = document.getElementById('eyeImage');
        if (inpField && eyeImage) {
            eyeImage.className = eyeImage.className === 'bi bi-eye' ? 'bi bi-eye-slash' : 'bi bi-eye';
            (inpField).type = (inpField).type === 'text' ? 'password' : 'text';
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const checkRes = checkForUserDet();
    }

    return (<>
        <form onSubmit={handleSubmit} className="">
            <div className="container px-1 p-xl-2 content-center" style={{ margin: '25vh auto' }}>
                <div className="row ">
                    <div className="col-xl-6 offset-xl-3 col-12  text-center">
                        <h1>
                            Welcome Back To AcademixPro
                        </h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="offset-lg-2 col-lg-2 offset-1 col-3">
                        <h4>Fisrst&nbsp;Name&nbsp;:</h4>
                    </div>
                    <div className="col-lg-6 col-7">
                        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="offset-lg-2 col-lg-2 offset-1 col-3">
                        <h4>Password&nbsp;:</h4>
                    </div>
                    <div className="col-lg-6 col-7">
                        <div className="input-group">
                            <input type="password" minLength={8} value={password} autoComplete="current-password" className="form-control" id="floatingInputPass" onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" id="btnPassword" className="border btn bg-white" onClick={() => showPass()}><i id="eyeImage" className="bi bi-eye"></i></button>
                        </div>
                    </div>
                </div>
                <div className="row my-5 h-10">
                    <div className="offset-xl-8 col-xl-4 offset-4 col-8">
                        <h6 style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} onClick={() => { props.accExistQue(false) }}>
                            Don't Have An Account ?
                        </h6>
                    </div>
                </div>
                <div className="row my-5 h-10">
                    <div className="offset-xl-3 col-xl-6 offset-2 col-8">
                        <button type="submit" className="btn btn-success form-control">Log In</button>
                    </div>
                </div>
            </div>
        </form>

    </>);
}

export default UserLogin;