import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import DataTable, { createTheme } from 'react-data-table-component'; // import DataTable
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";

export default function Declare() {

    const navigate = useNavigate();
    const [DataDeclare, setDataDeclare] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [Switching, setSwitching] = useState(0);

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getDataDeclare();
    }, []);

    const switchItem = async (value) => {
        setSwitching(value);
    };

    const getDataDeclare = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_declare.php/?xCase=0`
            );
            setDataDeclare(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const deleteData = (id) => {
        axios
            .post(process.env.REACT_APP_API + `api_declare.php/${id}/?xCase=3`)
            .then(function (response) {
                console.log(response.data);
                getDataDeclare();
            });
    };

    //Search
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = DataDeclare.filter(Data =>
            Data.toppic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Data.start_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Data.end_date.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchTerm(searchTerm);
        setSearchResults(filteredResults);
    };

    // sweetalert2
    function showAlertDelete(id_) {
        Swal.fire({
            title: 'ยืนยันที่จะลบ?',
            text: "ถ้าลบไปแล้วข้อมูลไม่สามารถนำกลับคืนมาได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id_)
                Swal.fire({
                    title: 'ลบข้อมูลสำเร็จ',
                    text: "คุณได้ทำการยืนยันลบข้อมูลเรียบร้อยแล้ว!",
                    showConfirmButton: false,
                    timer: 1500
                }
                )
            }
        })
    }

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
                background: '#C8ECFD'
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

    const columns = [
        { name: 'หัวเรื่อง', selector: 'toppic', sortable: true, headerCell: () => <div className="mx-auto"></div> },
        { name: 'เริ่มวันที่', selector: 'start_date', sortable: true },
        { name: 'สิ้นสุดวันที่', selector: 'end_date', sortable: true },
        {
            name: 'จัดการ',
            cell: (row) => (
                <div className='d-flex align-items-center'>
                    <Link to={`${row.declare_id}/Personal_declare`}>
                        <button className='btn btn-link'>
                            <i className='fas fa-address-card fs-5'></i>
                        </button>
                    </Link>
                    <button className='btn btn-link' onClick={() => showAlertDelete(row.declare_id)}>
                        <i className='fa fa-trash text-danger fs-5'></i>
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
                    <strong><h1 className='text1 text-center'>ข้อมูลประกาศ</h1></strong>
                    <div className="card-type col-10 mx-lg mx-auto">
                        <Link to="/Insert_declare"><button className='btn btn-info mb-lg-3'>เพิ่มข้อมูล</button></Link>
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">ข้อมูลประกาศ</h3>
                            </div>
                            <div class="card-body">
                                <div className="d-md-flex">
                                    <div className="col-4 mt-4 me-3 mx-3 text-start">
                                        <label htmlFor="">เลือกประเภทประกาศ</label>
                                        <select
                                            class="form-select"
                                            onChange={(e) => switchItem(parseInt(e.target.value))}
                                            aria-label="Default select example"
                                        >
                                            <option selected disabled>
                                                เลือกประเภทประกาศ
                                            </option>
                                            <option value={1}>สมาชิกสภาผู้แทนราษฎร( สส. )</option>
                                            <option value={2}>สมาชิกสภาจังหวัด( สจ. )</option>
                                            <option value={3}>ประธานสโมสร</option>
                                            <option value={4}>อื่นๆ</option>
                                        </select>
                                    </div>
                                    <div className="col-4 me-4 mt-4 ">
                                        <label htmlFor="">ค้นหา</label>
                                        <input type="text" className="form-control" value={searchTerm} onChange={handleSearchChange} placeholder="ค้นหา..." />
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <DataTable
                                        title=""
                                        columns={columns}
                                        data={searchTerm ? searchResults : DataDeclare.filter((item) => {
                                            // กรองข้อมูลตามประเภทที่ผู้ใช้เลือก
                                            if (Switching == 0) {
                                                return DataDeclare;
                                            } else {
                                                return (
                                                    item.type_id == Switching &&
                                                    (searchTerm == '' || (item.someField && item.someField.includes(searchTerm)))
                                                );
                                            }
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
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
