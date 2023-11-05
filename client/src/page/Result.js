import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "../style.css";
import { ProgressBar } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component"; // import DataTable
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Result() {

  const [DataStudent, setDataStudent] = useState([]);
  const [DataStudent2, setDataStudent2] = useState([]);
  const [DataHoR2, setDataHor2] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataProvincial2, setDataProvincial2] = useState([]);
  const [DataOther, setDataOther] = useState([]);
  const [DataOther2, setDataOther2] = useState([]);
  const [DataPercent, setDataPercent] = useState([]);
  const [DataDeclare, setDataDeclare] = useState([]);
  const [DataToppic, setDataToppic] = useState([]);
  const [Switching, setSwitching] = useState(1);
  const [Item, setItem] = useState([]);

  const currentDate = new Date();

  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString().slice(0);
  const formattedTime = currentDate.toLocaleTimeString(undefined, {
    hour12: false,
  });
  const dateTime = `${year}/${month}/${day} ${formattedTime}`;

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );
  const contract = new web3.eth.Contract(
    contractABI,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    getDataHoR2();
    getDataProvincial();
    getDataProvincial2();
    getDataStudent();
    getDataStudent2();
    getDataOther();
    getDataOther2();
    getDataPercent();
    getDataDeclare();
    getDataToppic();
    getAllCandidates();
  }, []);

  // สร้างฟังก์ชันเพื่อดึงข้อมูลผู้สมัครจาก blockchain
  const getAllCandidates = async () => {
    try {
      const allCandidates = await contract.methods.getAllCandidates().call();
      setCandidates(allCandidates);
      var formData = new FormData();
      for (const data of allCandidates) {
        formData.append("number[]", data.number);
        formData.append("type_id[]", data.candidateType);
        formData.append("score[]", data.voteCount);
        formData.append("regis_date[]", data.registrationDate);
      }
      //อัพเดทข้อมูลคะแนนไม่ให้เปลื่ยน
      var response = await axios.post(
        process.env.REACT_APP_API +
        "api_House_of_Representatives.php/?xCase=10",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      var response = await axios.post(
        process.env.REACT_APP_API + "api_Provincial_Council.php/?xCase=10",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      var response = await axios.post(
        process.env.REACT_APP_API + "api_Student_club.php/?xCase=10",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      var response = await axios.post(
        process.env.REACT_APP_API + "api_other.php/?xCase=21",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("อัปเดตข้อมูลสำเร็จ");
        // ทำสิ่งที่คุณต้องการทำหลังจากการอัปเดตข้อมูลสำเร็จ
      } else {
        console.error(
          "เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ",
          response.data.message
        );
      }
      console.log(allCandidates);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้สมัครทั้งหมด: ", error);
    }
  };

  const switchItem = async (value) => {
    setSwitching(value);
  };

  const OItem = async (value) => {
    setItem(value);
  };

  const getDataHoR2 = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=0`
      );
      setDataHor2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataStudent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Student_club.php/?xCase=9`
      );
      setDataStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataStudent2 = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Student_club.php/?xCase=2`
      );
      setDataStudent2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataProvincial = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=9`
      );
      setDataProvincial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataProvincial2 = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=2`
      );
      setDataProvincial2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=17`
      );
      setDataOther(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther2 = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=16`
      );
      setDataOther2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataPercent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=9`
      );
      setDataPercent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataDeclare = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_declare.php/?xCase=5`
      );
      setDataDeclare(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataToppic = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=14`
      );
      setDataToppic(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#C8ECFD",
      },
    },
    cells: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };

  createTheme("solarized", {
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
    background: {
      default: "#F2F3F7",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const columnsHor = [
    {
      name: "เบอร์ที่",
      selector: "number",
      sortable: true,
      headerCell: () => <div className="mx-auto"></div>,
    },
    {
      name: "รูป",
      cell: (row) => (
        <img
          src={process.env.REACT_APP_API + `canidate/${row.picture}`}
          className="rounded object-fit-cover my-2"
          width="80px"
          height="80px"
        />
      ),
    },
    {
      name: "ชื่อ",
      selector: (row) =>
        `${row.Representatives_firstname} ${row.Representatives_lastname}`,
      sortable: true,
    },
    { name: "คะแนน", selector: "score", sortable: true },
  ];

  const columnsP = [
    {
      name: "เบอร์ที่",
      selector: "number",
      sortable: true,
      headerCell: () => <div className="mx-auto"></div>,
    },
    {
      name: "รูป",
      cell: (row) => (
        <img
          src={process.env.REACT_APP_API + `canidate/${row.picture}`}
          className="rounded object-fit-cover my-2"
          width="80px"
          height="80px"
        />
      ),
    },
    {
      name: "ชื่อ",
      selector: (row) =>
        `${row.provincial_firstname} ${row.provincial_lastname}`,
      sortable: true,
    },
    { name: "คะแนน", selector: "score", sortable: true },
  ];

  const columnsS = [
    {
      name: "เบอร์ที่",
      selector: "number",
      sortable: true,
      headerCell: () => <div className="mx-auto"></div>,
    },
    {
      name: "รูป",
      cell: (row) => (
        <img
          src={process.env.REACT_APP_API + `canidate/${row.picture}`}
          className="rounded object-fit-cover my-2"
          width="80px"
          height="80px"
        />
      ),
    },
    {
      name: "ชื่อ",
      selector: (row) =>
        `${row.club_president_firstname} ${row.club_president_lastname}`,
      sortable: true,
    },
    { name: "คะแนน", selector: "score", sortable: true },
  ];

  const columnsO = [
    {
      name: "เบอร์ที่",
      selector: "number",
      sortable: true,
      headerCell: () => <div className="mx-auto"></div>,
    },
    {
      name: "รูป",
      cell: (row) => (
        <img
          src={process.env.REACT_APP_API + `canidate/${row.picture}`}
          className="rounded object-fit-cover my-2"
          width="80px"
          height="80px"
        />
      ),
    },
    {
      name: "ชื่อ",
      selector: (row) =>
        `${row.register_other_fistname} ${row.register_other_lastname}`,
      sortable: true,
    },
    { name: "คะแนน", selector: "score", sortable: true },
  ];

  return (
    <div>
      <Navbar />
      <div class="container mt-28">
        <div className="fs-1 fw-bold color theme text-center mt-5 mb-3">
          ผลการเลือกตั้ง
        </div>
        {Switching === 4 ? (
          <h1
            id="selectedTopic"
            className="fs-3 fw-bold color lightbluetheme text-center mt-2 mb-3"
          />
        ) : (
          ""
        )}
        <div className="flex mt-3">
          <div className="col-lg-3">
            <select
              class="form-select"
              onChange={(e) => switchItem(parseInt(e.target.value))}
              aria-label="Default select example"
            >
              <option selected disabled>
                เลือกประเภทข้อมูลผู้สมัคร
              </option>
              <option value={1}>สมาชิกสภาผู้แทนราษฎร( สส. )</option>
              <option value={2}>สมาชิกสภาจังหวัด( สจ. )</option>
              <option value={3}>ประธานสโมสร</option>
              <option value={4}>อื่นๆ</option>
            </select>
          </div>
          <div
            className="col-lg-3 ms-3"
            hidden={Switching === 4 ? false : true}
          >
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                const selectedValue = e.target.value;
                OItem(parseInt(selectedValue));
                const selectedTopicElement =
                  document.getElementById("selectedTopic");
                const selectedOption = e.target.options[e.target.selectedIndex];
                selectedTopicElement.textContent = selectedOption.textContent;
              }}
            >
              <option selected disabled>
                เลือกหัวข้อ
              </option>
              {DataToppic.map((DataToppic) => (
                <option key={DataToppic.toppic_id} value={DataToppic.toppic_id}>
                  {DataToppic.toppic_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {Switching === 1 ? (
          <div className="">
            {DataDeclare.map((DataDeclareItem) => {
              return (
                <div className="mt-4">
                  {dateTime >= DataDeclareItem.end_date1 &&
                    DataDeclareItem.type_id === "0001" ? (
                    <div class="row mt-5">
                      <div class="col-12 col-lg-6 flex-wrap: wrap">
                        {DataHoR2.map((DataHoR2) => {
                          const filteredCandidates = candidates.filter(
                            (candidate) =>
                              candidate.number == DataHoR2.number &&
                              candidate.candidateType == DataHoR2.type_id
                          );

                          if (filteredCandidates.length > 0) {
                            return (
                              <div key={DataHoR2.id} className="card w-100">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      {DataHoR2 ? (
                                        <img
                                          src={
                                            process.env.REACT_APP_API +
                                            `canidate/${DataHoR2.picture}`
                                          }
                                          alt={DataHoR2.picture}
                                          className="object-fit-cover rounded-full w-60 h-60 lg:w-24 lg:h-24"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="col-lg-8">
                                      <div className="col-lg-8 my-3">
                                        <strong>
                                          <p className="mt-1">
                                            {DataHoR2.Representatives_firstname}{" "}
                                            {DataHoR2.Representatives_lastname}
                                          </p>
                                        </strong>
                                        <ProgressBar
                                          now={DataHoR2.percentage}
                                          striped
                                          variant="info"
                                          label={`${DataHoR2.percentage}%`}
                                        />
                                      </div>
                                      <div className="col-lg-3 my-3 text-score">
                                        <strong>{DataHoR2.score}</strong>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                      <div className="col-lg-6">
                        <DataTable
                          title=""
                          columns={columnsHor}
                          // data={DataHoR2}
                          data={DataHoR2.filter((DataHoR2) => {
                            // กรองข้อมูลใน DataHoR2 ให้เหลือเฉพาะข้อมูลที่ผ่านเงื่อนไข
                            return (
                              candidates.filter(
                                (candidate) =>
                                  candidate.number == DataHoR2.number &&
                                  candidate.candidateType == DataHoR2.type_id
                              ).length > 0
                            );
                          })}
                          customStyles={customStyles}
                          theme="solarized"
                          pagination
                          responsive
                          highlightOnHover
                          pointerOnHover
                          noHeader
                          className="rounded-3"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        ) : Switching === 2 ? (
          <div className="">
            {DataDeclare.map((DataDeclareItem) => (
              <div className="mt-4">
                {dateTime >= DataDeclareItem.end_date1 &&
                  DataDeclareItem.type_id === "0002" ? (
                  <div className="row mt-5">
                    <div className="col-lg-6">
                      {DataProvincial.map((DataProvincial) => {
                        const filteredCandidates = candidates.filter(
                          (candidate) =>
                            candidate.number == DataProvincial.number &&
                            candidate.candidateType == DataProvincial.type_id
                        );

                        if (filteredCandidates.length > 0) {
                          return (
                            <div key={DataProvincial.id} className="card w-100">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-lg-4 d-flex justify-content-center">
                                    {DataProvincial ? (
                                      <img
                                        src={
                                          process.env.REACT_APP_API +
                                          `canidate/${DataProvincial.picture}`
                                        }
                                        alt={DataProvincial.picture}
                                        className="object-fit-cover rounded-full w-60 h-60 lg:w-24 lg:h-24"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="col-lg-8 my-3">
                                      <strong>
                                        <p className="mt-1">
                                          {DataProvincial.provincial_firstname}{" "}
                                          {DataProvincial.provincial_lastname}
                                        </p>
                                      </strong>
                                      <ProgressBar
                                        now={DataProvincial.percentage}
                                        striped
                                        variant="info"
                                        label={`${DataProvincial.percentage}%`}
                                      />
                                    </div>
                                    <div className="col-lg-3 my-3 text-score">
                                      <strong>{DataProvincial.score}</strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <div className="col-lg-6">
                      <DataTable
                        title=""
                        columns={columnsP}
                        // data={DataProvincial2}
                        data={DataProvincial2.filter((DataProvincial2) => {
                          // กรองข้อมูลใน DataProvincial2 ให้เหลือเฉพาะข้อมูลที่ผ่านเงื่อนไข
                          return (
                            candidates.filter(
                              (candidate) =>
                                candidate.number == DataProvincial2.number &&
                                candidate.candidateType == DataProvincial2.type_id
                            ).length > 0
                          );
                        })}
                        customStyles={customStyles}
                        theme="solarized"
                        pagination
                        responsive
                        highlightOnHover
                        pointerOnHover
                        noHeader
                        className="rounded-3"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : Switching === 3 ? (
          <div className="">
            {DataDeclare.map((DataDeclareItem) => (
              <div className="mt-4" key={DataDeclareItem.id}>
                {dateTime >= DataDeclareItem.end_date1 &&
                  DataDeclareItem.type_id === "0003" ? (
                  <div className="row mt-5">
                    <div className="col-12 col-lg-6">
                      {DataStudent.map((DataStudentItem) => {
                        const filteredCandidates = candidates.filter(
                          (candidate) =>
                            candidate.number == DataStudentItem.number &&
                            candidate.candidateType == DataStudentItem.type_id
                        );

                        if (filteredCandidates.length > 0) {
                          return (
                            <div key={DataStudentItem.id} className="card w-100">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-lg-4 d-flex justify-content-center">
                                    {DataStudentItem ? (
                                      <img
                                        src={
                                          process.env.REACT_APP_API +
                                          `canidate/${DataStudentItem.picture}`
                                        }
                                        alt={DataStudentItem.picture}
                                        className="object-fit-cover rounded-full w-60 h-60 lg:w-24 lg:h-24"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="col-lg-8 my-3">
                                      <strong>
                                        <p className="mt-1">
                                          {DataStudentItem.prefix}{" "}
                                          {DataStudentItem.club_president_firstname}{" "}
                                          {DataStudentItem.club_president_lastname}
                                        </p>
                                      </strong>
                                      <ProgressBar
                                        now={DataStudentItem.percentage}
                                        striped
                                        variant="info"
                                        label={`${DataStudentItem.percentage}%`}
                                      />
                                    </div>
                                    <div className="col-12 col-lg-3 my-3 text-score">
                                      <strong>{DataStudentItem.score}</strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <div className="col-lg-6">
                      <DataTable
                        title=""
                        columns={columnsS}
                        // data={DataStudent2}
                        data={DataStudent2.filter((DataStudent2) => {
                          // กรองข้อมูลใน DataStudent2 ให้เหลือเฉพาะข้อมูลที่ผ่านเงื่อนไข
                          return (
                            candidates.filter(
                              (candidate) =>
                                candidate.number == DataStudent2.number &&
                                candidate.candidateType == DataStudent2.type_id
                            ).length > 0
                          );
                        })}
                        customStyles={customStyles}
                        theme="solarized"
                        pagination
                        responsive
                        highlightOnHover
                        pointerOnHover
                        noHeader
                        className="rounded-3"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

        ) : Switching === 4 ? (
          <>
            <div className="row">
              {DataDeclare.map((DataDeclareItem) => (
                <div className="mt-4">
                  {dateTime >= DataDeclareItem.end_date1 &&
                    DataDeclareItem.type_id === "0004" ? (
                    <div className="row ">
                      <div className="col-lg-6">
                        {DataOther.filter((data) => data.toppic_id == Item).map((DataOtherItem) => {
                          const filteredCandidates = candidates.filter(
                            (candidate) =>
                              candidate.number == DataOtherItem.number &&
                              candidate.candidateType == DataOtherItem.type_id
                          );

                          if (filteredCandidates.length > 0) {
                            return (
                              <div className="card w-100" key={DataOtherItem.id}>
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      {DataOtherItem ? (
                                        <img
                                          src={
                                            process.env.REACT_APP_API +
                                            `canidate/${DataOtherItem.picture}`
                                          }
                                          alt={DataOtherItem.picture}
                                          className="object-fit-cover rounded-full w-60 h-60 lg:w-24 lg:h-24"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="col-lg-8 my-3">
                                      <strong>
                                        <p className="mt-1">
                                          {DataOtherItem.prefix}{" "}
                                          {DataOtherItem.register_other_fistname}{" "}
                                          {DataOtherItem.register_other_lastname}
                                        </p>
                                      </strong>
                                      <ProgressBar
                                        now={DataOtherItem.percentage}
                                        striped
                                        variant="info"
                                        label={`${DataOtherItem.percentage}%`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}

                      </div>
                      <div className="col-lg-6">
                        <DataTable
                          title=""
                          columns={columnsO}
                          data={DataOther2.filter((data) => {
                            return (
                              data.toppic_id == Item &&
                              candidates.some(
                                (candidate) =>
                                  candidate.number == data.number &&
                                  candidate.candidateType == data.type_id
                              )
                            );
                          })}
                          customStyles={customStyles}
                          theme="solarized"
                          pagination
                          responsive
                          highlightOnHover
                          pointerOnHover
                          noHeader
                          className="rounded-3"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {/* {candidates.map((candidates) => (
        <div className="">
          <p>{Number(candidates.number)}</p>
          <p>{candidates.name}</p>
          <p>score : {Number(candidates.voteCount)}</p>
          <br />
        </div>
      ))} */}
      <Footer />
    </div>
  );
}
