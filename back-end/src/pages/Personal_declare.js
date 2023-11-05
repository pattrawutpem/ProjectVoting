import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Personal_declare() {

    const [Datas, setDatas] = useState([]);
    const [Datas_type, setDatas_type] = useState([]);
    const { id } = useParams();
    const [isChecked, setisChecked] = useState(true);
    const navigate = useNavigate();

    const editChange = () => {
        setisChecked(!isChecked);
    }

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
        getDatas_type();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_declare.php/${id}/?xCase=1`
            );
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDatas(values => ({ ...values, [name]: value }));
    }

    const getDatas_type = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_declare.php/?xCase=6`
            );
            setDatas_type(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('toppic', Datas.toppic);
        formData.append('detail', Datas.detail);
        formData.append('start_date', Datas.start_date);
        formData.append('end_date', Datas.end_date);
        formData.append('type_id', Datas.type_id);

        axios.post(process.env.REACT_APP_API + `api_declare.php/${id}/?xCase=4`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate('../Declare');
            showAlertSubmit();
        });
    }
    // sweetalert2
    const showAlertSubmit = () => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'บันทึกเสร็จสิ้น',
            showConfirmButton: false,
            timer: 2000
        })
    };

  return (
    <div>
    <div className="row">
        <div className="col-2">
            <Sidebar />
        </div>
        <div className="col-10">
            <Navbar />
            <div className="card-type col-9 mx-lg mt-3 mx-auto mb-5">
                <div class="card">
                    <div class="card-header">
                        <strong><h4 class="text-center">{isChecked ? 'รายละเอียด' : 'แก้ไข'}ข้อมูลของ {Datas.club_president_firstname} {Datas.club_president_lastname}</h4></strong>
                    </div>
                    <div class="card-body">
                        <div class="row row-cols-4">
                        <div class="col-6">
                            <label >หัวเรื่อง</label>
                                <input type="text" class="form-control" name='toppic' value={Datas.toppic} onChange={handleChange} disabled={isChecked} />
                            </div>
                            <div className="col-6">
                                <label >ประเภทการเลือกตั้ง</label>
                                <select class="form-select" aria-label="Default select example" name="type_id" value={Datas.type_id} onChange={handleChange} disabled={isChecked} required>
                                    <option selected disabled>ประเภท....</option>
                                    {Datas_type.map((Datas_type) => (
                                        <option value={Datas_type.type_id}>{Datas_type.type_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="col-12">
                                <label>รายละเอียด</label>
                                <textarea class="form-control" name='detail' rows={'6'} value={Datas.detail} onChange={handleChange} disabled={isChecked} />
                            </div>
                            <div class="col-6">
                                <label >วันเวลาที่เริ่ม</label>
                                <input type="datetime-local" class="form-control" name='start_date' value={Datas.start_date} onChange={handleChange} disabled={isChecked} />
                            </div>
                            <div class="col-6">
                                <label >วันเวลาที่สิ้นสุด</label>
                                <input type="datetime-local" class="form-control" name='end_date' value={Datas.end_date} onChange={handleChange} disabled={isChecked} />
                            </div>

                        </div>
                        <div className="d-flex justify-content-center">
                            {isChecked ?
                                (<div><button type='button' className='btn btn-warning text-white mx-3 mt-3' onClick={() => editChange()}>แก้ไขข้อมูล</button> </div>)
                                : <div><button type='button' className='btn btn-primary mx-3 mt-3' onClick={handleSubmit}>บันทึกข้อมูล</button></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
</div>
  )
}
