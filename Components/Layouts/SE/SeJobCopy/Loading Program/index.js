import React from "react";
import SelectSearchComp from "../../../../Shared/Form/SelectSearchComp";
import { useForm } from "react-hook-form";
import DateComp from "../../../../Shared/Form/DateComp";
import InputComp from "../../../../Shared/Form/InputComp";
import TextAreaComp from "../../../../Shared/Form/TextAreaComp";
import { Radio } from "antd";
import { initialState } from "./states";

const LoadingProgram = ({ state }) => {
  const { register, control, handleSubmit } = useForm({
     defaultValues:{ 
    localCustom: "",
    loadingTerminal: "",
    dischargeTerminal: "",
    loadingDate: "",
    loadingTime: "",
    arrivalDate: "",
    croIssueDate: "",
    expiryDate: "",
    costCenter: state.selectedRecord.costCenter,
    egm: "",
    etd: "",
    book: "",
    gatePass: "",
    gatePassDate: "",
    letter: "",
    cro: "",
    validityDate: "",
    berth: "",
    viaPort: "",
    containerInfo: "",
    portOfReciept: "",
    portOfReciept: "",
    instruction: "",
    loadingFlag: "",
    status: "",
    allocAvailable: "",
    contAvailable: "",
    sobDate: "",
    containerSplit: "",
    blRequired: "",
    containerWt: "",
    containerTemp: "",
    vent: "",
    loadingTerms: "",
      
  } });

  console.log(  {state}, state.selectedRecord.costCenter   );
  const onSubmit = (data) => {
    console.log(data);
  };

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
          <div className="fs-12">
            <label>Local Custom</label>
            <div className="d-flex justify-content-between">
              <SelectSearchComp
                className="form-select"
                name={`localCustom`}
                options={[]}
                register={register}
                control={control}
                width={"50%"}
              />
              <span
                className="p-2 border "
                style={{ width: "40px", height: "32px" }}
              ></span>
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

          <div className="fs-12">
            <label> Port of Discharge </label>
            <div className="d-flex justify-content-between">
              <SelectSearchComp
                className="form-select"
                name={`port_of_discharge`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "30px" }}
              >
                {state.selectedRecord.pod}{" "}
              </span>
            </div>
          </div>

          <div className="fs-12">
            <label> Loading Terminal </label>

            <div className="d-flex align-items-center justify-content-between">
              <SelectSearchComp
                className="form-select"
                name={`loadingTerminal`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "30px" }}
              ></span>
            </div>
          </div>

          <div className="fs-12">
            <label> Discharge Terminal </label>

            <div className="d-flex align-items-center justify-content-between">
              <SelectSearchComp
                className="form-select bg-dark"
                name={`dischargeTerminal`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "30px" }}
              ></span>
            </div>
          </div>

          <div className="fs-12 d-flex justify-content-between">
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
              <InputComp register={register} name="book" control={control} />
            </div>
          </div>

          <div className="fs-12 d-flex justify-content-between">
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

          <div className="fs-12 d-flex justify-content-between">
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

          <div className="fs-12 d-flex justify-content-between">
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

          <div className="fs-12 d-flex justify-content-between">
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

          <div className="fs-12 d-flex justify-content-between">
            <div style={{ width: "40%" }}>
              <label> EMG #</label>
              <InputComp
                width={"50%"}
                register={register}
                name="emg_number"
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

          <div className="fs-12" style={{ width: "40%", display: "flex" }}>
            <div>
              <label>ETD </label>
              <DateComp register={register} name="etd" control={control} />
            </div>
          </div>

          <div className="fs-12 d-flex justify-content-between">
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
          <div className="fs-12">
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

          <div className="fs-12">
            <label>Via Port </label>
            <div className="d-flex justify-content-between">
              <SelectSearchComp
                className="form-select"
                name={`viaPort`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "60px", height: "32px" }}
              ></span>
            </div>
          </div>

          <div className="fs-12">
            <label>Container Info </label>
            <TextAreaComp
              className="form-select"
              name={`containerInfo`}
              options={[]}
              register={register}
              control={control}
            />
          </div>

          <div className="fs-12">
            <label> Port of Reciept </label>
            <div className="d-flex justify-content-between">
              <SelectSearchComp
                className="form-select"
                name={`portOfReciept`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "60px", height: "32px" }}
              ></span>
            </div>
          </div>
          <div className="fs-12">
            <label>Special Instructions </label>
            <TextAreaComp
              className="form-select"
              name={`instructions`}
              options={[]}
              register={register}
              control={control}
            />
          </div>
          <div className="fs-12">
            <label>Text 1 </label>
            <TextAreaComp
              className="form-select"
              name={`text1`}
              options={[]}
              register={register}
              control={control}
            />
          </div>

          <div className="fs-12">
            <label>Cargo Status </label>
            <SelectSearchComp
              className="form-select"
              name={`status`}
              options={[]}
            //   value={state.selectedRecord.}
              register={register}
              control={control}
              width={"100%"}
            />
          </div>

          <div className="fs-12">
            <label>Landing Flag </label>
            <SelectSearchComp
              className="form-select"
              name={`loadingFlag`}
              options={[]}
              register={register}
              control={control}
              width={"100%"}
            />
          </div>

          <div className="fs-12">
            <label>Status </label>

            <Radio.Group style={{ display: "flex" }}>
              <Radio value={"ok"}>Ok</Radio>
              <Radio value={"cancel"}>Cnacel</Radio>
            </Radio.Group>
          </div>

          <div className="fs-12">
            <label>Cost Center </label>
 
            <SelectSearchComp
              className="form-select"
              name={`costCenter`}
              options={[{id:"KHI", value:"Khi"}]}
              register={register}
              control={control}
              width={"100%"}
            />
          </div>

          <div className="fs-12">
            <label>Alloc Available </label>
            <SelectSearchComp
              className="form-select"
              name={`allocAvailable`}
              options={[]}
              register={register}
              control={control}
              width={"100%"}
            />
          </div>

          <div className="fs-12">
            <label>Cont Available </label>
            <SelectSearchComp
              className="form-select"
              name={`contAvailable`}
              options={[]}
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

          <div className="fs-12">
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

          <div className="fs-12">
            <InputComp
              className="form-select"
              name={`berth`}
              options={[]}
              register={register}
              label="blRequired"
              control={control}
              width={"100%"}
            />
          </div>

          <div className="fs-12">
            <label>Container WT </label>

            <Radio.Group style={{ display: "flex" }}>
              <Radio value={"estimated"}>Estimated</Radio>
              <Radio value={"actual"}>Actual</Radio>
            </Radio.Group>
          </div>

          <div className="fs-12">
            <label> Custom Clearance</label>
            <div className="d-flex justify-content-between">
              <InputComp
                className="form-select"
                name={`port_of_discharge`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "32px" }}
              ></span>
            </div>
          </div>

          <div className="fs-12">
            <label> Container Pickup</label>
            <div className="d-flex justify-content-between">
              <InputComp
                className="form-select"
                name={`containerPickUp`}
                options={[]}
                register={register}
                control={control}
                width={"80%"}
              />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "32px" }}
              ></span>
            </div>
          </div>

          <div className="fs-12">
            <label> Port Of Loading</label>
            <div className="d-flex justify-content-between">
            
            <SelectSearchComp
              className="form-select"
              name={`portOfLoading`}
              options={[]}
              register={register}
              control={control}
              width={"80%"}
            />
              <span
                className="p-2 border "
                style={{ width: "80px", height: "32px" }}
              > {state.selectedRecord.pod} </span>
            </div>
          </div>

          <div className="fs-12 d-flex justify-content-between">
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

          <div className="d-flex">
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
            className="btn-custom"
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoadingProgram;
