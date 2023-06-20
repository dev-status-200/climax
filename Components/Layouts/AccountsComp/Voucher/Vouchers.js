import React, { useEffect, useState } from "react";
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
import {   useFieldArray, useWatch } from "react-hook-form";
import {  Select } from "antd";
import { useSelector } from "react-redux";

const Vouchers = ({
  handleSubmit,
  onSubmit,
  register,
  control,
  errors,
  companyId,
  child,
  settlement,
  reset,
  voucherData,
  setSettlement,
  setChild,
  watch,
  setType,
  load  

}) => {

  const company = useSelector((state) => state.company.value);
  const { fields, append, remove } = useFieldArray({
    name: "Voucher_Heads",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });
  const vType = useWatch({ control, name: "vType" });
  let CompanyId = useWatch({ control, name: "CompanyId" });
  let type = watch({control, name: "type" });

  vType === "BPV" || vType === "CPV" ? type= "Payble" :type= "Recievable" 
  useEffect(() => {
    setType(type)
  
  }, [vType])


  let companyNo = () =>{
    let comp ;
    if(company == 1)  {
       comp = "Sea Net Shipping"
       CompanyId = 1
    }
    else if(company == 2) {
       comp = "Cargo Linkers"
       CompanyId = 2

    }
    else {
       comp = "Air Cargo Shipping"
       CompanyId = 3

    }
    return comp
  }

  useEffect(() => {
    console.log("CompanyId Changed")
    const req = async () => {
      const config = {
        headers: {
          CompanyId: CompanyId,
        },
      };
      const res = await axios.get(
        process.env.NEXT_PUBLIC_CLIMAX_GET_ALL_CHILD_ACCOUNTS,
        config
      );
      setChild(res.data.result);
    };
    req();
  }, [CompanyId]);
 
  useEffect(() => {
    const { CompanyId, chequeNo, costCenter, payTo, vType, type } = voucherData;
    let chequeDate =
      voucherData?.chequeDate === "" ? "" : moment(voucherData?.chequeDate);

    let Voucher_Heads = voucherData.Voucher_Heads?.filter(
      (voucher) => voucher.settlement !== "1"
    );

    let ChildAccountId;
    voucherData?.Voucher_Heads?.filter((voucher) => {
      if (voucher.settlement === "1") {
        ChildAccountId = voucher.ChildAccountId;
      }
    });
    reset({ CompanyId, vType, chequeDate, chequeNo, costCenter, payTo, type, Voucher_Heads, ChildAccountId });
  }, []);

  useEffect(() => {
    const req = async () => {
      let x;
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
      const config = {
        headers: {
          companyid: !CompanyId ? 1 : CompanyId,
          type: x,
        },
      };
      const res = await axios.get(
        process.env.NEXT_PUBLIC_CLIMAX_GET_ACCOUNT_FOR_TRANSACTION,
        config
      );
      setSettlement(res.data.result);
    };
    req();
  }, [vType, CompanyId]);

  
  

  return (

    <div className="base-page-layout">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* first row contains VOUCHER TYPE, DATE, JOB_TYPE,    COST_CENTER */}
        <Row>
          <Col md={3}>
            <SelectSearchComp
              label="Type"
              name="vType"
              options={[
                { id: "CPV", name: "CPV" },
                { id: "CRV", name: "CRV" },
                { id: "BRV", name: "BRV" },
                { id: "BPV", name: "BPV" },
              ]}
              register={register}
              control={control}
              width={"100%"}
            />
            <p className="error">{errors?.vType?.message}</p>
          </Col>

          <Col md={3} width="100%">
          <label style={{ marginBottom: '-15px' }}>Select Field</label>

            <Select
              name="type"
              label="Job type"
              style={{width: "100%"}}
              value={type}
              defaultValue={type} // Provide a default value for the type field
               {...register("type")} 
               constrol = {control}
            />

          </Col>

          <Col md={3}>
            <SelectComp
              className="form-select"
              name="costCenter"
              label="Cost Center"
              options={[
                { id: "KHI", name: "KHI" },
                { id: "LHR", name: "LHR" },
              ]}
              register={register}
              control={control}
              width={"100%"}
            />
            <p className="error">{errors?.costCenter?.message}</p>
          </Col>

          <Col md={3} width="100%">
          <label style={{ marginBottom: '-15px' }}>Select Field</label>

            <Select
              name="CompanyId"
              label="Company"
              style={{width: "100%"}}
              value={companyNo()}
              register={...register("CompanyId")}
              control={control}
              onChange={(e) => onChange}
            />

          </Col>

          <Col md={3}>
            <SelectComp
              className="form-select"
              name="ChildAccountId"
              label="Settlement Account"
              register={register}
              control={control}
              width={"100%"}
              options={
                settlement.length > 0
                  ? settlement?.map((x) => {
                    return { id: x?.id, name: x?.title };
                  })
                  : []
              }
            />
            <p className="error">{errors?.ChildAccountId?.message}</p>
          </Col>

          <Col md={3}>
            <InputComp
              name="payTo"
              label="Pay/Recieve To"
              register={register}
              control={control}
              width={"100%"}
            />
            <p className="error">{errors?.payTo?.message}</p>
          </Col>

          <Col md={3}>
            <DateComp
              register={register}
              name="chequeDate"
              label="Cheque Date"
              control={control}
              width={"100%"}
            />
          </Col>
          <Col md={3}>
            <InputComp
              className="form-control"
              name={"chequeNo"}
              label="Cheque No"
              placeholder="Cheque No"
              register={register}
              control={control}
            />
          </Col>
        </Row>

        {/* head type section || voucher heads */}
        <button
          type="button"
          className="btn-custom mb-3"
          style={{ width: "170px" }}
          onClick={() => {
            append({
              type: type === "Receivable" ? "Credit" : "Debit",
              ChildAccountId: "",
              narration: "",
              amount: 0,
              defaultAmount: "",
            });
          }}
        >
          Add
        </button>
        <div
          className="table-sm-1 col-12"
          style={{ maxHeight: 300, overflowY: "auto" }}
        >
          <Table className="tableFixHead f" bordered>
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="col-3">Account</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Narration</th>
                <th className="text-center">x</th>
              </tr>
            </thead>
            {fields.map((field, index) => {
              return (
                <tbody key={field.id}>
                  <tr>
                    <td className="text-center">{index}</td>
                    <td>
                      <SelectSearchComp
                        className="form-select"
                        name={`Voucher_Heads.${index}.ChildAccountId`}
                        options={
                          child?.length > 0
                            ? child?.map((x) => {
                              return { id: x?.id, name: x?.title };
                            })
                            : []
                        }
                        register={register}
                        control={control}
                        width={"100%"}
                      />
                      <p className="error">
                        {errors?.Voucher_Heads?.ChildAccountId?.message}
                      </p>
                    </td>
                    <td>
                      <SelectComp
                        className="form-select"
                        name={`Voucher_Heads.${index}.type`}
                        options={[
                          { id: "Debit", name: "Debit" },
                          { id: "Credit", name: "Credit" },
                        ]}
                        register={register}
                        control={control}
                        width={"100%"}
                      />
                    </td>
                    <td>
                      <InputNumComp
                        name={`Voucher_Heads.${index}.amount`}
                        register={register}
                        control={control}
                        width={"100%"}
                      />
                    </td>
                    <td>
                      <InputComp
                        type="text"
                        name={`Voucher_Heads.${index}.narration`}
                        placeholder="Narration"
                        control={control}
                        register={register}
                      />
                    </td>
                    <td className="text-center">
                      <CloseCircleOutlined
                        className="cross-icon"
                        onClick={() => remove(index)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
        <button
        className="btn-custom"
        disabled={load ? true : false}
        onClick={handleSubmit}
      >
        {load ? <Spinner size="sm" className="mx-3" /> : "Search"}
      </button>
      </form>
    </div>

  );
};

export default Vouchers;
