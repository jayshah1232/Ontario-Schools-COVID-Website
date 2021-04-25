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
let currentSchoolsClosed = 0
let currentSchoolsWCases = 0



function Cards(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        fetch('https://nameless-fortress-98366.herokuapp.com/https://data.ontario.ca/api/3/action/datastore_search?resource_id=7fbdbb48-d074-45d9-93cb-f7de58950418&limit=500')
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
                <img src="Blocks-1s-200px.svg" />
            </div>
            
        );
    } else {
        console.log(data);
        currentData = data;
        currentData = data[data.length - 2]        
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
            // <div id="reactCardsComponent">
            //     <div className="heading-container">
            //         <Card className="heading-card" id="todaysTotalCard" title="Today's New School Cases" cases={totalNewSchool}/>
            //     </div>

            
            //     <div className="container-fluid d-flex justify-content-center" id="todayContainer">
            //         <div className="card-group">
            //             <Card title="Today's New Student Cases" cases={totalNewStudents}/>
            //             <Card title="Today's New Staff Cases" cases={totalNewStaff}/>
            //             <Card title="Today's New Unspecified Cases" cases={totalNewUnspec}/>
            //         </div>
            //     </div>

            //     <div className="heading-container">
            //         <Card className="heading-card" id="todaysCasesCard" title="Cumulative School Cases" cases={currentSchoolCases}/>
            //     </div>

            
            //     <div className="container-fluid d-flex justify-content-center">
            //         <div className="card-group">
            //             <Card title="Cumulative Student Cases" cases={currentStudentCases}/>
            //             <Card title="Cumulative Staff Cases" cases={currentStaffCases}/>
            //             <Card title="Cumulative Unspecified Cases" cases={currentUnspecCases}/>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default Cards;