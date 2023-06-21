import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import openNotification from "/Components/Shared/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./state";
import Vouchers from "./Vouchers";

const Voucher = ({ id, voucherData }) => {
  const CompanyId = useSelector((state) => state.company.value);
  const [child, setChild] = useState([]);
  const [type, setType] = useState("");
  const [settlement, setSettlement] = useState([]);
  const [load, setLoad] = useState(false);
  
  const {  register, handleSubmit, watch, control,  reset, formState:{ errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ComapnyId:1,
      chequeDate:"",
      chequeNo:"",
      costCenter:"KHI",
      payTo:"",
      type:"",
      vType:"",
      Voucher_Heads: [
      {
        type:"",
        ChildAccountId:"",
        narration:"",
        amount:0,
        defaultAmount:"",
      }]
    }
  });

  const onSubmit = async(data) => {
    setLoad(true);
    let { chequeDate, chequeNo, costCenter, payTo, Voucher_Heads, ChildAccountId, vType } = data;
    let amount = 0;
    Voucher_Heads?.map((v) => {
      amount = parseFloat((amount += v.amount));
    });
    const settlementAcc = { 
      ChildAccountId, settlement: "1", type: type == "Receivable" ? "Debit" : "Credit", 
      amount: amount, narration: "Settelment Account",
    };
    let setAcc = {};
    voucherData.Voucher_Heads?.map((x) => {
      if (x.settlement == 1) {
        setAcc = { ...x, amount: amount }
      }
    });

    if(id !== "new"){
      await axios.post(process.env.NEXT_PUBLIC_CLIMAX_UPDATE_VOUCEHR, {
        id, type, vType, chequeDate, chequeNo, payTo, costCenter, CompanyId, Voucher_Heads: [...Voucher_Heads, setAcc],
      }).then((x)=>{
        x.data.status == "success"
        ? openNotification("Success", `Voucher ${id !== "new" ? "Updated" : "Created"} Successfully!`, "green")
        : openNotification( "Error", `An Error occured Please Try Again!`, "red");
      })
    }else{
      await axios.post(process.env.NEXT_PUBLIC_CLIMAX_CREATE_VOUCHER, {
        type, vType, chequeDate, chequeNo, payTo, costCenter, CompanyId, Voucher_Heads: [...Voucher_Heads, settlementAcc],
      }).then((x)=>{
        x.data.status == "success"
        ? openNotification("Success", `Voucher ${id !== "new" ? "Updated" : "Created"} Successfully!`, "green")
        : openNotification( "Error", `An Error occured Please Try Again!`, "red");
        
      })
    }
    setLoad(false);
  };

  return (
    <Vouchers handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} control={control}
      reset={reset} setSettlement={setSettlement} errors={errors} settlement={settlement} CompanyId={CompanyId}
      child={child} voucherData={voucherData} setChild={setChild} watch={watch}
      setType={setType} load={load} />
  );
};
export default Voucher;