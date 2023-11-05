import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Edit_voter() {

    const [Datas, setDatas] = useState([]);
    const [DataType, setDataType] = useState([]);
    const [isChecked, setisChecked] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const editChange = () => {
        setisChecked(!isChecked);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDatas(values => ({ ...values, [name]: value }));
    }

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
        getDataType();
    }, []);

    const getDataType = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_user.php/?xCase=10`);
            setDataType(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_user.php/${id}/?xCase=3`
            );
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('voter_id', Datas.voter_id);
        formData.append('voter_firstname', Datas.voter_firstname);
        formData.append('voter_lastname', Datas.voter_lastname);
        formData.append('Gender', Datas.Gender);
        formData.append('idCard', Datas.idCard);
        formData.append('phone', Datas.phone);
        formData.append('email', Datas.email);
        formData.append('type_id', Datas.type_id);
        axios.post(process.env.REACT_APP_API + `api_user.php/${id}/?xCase=5`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate(`../VoterManage`);
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
                                <strong><h4 class="text-center">{isChecked ? 'ดูรายละเอียด' : 'แก้ไข'}ข้อมูลผู้โหวต</h4></strong>
                            </div>
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="row row-cols-4">
                                        <div class="col-6">
                                            <label >ชื่อ</label>
                                            <input type="text" class="form-control" name='voter_id' value={Datas.voter_id} onChange={handleChange} hidden />
                                            <input type="text" class="form-control" name='voter_firstname' value={Datas.voter_firstname} onChange={handleChange} disabled={isChecked} />
                                        </div>
                                        <div class="col-6">
                                            <label >นามสกุล</label>
                                            <input type="text" class="form-control" name='voter_lastname' value={Datas.voter_lastname} onChange={handleChange} disabled={isChecked} />
                                        </div>
                                        <div className="col-12">
                                            <label >เพศ</label><br />
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" id="inlineCheckbox1" name='Gender' value='ชาย' checked={Datas.Gender === 'ชาย'} onChange={handleChange} disabled={isChecked} />
                                                <label class="form-check-label" for="inlineCheckbox1">ชาย</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" id="inlineCheckbox2" name='Gender' value='หญิง' checked={Datas.Gender === 'หญิง'} onChange={handleChange} disabled={isChecked} />
                                                <label class="form-check-label" for="inlineCheckbox2">หญิง</label>
                                            </div>
                                        </div>
                                        <div class="col-6 ">
                                            <label >รหัสบัตรประชาชน</label>
                                            <input type="text" class="form-control" name='idCard' value={Datas.idCard} onChange={handleChange} maxLength={13} minLength={0} disabled={isChecked} />
                                        </div>
                                        <div class="col-6">
                                            <label >เบอร์โทร</label>
                                            <input type="text" class="form-control" name='phone' value={Datas.phone} onChange={handleChange} maxLength={10} minLength={0} disabled={isChecked} />
                                        </div>
                                        <div class="col-6">
                                            <label >อีเมล</label>
                                            <input type="text" class="form-control" name='email' value={Datas.email} onChange={handleChange} disabled={isChecked} />
                                        </div>
                                        <div className="col-6">
                                            <label >ประเภทการเลือกตั้ง</label>
                                            <select className="form-control" name='type_id' value={Datas.type_id} onChange={handleChange} disabled={isChecked}>
                                                <option selected disabled>ประเภท....</option>
                                                {DataType.map((Data, key) => (
                                                    <option value={Data.type_id}>{Data.type_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {isChecked ?
                                            (<div><button type='button' className='btn btn-warning text-white mx-3 mt-3' onClick={() => editChange()}>แก้ไขข้อมูล</button> </div>)
                                            : <div><button type='button' className='btn btn-primary mx-3 mt-3' onClick={handleSubmit}>บันทึกข้อมูล</button></div>
                                        }
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
