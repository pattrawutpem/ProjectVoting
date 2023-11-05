import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Swal from "sweetalert2";
import { checkTokenAndRedirect } from "../component/authUtils"; // Update the import path
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Vote() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );
  const contract = new web3.eth.Contract(
    contractABI,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  const storedToken = localStorage.getItem("Token");
  const Token = JSON.parse(storedToken);
  const id_ = Token.voter_id;

  const [DataStudent, setDataStudent] = useState([]);
  const [DataHoR, setDataHor] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataOther, setDataOther] = useState([]);
  const { id_v } = useParams();
  const navigate = useNavigate();
  const [DataToppic, setDataToppic] = useState([]);
  const [Switching, setSwitching] = useState();
  const [user, setuser] = useState([]);

  const [candidates, setCandidates] = useState([]);
  const [count, setCount] = useState(60);
  const [DataDeclare, setDataDeclare] = useState([]);

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString().slice(0);
  const formattedTime = currentDate.toLocaleTimeString(undefined, {
    hour12: false,
  });
  const dateTime = `${year}/${month}/${day} ${formattedTime}`;

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getDataStudent();
    getDataHoR();
    getDataProvincial();
    getDataOther();
    getuser();
    getAllCandidates();
    getDataToppic();
    timeCountDown();
    getDataDeclare();
    checkDate();
  }, []);

  const checkDate = async () => {
    if (year == DataDeclare.year) {
      if (month <= DataDeclare.month) {
        if (day <= DataDeclare.day) {
          console.log("OK");
        }
      }
    }
  }

  const timeCountDown = () => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        console.log(newCount);

        if (newCount <= 0) {
          clearInterval(interval);
          navigate("/typeVote");
        }

        return newCount;
      });
    }, 1500);

    return () => {
      clearInterval(interval);
    };
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

  const getDataDeclare = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_declare.php/${id_v}/?xCase=7`
      );
      setDataDeclare(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const switchItem = async (value) => {
    setSwitching(value);
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

  //โหวตและอัพเดทสถานะ
  const voteHor = (id) => {
    axios
      .post(
        process.env.REACT_APP_API +
        `api_House_of_Representatives.php/${id}/${id_}/?xCase=8`
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  const voteProvincial = (id) => {
    axios
      .post(
        process.env.REACT_APP_API +
        `api_Provincial_Council.php/${id}/${id_}/?xCase=8`
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  const voteStudent = (id) => {
    axios
      .post(
        process.env.REACT_APP_API + `api_Student_club.php/${id}/${id_}/?xCase=8`
      )
      .then(function (response) {
        console.log(response.data);
      });
  };

  const voteOther = (id) => {
    axios
      .post(process.env.REACT_APP_API + `api_other.php/${id}/${id_}/?xCase=8`)
      .then(function (response) {
        console.log(response.data);
      });
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

  //เอาไว้เช็ค status
  const getuser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=0`
      );
      setuser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (id, index) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No Ethereum accounts selected.");
      }

      const dataindex = parseInt(index);

      const txParams = {
        from: accounts[0],
        to: contract.options.address,
        data: contract.methods.vote(dataindex).encodeABI(),
        gas: "100000",
        gasPrice: "20",
      };

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams],
      });

      Swal.fire({
        title: "โหวตสำเสร็จ",
        text: "คุณได้ทำโหวตสำเสร็จเรียบร้อยแล้ว!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });

      if (id_v == 1) {
        voteHor(id);
      } else if (id_v == 2) {
        voteProvincial(id);
      } else if (id_v == 3) {
        voteStudent(id);
      } else if (id_v == 4) {
        voteOther(id);
      }
    } catch (error) {
      console.error("Failed to cast a vote: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-28">
        <div className="text-center fs-3 fw-bold color theme mt-5">
          <h1>เลือกโหวตผู้สมัคร</h1>
          <div className="text-end fs-2"><i class="fa-sharp fa-light fa-clock"></i> {formattedTime}</div>
          <div className="col-lg-3">
            <select
              className="form-select"
              onChange={(e) => switchItem(parseInt(e.target.value))}
              value={Switching}
              aria-label="Default select example"
              hidden={id_v == 4 ? false : true}
            >
              <option disabled>เลือกหัวข้อ</option>
              {DataToppic.map((DataToppic) => (
                <option key={DataToppic.toppic_id} value={DataToppic.toppic_id}>
                  {DataToppic.toppic_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {id_v == 1 ? (
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
                    key={DataHoR.id}
                  >
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
                        {filteredCandidates.map((candidate) => (
                          <div className="text-center" key={candidate.index}>
                            {user.map((user) => {
                              if (dateTime <= DataDeclare.end_date1) {
                                if (user.voter_id == Token.voter_id) {
                                  return (
                                    <button
                                      className="btn btn-outline-info bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50"
                                      onClick={() =>
                                        handleVote(
                                          DataHoR.Representatives_id,
                                          candidate.index
                                        )
                                      }
                                      disabled={user.status_vote_hor !== 0}
                                      type="button"
                                    >
                                      โหวต
                                    </button>
                                  );
                                } else {
                                  return "";
                                }
                              } else if (user.status_vote_clp !== 0 ) {
                              return <p key={DataStudent.id} className="text-danger fw-bold">*หมดเวลาลงคะแนน*</p>;
                              }
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : id_v == 2 ? (
          <div className="row mt-4">
            {DataProvincial.map((DataProvincial, index) => {
              const filteredCandidates = candidates.filter(
                (candidate) =>
                  candidate.number == DataProvincial.number &&
                  candidate.candidateType == DataProvincial.type_id
              );
              if (filteredCandidates.length > 0) {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 my-2"
                    key={DataProvincial.id}
                  >
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
                        {filteredCandidates.map((candidate) => (
                          <div className="text-center" key={candidate.index}>
                            {user.map((user) => {
                              if (dateTime <= DataDeclare.end_date1) {
                                if (user.voter_id == Token.voter_id) {
                                  return (
                                    <button
                                      className="btn btn-outline-info bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50"
                                      onClick={() =>
                                        handleVote(
                                          DataProvincial.provincial_id,
                                          candidate.index
                                        )
                                      }
                                      disabled={user.status_vote_prc !== 0}
                                      type="button"
                                    >
                                      โหวต
                                    </button>
                                  );
                                } else {
                                  return "";
                                }
                              } else if (user.status_vote_clp !== 0 ) {
                              return <p key={DataStudent.id} className="text-danger fw-bold">*หมดเวลาลงคะแนน*</p>;
                              }
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : id_v == 3 ? (
          <div className="row mt-4">
          {DataStudent.map((DataStudent, index) => {
            const filteredCandidates = candidates.filter(
              (candidate) =>
                candidate.number == DataStudent.number &&
                candidate.candidateType == DataStudent.type_id
            );
        
            if (filteredCandidates.length > 0) {
              return (
                <div
                  className="col-12 col-md-6 col-lg-3 my-2"
                  key={DataStudent.id}
                >
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
                      {filteredCandidates.map((candidate) => (
                        <div className="text-center" key={candidate.index}>
                          {user.map((user) => {
                            if (dateTime <= DataDeclare.end_date1) {
                              if (user.voter_id == Token.voter_id) {
                                return (
                                  <button
                                    className="btn btn-outline-info bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50"
                                    onClick={() =>
                                      handleVote(
                                        DataStudent.club_president_id,
                                        candidate.index
                                      )
                                    }
                                    disabled={user.status_vote_clp !== 0}
                                    type="button"
                                  >
                                    โหวต
                                  </button>
                                );
                              } else {
                                return "";
                              }
                            } else if (user.status_vote_clp !== 0 ) {
                              return <p key={DataStudent.id} className="text-danger fw-bold">*หมดเวลาลงคะแนน*</p>;
                            }
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        ) : id_v == 4 ? (
          <div className="row mt-4">
            {DataOther.map((DataOther) => {
              const filteredCandidates = candidates.filter(
                (candidate) =>
                  candidate.number == DataOther.number &&
                  candidate.candidateType == DataOther.type_id
              );

              if (filteredCandidates.length > 0) {
                return (
                  <div
                    className="col-12 col-md-6 col-lg-3 my-2"
                    key={DataOther.id}
                  >
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
                        {filteredCandidates.map((candidate) => (
                          <div className="text-center" key={candidate.index}>
                            {user.map((user) => {
                              if (dateTime <= DataDeclare.end_date1) {
                                if (user.voter_id == Token.voter_id) {
                                  return (
                                    <button
                                      className="btn btn-outline-info bg-gradient-to-tr hover:from-blue-600 hover:to-blue-400 fs-6 w-50"
                                      onClick={() =>
                                        handleVote(
                                          DataOther.register_other_id,
                                          candidate.index
                                        )
                                      }
                                      disabled={user.status_vote_other !== 0}
                                      type="button"
                                    >
                                      โหวต
                                    </button>
                                  );
                                } else {
                                  return "";
                                }
                              } else if (user.status_vote_clp !== 0 ) {
                              return <p key={DataStudent.id} className="text-danger fw-bold">*หมดเวลาลงคะแนน*</p>;
                              }
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
