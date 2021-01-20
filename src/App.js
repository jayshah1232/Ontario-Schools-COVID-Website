import React from 'react';
import './App.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link, Switch, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
//NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col, CardDeck,
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './Cards/Cards';
// import Card from './Cards/CardUI';
import ActiveTable from './ActiveTable/ActiveTable';

function App() {

  return (
    <div className="App">
      <Navbar className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top justify-content-center" id="navbar" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand id="navbar-title" href="#home">Ontario Schools COVID-19 Data</Navbar.Brand>
        </Container>
        <Nav className="mr-auto justify-content-center">
        </Nav>
      </Navbar>
      <br></br>
      {/* <Nav variant="tabs" defaultActiveKey="/">
        <LinkContainer to="/">
          <Nav.Item>Home</Nav.Item>
        </LinkContainer>
        <LinkContainer to="/ActiveCases">
          <Nav.Item>Active Cases</Nav.Item>
        </LinkContainer>
        {/* <Link to={'/'} className="nav-link">Home</Link>
        <Link to={'/ActiveCases'} className="nav-link">Active Cases</Link> */}
      {/* </Nav> */}
      {/* <Container>
        <Nav variant="tabs" defaultActiveKey="/home">
          <LinkContainer to="/">
            <Nav.Item>Home</Nav.Item>
          </LinkContainer>
          <LinkContainer to="/ActiveCases">
            <Nav.Item>Home</Nav.Item>
          </LinkContainer>
        </Nav>
      </Container>       */}
      <Container id="todaysCategoryContainer">
        <Cards class="shadow-card" />
      </Container>
      <h1 id="chartsHeading">Visualized Data</h1>
      <Container id="newCasesGraph">
        <iframe width="1150" height="800" frameBorder="0" scrolling="no" src="//plotly.com/~jay1shah/3.embed?link=false" ></iframe>
      </Container>
      <Container id="totalCasesGraph">
        <iframe width="1150" height="800"  frameBorder="0" scrolling="no" src="//plotly.com/~jay1shah/6.embed?link=false" ></iframe>
      </Container>
      {/* <Switch>
        <Route exact path='/' render={() => (
          <App />
        )} />
        <Route path='/ActiveCases' render={() => (
          <ActiveTable />
        )}/>
      </Switch> */}
    </div>
  );
}

export default App;
