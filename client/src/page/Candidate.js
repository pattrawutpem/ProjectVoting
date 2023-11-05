import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Candidate() {
  const [DataStudent, setDataStudent] = useState([]);
  const [DataHoR, setDataHor] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataOther, setDataOther] = useState([]);
  const [Switching, setSwitching] = useState();
  const [Item, setItem] = useState([]);
  const [DataToppic, setDataToppic] = useState([]);

  const navigate = useNavigate();
  const { type } = useParams();

  //web3
  const [candidates, setCandidates] = useState([]);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );
  const contract = new web3.eth.Contract(
    contractABI, process.env.REACT_APP_CONTRACT_ADDRESS
  );

  useEffect(() => {
    getDataStudent();
    getDataHoR();
    getDataProvincial();
    getDataOther();
    getDataToppic();
    getAllCandidates();
    setSwitching(type);
    console.log("Switching", Switching);
  }, [type]);

  const OItem = async (value) => {
    setItem(value);
  };

  const switchItem = async (value) => {
    setSwitching(value);
    navigate(`/Candidate/${value}`);
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

  const getDataStudent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Student_club.php/?xCase=0`
      );
      setDataStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataHoR = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=0`
      );
      setDataHor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataProvincial = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=0`
      );
      setDataProvincial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=16`
      );
      setDataOther(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-28">
        <div className="fs-1 fw-bold color theme mt-5 text-center">
          <h1>ข้อมูลผู้สมัคร</h1>
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
              className="form-select"
              onChange={(e) => switchItem(parseInt(e.target.value))}
              value={Switching} // ใช้ค่า Switching เพื่อให้ <select> แสดงตามค่า type ที่มีอยู่
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
          <div className="col-lg-3 ms-3" hidden={Switching == 4 ? false : true}>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                const selectedValue = e.target.value;
                OItem(parseInt(selectedValue));
                const selectedTopicElement =
                  document.getElementById("selectedTopic");

                // ตรวจสอบว่า selectedTopicElement ไม่ใช่ null ก่อนที่จะกำหนดค่า textContent
                if (selectedTopicElement) {
                  const selectedOption =
                    e.target.options[e.target.selectedIndex];
                  selectedTopicElement.textContent = selectedOption.textContent;
                }
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
        {Switching == 1 || type == 1 ? (
          <div className="row mt-4">
            {DataHoR.map((DataHoR) => {
              const filteredCandidates = candidates.filter(
                (candidate) =>
                  candidate.number == DataHoR.number &&
                  candidate.candidateType == DataHoR.type_id
              );
              if (filteredCandidates.length > 0) {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 my-2"
                    key={DataHoR.number}
                  >
                    {filteredCandidates.map((candidate) => (
                      <div
                        className="card w-100 h-100 shadow-sm"
                        key={candidate.id}
                      >
                        <img
                          src={
                            process.env.REACT_APP_API +
                            `canidate/${DataHoR.picture}`
                          }
                          className="card-img-top h-80 object-fit-cover"
                          alt=""
                        />
                        <div className="card-body">
                          <h6 className="card-title fs-5 fw-bold color theme text-center">
                            เบอร์ที่ {DataHoR.number}
                          </h6>
                          <div className="fs-4 text-center color darkbluetheme fw-bold">
                            {DataHoR.Representatives_firstname}{" "}
                            {DataHoR.Representatives_lastname}
                          </div>
                          <div className="text-center mt-3">
                            <Link
                              to={`${DataHoR.Representatives_id}/CandidateDetail/1`}
                            >
                              <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                                ข้อมูลผู้สมัคร
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        ) : Switching == 2 || type == 2 ? (
          <div className="row mt-4">
            {DataProvincial.map((DataProvincial) => {
              const filteredCandidates = candidates.filter(
                (candidate) =>
                  candidate.number == DataProvincial.number &&
                  candidate.candidateType == DataProvincial.type_id
              );
              if (filteredCandidates.length > 0) {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 my-2"
                    key={DataProvincial.number}
                  >
                    {filteredCandidates.map((candidate) => (
                      <div
                        className="card w-100 h-100 shadow-sm"
                        key={candidate.id}
                      >
                        <img
                          src={
                            process.env.REACT_APP_API +
                            `canidate/${DataProvincial.picture}`
                          }
                          className="card-img-top h-80 object-fit-cover"
                          alt=""
                        />
                        <div className="card-body">
                          <h6 className="card-title fs-5 fw-bold color theme text-center">
                            เบอร์ที่ {DataProvincial.number}
                          </h6>
                          <div className="fs-4 text-center color darkbluetheme fw-bold">
                            {DataProvincial.provincial_firstname}{" "}
                            {DataProvincial.provincial_lastname}
                          </div>
                          <div className="text-center mt-3">
                            <Link
                              to={`${DataProvincial.provincial_id}/CandidateDetail/2`}
                            >
                              <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                                ข้อมูลผู้สมัคร
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        ) : Switching == 3 || type == 3 ? (
          <div className="row mt-4">
            {DataStudent.map((DataStudent) => {
              const filteredCandidates = candidates.filter(
                (candidate) =>
                  candidate.number == DataStudent.number &&
                  candidate.candidateType == DataStudent.type_id
              );
              if (filteredCandidates.length > 0) {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 my-2"
                    key={DataStudent.number}
                  >
                    {filteredCandidates.map((candidate) => (
                      <div
                        className="card w-100 h-100 shadow-sm"
                        key={candidate.id}
                      >
                        <img
                          src={
                            process.env.REACT_APP_API +
                            `canidate/${DataStudent.picture}`
                          }
                          className="card-img-top h-80 object-fit-cover"
                          alt=""
                        />
                        <div className="card-body">
                          <h6 className="card-title fs-5 fw-bold color theme text-center">
                            เบอร์ที่ {DataStudent.number}
                          </h6>
                          <div className="fs-4 text-center color darkbluetheme fw-bold">
                            {DataStudent.club_president_firstname}{" "}
                            {DataStudent.club_president_lastname}
                          </div>
                          <div className="text-center mt-3">
                            <Link
                              to={`${DataStudent.club_president_id}/CandidateDetail/3`}
                            >
                              <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                                ข้อมูลผู้สมัคร
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
            })}
          </div>
        ) : Switching == 4 || type == 4 ? (
            <div className="row">
              <div className="mt-4">
                {DataOther.map((data) => {
                  const filteredCandidates = candidates.filter(
                    (candidate) =>
                      candidate.number == data.number &&
                      candidate.candidateType == data.type_id
                  );
                  if (filteredCandidates.length > 0) {
                    return (
                      <div className="row ">
                        <div className="col-12 col-md-6 col-lg-3 my-2">
                          {DataOther.filter(
                            (data) => data.toppic_id == Item
                          ).map((DataOther) => (
                            <div className="card w-100 h-100 shadow-sm">
                              <img
                                src={
                                  process.env.REACT_APP_API +
                                  `canidate/${DataOther.picture}`
                                }
                                className="card-img-top h-80 object-fit-cover"
                                alt=""
                              />
                              <div className="card-body">
                                <h6 className="card-title fs-5 fw-bold color theme text-center">
                                  เบอร์ที่ {DataOther.number}
                                </h6>
                                <div className="fs-4 text-center color darkbluetheme fw-bold">
                                  {DataOther.register_other_fistname}{" "}
                                  {DataOther.register_other_lastname}
                                </div>
                                <div className="text-center mt-3">
                                  <Link
                                    to={`${DataOther.Other_id}/CandidateDetail/4`}
                                  >
                                    <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                                      ข้อมูลผู้สมัคร
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
