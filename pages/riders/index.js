import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Row, Col, Spinner } from 'react-bootstrap';
import MediumModal from '../..//Components/Shared/Modals/MediumModal';
import CreateOrEdit from '../../Components/Layouts/Setup/Employees/CreateOrEdit';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { incrementTab } from '/redux/tabs/tabSlice';

const Employees = ({}) => {
  const [rider, setRider] = useState([]);
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const dispatchNew = useDispatch();

  const company = useSelector((state) => state.company.companies);

  useEffect(() => {
    getEmployees();
    return () => { }
  }, [])

  const getEmployees = async() => {
    console.log("Function Hit")
    await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_RIDERS).then((x)=>{
      if(x.data.status=='success'){
        setRider(x.data.result);
      }
    })
  }

  const updateUser = (x) => {
    let tempState = [...rider];
    let i = tempState.findIndex((y=>x.id==y.id));
    tempState[i] = x;
    setRider(tempState);
  }

  const appendClient = (x, levels) => {
    let tempState = [...rider];
    console.log(x)
    x.Access_Levels=levels
    tempState.unshift(x);
    setRider(tempState);
  }

  const getCompanyName = (id) => {
    let name = '';
    company.forEach(x => {
      if(id==x.id){
        name=x.title
      }
    });
    return name
  }

  return (
  <div className='dashboard-styles'>
    <div className='base-page-layout'>
      <Row>
      <Col md={12}>
        <Row>
        <Col><h5>Riders</h5></Col>
        </Row>
        <div className='my-2' style={{backgroundColor:'silver', height:1}}></div>
      </Col>
      {rider.length>0 && <Col md={12}>
      <div className='' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead><tr><th>Sr.</th><th>Code</th><th>Basic Info</th><th>Company Info</th><th>Bank Info</th><th>History</th></tr></thead>
        <tbody>
        {rider.map((x, index) => {
        return (
        <tr key={index} className='f row-hov'
          onClick={()=>{
                // dispatchNew(incrementTab({"label":"assign rider","key":"4-4","id":x.id}))
                Router.push(`/seJob/bl/${x.id}`)
        }}>
          <td>{index + 1}</td>
          <td><span className='blue-txt fw-5'>{x.code}</span></td>
          <td>Name: <span className='blue-txt fw-5'>{x.name}</span><br/>Contact: {x.contact}<br/>CNIC: {x.cnic}</td>
          <td>Dpt: {x.department}<br/>Designation: {x.designation}<br/>Manager: {x.manager}</td>
          <td>Name: {x.bank}<br/>No: {x.account_no}<br/></td>
          <td>
            Creator: <span className='blue-txt fw-5'>{x.createdBy}</span>
            <br/>
            Modifier: <span className='grey-txt fw-5'>{x.updatedBy==null?'( )':x.updatedBy}</span>
          </td>
        </tr>
        )})}
        </tbody>
        </Table>
        </div>
      </Col>}
      {rider.length==0 && <div className='p-5 text-center'><Spinner/></div>}
      </Row>
    </div>
  </div>
  )
}

export default Employees