import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import DataTable, { createTheme } from 'react-data-table-component'; // import DataTable
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";
export default function Other_Topic() {
    const navigate = useNavigate();
    const [Datas, setDatas] = useState([]);
    const [Datas_, setDatas_] = useState([]);
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
        getData_();
    }, []);
    
    const getData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_other.php/?xCase=20`
            );
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const getData_ = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_other.php/${id}/?xCase=15`
            );
            setDatas_(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = (id_o) => {
        axios
            .post(process.env.REACT_APP_API + `api_other.php/${id_o}/?xCase=4`)
            .then(function (response) {
                console.log(response.data);
                getData();
            });
    };

    //Search
    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        const filteredResults = Datas.filter(Data =>
            Data.register_other_fistname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Data.register_other_lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchTerm(searchTerm);
        setSearchResults(filteredResults);
    };

    // sweetalert2
    function showAlertDelete(id_o) {
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
                deleteData(id_o)
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
        { name: 'ชื่อ', cell: (row) => `${row.register_other_fistname} ${row.register_other_lastname}`, sortable: true },
        { name: 'รายละเอียด', selector: 'detail', sortable: true },
        {
            name: 'จัดการ',
            cell: (row) => (
                <div className='d-flex align-items-center'>
                    <Link to={`${row.register_other_id}/Edit_other`}>
                        <button className='btn btn-link'>
                            <i className='far fa-edit wa text-warning fs-5'></i>
                        </button>
                    </Link>
                    <button className='btn btn-link' onClick={() => showAlertDelete(row.register_other_id)}>
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
                    <div className="container">
                        <div className='fs-2 fw-bold text-center my-3'>หัวข้อ{Datas_.toppic_name}</div>
                        <div className="card-type col-10 mx-lg mx-auto">
                            <div className='text-start'><Link to={`${Datas_.toppic_id}/Insert_other`}><button className='btn btn-info mb-lg-3'>เพิ่มข้อมูล</button></Link></div>
                            <div className="card">
                                <div class="card-header">
                                    <h3 class="card-title">ข้อมูลหัวข้อ</h3>
                                </div>
                                <div class="card-body">
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
            </div>
        </div>
    )
}