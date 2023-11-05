import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component'; // import DataTable
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function VoterManage() {

    const [Datas, setDatas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [Switching, setSwitching] = useState(1);

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
    }, []);

    const switchItem = async (value) => {
        setSwitching(value);
    };

    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_user.php/?xCase=0`);
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = (id) => {
        axios.post(process.env.REACT_APP_API + `api_user.php/${id}/?xCase=1`)
            .then(function (response) {
                console.log(response.data);
                getData();
            });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(process.env.REACT_APP_API + 'api_user.php/?xCase=6', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('../VoterManage');
        } catch (error) {
            console.error('Error uploading CSV file:', error);
        }
    };

    //Search
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;

        // ตรวจสอบว่า Datas ถูกกำหนดค่าและไม่ว่าง
        if (Datas && Datas.length > 0) {
            const filteredResults = Datas.filter((Data) =>
                (Data.voter_firstname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.voter_lastname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.Gender || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (Data.type_name || '').toLowerCase().includes(searchTerm.toLowerCase())
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
        // { name: 'ลำดับ', selector: 'voter_id', sortable: true, headerCell: () => <div className="mx-auto"></div> },
        { name: 'ชื่อ', cell: (row) => `${row.voter_firstname} ${row.voter_lastname}`, sortable: true },
        { name: 'เพศ', selector: 'Gender', sortable: true },
        { name: 'รหัสบัตรประชาชน', selector: 'idCard', sortable: true },
        { name: 'เบอร์โทร', selector: 'phone', sortable: true },
        { name: 'อีเมล', selector: 'email', sortable: true },
        {
            name: 'จัดการ',
            cell: (row) => (
                <div className='d-flex align-items-center'>
                    <Link to={`${row.voter_id}/Edit_voter`}>
                        <button className='btn btn-link'>
                            <i className='far fa-edit wa text-warning fs-5'></i>
                        </button>
                    </Link>
                    <button className='btn btn-link' onClick={() => showAlertDelete(row.voter_id)}>
                        <i className='fa fa-trash text-danger fs-5'></i>
                    </button>
                </div>
            ),
        },
    ];
    return (
        < div >
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <Navbar />
                    <strong><h1 className='text1 text-center'>ผู้มีสิทธิ์โหวต</h1></strong>
                    <div className="card-type col-10 mx-lg mx-auto mb-5">
                        <div className='my-3'>
                            <Link to="/Insert_voter"><button className='btn btn-info mb-lg-3'>เพิ่มข้อมูล</button></Link>
                            <form onClick={handleUpload} enctype="multipart/form-data">
                                <div className='row'>
                                    <div className="col-10">
                                        <input className='form-control' type="file" name='file[]' accept=".csv" multiple onChange={handleFileChange} />
                                    </div>
                                    <div className="col-2">
                                        <button className='btn btn-success w-100' type='submit'>Upload CSV</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">ผู้มีสิทธิ์โหวต</h3>
                            </div>
                            <div className="d-md-flex">
                                <div className="col-4 mt-4 me-3 mx-3 text-start">
                                    <label htmlFor="">ผู้มีสิทธิ์โหวต</label>
                                    <select
                                        class="form-select"
                                        onChange={(e) => switchItem(parseInt(e.target.value))}
                                        aria-label="Default select example"
                                    >
                                        <option selected disabled>
                                            เลือกประเภทผู้มีสิทธิ์โหวต
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
                                    data={searchTerm ? searchResults : Datas.filter((item) => {
                                        return (
                                            (Switching == 4 && item.status_vote_other == 0) || // เลือกสถานะ 'other'
                                            (Switching == 3 && item.status_vote_clp == 0) || // เลือกสถานะ 'clp'
                                            (Switching == 2 && item.status_vote_prc == 0) || // เลือกสถานะ 'prc'
                                            (Switching == 1 && item.status_vote_hor == 0) || // เลือกสถานะ 'hor'
                                            (Switching == 0 ) // ไม่เลือกสถานะ
                                        ) && (searchTerm == '' || (item.someField && item.someField.includes(searchTerm)));
                                    })}
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

