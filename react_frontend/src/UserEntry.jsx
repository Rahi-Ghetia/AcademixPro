import React, { useState, useEffect } from "react";
import UserLogin from "./UserLogin";
import UserSignUp from "./UserSignUp";


function UserEntry(props) {

    const [accExis, setAccExis] = useState(true);

    const accExistQue = (val) => {
        setAccExis(() => val);
    }

    return (<>
        <div className="container-fluid">
            {accExis ?
                <UserLogin accExistQue={accExistQue} changeLoginState={props.changeLoginState} setFName={props.setFName} setUPosition={props.setUPosition} setUPassword={props.setUPassword} setUBatch={props.setUBatch} />
                :
                <UserSignUp accExistQue={accExistQue} changeLoginState={props.changeLoginState} setFName={props.setFName} setUPosition={props.setUPosition} setUPassword={props.setUPassword} setUBatch={props.setUBatch} />
            }
        </div>
    </>);
}

export default UserEntry;