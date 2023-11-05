import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import DataTable, { createTheme } from "react-data-table-component"; // import DataTable
import { checkTokenAndRedirect } from "../Component/authUtils"; // Update the import path
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const navigate = useNavigate();
  const [DataHOR, setDataHOR] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataStudent, setDataStudent] = useState([]);
  const [DataOther, setOther] = useState([]);
  const [DataVoter, setVoter] = useState([]);
  const [DataVoterDowHor, setVoterDowHor] = useState([]);
  const [DataVoterAddHor, setVoterAddHor] = useState([]);
  const [DataVoterDowPrc, setVoterDowPrc] = useState([]);
  const [DataVoterAddPrc, setVoterAddPrc] = useState([]);
  const [DataVoterDowClub, setVoterDowClub] = useState([]);
  const [DataVoterAddClub, setVoterAddClub] = useState([]);
  const [DataVoterDowOther, setVoterDowOther] = useState([]);
  const [DataVoterAddOther, setVoterAddOther] = useState([]);
  const [Switching, setSwitching] = useState(0);

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getDataCandidate_HOR();
    getDataCandidate_Provincial();
    getDataCandidate_Student();
    getDataOther();
    getDataVoter();
    //สส.
    getDataVoterDowHor();
    getDataVoterAddHor();
    //สจ.
    getDataVoterDowPrc();
    getDataVoterAddPrc();
    //สโมสร.
    getDataVoterDowClub();
    getDataVoterAddClub();
    //อื่นๆ.
    getDataVoterDowOther();
    getDataVoterAddOther();

  }, []);

  const switchItem = async (index) => {
    setSwitching(index);
    // console.log(Switching)
  };

  const getDataCandidate_HOR = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=0`
      );
      setDataHOR(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataCandidate_Provincial = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=2`
      );
      setDataProvincial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataCandidate_Student = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Student_club.php/?xCase=2`
      );
      setDataStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=16`
      );
      setOther(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoter = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=7`
      );
      setVoter(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //สส
  const getDataVoterDowHor = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=8`
      );
      setVoterDowHor(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterAddHor = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=9`
      );
      setVoterAddHor(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //สจ
  const getDataVoterDowPrc = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=11`
      );
      setVoterDowPrc(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterAddPrc = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=12`
      );
      setVoterAddPrc(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //สโม
  const getDataVoterDowClub = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=13`
      );
      setVoterDowClub(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterAddClub = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=14`
      );
      setVoterAddClub(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //สโม
  const getDataVoterDowOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=15`
      );
      setVoterDowOther(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterAddOther = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_user.php/?xCase=16`
      );
      setVoterAddOther(response.data);
      // console.log(response.data);
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
        background: "#C2C2C2",
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

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  }

  let labels = [];

  if (Switching === 0) {
    labels = DataHOR.map((item) => `เบอร์ที่ ${item.number} ${item.Representatives_firstname} ${item.Representatives_lastname} คะแนน: ${item.score} คิดเป็น: ${item.percentage}%`);
  } else if (Switching === 1) {
    labels = DataProvincial.map((item) => `เบอร์ที่ ${item.number} ${item.provincial_firstname} ${item.provincial_lastname} คะแนน: ${item.score} คิดเป็น: ${item.percentage}%`);
  } else if (Switching === 2) {
    labels = DataStudent.map((item) => `เบอร์ที่ ${item.number} ${item.club_president_firstname} ${item.club_president_lastname} คะแนน: ${item.score} คิดเป็น: ${item.percentage}%`);
  } else if (Switching === 3) {
    labels = DataOther.map((item) => `เบอร์ที่ ${item.number} ${item.register_other_fistname} ${item.register_other_lastname} คะแนน: ${item.score} คิดเป็น: ${item.percentage}%`);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        type: "doughnut",
        data:
          Switching == 0
            ? DataHOR.map((item) => item.score)
            : Switching == 1
              ? DataProvincial.map((item) => item.score)
              : Switching == 2
                ? DataStudent.map((item) => item.score)
                : Switching == 3
                  ? DataOther.map((item) => item.score)
                  : [],
        backgroundColor:
          Switching == 0
            ? Array(DataHOR.length)
              .fill(null)
              .map(() => getRandomColor())
            : Switching == 1
              ? Array(DataProvincial.length)
                .fill(null)
                .map(() => getRandomColor())
              : Switching == 2
                ? Array(DataStudent.length)
                  .fill(null)
                  .map(() => getRandomColor())
                : Switching == 3
                  ? Array(DataOther.length)
                    .fill(null)
                    .map(() => getRandomColor())
                  : [],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.formattedValue;
            const itemIndex = tooltipItem.dataIndex;
            let percentage_ = "";

            if (Switching === 0) {
              percentage_ = `${DataHOR[itemIndex].percentage}%`;
            } else if (Switching === 1) {
              percentage_ = `${DataProvincial[itemIndex].percentage}%`;
            } else if (Switching === 2) {
              percentage_ = `${DataStudent[itemIndex].percentage}%`;
            } else if (Switching === 3) {
              percentage_ = `${DataOther[itemIndex].percentage}%`;
            }

            return `คะแนน: ${value} คิดเป็น: ${percentage_}`;
          },
        },
        anchor: "center",
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="wrapper mb-5">
      <div className="row">
        <div className="col-2 me-4">
          <Sidebar />
        </div>
        <div className="col-9 ms-5 mb-5">
          <Navbar />
          <strong>
            <h1 className="text-center">ภาพรวม</h1>
          </strong>
          <div className="my-4">
            <div class="row d-flex justify-content-center">
              <div className="col-3">
                <div class="small-box bg-info">
                  <div class="inner">
                    {DataVoter.map((Data) => (
                      <h3>{Data.Total}</h3>
                    ))}
                    <p>จำนวนผู้โหวตทั้งหมด</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-user"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-center mx-auto">
              <div class="col-3">
                <div class="small-box bg-success">
                  <div class="inner">
                    {DataVoterAddHor.map((Data) => (
                      <h3>{Data == 0 ? 0 : `${Data.TotalA}`}</h3>
                    ))}
                    <p>จำนวนผู้ที่โหวต สส. แล้ว</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-success">
                  <div class="inner">
                    {DataVoterDowHor.map((Data) => (
                      <h3 className="text-white">{Data.TotalD}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่ยังไม่โหวต สส. </p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-warning">
                  <div class="inner">
                    {DataVoterAddPrc.map((Data) => (
                      <h3 className="text-white">{Data == 0 ? 0 : `${Data.TotalA}`}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่โหวต สจ. แล้ว</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-warning">
                  <div class="inner">
                    {DataVoterDowPrc.map((Data) => (
                      <h3 className="text-white">{Data.TotalD}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่ยังไม่โหวต สจ. </p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-danger">
                  <div class="inner">
                    {DataVoterAddClub.map((Data) => (
                      <h3 className="text-white">{Data == 0 ? 0 : `${Data.TotalA}`}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่โหวตสโมสรแล้ว</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-danger">
                  <div class="inner">
                    {DataVoterDowClub.map((Data) => (
                      <h3 className="text-white">{Data.TotalD}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่ยังไม่โหวตสโมสร</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-primary">
                  <div class="inner">
                    {DataVoterAddOther.map((Data) => (
                      <h3>{Data == 0 ? 0 : `${Data.TotalA}`}</h3>
                    ))}
                    <p>จำนวนผู้ที่โหวตอื่นๆ</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-check-circle"></i>
                  </div>
                </div>
              </div>

              <div class="col-3">
                <div class="small-box bg-primary">
                  <div class="inner">
                    {DataVoterDowOther.map((Data) => (
                      <h3 className="text-white">{Data.TotalD}</h3>
                    ))}
                    <p className="text-white">จำนวนผู้ที่ยังไม่โหวอื่นๆ</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-exclamation-circle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-3">
            <button
              className={`btn ${Switching === 0 ? "btn-secondary" : "btn-outline-secondary"
                }  mx-2`}
              onClick={() => switchItem(0)}
            >
              ผลสมาชิกสภาผู้แทนราษฎร
            </button>
            <button
              className={`btn ${Switching === 1 ? "btn-secondary" : "btn-outline-secondary"
                }  mx-2`}
              onClick={() => switchItem(1)}
            >
              ผลสมัครสมาชิกสภาจังหวัด
            </button>
            <button
              className={`btn ${Switching === 2 ? "btn-secondary" : "btn-outline-secondary"
                }  mx-2`}
              onClick={() => switchItem(2)}
            >
              ผลสมัครสมัครประธานสโมสร
            </button>
            <button
              className={`btn ${Switching === 3 ? "btn-secondary" : "btn-outline-secondary"
                }  mx-2`}
              onClick={() => switchItem(3)}
            >
              ผลอื่นๆ
            </button>
          </div>
          {Switching === 0 ? (
            <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมาชิกสภาผู้แทนราษฎร( สส. )</h3>
                </div>
                <div className="card-body">
                  <div className="card-body chart-container ">
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          ) : Switching === 1 ? (
            <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมัครสมาชิกสภาจังหวัด( สจ. )</h3>
                </div>
                <div className="card-body">
                  <div className="card-body chart-container ">
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          ) : Switching === 2 ? (
            <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมัครสมัครประธานสโมสร</h3>
                </div>
                <div className="card-body">
                  <div className="card-body chart-container ">
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          ) : Switching === 3 ? (
            <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมัครสมัครประธานสโมสร</h3>
                </div>
                <div className="card-body">
                  <div className="card-body chart-container ">
                    <Pie data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
