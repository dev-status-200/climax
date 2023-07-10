import React from 'react';
//import { useRouter } from 'next/router';
import axios from "axios";
import SeJobCopy from '../../../Components/Layouts/SE/SeJobCopy';

const seJob = ({riderData, id, fieldsData}) => {
  return (
    <>some text</>
  )
}
export default seJob

export async function getServerSideProps(context) {
  const { params } = context;
  let riderData = {};
  const fieldsData = await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_SEAJOB_VALUES).then((x)=>x.data);
  if(params.id!="new"){
    riderData = await axios.get(process.env.NEXT_PUBLIC_CLIMAX_GET_SE_JOB_BY_ID,{
      headers:{ "id": `${params.id}` }
    }).then((x)=>x.data.result);
    // if (!riderData.id) {
    //   return {
    //     notFound: true
    //   }
    // }
  }
  return {
    props: { riderData:riderData, id:params.id, fieldsData:fieldsData }
  }
}