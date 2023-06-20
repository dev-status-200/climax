import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import moment from "moment";
import axios from 'axios';
import openNotification from '../Shared/Notification';
import FullScreenLoader from './FullScreenLoader';
import ports from "/jsonData/ports";
import inWords from '../../functions/numToWords';

const InvoiceCharges = ({data, companyId}) => {

  let inputRef = useRef(null);
  
  const [records, setRecords] = useState([]);
  const [invoice, setInvoice] = useState({
    Charge_Heads:[],
    SE_Job:{
        Client:{},
        shipper:{},
        consignee:{},
        sales_representator:{},
        shipping_line:{},
        pol:'',
        pod:'',
        fd:'',
        SE_Equipments:[]
    },
  });
  const [load, setLoad] = useState(false);
  
  useEffect(()=>{
    if(Object.keys(data).length>0){
        setInvoice(data.resultOne);
        setRecords(data.resultOne.Charge_Heads);
    }
  }, [data])

  const Line = () => <div style={{backgroundColor:"black", height:3, position:'relative', top:12}}></div>

  const calculateTotal = (data) => {
    let result = 0;
    data.forEach((x)=>{
        result = result + parseFloat(x.local_amount)
    });
    return result.toFixed(2);
  }

  const getCurrencyInfoAdvanced = (id, heads) => {
    let tempHeads = heads.filter((x)=> x.InvoiceId==id)
    return tempHeads[0].ex_rate;
  }

  const approve = async() => {
    let exp={}, income={},party={}; //exp is the Expense Account, income is Income Account, party is Party's account to create vouhcer with Ledger
    setLoad(true);
    let tempInv = {...invoice};
    await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_ALL_SE_JOB_CHILDS,{
        headers:{ title:JSON.stringify(["FCL FREIGHT INCOME", "FCL FREIGHT EXPENSE"]), companyid:companyId }
    }).then((x)=>{
        x.data.result.forEach((y)=>{
            if(y.title.endsWith("INCOME")){ 
                income = y
            } else { 
                exp = y 
            }
        })
    });
    await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_ALL_SE_JOB_CLIENT_CHILDS,{
        headers:{ title:tempInv.payType=="Recievable"?"Accounts Recievable":"Accounts Payble", companyid:companyId, clientid:tempInv.party_Id, partytype:tempInv.partyType }
    }).then((x)=>{
        party = x.data.result
    });
    if(tempInv.approved=="0"){ tempInv.approved="1" } else { tempInv.approved="0" }
    let vouchers = {};
    let amount = calculateTotal(tempInv.Charge_Heads);
    tempInv.total = amount;
    vouchers = {
        type:tempInv.payType=="Recievable"?"Job Recievable":"Job Payble",
        vType:tempInv.payType=="Recievable"?"SI":"PI",
        CompanyId:companyId,
        amount:"",
        currency:tempInv.type=="Job Bill"?"PKR":tempInv.type=="Job Invoice"?"PKR":tempInv.currency,
        exRate:tempInv.type=="Job Bill"?"1":tempInv.type=="Job Invoice"?"1":getCurrencyInfoAdvanced(tempInv.id, tempInv.Charge_Heads),
        chequeNo:"",
        payTo:"",
        costCenter:"KHI",
        invoice_Voucher:"1",
        invoice_Id:tempInv.id,
        Voucher_Heads:[]
    }
    let tempRoundOff = parseFloat(tempInv.roundOff);
    if(tempRoundOff==0){
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount),
            type:tempInv.payType=="Recievable"?"debit":"credit",
            narration:"party",
            VoucherId:null,
            ChildAccountId:party.id
        })
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount), //+ parseFloat(tempInv.roundOff),
            type:tempInv.payType=="Recievable"?"credit":"debit",
            narration:"",
            VoucherId:null,
            ChildAccountId:tempInv.payType=="Recievable"?income.id:exp.id //income.id
        })
    }else if(tempRoundOff>0 && tempInv.payType=="Recievable"){
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount) + parseFloat(tempRoundOff),
            type:tempInv.payType=="Recievable"?"debit":"credit",
            narration:"party",
            VoucherId:null,
            ChildAccountId:party.id
        })
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount) + parseFloat(tempRoundOff),
            type:"credit",
            narration:"",
            VoucherId:null,
            ChildAccountId:income.id
        })

    }else if (tempRoundOff<0 && tempInv.payType=="Recievable"){
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount) - parseFloat(tempRoundOff)*-1,
            type:tempInv.payType=="Recievable"?"debit":"credit",
            narration:"party",
            VoucherId:null,
            ChildAccountId:party.id
        })
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount),
            type:"credit",
            narration:"",
            VoucherId:null,
            ChildAccountId:income.id
        })
        vouchers.Voucher_Heads.push({
            amount:parseFloat(tempRoundOff)*-1,
            type:tempInv.payType=="Recievable"?"debit":"credit",
            narration:"",
            VoucherId:null,
            ChildAccountId:exp.id
        })

    }else if (tempRoundOff>0 && tempInv.payType!="Recievable"){
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount)+ parseFloat(tempRoundOff),
            type:"credit",
            narration:"party",
            VoucherId:null,
            ChildAccountId:party.id
        })
        vouchers.Voucher_Heads.push({
            amount:parseFloat(amount) + parseFloat(tempRoundOff),
            type:"debit",
            narration:"",
            VoucherId:null,
            ChildAccountId:exp.id
        })


    }else if(tempRoundOff<0 && tempInv.payType!="Recievable"){

        vouchers.Voucher_Heads.push({
            amount:(parseFloat(amount) - parseFloat(tempRoundOff)*-1).toFixed(2),
            type:"credit",
            narration:"party",
            VoucherId:null,
            ChildAccountId:party.id
        })
        vouchers.Voucher_Heads.push({
            amount:(parseFloat(amount)).toFixed(2),
            type:"debit",
            narration:"",
            VoucherId:null,
            ChildAccountId:exp.id
        })
        vouchers.Voucher_Heads.push({
            amount:(parseFloat(tempRoundOff)*-1).toFixed(2),
            type:"credit",
            narration:"",
            VoucherId:null,
            ChildAccountId:income.id
        })
    }
    await axios.post(process.env.NEXT_PUBLIC_CLIMAX_POST_INVOICE_APPROVE_DISAPPROVE,{
        id:tempInv.id,
        total:tempInv.total,
        roundOff:tempInv.roundOff,
        approved:tempInv.approved,
        exRate:vouchers.exRate
    }).then(async(x)=>{
        if(x.data.status=="success"){
            openNotification("Success", "Invoice Successfully Approved!", "green")
            setInvoice(tempInv);
            if(tempInv.approved=="1"){
                await axios.post(process.env.NEXT_PUBLIC_CLIMAX_CREATE_VOUCHER, vouchers);
            }else{
                await axios.post(process.env.NEXT_PUBLIC_CLIMAX_POST_DELETE_VOUCHER, {id:tempInv.id})
            }
        }else{
            openNotification("Ops", "An Error Occured!", "red")
        }
    })
    setInvoice(tempInv);
    setLoad(false);
  }

  const checkApprovability = (x) => {
    let result = false;
    if(x.payType=="Recievable" && x.recieved=="0"){
        result = false;
    }else if(x.payType=="Recievable" && x.recieved!="0"){
        result = true;
    }else if(x.payType!="Recievable" && x.paid=="0"){
        result = false;
    }else if(x.payType!="Recievable" && x.paid!="0"){
        result = true;
    }

    return result
  }
  const paraStyles = { lineHeight:1.2, fontSize:11 }
  const heading = { lineHeight:1, fontSize:11, fontWeight:'800', paddingBottom:5 }

  const getPort = (id) => {
    const index = ports.ports.findIndex(element => element.id == id);
    return index!=-1?ports.ports[index].name:''
  }
  

return (
  <>
  {load && <FullScreenLoader/>}
  <div className='invoice-styles'>
  {Object.keys(data).length>0 &&
  <>
  <div style={{maxWidth:70}}>
    <ReactToPrint content={()=>inputRef} trigger={()=><div className='div-btn-custom text-center p-2'>Print</div>} />
  </div>
  <Row className='py-3'>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Invoice No#:</span>
            <span className='inv-value'>{" "}{invoice.invoice_No}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Party Name:</span>
            <span className='inv-value'>{" "}{invoice.party_Name}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Pay Type:</span>
            <span className='inv-value'>{" "}{invoice.payType}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Currency:</span>
            <span className='inv-value'>{" "}{invoice.currency}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Invoie/Bill:</span>
            <span className='inv-value'>{" "}{invoice.type}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Created:</span>
            <span className='inv-value'>{" "}{ moment(invoice.createdAt).format("DD / MMM / YY")}</span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Round Off:</span>
            <span className='inv-value mx-2'>
                <input className='cur' type={"checkbox"} 
                disabled={invoice.type=="Agent Invoice"?true:invoice.type=="Agent Bill"?true:invoice.approved=="1"?true:false} checked={invoice.roundOff!="0"} 
                onChange={async()=>{
                    setLoad(true);
                    let tempInv = {...invoice};
                    let before = parseFloat(calculateTotal(records))
                    let after = parseFloat(parseInt(before))
                    let remaining = before - after;
                    if(remaining>0){
                        if(invoice.roundOff=="0"){
                            if(remaining<=0.5 && remaining>0){
                                tempInv.roundOff = `-${(remaining).toFixed(2)}`;
                            }else{
                                tempInv.roundOff = `+${(1-remaining).toFixed(2)}`;
                            }
                        }else{
                            tempInv.roundOff = "0"
                        }
                        await axios.post(process.env.NEXT_PUBLIC_CLIMAX_POST_ROUNDOFF_INVOICE,{
                            id:tempInv.id,
                            total:tempInv.total,
                            roundOff:tempInv.roundOff,
                            approved:tempInv.approved
                        }).then((x)=>{
                            if(x.data.status=="success"){
                                openNotification("Success", "Invoice Successfully Rounded Off!", "green")
                                setInvoice(tempInv)
                            }else{
                                openNotification("Ops", "An Error Occured!", "red")
                            }
                        })
                    }
                    setLoad(false);
                }} 
                />
            </span>
        </div>
    </Col>
    <Col md={3} className="mb-3">
        <div>
            <span className='inv-label'>Approved:</span>
            <span className='inv-value mx-2'>
                <input className='cur' type={"checkbox"} checked={invoice.approved!="0"} 
                    disabled={checkApprovability(invoice)}
                    onChange={approve}
                />
            </span>
        </div>
    </Col>
  </Row>
  <div style={{minHeight:300}}>
    <div className='table-sm-1 mt-3' style={{maxHeight:300, overflowY:'auto'}}>
    <Table className='tableFixHead' bordered>
    <thead>
        <tr className='table-heading-center'>
        <th></th>
        <th>Charge</th>
        <th>Particular</th>
        <th>Basis</th>
        <th>PP/CC</th>
        <th>Size</th>
        <th style={{minWidth:60}}>DG</th>
        <th>Qty</th>
        <th>Currency</th>
        <th>Amount</th>
        <th>Disc</th>
        <th>Tax</th>
        <th>Tax</th>
        <th>Net</th>
        <th>Ex.</th>
        <th>Total</th>  
        </tr>
    </thead>
    <tbody style={{fontSize:13}}>
    {records.map((x, index) => {
    return (
    <tr key={index} className='f table-row-center-singleLine'>
        <td>{index + 1}</td>
        <td>{x.charge}</td>
        <td>{x.particular}</td>
        <td>{x.basis.slice(0, 8)}</td>
        <td>{x.pp_cc}</td>
        <td>{x.size_type}</td>
        <td>{x.dg_type}</td>
        <td>{x.qty}</td>
        <td>{x.currency}</td>
        <td>{x.amount}</td>
        <td>{x.discount}</td>
        <td style={{textAlign:'center'}}>{x.tax_apply}</td>
        <td>{x.tax_amount}</td>
        <td>{x.net_amount}</td>
        <td>{x.ex_rate}</td>
        <td>{x.local_amount}</td>
    </tr>
        )
    })}
    {invoice.roundOff!="0" &&
    <tr>
        <td>{records.length+1}</td>
        <td>ROFC</td>
        <td>Round Off</td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td>1</td>
        <td>PKR</td>
        <td>{invoice.roundOff?.slice(1)}</td>
        <td> 0 </td>
        <td style={{textAlign:'center'}}>No</td>
        <td>0.00</td>
        <td>{invoice.roundOff?.slice(1)}</td>
        <td>1.00</td>
        <td>{invoice.roundOff}</td>
    </tr>
    }
    </tbody>
    </Table>
    </div>
  </div>
  <hr/>
  <div>
    <Row>
        <Col md={3} className=" py-3">
        <div className=''>
            <span className='inv-label mx-2'>Total Amount:</span>
            <span className='inv-value charges-box p-2'> 
                {" "}
                {invoice.approved=="1"? (parseFloat(invoice.total) + parseFloat(invoice.roundOff)).toFixed(2): "Not Approved" }
            </span>
        </div>
        </Col>
    </Row>
  </div>
  </>
  }
  {/* Printing Component */}
  <div style={{
        display:"none"
    }}>
    <div ref={(response) => (inputRef = response)} >
        {invoice && 
        <div className='p-5'>
        <Row>
            <Col md={4} className='text-center'>
                <img src={'/seanet-logo.png'} style={{filter: `invert(0.5)`}} height={100} />
                <div>SHIPPING & LOGISTICS</div>
            </Col>
            <Col>
            <div className='text-center '>
                <div style={{fontSize:20}}><b>SEA NET SHIPPING & LOGISTICS</b></div>
                <div style={paraStyles}>House# D-213, DMCHS, Siraj Ud Daula Road, Karachi</div>
                <div style={paraStyles}>Tel: 9221 34395444-55-66   Fax: 9221 34385001</div>
                <div style={paraStyles}>Email: info@seanetpk.com   Web: www.seanetpk.com</div>
                <div style={paraStyles}>NTN # 8271203-5</div>
            </div>
            </Col>
        </Row>
        <Row>
            <Col md={5}><Line/></Col>
            <Col md={2}><p className='text-center fs-15'><strong>{invoice.type}</strong></p></Col>
            <Col md={5}><Line/></Col>
        </Row>
        <Row style={{paddingLeft:12, paddingRight:12}}>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <div style={heading}>INVOICE TO</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.name}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.address1}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.infoMail}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.telephone1}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.mobile1}</div>
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
            <div style={heading}>Shipper/Consignee</div>
                <div style={paraStyles}>{invoice.SE_Job.consignee.name}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.address1}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.infoMail}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.telephone1}</div>
                <div style={paraStyles}>{invoice.SE_Job.Client.mobile1}</div>
            </Col>
        </Row>
        <Row style={{paddingLeft:12, paddingRight:12}}>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <span style={heading}>Reference No.</span>
                
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <span style={heading}>Sales Rep</span>
                <span style={{...paraStyles, paddingLeft:70}}>{invoice.SE_Job.sales_representator.name}</span>
            </Col>
        </Row>
        <Row style={{paddingLeft:12, paddingRight:12}}>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={7}>
                        <div style={heading}>MBL No.</div>
                    </Col>
                    <Col md={5}>
                        <div style={heading}>Bill of Lading</div>
                    </Col>
                </Row>
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={7}>
                        <div style={heading}>Job No</div>
                        <div style={paraStyles}>{invoice.SE_Job.jobNo}</div>
                        
                    </Col>
                    <Col md={5}>
                        <div style={heading}>Job Date</div>
                        <div style={paraStyles}>{moment(invoice.SE_Job.jobDate).format("YYYY-MM-DD")}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row style={{paddingLeft:12, paddingRight:12}}>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={7}>
                        <div style={heading}>Port of Loading</div>
                        <div style={paraStyles}>{getPort(invoice.SE_Job.pol)}</div>
                    </Col>
                    <Col md={5}>
                        <div style={heading}>Port of Discharge</div>
                        <div style={paraStyles}>{getPort(invoice.SE_Job.pod)}</div>
                    </Col>
                </Row>
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={7}>
                        <div style={heading}>Destination Port</div>
                        <div style={paraStyles}>{getPort(invoice.SE_Job.fd)}</div>
                    </Col>
                    <Col md={5}>
                        <div style={heading}>Shipping Line</div>
                        <div style={paraStyles}>{invoice.SE_Job.shipping_line.name}</div>
                    </Col>
                </Row>
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={4}>
                        <div style={heading}>Volume</div>
                        <div style={paraStyles}>{parseFloat(invoice.SE_Job.vol).toFixed(2)}</div>
                    </Col>
                    <Col md={4}>
                        <div style={heading}>Weight</div>
                        <div style={paraStyles}>{invoice.SE_Job.weight?parseFloat(invoice.SE_Job.weight).toFixed(2):"0.00"}</div>
                    </Col>
                    <Col md={4}>
                        <div style={heading}>PCS</div>
                        <div style={paraStyles}>{invoice.SE_Job.pcs}</div>
                    </Col>
                </Row>
            </Col>
            <Col md={6} style={{border:'1px solid silver'}} className='p-1'>
                <Row>
                    <Col md={7}>
                        <div style={heading}>Currency</div>
                        <div style={paraStyles}>{invoice.type=="Job Invoice"?"PKR":invoice.type=="Job Bill"?"PKR":"USD"}</div>
                        
                    </Col>
                    <Col md={5}>
                        <div style={heading}>Exchange Rate</div>
                        <div style={paraStyles}>{records.length>0?records[0].ex_rate:''}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <div>
            <Table className='pb-0 mb-0' bordered variant='white' size='sm'>
            <thead>
                <tr className='table-heading-center' style={{border:'1px solid silver', backgroundColor:'silver'}}>
                <th>Sr.</th>
                <th>Charges</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Curr</th>
                <th>Amount</th>
                <th>Dis</th>  
                <th>Tax</th>  
                <th>Total Amount</th>  
                </tr>
            </thead>
            <tbody>
            {records.map((x, index) => {
            return (
            <tr key={index} className='table-row-center-singleLine' style={{border:'1px solid silver', fontSize:11}}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{x.particular}</td>
                <td className='text-center'>{x.qty}</td>
                <td className='text-center'>{x.amount}</td>
                <td className='text-center'>{x.currency}</td>
                <td className='text-center'>{x.amount}</td>
                <td className='text-center'>{x.discount}</td>
                <td className='text-center'>{x.tax_amount}</td>
                <td className='text-center'>{x.local_amount}</td>
            </tr>
                )
            })}
            </tbody>
            </Table>
            <Row style={{border:'1px solid silver'}} className='mx-0 pt-1'>
            <Col md={4} style={{fontSize:10}}><b className='fw-8'>Total Discount</b> <span style={{float:'right'}} className='px-3'>0.00</span></Col>
            <Col md={4} style={{fontSize:10}}><b className='fw-8'>Tax Amount</b>     <span style={{float:'right'}} className='px-3'>0.00</span></Col>
            <Col md={4} style={{fontSize:10}}>
                <div><b className='fw-8'>Invoice Total {"("}PKR{")"}</b> <span style={{float:'right'}}>{(calculateTotal(records))}</span></div>
                <div><b className='fw-8'>Round Off </b> <span style={{float:'right'}} >{invoice.roundOff}</span></div>
                <div><b className='fw-8'>Total Amount </b> <span style={{float:'right'}} >{(calculateTotal(records))}</span></div>
            </Col>
            </Row>
            <Row className='mx-0'>
                <Col md={6} className='p-1' style={{border:'1px solid silver', fontSize:12}}>
                    <b className='fw-8'>Note</b>
                    <div style={{minHeight:80}}></div>
                </Col>
                <Col md={6} className='p-1' style={{border:'1px solid silver', fontSize:12}}>
                    <b className='fw-8'>In-Words</b>
                    <p>{invoice.type=="Job Invoice"?"PKR":invoice.type=="Job Bill"?"PKR":"USD"} {inWords(parseFloat(calculateTotal(records)))}</p>
                </Col>
            </Row>
            <Row className='mx-0'>
                <Col md={6} className='p-1' style={{border:'1px solid silver'}}>
                    <b className='fw-8' style={{fontSize:12}}>Bank Details</b>
                    <div>
                        IBAN: PK08 BAHL 1054 0081 0028 1201<br/>
                        A/C #: 1054-0081-002182-01-5<br/>
                        TITLE: SEANET SHIPPING & LOGISTICS<br/>
                        BANK: BANL AL HABIB LIMITED<br/>
                        BRANCH: TARIQ ROAD 1054, KARACHI<br/>
                        SWIFT: BAHLPKKAXXX
                    </div>
                </Col>
            </Row>
        </div>
        </div>
        }
    </div>
  </div>
  </div>
  </>
)}

export default InvoiceCharges