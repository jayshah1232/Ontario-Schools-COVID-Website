import React from 'react';
import './cards-style.css'

const Card = props => {
    return(
        <div className="card text-center">
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.cases}</p>
            </div>
        </div>
    );
}

export default Card;