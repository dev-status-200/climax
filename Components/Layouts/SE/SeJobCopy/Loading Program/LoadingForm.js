import React from 'react'
import SelectSearchComp from "../../../../Shared/Form/SelectSearchComp";
import DateComp from "../../../../Shared/Form/DateComp";
import InputComp from "../../../../Shared/Form/InputComp";
import TextAreaComp from "../../../../Shared/Form/TextAreaComp";
import RadioComp  from "../../../../Shared/Form/RadioComp";
import { landigFlagStatus, cargoStatus, costCenter } from "./states";
import ports from "../../../../../jsonData/ports.json"
import { Spinner } from 'react-bootstrap';
import PrintComp from './PrintComp';
const LoadingForm = ({handleSubmit, register, control, onSubmit, state, load, allValues}) => {
  return (
    <div>
    <form className="d-flex justify-content-between">
      <div style={{ width: "30%" }}>
        <div className="fs-12">
          <p>Job No # : </p>
          <span className="p-1 border border-dark ">
            {state.selectedRecord.jobNo}
          </span>
        </div>
        <div className="fs-12 mt-1">
          <label>Local Custom</label>
          <div className="d-flex justify-content-between">
            <SelectSearchComp
              className="form-select"
              name={`localCustom`}
              options={ports.ports}
              register={register}
              control={control}
              width={"70%"}
            />
            
            Wharf :
            <SelectSearchComp
              className="form-select"
              name={``}
              options={[]}
              register={register}
              control={control}
              width={"20%"}
            />
          </div>
        </div>

        <div className="fs-12  mt-1">
          <label> Port of Discharge </label>
          <div className="" style={{width:"full", padding:"5px", height: "32px", border:"1px solid silver"}}>
             
           {state.selectedRecord.pod}
          </div>
        </div>

        <div className="fs-12  mt-1">
          <label> Loading Terminal </label>

          <div className="d-flex align-items-center justify-content-between">
            <SelectSearchComp
              className="form-select"
              name={`loadingTerminal`}
              options={ports.ports}
              register={register}
              control={control}
              width={"100%"}
            />
             
          </div>
        </div>

        <div className="fs-12  mt-1">
          <label> Discharge Terminal </label>

          <div className="d-flex align-items-center justify-content-between">
            <SelectSearchComp
              className="form-select bg-dark"
              name={`dischargeTerminal`}
              options={ports.ports}
              register={register}
              control={control}
              width={"100%"}
            />
 
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between  mt-1">
          <div style={{ width: "40%" }}>
            <label> Loading Date </label>
            <DateComp
              register={register}
              name="loadingDate"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Book # </label>
            <InputComp register={register} name={`book`} control={control} />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between  mt-1">
          <div style={{ width: "40%" }}>
            <label> Loading Time </label>
            <DateComp
              register={register}
              name="loadingTime"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Gate Pass </label>
            <InputComp
              register={register}
              name="gatePass"
              control={control}
            />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> Arrival Date </label>
            <DateComp
              register={register}
              name="arrivalDate"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Gate Pass Date </label>
            <DateComp
              register={register}
              name="gatePassDate"
              control={control}
              width="100%"
            />
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
            <InputComp
              register={register}
              name="letter"
              control={control}
              width="70%"
            />
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
            <InputComp
              register={register}
              name="cro"
              control={control}
              width="70%"
            />
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> EGM #</label>
            <InputComp
              width={"50%"}
              register={register}
              name="egm"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Validity Date </label>
            <DateComp
              register={register}
              name="validityDate"
              control={control}
              width="100%"
            />
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
            <p
              style={{
                  border: "1px solid",
                  width: "100%",
                  height: "32px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"
                  
              }}
              >
            {state.selectedRecord.cutOffDate.slice(0, 10)}
         
         </p>
          </div>
          <div style={{ width: "50%" }}>
            <label> Cut Off Time </label>
            <p
              style={{
                  border: "1px solid",
                  width: "100%",
                  height: "32px",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center"
                  
              }}
              >
            {state.selectedRecord.cutOffTime.slice(0, 10)}
         
         </p>
          </div>
        </div>
      </div>

      <div style={{ width: "30%" }}>
        <div className="fs-12 ">
          <InputComp
            className="form-select"
            name={`berth`}
            options={[]}
            register={register}
            label="Berth"
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">
          <label>Via Port </label>
          <div className="d-flex justify-content-between">
            <InputComp
              className="form-select"
              name={`viaPort`}
              register={register}
              control={control}
              width={"100%"}
            />
            
          </div>
        </div>

        <div className="fs-12 mt-1">
          <label>Container Info </label>
          <TextAreaComp
            className="form-select"
            name={`containerInfo`}
            options={[]}
            register={register}
            control={control}
          />
        </div>

        <div className="fs-12 mt-1">
          <label> Port of Reciept </label>
          <div className="d-flex justify-content-between">
            <SelectSearchComp
              className="form-select"
              name={`portOfReciept`}
              options={ports.ports}
              register={register}
              control={control}
              width={"100%"}
            />
 
          </div>
        </div>
        <div className="fs-12 mt-1">
          <label>Special Instructions </label>
          <TextAreaComp
            className="form-select"
            name={`instructions`}
            options={[]}
            register={register}
            control={control}
          />
        </div>
        <div className="fs-12 mt-1">
          <label>Text 1 </label>
          <TextAreaComp
            className="form-select"
            name={`text1`}
            options={[]}
            register={register}
            control={control}
          />
        </div>

        <div className="fs-12 mt-1">
          <label>Cargo Status </label>
          <SelectSearchComp
            className="form-select"
            name={`cargoStatus`}
            options={cargoStatus.map((x) => x)}
            register={register}
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">
          <label>Landing Flag </label>
          <SelectSearchComp
            className="form-select"
            name={`loadingFlag`}
            options={landigFlagStatus.map((x) => x)}
            register={register}
            control={control}
            width={"100%"}
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

          <SelectSearchComp
            className="form-select"
            name={`costCenter`}
            options={costCenter.map((x) => x)}
            register={register}
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">
          <label>Alloc Available </label>
          <SelectSearchComp
            className="form-select"
            name={`allocAvailable`}
            options={[{id:"Yes", value:"Yes"},{id:"No", value:"No"}]}
            register={register}
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">
          <label>Cont Available </label>
          <SelectSearchComp
            className="form-select"
            name={`contAvailable`}
            options={[{id:"Yes", value:"Yes"},{id:"No", value:"No"}]}

            register={register}
            control={control}
            width={"100%"}
          />
        </div>
      </div>

      <div style={{ width: "30%" }}>
        <div className="fs-12" style={{ width: "40%", display: "flex" }}>
          <div>
            <label>SOB Date </label>
            <DateComp
              register={register}
              name="sobDate"
              control={control}
              width="100%"
            />
          </div>
        </div>

        <div className="fs-12 mt-1">
          <InputComp
            className="form-select"
            name={`containerSplit`}
            options={[]}
            register={register}
            label="Container Split"
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">
          <InputComp
            className="form-select"
            name={`blRequired`}
            options={[]}
            register={register}
            label="BL Required"
            control={control}
            width={"100%"}
          />
        </div>

        <div className="fs-12 mt-1">

          <RadioComp register={register} name='containerWt' control={control} label='Container WT'
            options={[
                { label: "Estimated", value: "Estimated" },
                { label: "Actual", value: "Actual" },
            ]} />
        </div>
        <div className="fs-12 mt-1">
          <label> Custom Clearance</label>
          <div className="d-flex justify-content-between">
            <SelectSearchComp
            options={state.fields.vendor.chaChb}
              className="form-select"
              name={`customClearance`}
              register={register}
              control={control}
              width={"100%"}
            />
            
          </div>
        </div>

        <div className="fs-12 mt-1">
          <label> Container Pickup</label>
          <div className="d-flex justify-content-between">
            <InputComp
              className="form-select"
              name={`containerPickUp`}
              register={register}
              control={control}
              width={"100%"}
            />
            
          </div>
        </div>

        <div className="fs-12 mt-1">
          <label> Port Of Loading</label>
          <div className="d-flex justify-content-between">
          
          <SelectSearchComp
            className="form-select"
            name={`portOfLoading`}
            options={ports.ports}
            register={register}
            control={control}
            width={"100%"}
          />
            
          </div>
        </div>

        <div className="fs-12 d-flex justify-content-between mt-1">
          <div style={{ width: "40%" }}>
            <label> Container Temprature </label>
            <InputComp
              register={register}
              name="containerTemp"
              control={control}
            />
          </div>
          <div style={{ width: "50%" }}>
            <label> Vent</label>
            <InputComp
              register={register}
              name="vent"
              control={control}
              width="100%"
            />
          </div>
        </div>

        <div className="d-flex mt-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              Text 1
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
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
          <TextAreaComp
            className="form-select"
            name={`loadingTerms`}
            options={[]}
            register={register}
            control={control}
          />
        </div>
        <button
          type="button"
          className="btn-custom mt-1"
          onClick={handleSubmit(onSubmit)}
        >
           {load ? <Spinner size='sm'/> : "Save Data"}
        </button>
        <PrintComp allValues={allValues}/>
      </div>
    </form>
  </div>
  )
}

export default LoadingForm