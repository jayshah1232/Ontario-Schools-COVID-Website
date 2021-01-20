import React, { useState, useEffect } from 'react'
import Card from './CardUI'

let currentData = []
let totalNewSchool = 0
let totalNewStudents = 0
let totalNewStaff = 0
let totalNewUnspec = 0

let currentSchoolCases = 0
let currentStaffCases = 0
let currentStudentCases = 0
let currentUnspecCases = 0
let currentSchoolsClosed = 0
let currentSchoolsWCases = 0



function Cards(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        console.log("entering useEffect")
        fetch(`https://covid-schools-data-api.herokuapp.com/`)
        .then((response) => {
            console.log(response); // Logs the response
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        });
    }, []);
    
    if(loading) {
        console.log("loading")
        return (
            <div className="loader">
                <div className="spinner-border m-5"></div>
            </div>
        );
    } else {
        console.log("loading complete")
        currentData = data;
        currentData = data[data.length - 1]        
        totalNewSchool = currentData['new_total_school_related_cases']
        totalNewStudents = currentData['new_school_related_student_cases']
        totalNewStaff = currentData['new_school_related_staff_cases']
        totalNewUnspec = currentData['new_school_related_unspecified_cases']

        currentSchoolCases = currentData['cumulative_school_related_cases']
        currentStaffCases = currentData['cumulative_school_related_staff_cases']
        currentStudentCases = currentData['cumulative_school_related_student_cases']
        currentUnspecCases = currentData['cumulative_school_related_unspecified_cases']
        currentSchoolsClosed = currentData['current_schools_closed']
        currentSchoolsWCases = currentData['current_schools_w_cases']

        return(
            <div id="reactCardsComponent">
                <div className="heading-container">
                    <Card className="heading-card" id="todaysTotalCard" title="Today's New School Cases" cases={totalNewSchool}/>
                </div>

            
                <div className="container-fluid d-flex justify-content-center" id="todayContainer">
                    <div className="card-group">
                        <Card title="Today's New Student Cases" cases={totalNewStudents}/>
                        <Card title="Today's New Staff Cases" cases={totalNewStaff}/>
                        <Card title="Today's New Unspecified Cases" cases={totalNewUnspec}/>
                    </div>
                </div>

                <div className="heading-container">
                    <Card className="heading-card" id="todaysCasesCard" title="Cumulative School Cases" cases={currentSchoolCases}/>
                </div>

            
                <div className="container-fluid d-flex justify-content-center">
                    <div className="card-group">
                        <Card title="Cumulative Student Cases" cases={currentStudentCases}/>
                        <Card title="Cumulative Staff Cases" cases={currentStaffCases}/>
                        <Card title="Cumulative Unspecified Cases" cases={currentUnspecCases}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;