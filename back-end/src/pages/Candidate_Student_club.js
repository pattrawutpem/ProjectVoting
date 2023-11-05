import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from '../Component/Navbar';
import Sidebar from '../Component/Sidebar';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component'; // import DataTable
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";

export default function Candidate() {
    const navigate = useNavigate();
    const [Datas, setDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_Student_club.php/?xCase=2`);
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = (id) => {
        axios
            .post(process.env.REACT_APP_API + `api_Student_club.php/${id}/?xCase=3`)
            .then(function (response) {
                console.log(response.data);
                getData();
            });
    };

    //Search
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;

        // ตรวจสอบว่า Datas ถูกกำหนดค่าและไม่ว่าง
        if (Datas && Datas.length > 0) {
            const filteredResults = Datas.filter((Data) =>
                (Data.club_president_firstname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.club_president_lastname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.province || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.constituency || '').toLowerCase().includes(searchTerm.toLowerCase())
            );

            setSearchTerm(searchTerm);
            setSearchResults(filteredResults);
        } else {
            // จัดการกรณีที่ Datas เป็น undefined หรือว่าง
            setSearchTerm(searchTerm);
            setSearchResults(Datas); // ใช้ Datas เมื่อไม่มีคำค้นหา
        }
    };

    // sweetalert2
    function showAlertDelete(id) {
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
                deleteData(id)
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
        { name: 'เบอร์ที่', selector: 'number', sortable: true, headerCell: () => <div className="mx-auto"></div> },
        { name: 'รูป', cell: (row) => <img src={process.env.REACT_APP_API + `canidate/${row.picture}`} className='rounded object-fit-cover my-2' width='80px' height='80px' /> },
        { name: 'ชื่อ', cell: (row) => `${row.prefix} ${row.club_president_firstname} ${row.club_president_lastname}`, sortable: true },
        { name: 'คณะ/สำนัก', selector: 'faculty', sortable: true },
        { name: 'สาขา', selector: 'major', sortable: true },
        { name: 'เบอร์โทร', selector: 'phone', sortable: true },
        {
            name: 'จัดการ',
            cell: (row) => (
                <div className='d-flex align-items-center'>
                    <Link to={`${row.club_president_id}/Personal_Student`}>
                        <button className='btn btn-link'>
                            <i className='fas fa-address-card fs-5'></i>
                        </button>
                    </Link>
                    <button className='btn btn-link' onClick={() => showAlertDelete(row.club_president_id)}>
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
                    <strong><h1 className='text1 text-center'>ประธานสโมสร</h1></strong>
                    <div className="card-type col-10 mx-lg mx-auto">
                        <Link to="/insert_student_club"><button className='btn btn-info mb-lg-3'>เพิ่มข้อมูล</button></Link>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">ประธานสโมสร</h3>
                            </div>
                            <div className="d-md-flex justify-content-md-end">
                                <input type="text" className="form-control col-4 me-4 mt-4" value={searchTerm} onChange={handleSearchChange} placeholder="ค้นหา..." />
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
                                    className='rounded-3'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
