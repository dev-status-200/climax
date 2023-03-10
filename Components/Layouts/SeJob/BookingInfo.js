import { Popover, InputNumber } from "antd";
import SelectComp from '../../Shared/Form/SelectComp';
import SelectSearchComp from '../../Shared/Form/SelectSearchComp';
import DateComp from '../../Shared/Form/DateComp';
import TimeComp from '../../Shared/Form/TimeComp';
import CheckGroupComp from '../../Shared/Form/CheckGroupComp';
import { Row, Col } from 'react-bootstrap';
import Dates from './Dates';
import InputNumComp from '../../Shared/Form/InputNumComp';
import Notes from "./Notes";

const BookingInfo = ({register, control, errors, state, useWatch, dispatch}) => {

  const transportCheck = useWatch({control, name:"transportCheck"});
  const customCheck = useWatch({control, name:"customCheck"});
  const carrier = useWatch({control, name:"carrier"});

  const carriesrs = [ {id:'Emirates', name:'Emirates'}, {id:'Elton', name:'Elton'} ]

  const filterVessels = (list) => {
    let result = [];
    result = list.filter((x)=>{ return x.carrier==carrier })
    return result
  }

  function getWeight(){
    let weight = 0.0;
    let teu = 0;
    let qty = 0;
    state.equipments.forEach((x) => {
      if(x.gross!=''&&x.teu!=''){
        weight = weight + parseFloat(x.gross.replace(/,/g, ''));
        teu = teu + parseInt(x.teu);
        qty = qty + parseInt(x.qty);
      }
    });
    return {weight, teu, qty}
  }

  return (
  <>
    <Row>
      <Col md={2} className=''>
        <div className="">Job No.</div>
        <div className="p-1 px-2" style={{border:'1px solid silver', marginTop:3, borderRadius:2}}>
          {state.edit?(state.selectedRecord.jobNo):<span style={{color:'white'}}>.</span>}
        </div>
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='jobType' control={control} label='Job Type' width={150}
          options={[  
            {id:'Direct', name:'Direct'},
            {id:'Coloaded', name:'Coloaded'},
            {id:'Cross Trade', name:'Cross Trade'},
            {id:'Liner Agency', name:'Liner Agency'},
        ]}/>
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='jobKind' control={control} label='Job Kind' width={150}
          options={[  
            {id:'Current', name:'Current'},
            {id:'Opening', name:'Opening'},
          ]}/>
      </Col>
      <Col md={2} className='py-1'>     
        <DateComp register={register} name='jobDate' control={control} label='Job Date' />
        {errors.registerDate && <div className='error-line'>Required*</div>}
      </Col>
      <Col md={2} className='py-1'>     
          <DateComp register={register} name='shipDate' control={control} label='Ship Date' />
          {errors.registerDate && <div className='error-line'>Required*</div>}
      </Col>
      <Col md={1}></Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='costCenter' control={control} label='Cost Center' width={140}
          options={[  
            {id:'FSD', name:'FSD'},
            {id:'KHI', name:'KHI'}
          ]} />
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='shipStatus' control={control} label='Ship Status:' width={150}
          options={[  
            {id:'Hold', name:'Hold'},
            {id:'Booked', name:'Booked'},
            {id:'Delivered', name:'Delivered'},
            {id:'Shipped', name:'Shipped'},
            {id:'Closed', name:'Closed'}
          ]} />
      </Col>
      <Col md={1} className='py-1'>
        <SelectComp register={register} name='subType' control={control} label='Sub Type' width={50}
          options={[  
            {id:'FCL', name:'FCL'},
            {id:'LCL', name:'LCL'},
        ]} />
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='dg' control={control} label='DG' width={68}
          options={[  
            {id:'DG', name:'DG'},
            {id:'non-DG', name:'non-DG'},
            {id:'Mix', name:'Mix'},
        ]} />
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='freightType' control={control} label='Freight Type' width={150}
          options={[  
            {id:'Prepaid', name:'Prepaid'},
            {id:'Collect', name:'Collect'},
        ]} />
      </Col>
      <Col md={2} className='py-1'>
        <SelectComp register={register} name='nomination' control={control} label='Nomination' width={120}
          options={[  
            {id:'Free Hand', name:'Free Hand'},
            {id:'Nominated', name:'Nominated'},
            {id:'B2B', name:'B2B'},
        ]} />
      </Col>
    </Row>
    <hr className='my-1' />
    <Row>
      <Col md={3}>
        <SelectSearchComp register={register} name='ClientId' control={control} label='Client' 
          options={state.fields.party.client} />
        <SelectSearchComp register={register} name='shipperId' control={control} label='Shipper' 
          options={state.fields.party.shipper} />
        <SelectSearchComp register={register} name='consigneeId' control={control} label='Consignee' 
          options={state.fields.party.consignee} />
        <SelectSearchComp register={register} name='commodityId' control={control} label='Commodity' 
          options={state.fields.commodity} />
        <SelectSearchComp register={register} name='pol' control={control} label='Port Of Loading' 
          options={[
            {id:'PKKHI', name:'Karachi, Pakistan'},
            {id:'PBHI', name:'Balochistan, Pakistan'},
            {id:'PFLI', name:'Faislabad, Pakistan'},
          ]} />
        <SelectSearchComp register={register} name='pod' control={control} label='Port Of Discharge' 
          options={[
            {id:'PKKHI', name:'Karachi, Pakistan-PKKHI'},
            {id:'PBHI', name:'Balochistan, Pakistan'},
            {id:'PFLI', name:'Faislabad, Pakistan'},
          ]} />
        <SelectSearchComp register={register} name='fd' control={control} label='Final Destination' 
          options={[
            {id:'PKKHI', name:'Karachi, Pakistan-PKKHI'},
            {id:'PBHI', name:'Balochistan, Pakistan'},
            {id:'PFLI', name:'Faislabad, Pakistan'},
          ]} />
        <SelectSearchComp register={register} name='forwarderId' control={control} label='Forwarder/Coloader' 
          options={state.fields.vendor.forwarder} />
      </Col>
      <Col md={3}>
        <SelectSearchComp register={register} name='salesRepresentatorId' control={control} label='Sales Representator' 
          options={state.fields.sr} />
        <SelectSearchComp register={register} name='overseasAgentId' control={control} label='Overseas Agent' 
          options={state.fields.vendor.overseasAgent} />
        <SelectSearchComp register={register} name='localVendorId' control={control} label='Local Vendor' 
          options={state.fields.vendor.localVendor} />
        <div className='px-2 pb-2 mt-3' style={{border:'1px solid silver'}}>
        <SelectSearchComp register={register} name='carrier' control={control} label='SLine/Carrier'
          options={carriesrs} />
        <SelectSearchComp register={register} name='vessel' control={control} label='Vessel'
          options={filterVessels(state.fields.vessel)} />
        <div className='my-2'></div>
        <DateComp register={register} name='eta' control={control} label='ETA' />
        <div className='my-2'></div>
        <DateComp register={register} name='cutOffDate' control={control} label='Cut Off' />
        <div className='mt-1'></div>
        <TimeComp register={register} name='cutOffTime' control={control} label='' />
        <Popover content={
            <div className='p-2 m-0' style={{border:'1px solid silver'}}>
              <Dates register={register} control={control} />
            </div>
          } trigger="click">
          <span className='ex-btn'>Dates</span>
        </Popover>
        </div>
      </Col>
      <Col md={3}>
      <div className='my-4'></div>
        <CheckGroupComp register={register} name='transportCheck' control={control} label=''
          options={[{ label:"Transport", value:"Transport" }]} />
        <SelectSearchComp register={register} name='transporterId' control={control} label=''
          options={state.fields.vendor.transporter} disabled={transportCheck[0]!='Transport'} />
        <div className='mt-2'></div>
        <CheckGroupComp register={register} name='customCheck' control={control} label=''
          options={[{ label: "Custom Clearance", value: "Custom Clearance" }]} />
        <SelectSearchComp register={register} name='customAgentId' control={control} label=''
          options={state.fields.vendor.chaChb} disabled={customCheck[0]!='Custom Clearance'} />
        <div style={{marginTop:20}}></div>
        <div className='px-2 pb-2' style={{border:'1px solid silver'}}>
          <Row>
            <Col md={6} className='mt-2'>
            <div>Weight</div>
              <InputNumber value={getWeight().weight} disabled style={{ color:'black'}} />
              {/* <InputNumComp register={register} name='weight' control={control} 
                label='Weight' step={'0.01'}
              /> */}
            </Col>
            <Col md={6} className='mt-2'>
              <InputNumComp register={register} name='bkg' control={control} 
                label='BKG Weight' step={'0.01'}
              />
            </Col>
            <Col md={12} className='mt-2'>
            <div>Container</div>
            <InputNumber value={getWeight().qty} disabled style={{minWidth:200, color:'black'}} />
              {/* <InputNumComp register={register} name='container' control={control} 
                label='Container' width={200}
              /> */}
            </Col>
            <Col md={6} className='mt-2'>
              <InputNumComp register={register} name='shpVol' control={control} 
                label='Shp Vol' step={'0.01'}
              />
            </Col>
            <Col md={6} className='mt-2'>
              <div>TEU</div>
              <InputNumber value={getWeight().teu} disabled style={{ color:'black'}} />
              {/* <InputNumComp register={register} name='teu' control={control} 
                label='TEU'
              /> */}
            </Col>
            <Col md={6} className='mt-2'>
              <InputNumComp register={register} name='vol' control={control} 
                label='Vol' step={'0.00001'}
              />
            </Col>
            <Col md={6} className='mt-2'>
              <InputNumComp register={register} name='pcs' control={control} 
                label='PCS'
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col md={3}>
        {state.edit &&
          <Notes state={state} dispatch={dispatch} />
        }
      </Col>
    </Row>
  </>
)}

export default BookingInfo