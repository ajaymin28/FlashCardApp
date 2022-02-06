import React from "react";
import "./Dashboard.css";



const DashBoard = (dashboard_props) =>{

    
    return (
        <div>
            <div className="StatusOfCount">
                <label>Mastered Words: {dashboard_props.MasteredCards}</label>
            </div>
            <div className="StatusOfCount">
                <label>Reviewing Words: {dashboard_props.ReviewingCards}</label>
            </div>
        </div>
           
    )

}




export default DashBoard;