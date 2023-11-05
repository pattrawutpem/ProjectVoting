import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function CandidateDetail() {
  const [DataStudent, setDataStudent] = useState([]);
  const [DataHoR, setDataHor] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataOther, setDataOther] = useState([]);
  const { id, t_id } = useParams();
  useEffect(() => {
    getDataStudent();
    getDataHoR();
    getDataProvincial();
    getDataOther();
  }, []);

  const getDataHoR = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API +
          `api_House_of_Representatives.php/${id}/?xCase=4`
      );
      setDataHor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataProvincial = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/${id}/?xCase=5`
      );
      setDataProvincial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataStudent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Student_club.php/${id}/?xCase=4`
      );
      setDataStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/${id}/?xCase=22`
      );
      setDataOther(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contrainer mt-28">
        {t_id === "1" ? (
          <div class="row mx-5 py-5">
            <div class="col-lg-3 mb-4">
              <img
                src={process.env.REACT_APP_API + `canidate/${DataHoR.picture}`}
                className="card-img-top object-fit-cover rounded shadow"
                width={"100px"}
                height={"290px"}
              />
            </div>
            <div class="col-lg-9 ">
              <div className="card w-100 detail-box shadow border-none">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-lg-3 col-se-12 d-flex flex-column justify-content-center border-se-r border-secondary`}
                    >
                      <div className="n-2 ps-3 pt-2 fw-bold text-black text-center">
                        <i class="fa-regular fa-rectangle-xmark text-dark icon-x" />{" "}
                        <div className="fs-1 text-center">
                          {DataHoR.number}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-9 self-center my-4">
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ชื่อ : {DataHoR.prefix}{" "}
                        {DataHoR.Representatives_firstname}{" "}
                        {DataHoR.Representatives_lastname}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        จังหวัด : เขต {DataHoR.constituency} จังหวัด{" "}
                        {DataHoR.province}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ประวัติจบการศึกษา : การศึกษา {DataHoR.educational}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        อีเมล : {DataHoR.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card w-100 detail-box my-3 shadow border-none">
                <div className="card-body">
                  <div className="row mt-4 mb-10">
                    <div className="col-sm-12 col-lg-2 sm:text-center">
                      <p className="text-black fw-bold fs-5">สโลแกน</p>
                    </div>
                    <div className="col-sm-12 col-lg-10 sm:text-center lg:text-start">
                      <p className="text-black-50 fs-5">{DataHoR.slogan}</p>
                    </div>
                  </div>
                  <div className="row mt-4 mb-4">
                    <div className="col-sm-12 col-lg-2 sm:text-center">
                      <p className="text-black fw-bold fs-5">นโยบาล</p>
                    </div>
                    <div className="col-sm-12 col-lg-10 sm:text-center lg:text-start">
                      <p className="text-black-50 ">{DataHoR.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : t_id === "2" ? (
          <div class="row mx-5 py-5">
            <div class="col-lg-3 mb-4">
              <img
                src={
                  process.env.REACT_APP_API +
                  `canidate/${DataProvincial.picture}`
                }
                className="card-img-top object-fit-cover rounded shadow"
                width={"100px"}
                height={"290px"}
              />
            </div>
            <div class="col-lg-9 ">
              <div className="card w-100 detail-box shadow border-none">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-lg-3 col-se-12 d-flex flex-column justify-content-center border-se-r border-secondary`}
                    >
                      <div className="n-2 ps-3 pt-2 fw-bold text-black text-center">
                        <i class="fa-regular fa-rectangle-xmark text-dark icon-x" />{" "}
                        <div className="fs-1 text-center">
                          {DataProvincial.number}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-9 self-center my-4">
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ชื่อ : {DataProvincial.prefix}{" "}
                        {DataProvincial.provincial_firstname}{" "}
                        {DataProvincial.provincial_lastname}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        จังหวัด : เขต {DataProvincial.constituency} จังหวัด{" "}
                        {DataProvincial.province}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ประวัติจบการศึกษา : การศึกษา{" "}
                        {DataProvincial.educational}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        อีเมล : {DataProvincial.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : t_id === "3" ? (
          <div class="row mx-5 py-5">
            <div class="col-lg-3 mb-4">
              <img
                src={
                  process.env.REACT_APP_API + `canidate/${DataStudent.picture}`
                }
                className="card-img-top object-fit-cover rounded shadow"
                width={"100px"}
                height={"290px"}
              />
            </div>
            <div class="col-lg-9 ">
              <div className="card w-100 detail-box shadow border-none">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-lg-3 col-se-12 d-flex flex-column justify-content-center border-se-r border-secondary`}
                    >
                      <div className="n-2 ps-3 pt-2 fw-bold text-black text-center">
                        <i class="fa-regular fa-rectangle-xmark text-dark icon-x" />{" "}
                        <div className="fs-1 text-center">
                          {DataStudent.number}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-9 self-center my-4">
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ชื่อ : {DataStudent.prefix}{" "}
                        {DataStudent.club_president_firstname}{" "}
                        {DataStudent.club_president_lastname}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        คณะ : {DataStudent.faculty}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        สาขา : {DataStudent.major}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        อีเมล : {DataStudent.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card w-100 detail-box my-3 shadow border-none">
                <div className="card-body">
                  <div className="row mt-4 mb-10">
                    <div className="col-sm-12 col-lg-2 sm:text-center">
                      <p className="text-black fw-bold fs-5">สโลแกน</p>
                    </div>
                    <div className="col-sm-12 col-lg-10 sm:text-center lg:text-start">
                      <p className="text-black-50 fs-5">{DataStudent.slogan}</p>
                    </div>
                  </div>
                  <div className="row mt-4 mb-4">
                    <div className="col-sm-12 col-lg-2 sm:text-center">
                      <p className="text-black fw-bold fs-5">นโยบาล</p>
                    </div>
                    <div className="col-sm-12 col-lg-10 sm:text-center lg:text-start">
                      <p className="text-black-50 ">{DataStudent.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : t_id === "4" ? (
          <div class="row mx-5 py-5">
            <div class="col-lg-3 mb-4">
              <img
                src={
                  process.env.REACT_APP_API + `canidate/${DataOther.picture}`
                }
                className="card-img-top object-fit-cover rounded shadow"
                width={"100px"}
                height={"290px"}
              />
            </div>
            <div class="col-lg-9 ">
              <div className="card w-100 detail-box shadow border-none">
                <div className="card-body">
                  <div className="row">
                    <div
                      className={`col-lg-3 col-se-12 d-flex flex-column justify-content-center border-se-r border-secondary`}
                    >
                      <div className="n-2 ps-3 pt-2 fw-bold text-black text-center">
                        <i class="fa-regular fa-rectangle-xmark text-dark icon-x" />{" "}
                        <div className="fs-1 text-center">
                          {DataOther.number}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-9 self-center my-4">
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ชื่อ : {DataOther.prefix}{" "}
                        {DataOther.register_other_fistname}{" "}
                        {DataOther.register_other_lastname}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        จังหวัด : เขต {DataOther.register_other_lastname}{" "}
                        จังหวัด{" "}
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        ประวัติจบการศึกษา : การศึกษา
                      </div>
                      <div className="n-2 ps-3 fw-bold text-black fs-5">
                        อีเมล :
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card w-100 detail-box my-3 shadow border-none">
                <div className="card-body">
                  <div className="row mt-4 mb-10">
                    <div className="col-sm-12 col-lg-2 sm:text-center">
                      <p className="text-black fw-bold fs-5">รายละเอียด</p>
                    </div>
                    <div className="col-sm-12 col-lg-10 sm:text-center lg:text-start">
                      <p className="text-black-50 fs-5">{DataOther.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
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
