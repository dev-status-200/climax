import { Row, Col, Table } from 'react-bootstrap';
import React, { useEffect, useReducer } from 'react';
import Router from 'next/router';
import { Modal } from 'antd';
import CreateOrEdit from './CreateOrEdit';
import { EditOutlined, HistoryOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import History from '/Components/Shared/History';

function recordsReducer(state, action){
    switch (action.type) {
      case 'toggle': { 
        return { ...state, [action.fieldName]: action.payload } 
      }
      case 'create': {
        return {
            ...state,
            edit: false,
            visible: true,
        }
      }
      case 'history': {
        return {
            ...state,
            edit: false,
            viewHistory:true,
            visible: true,
        }
      }
      case 'edit': {
        return {
            ...state,
            selectedRecord:{},
            edit: true,
            visible: true,
            selectedRecord:action.payload
        }
      }
      case 'modalOff': {
        let returnVal = { ...state, visible: false, edit: false, viewHistory:false };
        state.edit?returnVal.selectedRecord={}:null
        return returnVal
      }
      default: return state 
    }
}

const baseValues = {
  //Basic Info
  id:'',
  name:"",
  registerDate:"",
  person1:"",
  mobile1:"",
  person2:"",
  mobile2:"",
  telephone1:"",
  telephone2:"",
  address1:"",
  address2:"",
  city:"",
  zip:"",
  ntn:"",
  strn:"",
  website:"",
  infoMail:"",
  accountsMail:"",
  operations:[],
  types: [],
  companies:[],
  //Bank Info
  bank:"",
  branchName:"",
  branchCode:"",
  accountNo:"",
  iban:"",
  swiftCode:"",
  routingNo:"",
  ifscCode:"",
  micrCode:"",
  bankAuthorizeDate:"",
  authorizedById : "",
  //Account Info
  accountRepresentatorId : "",
  salesRepresentatorId : "",
  docRepresentatorId : "",
  currency:"",
  code:"",
}

const initialState = {
    records: [],
    load:false,
    visible:false,
    edit:false,
    viewHistory:false,
    values:baseValues,
    Representatives:[
      {name:'Accounts', records:[]},
      {name:'Sales', records:[]},
      {name:'Doc', records:[]}
    ],
    Operations:[
      { label: "Sea Import", value: "Sea Import" },
      { label: "Sea Export", value: "Sea Export" },
      { label: "Air Import", value: "Air Import" },
      { label: "Air Export", value: "Air Export" }
    ],
    Types:[
      { label: "Shipper", value: "Shipper" },
      { label: "Consignee", value: "Consignee" },
      { label: "Notify", value: "Notify" },
      { label: "Potential Customer", value: "Potential Customer" },
      { label: "Invoice Party", value: "Invoice Party" },
      { label: "Non operational Party", value: "Non operational Party" },
    ],
    companyList:[
      {id:1, name:''}
    ],
    editCompanyList:[
      {id:1, name:''}
    ],
    history:[],
    // Editing Records
    selectedRecord:{},
    oldRecord:{},
};

const Client = ({sessionData, representativeData, clientData}) => {

  useEffect(()=>{ if(sessionData.isLoggedIn==false) Router.push('/login') }, [sessionData]);
  const companiesList = useSelector((state) => state.company.companies);

  const [ state, dispatch ] = useReducer(recordsReducer, initialState);
  const { records, visible, viewHistory } = state;

  useEffect(() => {
    dispatch({type:'toggle', fieldName:'companyList', payload:createCompanyList(companiesList)});
    dispatch({type:'toggle', fieldName:'editCompanyList', payload:createCompanyList(companiesList)});
    setRecords();
  }, [])

  const createCompanyList = (list) => {
    let tempState = [];
    list.forEach((x, index)=>{
          tempState.push({value:x.id, label:x.title, disabled:false})
    })
    return tempState
  }

  const setRecords = () => {
    let tempState = [
      {name:'Accounts', records:[]},
      {name:'Sales', records:[]},
      {name:'Doc', records:[]}
    ];
    representativeData.result.Ar.forEach((x)=>{tempState[0].records.push(x)});
    representativeData.result.Dr.forEach((x)=>{tempState[1].records.push(x)});
    representativeData.result.Sr.forEach((x)=>{tempState[2].records.push(x)});
    dispatch({type:'toggle', fieldName:'Representatives', payload:tempState});
    dispatch({type:'toggle', fieldName:'records', payload:clientData.result});
  }

  const getHistory = async(recordid,type) => {
    dispatch({type:'toggle', fieldName:'load', payload:true});
    dispatch({ type: 'history'})
    await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_HISTORY,{
      headers:{ recordid:recordid, type:type }
    }).then((x)=>{
      setTimeout(async() => {
        dispatch({type:'toggle', fieldName:'load', payload:false});
        dispatch({type:'toggle', fieldName:'history', payload:x.data.result});
    }, 2000);
    })
  }

  return (
    <div className='base-page-layout'>
    <Row>
        <Col><h5>Clients</h5></Col>
        <Col><button className='btn-custom right' onClick={()=>dispatch({type:'create'})}>Create</button></Col>
    </Row>
    <hr className='my-2' />
    <Row style={{maxHeight:'69vh',overflowY:'auto', overflowX:'hidden'}}>
    <Col md={12}>
      <div className='table-sm-1 mt-3' style={{maxHeight:500, overflowY:'auto'}}>
        <Table className='tableFixHead'>
        <thead>
          <tr>
            <th>Basic Info</th>
            <th>Contact Persons</th>
            <th>Telephones</th>
            <th>Address</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
        {records.map((x, index) => {
          return (
          <tr key={index} className='f row-hov'
          onClick={()=>dispatch({type:'edit', payload:x})}
          >
            <td >Name: <span className='blue-txt fw-7'>{x.name}</span></td>
            <td> {x.person1} {x.mobile1}<br/> {x.person2} {x.mobile2}<br/> </td>
            <td> {x.telephone1}<br/>{x.telephone2}</td>
            <td> {x.address1?.slice(0,30)}<br/> {x.address2?.slice(0,30)}<br/> </td>
            <td>
              Created By: <span className='blue-txt fw-5'>{x.createdBy}</span> <br/>
              <span className='' style={{position:'relative', top:2}}>Load History</span>
              <HistoryOutlined onClick={()=>getHistory(x.id,'client')} className='modify-edit mx-2' />
            </td>
          </tr>
          )
        })}
        </tbody>
        </Table>
      </div>
    </Col>
    </Row>
    <Modal
      open={visible}
      onOk={()=>dispatch({ type: 'modalOff' })} onCancel={()=>dispatch({ type: 'modalOff' })}
      width={1000} footer={false} centered={false}
    >
      {!viewHistory && <CreateOrEdit state={state} dispatch={dispatch} baseValues={baseValues} />}
      {viewHistory && <History history={state.history} load={state.load} />}
    </Modal>
    </div>
  )
}

export default Client