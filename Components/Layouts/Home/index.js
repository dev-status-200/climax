import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Accounts from './Accounts';
import axios from 'axios';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Scatter,
} from 'recharts';

const Home = ({sessionData}) => {
  
  const [userType, setUserType] = useState("");
  useEffect(() => { setUserType(JSON.parse(Cookies.get("access")).split(", ")[0]) }, []);
  
  const data = [
    {
      name: 'January',
      import: 20,
      export: 15
    },
    {
      name: 'Februarury',
      import: 35,
      export: 11
    },
    {
      name: 'March',
      import: 19,
      export: 28
    },
    {
      name: 'April',
      import: 67,
      export: 5
    },
    {
      name: 'May',
      import: 13,
      export: 33
    },
  ];

  const dataTwo = [
    {
      name: 'January',
      uv: 590,
      pv: 800,
      amt: 1400,
      cnt: 490,
    },
    {
      name: 'Februarury',
      uv: 868,
      pv: 967,
      amt: 1506,
      cnt: 590,
    },
    {
      name: 'March',
      uv: 1397,
      pv: 1098,
      amt: 989,
      cnt: 350,
    },
    {
      name: 'April',
      uv: 1480,
      pv: 1200,
      amt: 1228,
      cnt: 480,
    },
    {
      name: 'May',
      uv: 1520,
      pv: 1108,
      amt: 1100,
      cnt: 460,
    }
  ];
  
  return (
    <div className='base-page-layout'>
      <div className='dashboard-home-styles'>
      <Row>
        <Col md={4}>
          <div className='bar'>
              <h5 style={{float:'right'}}>8</h5>
              <h5>Total Clients</h5>
          </div>
        </Col>
        <Col md={4}>
          <div className='bar'>
              <h5 style={{float:'right'}}>3</h5>
              <h5>Total Jobs</h5>
          </div>
        </Col>
        <Col md={4}>
          <div className='bar'>
              <h5 style={{float:'right'}}>0</h5>
              <h5>Completed Jobs</h5>
          </div>
        </Col>
        <Col md={4} className='my-3'>
          <div className='bar'>
              <h5 style={{float:'right'}}>0</h5>
              <h5>Payments Complete</h5>
          </div>
        </Col>
      </Row>
      <hr className='mb-5' />
    <Row>
      <Col md={6}>
        {/* {userType=="accounts"?<Accounts/>:null} */}
        <h3>Total Jobs In This Year</h3>
        <hr/>
        <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="import" fill="#8884d8" />
          <Bar dataKey="export" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </Col>
      <Col md={6}>
        {/* {userType=="accounts"?<Accounts/>:null} */}
        <h3>Jobs Status</h3>
        <hr/>
        <ResponsiveContainer width="100%" height="85%">
        <ComposedChart
          data={dataTwo}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
      </Col>
    </Row>
      </div>
    </div>
  )
}

export default Home