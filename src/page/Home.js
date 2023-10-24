import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import moment from "moment";
import "moment/locale/th";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style.css";
// import required modules
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import Web3 from "web3";
import contractABI from "../contractABI.json";

moment.locale("th");

export default function Home() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );
  const contract = new web3.eth.Contract(
    contractABI,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  const [DataStudent, setDataStudent] = useState([]);
  const [DataHoR, setDataHor] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataOther, setDataOther] = useState([]);
  const [DataDeclare, setDataDeclare] = useState([]);
  const [Switching, setSwitching] = useState(0);
  //web3
  const [candidates, setCandidates] = useState([]);

  const switchItem = async (index) => {
    setSwitching(index);
  };

  useEffect(() => {
    getDataStudent();
    getDataHoR();
    getDataProvincial();
    getDataOther();
    getDataDeclare();
    getAllCandidates();
  }, []);

  // สร้างฟังก์ชันเพื่อดึงข้อมูลผู้สมัครจาก blockchain
  const getAllCandidates = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const allCandidates = await contract.methods.getAllCandidates().call({
        from: accounts[0],
      });

      setCandidates(allCandidates);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้สมัครทั้งหมด: ", error);
    }
  };

  const getDataDeclare = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_declare.php/?xCase=5`
      );
      setDataDeclare(response.data);
      // เข้าถึงข้อมูลในอาร์เรย์
      const data = response.data;
      // วนลูปผ่านแต่ละออบเจกต์ในอาร์เรย์
      for (let i = 0; i < data.length; i++) {
        const declareData = data[i];
        console.log(`start_date ${i}: ${declareData.start_date}`);
      }
    } catch (error) {
      console.error(error);
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
        process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=9`
      );
      setDataHor(response.data);
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

  return (
    <div>
      <section className="banner vh-100">
        <Navbar />
      </section>

      <section className="my-5">
        <div className="text-center">
          <div className="fs-2 fw-bold color darkbluetheme">
            <i className="fa-sharp fs-5 fa-light fa-bullhorn me-2"></i>
            ประกาศ <i className="fa-sharp fs-5 darkbluetheme fa-sparkles"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Keyboard, Pagination, Navigation]}
              className="mySwiper"
            >
              {DataDeclare.map((DataDeclare) => (
                <SwiperSlide>
                  <div className="container">
                    <div className="mx-5 my-4">
                      <div className="card border-primary  w-100">
                        <div className="card-header fw-bold text-center">
                          {DataDeclare.toppic}
                        </div>
                        <div className="card-body text-primary">
                          <p className="card-title">
                            <i className="fa-sharp fs-5 bluetheme fa-sparkles"></i>{" "}
                            {DataDeclare.detail}
                          </p>
                          <p className="card-text my-3">
                            <i className="lightbluetheme fa-sharp fa-regular fa-calendar-days"></i>{" "}
                            {DataDeclare.start_date1} ถึงวันที่{" "}
                            {DataDeclare.end_date1}
                            <i className="lightbluetheme fa-sharp fa-solid fa-clock-ten"></i>{" "}
                            {DataDeclare.start_time} ถึงเวลา{" "}
                            {DataDeclare.end_time}
                          </p>
                          <p className="card-footer">
                            <small className="text-muted">
                              อัพเดทเมื่อ{" "}
                              {moment(DataDeclare.start_date).fromNow()}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="bg-blue-950 w-full my-2">
        <div className="py-3 mx-4">
          <div className="fs-2 fw-bold text-light text-center my-3">
            เลือกตั้งออนไลน์โดยใช้บล็อคเซน
          </div>
          <div className="row lg:mx-5 my-4">
            <div className="col-12 col-lg-6">
              <img
                src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/383874749_1276864279630864_4605867996731392778_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHO6Gm8wYHmjLuRT6ONRpJZAigQDe9wNRQCKBAN73A1FE3bmgyUE8NmELBvnHUchpq_FJuVqV3bHYQCHiOrkNbE&_nc_ohc=ipnoqirnTaAAX89I13P&_nc_ht=scontent.fbkk10-1.fna&oh=03_AdR79Z2MUddOAUbpb6t1L22ni-CEQ8LGNdCI6ShBXaGQew&oe=65388F2A"
                alt=""
                className="w-100 rounded"
              />
            </div>
            <div className="col-12 col-lg-6 my-auto">
              <div className="fs-5 indent-16 text-light py-3">
                บล็อกเชนเป็นระบบจัดเก็บฐานข้อมูลการเลือกตั้งแบบกระจาย
                (Distributed Ledger) ในลักษณะ Block เชื่อมต่อกัน
                โดยข้อมูลจะถูกสำรองและตรวจสอบความถูกต้อง (Consensus)
                จากสมาชิกในเครือข่ายแล้วจัดเก็บตาม Node ต่าง ๆ
                โดยไม่ต้องอาศัยตัวกลาง
                และมีกลไกในการตรวจสอบในการสร้างข้อมูลเท็จทำให้ระบบเลือกตั้งบนบล็อกเชนจัดเก็บข้อมูลการลงคะแนนได้อย่างถูกต้อง
                ปลอดภัย
                ผู้ลงคะแนนมั่นใจได้ว่าข้อมูลที่ตนโหวตให้ผู้สมัครจะไม่ถูกแก้ไขเพื่อเอื้อประโยชน์ให้ผู้สมัครคนใดคนหนึ่ง
                ยากต่อการปลอมแปลงหรือสวมสิทธิ์แทนบุคคลอื่น
                สร้างความโปร่งใสตรวจสอบได้
                สร้างความน่าเชื่อถือให้กับการเลือกตั้ง
              </div>
            </div>
          </div>
          <div className="text-light text-center fs-6 fw-lighter mt-5 italic ">
            อ้างอิงข้อมูลจาก :
            https://www.tech2biz.net/index.php/content/1580-ระบบเลือกตั้งบนบล็อกเชน-(Blockchain)
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="mx-auto my-5">
              <button
                className={`btn ${
                  Switching === 0
                    ? "btn-primary bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 "
                    : "btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 my-2"
                }  mx-2`}
                onClick={() => switchItem(0)}
              >
                ผู้ลงสมัครสมาชิกสภาผู้แทนราษฎร
              </button>
              <button
                className={`btn ${
                  Switching === 1
                    ? "btn-primary bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 "
                    : "btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 my-2"
                }  mx-2`}
                onClick={() => switchItem(1)}
              >
                ผู้ลงสมัครสมัครสมาชิกสภาจังหวัด
              </button>
              <button
                className={`btn ${
                  Switching === 2
                    ? "btn-primary bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 "
                    : "btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 my-2"
                }  mx-2`}
                onClick={() => switchItem(2)}
              >
                ผู้ลงสมัครสมัครสมัครประธานสโมสร
              </button>
              <button
                className={`btn ${
                  Switching === 3
                    ? "btn-primary bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 "
                    : "btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 my-2"
                }  mx-2`}
                onClick={() => switchItem(3)}
              >
                อื่นๆ
              </button>
            </div>
          </div>
          {Switching === 0 ? (
            <div className="row">
              {DataHoR.map((DataHoR) => {
                const filteredCandidates = candidates.filter(
                  (candidate) =>
                    candidate.number == DataHoR.number &&
                    candidate.candidateType == DataHoR.type_id
                );

                if (filteredCandidates.length > 0) {
                  return (
                    <div className="col-12 col-md-6 col-lg-3 my-2">
                      <div className="card w-100 h-100 shadow-sm">
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
                            <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                              ข้อมูลผู้สมัคร
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="text-center my-5">
                <Link
                  to={"Candidate/1"}
                  className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-25"
                >
                  {" "}
                  ดูทั้งหมด{" "}
                </Link>
              </div>
            </div>
          ) : Switching === 1 ? (
            <div className="row">
              {DataProvincial.map((DataProvincial, index) => {
                const filteredCandidates = candidates.filter(
                  (candidate) =>
                    candidate.number == DataProvincial.number &&
                    candidate.candidateType == DataProvincial.type_id
                );
                if (filteredCandidates.length > 0) {
                  return (
                    <div className="col-12 col-md-6 col-lg-3 my-2">
                      <div className="card w-100 h-100 shadow-sm">
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
                            <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                              ข้อมูลผู้สมัคร
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="text-center my-5">
                <Link
                  to={"Candidate/2"}
                  className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-25"
                >
                  {" "}
                  ดูทั้งหมด{" "}
                </Link>
              </div>
            </div>
          ) : Switching === 2 ? (
            <div className="row">
              {DataStudent.map((DataStudent) => {
                const filteredCandidates = candidates.filter(
                  (candidate) =>
                    candidate.number == DataStudent.number &&
                    candidate.candidateType == DataStudent.type_id
                );

                if (filteredCandidates.length > 0) {
                  return (
                    <div className="col-12 col-md-6 col-lg-3 my-2">
                      <div className="card w-100 h-100 shadow-sm">
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
                            <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                              ข้อมูลผู้สมัคร
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="text-center my-5">
                <Link
                  to={"Candidate/3"}
                  className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-25"
                >
                  {" "}
                  ดูทั้งหมด{" "}
                </Link>
              </div>
            </div>
          ) : Switching === 3 ? (
            <div className="row">
              {DataOther.map((DataOther) => {
                const filteredCandidates = candidates.filter(
                  (candidate) =>
                    candidate.number == DataOther.number &&
                    candidate.candidateType == DataOther.type_id
                );

                if (filteredCandidates.length > 0) {
                  return (
                    <div className="col-12 col-md-6 col-lg-3 my-2">
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
                            {DataStudent.club_president_firstname}{" "}
                            {DataStudent.club_president_lastname}
                          </div>
                          <div className="text-center my-5">
                            <button className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50">
                              ข้อมูลผู้สมัคร
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <div className="text-center my-5">
                <Link
                  to={"Candidate/4"}
                  className="btn btn-outline-primary bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-25"
                >
                  {" "}
                  ดูทั้งหมด{" "}
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <section className="w-full my-2">
        <div className="py-3 mx-4">
          <div className="fs-1 fw-bold color darkbluetheme text-center my-3">
            วิธีการใช้งานเว็บไซต์
          </div>
          <div className="row lg:mx-5 my-4  text-center">
            <div className="col-12 col-lg-4">
              <img
                src={process.env.REACT_APP_API + "images/Metamask.jpeg"}
                alt=""
                className="w-100 rounded"
              />
              <div className="mt-3 fs-3 fw-bold">
                <p>ติดตั้ง MetaMask บนเว็บเบราว์เซอร์</p>
                <p className="fs-5">**ใน Metamsk จำเป็นต้องมีเหรียญ**</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <img
                src={process.env.REACT_APP_API + "images/login.png"}
                alt=""
                className="w-100 rounded"
              />
              <div className="mt-3 fs-3 fw-bold">
                <p>เข้าสู่ระบบด้วย USERNAME และ PASSWORD</p>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <img
                src={process.env.REACT_APP_API + "images/vote.png"}
                alt=""
                className="w-100 rounded"
              />
              <div className="mt-3 fs-3 fw-bold">
                <p>เลือกประเภทโหวตจากนั้นก็โหวตเบอร์ที่คุณเลือก</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
