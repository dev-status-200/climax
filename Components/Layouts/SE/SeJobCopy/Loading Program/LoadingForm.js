import React from 'react'
import SelectSearchComp from "../../../../Shared/Form/SelectSearchComp";
import DateComp from "../../../../Shared/Form/DateComp";
import TimeComp from "../../../../Shared/Form/TimeComp";
import InputComp from "../../../../Shared/Form/InputComp";
import TextAreaComp from "../../../../Shared/Form/TextAreaComp";
import RadioComp  from "../../../../Shared/Form/RadioComp";
import { landigFlagStatus, cargoStatus, costCenter } from "./states";
import ports from "../../../../../jsonData/ports.json"
import { Spinner, Row, Col } from 'react-bootstrap';
import PrintComp from './PrintComp';
import { useState } from 'react';
import { Button, Popover } from 'antd';

const LoadingForm = ({handleSubmit, register, control, onSubmit, state, load, allValues}) => {

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <div>
    <form className="d-flex justify-content-between">
      <div style={{ width: "30%" }}>
          <div className='fs-12'>Job No # :</div>
          <div style={{border:'1px solid silver', padding:"7px 1px 4px 4px"}}>{state.selectedRecord.jobNo}</div>
        <Row className="fs-12 mt-1">
          <Col md={8}>
          <label>Local Custom</label>
            <SelectSearchComp name={`localCustom`} 
              register={register} control={control} width={"100%"} 
              options={[{id:"AFU-Jinnah Terminal-Karachi", name:"AFU-Jinnah Terminal-Karachi"}, {id:"PKKHI", name:"Karachi"}]} 
            />
          </Col>
          <Col md={4}>
            <div>Wharf :</div>
            <SelectSearchComp options={[{id:"EAST WHARF", name:"EAST WHARF"}, {id:"BAY WEST", name:"BAY WEST"}, {id:"QFS", name:"QFS"}]}
              register={register} control={control} width={"100%"} name="wharf" 
            />
          </Col>
        </Row>
        <div className="mt-1">
          <label className="fs-12"> Port of Discharge </label>
          <div style={{width:"full", padding:"5px 9px", height: "32px", border:"1px solid silver"}}>
           {state.selectedRecord.pod}
          </div>
        </div>
        <div className="fs-12  mt-1">
          <label> Loading Terminal </label>
          <div className="d-flex align-items-center justify-content-between">
            <SelectSearchComp name={`loadingTerminal`} width={"100%"}
              options={[{id:"QICT", name:"QICT"}, {id:"PICT", name:"PICT"}, {id:"SAPT", name:"SAPT"}, {id:"KICT", name:"KICT"}]}
              register={register}
              control={control}
            />
          </div>
        </div>
        <div className="fs-12  mt-1">
          <label> Discharge Terminal </label>
          <div className="d-flex align-items-center justify-content-between">
            <InputComp name="dischargeTerminal" register={register} control={control} width={"100%"} />
          </div>
        </div>
        <div className="fs-12 d-flex justify-content-between  mt-1">
          <div style={{ width: "40%" }}>
            <label> Loading Date </label>
            <DateComp register={register} name="loadingDate" control={control} />
          </div>
          <div style={{ width: "50%" }}>
            <label> Book # </label>
            <InputComp register={register} name={`book`} control={control} />
          </div>
        </div>
        <div className="fs-12 d-flex justify-content-between  mt-1">
          <div style={{ width: "40%" }}>
            <label> Loading Time </label>
            <TimeComp register={register} name="loadingTime" control={control} />
          </div>
          <div style={{ width: "50%" }}>
            <label> Gate Pass </label>
            <InputComp register={register} name="gatePass" control={control} />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> Arrival Date </label>
            <DateComp register={register} name="arrivalDate" control={control} />
          </div>
          <div style={{ width: "50%" }}>
            <label> Gate Pass Date </label>
            <DateComp register={register} name="gatePassDate" control={control} width="100%" />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> CRO Issue Date </label>
            <DateComp
              register={register}
              name="croIssueDate"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Letter </label>
            <InputComp register={register} name="letter" control={control} width="70%" />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> Expiry Date </label>
            <DateComp
              register={register}
              name="expiryDate"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> CRO # </label>
            <InputComp register={register} name="cro" control={control} width="70%" />
          </div>
        </div>
        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> EGM #</label>
            <InputComp width={"50%"} register={register} name="egm" control={control} />
          </div>
          <div style={{ width: "50%" }}>
            <label> Validity Date </label>
            <DateComp register={register} name="validityDate" control={control} width="100%" />
          </div>
        </div>
        <div className="fs-12 mt-1" style={{ width: "40%", display: "flex" }}>
          <div>
            <label>ETD </label>
            <DateComp register={register} name="etd" control={control} />
          </div>
        </div>
        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <span> Cut Off Date </span>
            <p style={{ border: "1px solid silver", width: "100%", height: "32px", display:"flex", alignItems:"center", paddingLeft:10 }}>
              {state.selectedRecord.cutOffDate.slice(0, 10)}
            </p>
          </div>
          <div style={{ width: "50%" }}>
            <label> Cut Off Time </label>
            <p style={{ border: "1px solid silver", width: "100%", height: "32px", display:"flex", alignItems:"center", paddingLeft:10 }}>
              {state.selectedRecord.cutOffTime.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <div className="fs-12 ">
          <InputComp name="berth" register={register} label="Berth" control={control} width={"100%"} />
        </div>
        <div className="fs-12 mt-1">
          <label>Via Port </label>
          <div className="d-flex justify-content-between">
            <InputComp name="viaPort" register={register} control={control} width={"100%"} />
          </div>
        </div>
        <div className="fs-12 mt-1">
          <label>Container Info </label>
          <TextAreaComp name="containerInfo" register={register} control={control} />
        </div>

        <div className="fs-12 mt-1">
          <label> Port of Reciept </label>
          <div className="d-flex justify-content-between">
            <SelectSearchComp name="portOfReciept" options={ports.ports}
              register={register} control={control} width={"100%"}
            />
 
          </div>
        </div>
        <div className="fs-12 mt-1">
          <label>Special Instructions </label>
          <TextAreaComp
            name="instruction"
            register={register}
            control={control}
          />
        </div>
        <div className="fs-12 mt-1">
          <label>Cargo Status </label>
          <p style={{ border: "1px solid silver", width: "100%", height: "32px", display:"flex", alignItems:"center", paddingLeft:10 }}>
            {state.selectedRecord.subType}
          </p>
        </div>
        <div className="fs-12 mt-1">
          <label>Landing Flag </label>
          <SelectSearchComp name="loadingFlag" options={landigFlagStatus.map((x) => x)}
            register={register} control={control} width={"100%"}
          />
        </div>
        <div className="fs-12 mt-1">
          <RadioComp register={register} name='status' control={control} label='Status'
            options={[
                { label: "Ok", value: "Ok" },
                { label: "Cancel", value: "Cancel" },
            ]} />
        </div>
        <div className="fs-12 mt-1">
          <label>Cost Center </label>
          <p style={{ border: "1px solid silver", width: "100%", height: "32px", display:"flex", alignItems:"center", paddingLeft:10 }}>
            {state.selectedRecord.costCenter}
          </p>
        </div>
        <div className="fs-12 mt-1">
          <label>Alloc Available </label>
          <SelectSearchComp name="allocAvailable" options={[{id:"Yes", value:"Yes"},{id:"No", value:"No"}]}
            register={register} control={control} width={"100%"}
          />
        </div>
        <div className="fs-12 mt-1">
          <label>Cont Available </label>
          <SelectSearchComp name="contAvailable" options={[{id:"Yes", value:"Yes"},{id:"No", value:"No"}]}
            register={register} control={control} width={"100%"}
          />
        </div>
      </div>
      <div style={{ width: "30%" }}>
        <div className="fs-12" style={{ width: "40%", display: "flex" }}>
          <div>
            <label>SOB Date </label>
            <DateComp register={register} name="sobDate" control={control} width="100%" />
          </div>
        </div>
        <div className="fs-12 mt-1">
          <InputComp name="containerSplit" register={register} label="Container Split" control={control} width={"100%"} />
        </div>
        <div className="fs-12 mt-1">
          <InputComp name="blRequired" register={register} label="BL Required" control={control} width={"100%"} />
        </div>
        <div className="fs-12 mt-1">
          <RadioComp register={register} name='containerWt' control={control} label='Container WT'
            options={[
                { label: "Estimated", value: "Estimated" },
                { label: "Actual", value: "Actual" },
            ]} />
        </div>
        <div className="mt-1">
          <label className='fs-12'> Custom Clearance</label>
          <div className="d-flex justify-content-between">
            <div style={{border:"1px solid silver", padding:6, width:"100%"}}>
               {state?.selectedRecord?.customAgentId && state.fields?.vendor?.chaChb[state.fields.vendor.chaChb.findIndex((x)=>x.id==state.selectedRecord.customAgentId)]?.name} 
            </div>
          </div>
        </div>
        <div className="fs-12 mt-1">
          <label> Container Pickup</label>
          <div className="d-flex justify-content-between">
            <InputComp name="containerPickup" register={register} control={control} width={"100%"} />
          </div>
        </div>
        <div className="mt-1">
          <label className='fs-12'> Port Of Loading</label>
          <div className="d-flex justify-content-between">
          <div style={{border:"1px solid silver", padding:6, width:"100%"}}>
               {state.selectedRecord.pol}
            </div>
          </div>
        </div>
        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> Container Temprature </label>
            <InputComp register={register} name="containerTemp" control={control} />
          </div>
          <div style={{ width: "50%" }}>
            <label> Vent</label>
            <InputComp register={register} name="vent" control={control} width="100%" />
          </div>
        </div>

        <div className="d-flex mt-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label" for="flexCheckDefault">
              Text 1
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label" for="flexCheckChecked">
              Loading Terms
            </label>
          </div>
          <button type="button" className="btn-custom">
            Create
          </button>
        </div>
        <div className="fs-12">
          <label>Loading Terms </label>
          <TextAreaComp  name={`loadingTerms`} register={register} control={control} />
        </div>
        <div className="fs-12 mt-1">
          <label>Text 1 </label>
          <TextAreaComp name="text1" register={register} control={control} />
        </div>
        <button type="button" className="btn-custom mt-1" onClick={handleSubmit(onSubmit)}>
           {load ? <Spinner size='sm'/> : "Save Data"}
        </button>
        <br/>
        <Popover content={<div>{(open && allValues.id ) && <PrintComp allValues={allValues} state={state} />}</div>}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <button type="button" className="btn-custom mt-1">Print</button>
        </Popover>
      </div>
    </form>
  </div>
  )
}

export default LoadingForm