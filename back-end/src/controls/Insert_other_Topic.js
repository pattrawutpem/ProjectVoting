import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Insert_other_Topic() {

    const [Datas, setDatas] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        checkTokenAndRedirect(navigate);
    }, []);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDatas(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('toppic_id', Datas.toppic_id);
        formData.append('toppic_name', Datas.toppic_name);
        axios.post(process.env.REACT_APP_API + `api_other.php/?xCase=6`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate('../Other');
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
                    <div className="card-type col-9 mx-lg mt-3 mx-auto">
                        <div class="card">
                            <div class="card-header">
                                <strong><h4 class="text-center">เพิ่มข้อมูลหัวข้อ</h4></strong>
                            </div>
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="row row-cols-4">
                                        <div class="col-12">
                                            <label >หัวข้อ</label>
                                            <input type="text" class="form-control" name='toppic_name' onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type='submit' className='btn btn-primary mt-3'>บันทึกข้อมูล</button>
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
