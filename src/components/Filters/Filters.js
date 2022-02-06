import React, { useState } from "react";
import './Filters.css';


const Filters = (Filters_props) =>{


    const [FilterStatus, SetFilterStatus] = useState({"CardStatus": "Reviewing", "FilterByCount": -1});

    const handleFilterChange = (event) =>{

        var NewState ={"CardStatus": FilterStatus.CardStatus,
            "FilterByCount": FilterStatus.FilterByCount};

        if(event.target.id==="wordreviewtype"){
            NewState["CardStatus"] = event.target.value;
        }else{
            NewState["CardStatus"] = FilterStatus.CardStatus;
        }
        if(event.target.id==="wordreviewcount"){
            NewState["FilterByCount"] = parseInt(event.target.value);
        }else{
            NewState["FilterByCount"] = FilterStatus.FilterByCount;
        }

        console.log("Before set state");
        SetFilterStatus(NewState);
        console.log("after set state");
        Filters_props.onFilterChange(NewState);
        console.log(NewState);
    };

    
    return (
        <div className="FiltersBlock">
            <section>

            <label>Filter Words: </label>
            <select className="FilterSelect" id="wordreviewtype" onChange={handleFilterChange} value={FilterStatus.CardStatus}>
                <option>Mastered</option>
                <option>Reviewing</option>
            </select>
            </section>

            <section>
            <label>Viewed less than: </label>
            <input type="number" id="wordreviewcount" value={FilterStatus.FilterByCount} min={-1} onChange={handleFilterChange} />
            </section>
            
        </div>
    )

}




export default Filters;