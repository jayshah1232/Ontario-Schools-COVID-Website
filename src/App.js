import React, { useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import $ from "jquery"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Label } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Cards/Cards';
import moment from 'moment';

class App extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          data: []
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  componentDidMount() {
    fetch('https://data.ontario.ca/api/3/action/datastore_search?resource_id=7fbdbb48-d074-45d9-93cb-f7de58950418&limit=500')
    .then(res => res.json())
    .then(json => this.setState({ data: json.result.records }))
  }


  render() {
    const bgPink = {backgroundColor: 'rgb(42,49,61)'}
    let newCasesArray = [];
    let rollingAvg = [];
    this.state.data.forEach(element => {
      newCasesArray.push(element.new_total_school_related_cases);
    });

    console.log(this.state.data)

    function iterate(item, index){
      let total = 0;
      let movingAvg = 0;
      let arrayIndex = newCasesArray.indexOf(item);
      let bottomIndex = newCasesArray.indexOf(item) - 5;
      if(index <= 4) {
        rollingAvg.push(0);
      }
      else {
        for (let i = index; i > bottomIndex; i--) {
          total = total + newCasesArray[i];
          movingAvg = total/5;
          rollingAvg.push(movingAvg)
        }
      }
    }

    newCasesArray.forEach(iterate);

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
                  <MDBNavItem>
                    <MDBNavLink to="https://twitter.com/ONTSchoolCovid?ref_src=twsrc%5Etfw"><MDBIcon fab icon="twitter" /></MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem class="github-link">
                    <MDBNavLink to="https://github.com/jayshah1232"><MDBIcon fab icon="github" /></MDBNavLink>
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

          <Container id="todays-category-container">
            <Cards className="shadow-card" />
          </Container>

          <h1 id="charts-heading">Visualized Data</h1>

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
                        name="Student Cases"
                        stackId="a"
                        fill="#8884d8"
                      />
                      <Bar
                        dataKey="new_school_related_staff_cases"
                        name="Staff Cases"
                        stackId="a"
                        fill="#FF0000"
                      />
                      <Bar
                        dataKey="new_school_related_unspecified_cases"
                        name="Unspecified Cases"
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
                      <Line type="monotone" dataKey="cumulative_school_related_cases" name="School Cases" stroke="#FF0000" />
                      <Line type="monotone" dataKey="cumulative_school_related_student_cases" name="Student Cases" stroke="#8884d8" />
                      <Line type="monotone" dataKey="cumulative_school_related_staff_cases" name="Staff Cases" stroke="#800181" />
                      <Line type="monotone" dataKey="cumulative_school_related_unspecified_cases" name="Unspecified Cases" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </MDBCardBody>
              </MDBCard>
            </div>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default App;