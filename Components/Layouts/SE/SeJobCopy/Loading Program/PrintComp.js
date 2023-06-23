import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import ReactToPrint from "react-to-print";

const PrintComp = ({allValues}) => {
    let inputRef = useRef(null);
    let border = "1px solid";
    const heading = border ? "grey-txt" : "wh-txt";
    const line = "1px solid";
console.log(allValues )
  return (
    <div style={{ width: "30%" }}>
      <ReactToPrint
        content={() => inputRef}
        trigger={() => (
          <div className="div-btn-custom text-center p-2">Print</div>
        )}
      />
      <div style={{ display: "none" }}>
        <div
          ref={(response) => (inputRef = response)}
          style={{ padding: "30px" }}
        >
          <div
            className="d-flex justify-content-center"
            style={{ position: "relative", borderBottom: "2px solid " }}
          >
            <img
              src="/seanet-logo.png"
              height={40}
              className="invert"
              style={{ position: "absolute", left: "0" }}
            />
            <div style={{ textAlign: "center" }}>
              <p className="fs-16" style={{ lineHeight: "5px" }}>
                SEA NET SHIPPING & LOGISTICS
              </p>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                House# D-213 DMCHS, Siraj Ud Daula Road, Karachi
              </p>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                Tel: 9221 34395444-55-66 Fax 9221 34385001
              </p>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                Email: info@seanetpk.com Web www.seanetpk.com
              </p>
            </div>
            <p
              style={{
                position: "absolute",
                top: "62px",
                right: "50px",
                background: "white",
                padding: "2px",
              }}
            >
              Loading Progress
            </p>
          </div>

          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                The Assistant Traffic Manager
              </p>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                PICT
              </p>
              <p className="fs-13" style={{ lineHeight: "5px" }}>
                Karachi
              </p>
            </div>

            <table
              className="table table-bordered "
              style={{ width: "300px", height: "40px" }}
            >
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Book #</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> 14/06/2023 </td>
                  <td>SNS-SEJ-590/23</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <p>Dear Sir</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <p>C.V : </p>
              <p style={{ width: "150px", borderBottom: "1px solid" }}>
                C.V :{" "}
              </p>
              <p>Voyage : </p>
              <p style={{ width: "100px", borderBottom: "1px solid" }}>
                C.V :{" "}
              </p>
              <p>EGM No : </p>
              <p style={{ width: "100px", borderBottom: "1px solid" }}>
                {allValues.egm}
              </p>
              <p>Berth No : </p>
              <p style={{ width: "100px", borderBottom: "1px solid" }}>
              {allValues.berth} 

              </p>
              <p className="d-flex">
                <p>WHARF : </p>
                <p style={{ width: "180px", borderBottom: "1px solid" }}>
                  C.V :{" "}
                </p>
              </p>
            </div>
          </div>

          <div>
            <p style={{lineHeight:"5px"}}>We have requested for the following cargo to be alongside :</p>
            <Row>
              <Col
                style={{
                  margin: 0,
                  border: border,
                  padding: 0,
                  minWidth: "100%",
                }}
              >
                <Row style={{ position: "relative", left: 10 }}>
                  <Col
                    style={{
                      maxWidth: "25%",
                      margin: 0,
                      borderBottom: border,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={`  fs-12 text-center`}
                  >
                    Shipper / Clearing Agent
                  </Col>
                  <Col
                    style={{
                      maxWidth: "15%",
                      margin: 0,
                      borderBottom: border,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={`  fs-12 text-center`}
                  >
                    Pkgs / No. of Cont.
                  </Col>
                  <Col
                    style={{
                      maxWidth: "25%",
                      margin: 0,
                      borderBottom: border,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={`  fs-12 px-4`}
                  >
                    Description Of Goods
                  </Col>
                  <Col
                    style={{
                      maxWidth: "15%",
                      margin: 0,
                      borderBottom: border,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={`  fs-12 px-4`}
                  >
                    Date & Time Required
                  </Col>
                  <Col
                    style={{
                      maxWidth: "17%",
                      margin: 0,
                      borderBottom: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` fs-12 px-4`}
                  >
                    Destination
                  </Col>
                </Row>
                <div
                  style={{ height: 1, width: "100%", backgroundColor: line }}
                ></div>
                <Row style={{ position: "relative", left: 10 }}>
                  <Col
                    style={{
                      maxWidth: "25%",
                      margin: 0,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` ${heading} fs-12`}
                  >
                    <div className="mb-3">
                      Shipper: <br />
                      MN TEXTILE (PVT) LTD
                    </div>
                    <div className="mt-3 mb-1">
                      Clearing Agent : <br />
                      TURNER GRAHAMS OF PAKSITAN
                    </div>
                  </Col>
                  <Col
                    style={{
                      maxWidth: "15%",
                      margin: 0,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` ${heading} fs-12 text-center`}
                  >
                    58 <br />
                    PACKAGES
                  </Col>
                  <Col
                    style={{
                      maxWidth: "25%",
                      margin: 0,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` ${heading} fs-12 px-4`}
                  >
                    FABRIC
                  </Col>
                  <Col
                    style={{
                      maxWidth: "15%",
                      margin: 0,
                      borderRight: border,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` ${heading} fs-12 px-4`}
                  >
                    19/06/2023
                    <br />
                    04:00:00 PM
                  </Col>
                  <Col
                    style={{
                      maxWidth: "17%",
                      margin: 0,
                      paddingTop: 7,
                      paddingBottom: 3,
                    }}
                    className={` ${heading} fs-12 px-4`}
                  >
                    Discharge Port:
                    <br />
                    COLOMBO
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  margin: 0,
                  border: "border",
                  borderLeft: "none",
                  maxWidth: "54%",
                  paddingLeft: 1,
                  paddingRight: 1,
                  paddingTop: 0,
                  paddingBottom: 5,
                }}
              >
                {/* {borders && <img src={"/disclaimer.PNG"} width={"100%"} />} */}
              </Col>
            </Row>
            <p className="fs-15 mt-2" style={{lineHeight:"15px"}}>CARGO WILL BE DISCHARGED / DELIVERED BADARUDDIN YARD WHARF TR 10 TERMINAL PICT CARRIER: PAKLINK SHIPPING SERVICES POD: COLOMBO, SRILANKA</p>

          </div>

          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{width:"40%"}}>
                <p className="fs-13">Kindly allow the cargo to pass throught accordingly</p>
                <br/>
                <hr/>
                <p><b>For : For SEA NET SHIPPING & LOGISTICS</b></p>
                <p style={{textAlign:"center"}}><b>As Agent</b></p>

            </div>
            <div style={{width:"40%"}}>
                <p className="fs-13"> <i>C.C:</i></p>
                <br/>
                <p>MIN TEXTILES (PVT) LTD</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComp;
