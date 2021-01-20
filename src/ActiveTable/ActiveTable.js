import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './active-table-style.css'

let activeData = []
let totalSchool = 0
let totalStudents = 0
let totalStaff = 0
let totalUnspec = 0
let totalCases = 0

function ActiveTable(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        console.log("entering useEffect")
        fetch(`https://covid-schools-data-api.herokuapp.com/activecases`)
        .then((response) => {
            console.log(response); // Logs the response
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
           // console.log(data)
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
        console.log("loading complete");

        var uniqueMunicipalities = [];
        var uniqueMunicipalitiesCount = [];
        var uniqueBoards = [];
        var uniqueBoardsCount = [];

        var i;
        for (i = 0; i < data.length; i++) {
            totalSchool++;
            totalCases = totalCases + data[i].total_confirmed_cases;
            totalStaff = totalStaff + data[i].confirmed_staff_cases;
            totalStudents = totalStudents + data[i].confirmed_student_cases;
            totalUnspec = totalUnspec + data[i].confirmed_unspecified_cases;

        }
        console.log(totalSchool + ", " + totalCases + ", " + totalStudents + ", " + totalStaff + ", " + totalUnspec)

        const { SearchBar } = Search;
        const columns = [{
            dataField: 'school',
            text: 'School Name',
            sort: true,
            footer: 'Total Schools: ' + totalSchool,
            headerStyle: {position: 'sticky'}
        }, {
            dataField: 'school_board',
            text: 'School Board',
            sort: true,
            footer: 'Total Boards: ' + totalSchool
        }, {
            dataField: 'municipality',
            text: 'Municipality',
            sort: true,
            footer: 'Total Municipalities: ' + totalSchool
        }, {
            dataField: 'confirmed_student_cases',
            text: 'Student Cases',
            sort: true,
            footer: 'Total Students: ' + totalStudents
        }, {
            dataField: 'confirmed_staff_cases',
            text: 'Staff Cases',
            sort: true,
            footer: 'Total Staff: ' + totalStaff
        }, {
            dataField: 'confirmed_unspecified_cases',
            text: 'Unspecified Cases',
            sort: true,
            footer: 'Total Unspecified: ' + totalUnspec
        }, {
            dataField: 'total_confirmed_cases',
            text: 'Total Cases',
            sort: true,
            footer: 'Total Cases: ' + totalCases
        }];

        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
              Showing { from } to { to } of { size } Results
            </span>
        );

        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
              text: '10', value: 10
            }, {
                text: '50', value: 50
            },{
              text: '100', value: 100
            }, {
              text: 'All', value: data.length
            }] // A numeric array is also available. the purpose of above example is custom the text
        };

        return(
            <div id='table' >
                <ToolkitProvider
                    keyField="index"
                    data={ data }
                    columns={ columns }
                    pagination={ paginationFactory(options) }
                    search>
                    {
                        props => (
                        <div>
                            <SearchBar { ...props.searchProps } />
                            <hr />
                            <BootstrapTable
                            { ...props.baseProps }
                            pagination={ paginationFactory(options) }
                            headerWrapperClasses='header-class'
                            footerClasses="footer-class"
                            />
                        </div>
                        )
                    }
                </ToolkitProvider>
            </div>
            //<BootstrapTable keyField='school' data={ data } columns= { columns } pagination={ paginationFactory(options) }/>
        )


        // return(
        //     <div id="table">
        //         <table className="table">
        //             <thead>
        //                 <tr>
        //                     <th scope="col">School</th>
        //                     <th scope="col">Board</th>
        //                     <th scope="col">City</th>
        //                     <th scope="col">Student Cases</th>
        //                     <th scope="col">Staff Cases</th>
        //                     <th scope="col">Unspecified Cases</th>
        //                     <th scope="col">Total Cases</th>
        //                 </tr>
        //             </thead>    
        //         </table>            
        //     </div>
        // );
        
    }
}

export default ActiveTable;