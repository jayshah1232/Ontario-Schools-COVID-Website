import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup } from 'mdbreact'
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
// let currentSchoolsClosed = 0
// let currentSchoolsWCases = 0



function Cards(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        fetch('https://nameless-fortress-98366.herokuapp.com/https://data.ontario.ca/api/3/action/datastore_search?resource_id=7e644a48-6040-4ee0-9216-1f88121b21ba')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setData(data.result.records);
            setLoading(false);
        });
    }, []);
    
    if(loading) {
        return (
            <div className="loading">
                <img src="Blocks-1s-200px.svg" alt="loading spinner"/>
            </div>
            
        );
    } else {
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
        // currentSchoolsClosed = currentData['current_schools_closed']
        // currentSchoolsWCases = currentData['current_schools_w_cases']

        return(
            <div id="react-cards-component">
                <MDBCard id="header-card">
                    <MDBCardBody>
                        <MDBCardTitle>
                            Today's New School Cases
                        </MDBCardTitle>
                        <MDBCardText id="card-text">
                            {totalNewSchool}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

                <MDBCardGroup>
                    <Card title="New Student Cases" cases={totalNewStudents}/>
                    <Card title="New Staff Cases" cases={totalNewStaff}/>
                    <Card title="New Unspecified Cases" cases={totalNewUnspec}/>
                </MDBCardGroup>

                <br/>
                <br/>
                <br/>

                <MDBCard id="header-card">
                    <MDBCardBody>
                        <MDBCardTitle>
                            Cumulative School Cases
                        </MDBCardTitle>
                        <MDBCardText id="card-text">
                            {currentSchoolCases}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

                <MDBCardGroup>
                    <Card title="Student Cases" cases={currentStudentCases}/>
                    <Card title="Staff Cases" cases={currentStaffCases}/>
                    <Card title="Unspecified Cases" cases={currentUnspecCases}/>
                </MDBCardGroup>
            </div>
        )
    }
}

export default Cards;