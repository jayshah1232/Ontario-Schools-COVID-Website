import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";
import { MDBContainer, MDBCard, MDBCardBody } from 'mdbreact';
import React, { useState, useEffect } from 'react'
import moment from 'moment';

let requestedData = [];


function Chart(props) {

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
            console.log(data);
        });
    }, []);

    let graph = null;
    

    if(loading) {
        graph = 
            <div className="loading">
                <img src="Blocks-1s-200px.svg" alt="loading spinner" />
            </div>
    } else {
        requestedData = data;
        console.log(requestedData);
        console.log(props)
        graph =
        <div>
            <MDBContainer>
                <div className="w-auto p-3">
                    <MDBCard>
                    <MDBCardBody>
                        <h3 className="chart-title">{props.title}</h3>
                        <ResponsiveContainer width="99%" height={400}>
                        <BarChart
                            width={500}
                            aspect={3}
                            data={requestedData}
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
                            dataKey={props.chartKey}
                            name={props.barName}
                            stackId="a"
                            fill="#8884d8"
                            />
                        </BarChart>
                        </ResponsiveContainer>
                    </MDBCardBody>
                    </MDBCard>
                </div>
            </MDBContainer>
        </div>
    }

    return (
        <div>
            {graph}
        </div>
    );
}

export default Chart;