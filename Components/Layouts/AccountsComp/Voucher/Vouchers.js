import React, { useEffect } from "react";
import InputComp from "/Components/Shared/Form/InputComp";
import InputNumComp from "/Components/Shared/Form/InputNumComp";
import SelectSearchComp from "/Components/Shared/Form/SelectSearchComp";
import SelectComp from "/Components/Shared/Form/SelectComp";
import { Spinner, Table } from "react-bootstrap";
import { CloseCircleOutlined } from "@ant-design/icons";
import DateComp from "/Components/Shared/Form/DateComp";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { useFieldArray, useWatch } from "react-hook-form";
import { Select } from "antd";
import { useSelector } from "react-redux";

const Vouchers = ({ handleSubmit, onSubmit, register, control, errors, CompanyId, child, settlement, reset, voucherData, setSettlement, setChild, watch, setType, load }) => {

  const { fields, append, remove } = useFieldArray({
    name: "Voucher_Heads",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });
  const vType = useWatch({ control, name: "vType" });
  let type = watch({control, name: "type" });
  const allValues = watch({control});

  vType === "BPV" || vType === "CPV" ? type= "Payble" :type= "Recievable" 
  
  useEffect(() => {
    // if(vType=="BPV"||vType === "CPV"){
    //   reset({...allValues, type:"Payble"})
    // }else{
    //   reset({...allValues, type:"Recievable"})
    // }
    setType(type) 
  }, [vType]);

  useEffect(() => {
    getValues();
  }, []);

  async function getValues(){
    const { chequeNo, costCenter, payTo, vType, type } = voucherData;
    let chequeDate = voucherData.chequeDate == "" ? "" : moment(voucherData.chequeDate);
    let Voucher_Heads = voucherData.Voucher_Heads?.filter(
      (voucher) => voucher.settlement !== "1"
    );
    let ChildAccountId = "";
    voucherData?.Voucher_Heads?.filter((voucher) => {
      if (voucher.settlement === "1") {
        ChildAccountId = voucher.ChildAccountId;
      }
    });
    reset({ CompanyId, vType, chequeDate, chequeNo, costCenter, payTo, type, Voucher_Heads, ChildAccountId });
    await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_ALL_CHILD_ACCOUNTS, {headers:{CompanyId:CompanyId}})
    .then((x)=>{
      setChild(x.data.result);
    })
  }
  
  useEffect(() => { getAccounts(); }, [vType, CompanyId]);

  const getAccounts = async () => {
    if(vType!="" && CompanyId!=NaN){
      let x = "";
      switch (vType) {
        case "BPV":
        case "BRV":
          x = "Bank";
          break;
        case "CPV":
        case "CRV":
          x = "Cash";
          break;
        default:
          break;
      }
      if(x!=""){
        await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_ACCOUNT_FOR_TRANSACTION,{headers: { companyid:CompanyId, type:x }})
        .then((x)=>{
          setSettlement(x.data.result);
        })
      }
    }
  };
  return (

    <div className="base-page-layout">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={3}>
            <SelectSearchComp label="Type" name="vType" register={register} control={control} width={"100%"}
              options={[
                { id: "CPV", name: "CPV" },
                { id: "CRV", name: "CRV" },
                { id: "BRV", name: "BRV" },
                { id: "BPV", name: "BPV" },
              ]}
            />
            <p className="error">{errors?.vType?.message}</p>
          </Col>
          <Col md={3}>
            <div>Type</div>
            <div style={{border:'1px solid silver', paddingLeft:10, paddingTop:5, paddingBottom:3}}>{type}</div>
            {/* <InputComp name="type" label="Job type" width={"100%"} disabled={true} control={control}{...register("type")} /> */}
          </Col>
          <Col md={3}>
            <SelectComp className="form-select" name="costCenter" label="Cost Center" register={register} control={control} width={"100%"}
              options={[
                { id: "KHI", name: "KHI" },
                { id: "LHR", name: "LHR" },
              ]}
            />
            <p className="error">{errors?.costCenter?.message}</p>
          </Col>
          <Col md={3}>
            <SelectComp className="form-select" name="ChildAccountId" label="Settlement Account" register={register} control={control} width={"100%"}
              options={
                settlement.length>0?settlement.map((x)=>{
                  return { id: x?.id, name: x?.title };
                }):[]
              }
            />
            <p className="error">{errors?.ChildAccountId?.message}</p>
          </Col>
          <Col md={3}>
            <InputComp name="payTo" label="Pay/Recieve To" register={register} control={control} width={"100%"} />
            <p className="error">{errors?.payTo?.message}</p>
          </Col>
          <Col md={3}>
            <DateComp register={register} name="chequeDate" label="Cheque Date" control={control} width={"100%"} />
          </Col>
          <Col md={3}>
            <InputComp className="form-control" name={"chequeNo"} label="Cheque No" placeholder="Cheque No" register={register} control={control} />
          </Col>
        </Row>
        <button type="button" className="btn-custom mb-3" style={{ width: "170px" }}
          onClick={() => {
            append({
              type: type === "Receivable" ? "Credit" : "Debit",
              ChildAccountId: "",
              narration: "",
              amount: 0,
              defaultAmount: "",
            });
          }}>Add</button>
        <div className="table-sm-1 col-12" style={{ maxHeight: 300, overflowY: "auto" }} >
          <Table className="tableFixHead" bordered>
            <thead>
              <tr>
                <th className="col-3">Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Narration</th>
                <th></th>
              </tr>
            </thead>
            {fields.map((field, index) => {
              return (
                <tbody key={field.id}>
                  <tr>
                    <td style={{padding:0, paddingTop:10}}>
                      <SelectSearchComp className="form-select" name={`Voucher_Heads.${index}.ChildAccountId`} register={register} control={control} width={"100%"}
                        options={ child.length>0?child.map((x) => { return{ id: x?.id, name: x?.title }}):[]}
                      /><p className="error">{errors?.Voucher_Heads?.ChildAccountId?.message}</p>
                    </td>
                    <td style={{padding:0, paddingTop:10}}>
                      <SelectComp className="form-select" name={`Voucher_Heads.${index}.type`} register={register} control={control} width={"100%"}
                        options={[
                          { id: "Debit", name: "Debit" },
                          { id: "Credit", name: "Credit" },
                        ]}
                      />
                    </td>
                    <td style={{padding:0, paddingTop:10}}>
                      <InputNumComp name={`Voucher_Heads.${index}.amount`} register={register} control={control} width={"100%"} />
                    </td>
                    <td style={{padding:0, paddingTop:10}}>
                      <InputComp type="text" name={`Voucher_Heads.${index}.narration`} placeholder="Narration" control={control} register={register} />
                    </td>
                    <td className="text-center" style={{paddingTop:4, paddingTop:10}}>
                      <CloseCircleOutlined className="cross-icon" onClick={()=>remove(index)} />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
        <button className="btn-custom" disabled={load ? true : false} onClick={handleSubmit}
        >{load ? <Spinner size="sm" className="mx-3" /> : "Save"}
        </button>
      </form>
    </div>

  );
};

export default Vouchers;
