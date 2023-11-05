import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Insert_declare() {

    const [Datas, setDatas] = useState([]);
    const [Datas_type, setDatas_type] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDatas(values => ({ ...values, [name]: value }));
    }
    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getDatas_type();
    }, []);

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

        axios.post(process.env.REACT_APP_API + `api_declare.php/?xCase=2`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate(`/Declare`);
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
                    <div className="card-type col-9 mx-lg my-5 mx-auto">
                        <div class="card">
                            <div class="card-header">
                                <strong><h4 class="text-center">เพิ่มประกาศ</h4></strong>
                            </div>
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="row row-cols-4">
                                        <div class="col-6">
                                            <label >หัวเรื่อง</label>
                                            <input type="text" class="form-control" name='toppic' onChange={handleChange} required />
                                        </div>
                                        <div className="col-6">
                                            <label >ประเภทการเลือกตั้ง</label>
                                            <select className="form-control" name='type_id' onChange={handleChange}>
                                                <option selected disabled>ประเภท....</option>
                                                {Datas_type.map((Datas_type) => (
                                                    <option value={Datas_type.type_id}>{Datas_type.type_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label>รายละเอียด</label>
                                            <textarea class="form-control" name='detail' rows={'6'} onChange={handleChange} />
                                        </div>
                                        <div class="col-6">
                                            <label >วันเวลาที่เริ่ม</label>
                                            <input type="datetime-local" class="form-control" name='start_date' onChange={handleChange} required />
                                        </div>
                                        <div class="col-6">
                                            <label >วันเวลาที่สิ้นสุด</label>
                                            <input type="datetime-local" class="form-control" name='end_date' onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type='submit' className='btn btn-primary mt-3' >บันทึกข้อมูล</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
  )
}
