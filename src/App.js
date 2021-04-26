import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBIcon, MDBCard, MDBCardBody } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Label } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Cards/Cards';
import moment from 'moment';

class App extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          data: [],
          isLoading: true
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  componentDidMount() {
    fetch("https://nameless-fortress-98366.herokuapp.com/https://data.ontario.ca/api/3/action/datastore_search?resource_id=7fbdbb48-d074-45d9-93cb-f7de58950418&limit=500")
    .then(res => res.json())
    .then(json => this.setState({ data: json.result.records, isLoading: false }))
  }


  render() {    
    let barGraph = " ";
    let updateDate = " ";

    if(this.state.isLoading) {
      barGraph = 
      <div className="loading">
        <div className="loadingio-spinner-bars-k2zs6r7rbar"><div className="ldio-7jcdny9bopo">
        <div></div><div></div><div></div><div></div>
        </div></div>
      </div>
    }
    else {
      updateDate = moment(this.state.data[this.state.data.length - 2].reported_date).format('MMMM D, YYYY')
      barGraph = 
      <div>
        <MDBContainer>
          <div className="w-auto p-3">
            <MDBCard>
              <MDBCardBody>
                <h3 className="chart-title">New School-Related Cases Over Time</h3>
                <ResponsiveContainer width="99%" height={400}>
                  <BarChart
                    width={500}
                    aspect={3}
                    data={this.state.data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="reported_date"
                      tickFormatter = {(date) => moment(date).format('D/M/YYYY')}
                      interval="{3}"
                    >
                      <Label position="bottom" value="Date" offset={0}/>
                    </XAxis>
                    <YAxis>
                      <Label value="Number of Cases" angle="90" position="insideLeft"/>
                    </YAxis>
                    <Tooltip labelFormatter={t => moment(t).format('D/M/YYYY')}/>
                    <Legend align="left"/>
                    <Bar
                      dataKey="new_school_related_student_cases"
                      name="Student"
                      stackId="a"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="new_school_related_staff_cases"
                      name="Staff"
                      stackId="a"
                      fill="#FF0000"
                    />
                    <Bar
                      dataKey="new_school_related_unspecified_cases"
                      name="Unspecified"
                      stackId="a"
                      fill="#82ca9d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBContainer>
        <MDBContainer>
          <div className="w-auto p-3">
            <MDBCard>
              <MDBCardBody>
                <h3 className="chart-title">Cumulative School-Related Cases Over Time</h3>
                <ResponsiveContainer width="99%" height={400}>
                  <LineChart
                    width={500}
                    aspect={3}
                    data={this.state.data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="reported_date"
                      tickFormatter = {(date) => moment(date).format('D/M/YYYY')}
                      interval="{3}"
                    >
                      <Label position="bottom" value="Date" offset={0}/>
                    </XAxis>
                    <YAxis>
                      <Label value="Number of Cases" angle="90" position="insideLeft"/>
                    </YAxis>
                    <Tooltip labelFormatter={t => moment(t).format('D/M/YYYY')}/>
                    <Legend align="left"/>
                    <Line type="monotone" dataKey="cumulative_school_related_cases" name="School" stroke="#FF0000" />
                    <Line type="monotone" dataKey="cumulative_school_related_student_cases" name="Student" stroke="#8884d8" />
                    <Line type="monotone" dataKey="cumulative_school_related_staff_cases" name="Staff" stroke="#800181" />
                    <Line type="monotone" dataKey="cumulative_school_related_unspecified_cases" name="Unspecified" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </MDBCardBody>
            </MDBCard>
          </div>
        </MDBContainer>
      </div>;
    }

    return(
      <div>
        <Router>
          <header>
            <MDBNavbar id="MDBNav" expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                  <strong>Ontario Schools COVID-19 Tracker</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                  <MDBNavItem className="link">
                    <a href="https://twitter.com/ONTSchoolCovid?ref_src=twsrc%5Etfw"><MDBIcon fab icon="twitter" /></a>
                  </MDBNavItem>
                  <MDBNavItem className="link">
                    <a href="https://github.com/jayshah1232"><MDBIcon fab icon="github" /></a>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>

        <div id="site-body">

          <br/>
          <br/>
          <br/>
          <br/>

        <p className="date-updated">Last updated {updateDate}</p>

          <Container id="todays-category-container">
            <Cards className="shadow-card" />
          </Container>

          <h1 id="charts-heading">Visualized Data</h1>

          <div>
            {barGraph};
          </div>
        </div>
      </div>
    );
  }
}

export default App;