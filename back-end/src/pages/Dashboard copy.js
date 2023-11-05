import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import DataTable, { createTheme } from 'react-data-table-component'; // import DataTable
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const [DataHOR, setDataHOR] = useState([]);
  const [DataProvincial, setDataProvincial] = useState([]);
  const [DataStudent, setDataStudent] = useState([]);
  const [DataOther, setOther] = useState([]);
  const [DataVoter, setVoter] = useState([]);
  const [DataVoterDow, setVoterDow] = useState([]);
  const [DataVoterAdd, setVoterAdd] = useState([]);
  const [Switching, setSwitching] = useState([]);

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getDataCandidate_HOR();
    getDataCandidate_Provincial();
    getDataCandidate_Student();
    getDataOther();
    getDataVoter();
    getDataVoterDow();
    getDataVoterAdd();

  }, []);

  const switchItem = async (index) => {
    setSwitching(index);
    // console.log(Switching)
  }

  const getDataCandidate_HOR = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_House_of_Representatives.php/?xCase=0`);
      setDataHOR(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataCandidate_Provincial = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=2`);
      setDataProvincial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataCandidate_Student = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_Student_club.php/?xCase=2`);
      setDataStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataOther = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_other.php/?xCase=13`);
      setOther(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoter = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_user.php/?xCase=7`);
      setVoter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterDow = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_user.php/?xCase=8`);
      setVoterDow(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataVoterAdd = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + `api_user.php/?xCase=9`);
      setVoterAdd(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px',

      },
    },
    headCells: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#C2C2C2'
      },
    },
    cells: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },

  };

  createTheme('solarized', {
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
    background: {
      default: '#F2F3F7',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

  const columnsHOR = [
    { name: 'เบอร์ที่', selector: 'number', sortable: true, headerCell: () => <div className="mx-auto"></div> },
    { name: 'รูป', cell: (row) => <img src={process.env.REACT_APP_API + `canidate/${row.picture}`} className='rounded object-fit-cover my-2' width='80px' height='80px' /> },
    { name: 'ชื่อ', cell: (row) => `${row.Representatives_firstname} ${row.Representatives_lastname}`, sortable: true },
    { name: 'คะแนน', selector: 'score', sortable: true },
  ];

  const columnsProvincial = [
    { name: 'เบอร์ที่', selector: 'number', sortable: true, headerCell: () => <div className="mx-auto"></div> },
    { name: 'รูป', cell: (row) => <img src={process.env.REACT_APP_API + `canidate/${row.picture}`} className='rounded object-fit-cover my-2' width='80px' height='80px' /> },
    { name: 'ชื่อ', cell: (row) => `${row.provincial_firstname} ${row.provincial_lastname}`, sortable: true },
    { name: 'จังหวัด', selector: 'province', sortable: true },
    { name: 'เขตพื้นที่', selector: 'constituency', sortable: true },
  ];

  const columnsStudent = [
    { name: 'เบอร์ที่', selector: 'number', sortable: true, headerCell: () => <div className="mx-auto"></div> },
    { name: 'รูป', cell: (row) => <img src={process.env.REACT_APP_API + `canidate/${row.picture}`} className='rounded object-fit-cover my-2' width='80px' height='80px' /> },
    { name: 'ชื่อ', cell: (row) => `${row.club_president_firstname} ${row.club_president_lastname}`, sortable: true },
    { name: 'คณะ/สำนัก', selector: 'faculty', sortable: true },
    { name: 'สาขา', selector: 'major', sortable: true },
    { name: 'เบอร์โทร', selector: 'phone', sortable: true },
  ];

  const columnsOther = [
    { name: 'หัวข้อ(เรื่อง)', selector: 'toppic_name', sortable: true },
    { name: 'เบอร์', selector: 'number', sortable: true, headerCell: () => <div className="mx-auto"></div> },
    { name: 'รูป', cell: (row) => <img src={process.env.REACT_APP_API + `canidate/${row.picture}`} className='rounded object-fit-cover my-2' width='80px' height='80px' /> },
    { name: 'ชื่อ', cell: (row) => `${row.register_other_fistname} ${row.register_other_lastname}`, sortable: true },
    { name: 'คะแนน', selector: 'score', sortable: true },
  ];

  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Navbar />
          <strong><h1 className='text-center'>ภาพรวม</h1></strong>
          <div class="row d-flex justify-content-center mx-auto">
            <div class="col-lg-3 col-4">
              <div class="small-box bg-info">
                <div class="inner">
                  {DataVoter.map((Data, key) => (
                    <h3>{Data.Total}</h3>
                  ))}
                  <p>จำนวนผู้ใช้ทั้งหมด</p>
                </div>
                <div class="icon">
                  <i class="fas fa-user"></i>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-4">
              <div class="small-box bg-success">
                <div class="inner">
                  {DataVoterAdd.map((Data, key) => (
                    <h3>{Data === 0 ? 0 : `${Data.TotalA}`}</h3>
                  ))}
                  <p>จำนวนผู้ที่โหวตแล้ว</p>
                </div>
                <div class="icon">
                  <i class="fas fa-check-circle"></i>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-4">
              <div class="small-box bg-warning">
                <div class="inner">
                  {DataVoterDow.map((Data, key) => (
                    <h3 className="text-white">{Data.TotalD}</h3>
                  ))}
                  <p className="text-white">จำนวนผู้ที่ยังไม่โหวต</p>
                </div>
                <div class="icon">
                  <i class="fas fa-exclamation-circle"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className={`btn ${Switching === 0 ? 'btn-secondary' : 'btn-outline-secondary'}  mx-2`} onClick={() => switchItem(0)}>ผลสมาชิกสภาผู้แทนราษฎร</button>
            <button className={`btn ${Switching === 1 ? 'btn-secondary' : 'btn-outline-secondary'}  mx-2`} onClick={() => switchItem(1)}>ผลสมัครสมาชิกสภาจังหวัด</button>
            <button className={`btn ${Switching === 2 ? 'btn-secondary' : 'btn-outline-secondary'}  mx-2`} onClick={() => switchItem(2)}>ผลสมัครสมัครประธานสโมสร</button>
            <button className={`btn ${Switching === 3 ? 'btn-secondary' : 'btn-outline-secondary'}  mx-2`} onClick={() => switchItem(3)}>ผลอื่นๆ</button>
          </div>
          {(Switching === 0) ?
            <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมาชิกสภาผู้แทนราษฎร( สส. )</h3>
                </div>
                <div className="card-body">
                  <div className="card-body text-center">
                    <DataTable
                      title=""
                      columns={columnsHOR}
                      data={DataHOR}
                      theme="solarized"
                      customStyles={customStyles}
                      pagination
                      paginationPerPage={5}
                      responsive
                      highlightOnHover
                      pointerOnHover
                      noHeader
                      className='rounded-3'
                    />
                  </div>
                </div>
              </div>
            </div> : (Switching === 1) ? <div className="card-type col-9 mx-auto my-2">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ผลสมัครสมาชิกสภาจังหวัด( สจ. )</h3>
                </div>
                <div className="card-body">
                  <div className="card-body text-center">
                    <DataTable
                      title=""
                      columns={columnsProvincial}
                      data={DataProvincial}
                      theme="solarized"
                      customStyles={customStyles}
                      pagination
                      paginationPerPage={5}
                      responsive
                      highlightOnHover
                      pointerOnHover
                      noHeader
                      className='rounded-3'
                    />
                  </div>
                </div>
              </div>
            </div>
              : (Switching === 2) ? <div className="card-type col-9 mx-auto my-2">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ผลสมัครสมัครประธานสโมสร</h3>
                  </div>
                  <div className="card-body">
                    <div className="card-body text-center">
                      <DataTable
                        title=""
                        columns={columnsStudent}
                        data={DataStudent}
                        theme="solarized"
                        customStyles={customStyles}
                        pagination
                        paginationPerPage={5}
                        responsive
                        highlightOnHover
                        pointerOnHover
                        noHeader
                        className='rounded-3'
                      />
                    </div>
                  </div>
                </div>
              </div> : (Switching === 3) ? <div className="card-type col-9 mx-auto my-2">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ผลสมัครสมัครประธานสโมสร</h3>
                  </div>
                  <div className="card-body">
                    <div className="card-body text-center">
                      <DataTable
                        title=""
                        columns={columnsOther}
                        data={DataOther}
                        customStyles={customStyles}
                        theme="solarized"
                        pagination
                        paginationPerPage={5}
                        responsive
                        highlightOnHover
                        pointerOnHover
                        noHeader
                        className='rounded-3'
                      />
                    </div>
                  </div>
                </div>
              </div> : <div className="card-type col-9 mx-auto my-2">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ผลสมาชิกสภาผู้แทนราษฎร( สส. )</h3>
                  </div>
                  <div className="card-body">
                    <div className="card-body text-center">
                      <DataTable
                        title=""
                        columns={columnsHOR}
                        data={DataHOR}
                        theme="solarized"
                        customStyles={customStyles}
                        pagination
                        paginationPerPage={5}
                        responsive
                        highlightOnHover
                        pointerOnHover
                        noHeader
                        className='rounded-3'
                      />
                    </div>
                  </div>
                </div>
              </div>}
        </div>
      </div>
    </div >
  )
}
