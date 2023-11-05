import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable, { createTheme } from "react-data-table-component"; // import DataTable
import { checkTokenAndRedirect } from "../Component/authUtils"; // Update the import path
export default function Other() {
  const navigate = useNavigate();
  const [Datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=1`
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Search
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const filteredResults = Datas.filter((Data) =>
      Data.toppic_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchTerm(searchTerm);
    setSearchResults(filteredResults);
  };

  const deleteData = (id) => {
    axios
      .post(process.env.REACT_APP_API + `api_other.php/${id}/?xCase=7`)
      .then(function (response) {
        console.log(response.data);
        getData();
      });
  };

  // sweetalert2
  function showAlertDelete(id) {
    Swal.fire({
      title: "ยืนยันที่จะลบ?",
      text: "ถ้าลบไปแล้วข้อมูลไม่สามารถนำกลับคืนมาได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          text: "คุณได้ทำการยืนยันลบข้อมูลเรียบร้อยแล้ว!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

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

  const columns = [
    {
      name: "ลำดับ",
      cell: (row, index) => <div className="mx-auto">{index + 1}</div>,
    },
    { name: "หัวข้อ(เรื่อง)", selector: "toppic_name", sortable: true },
    {
      name: "จัดการ",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to={`${row.toppic_id}/Other_Topic`}>
            {" "}
            <button className="btn btn-link">
              <i className="fas fa-file-alt fs-5"></i>
            </button>
          </Link>
          <button
            className="btn btn-link"
            onClick={() => showAlertDelete(row.toppic_id)}
          >
            <i className="fa fa-trash text-danger fs-5"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Navbar />
          <div className="fs-2 fw-bold text-center my-3">
            หัวข้อการโหวตอื่นๆ
          </div>
          <div className="card-type col-10 mx-lg mx-auto">
            <Link to="/Insert_other_Topic">
              <button className="btn btn-info mb-lg-3">
                เพิ่มหัวข้อการโหวต
              </button>
            </Link>
            <div class="card">
              <div class="card-header">หัวข้อการโหวตอื่นๆ</div>
              <div class="card-body">
                <div className="d-md-flex justify-content-md-end">
                  <input
                    type="text"
                    className="form-control col-4 me-4 mt-4"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="ค้นหา..."
                  />
                </div>
                <div className="card-body text-center">
                  <DataTable
                    title=""
                    columns={columns}
                    data={searchTerm ? searchResults : Datas}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
