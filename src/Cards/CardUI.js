import { MDBCardTitle, MDBCardBody, MDBCard, MDBCardText } from 'mdbreact';
import React from 'react';
import './cards-style.css'

const Card = props => {
    return(
        <MDBCard id="regular-card">
            <MDBCardBody>
                <MDBCardTitle id="card-title">
                    {props.title}
                </MDBCardTitle>
                <MDBCardText id="card-text">
                    {props.cases}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>

        // <div className="card text-center">
        //     <div className="card-body text-dark">
        //         <h4 className="card-title">{props.title}</h4>
        //         <p className="card-text text-secondary">{props.cases}</p>
        //     </div>
        // </div>
    );
}

export default Card;