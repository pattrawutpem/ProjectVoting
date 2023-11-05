import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { useParams, useNavigate } from "react-router-dom"
import '../style.css'
import Swal from 'sweetalert2'
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Personal_Student() {

    const [Datas, setDatas] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isChecked, setisChecked] = useState(true);
    const [File_pic, setFile_pic] = useState([]);

    const editChange = () => {
        setisChecked(!isChecked);
    }

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
    }, []);
    const getData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API + `api_Student_club.php/${id}/?xCase=4`
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
    const imgChange = (event) => {
        setFile_pic(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        var img_File = document.querySelector('#img');
        formData.append('club_president_id', Datas.club_president_id);
        formData.append("picture", img_File.files[0]);
        formData.append('number', Datas.number);
        formData.append('prefix', Datas.prefix);
        formData.append('club_president_firstname', Datas.club_president_firstname);
        formData.append('club_president_lastname', Datas.club_president_lastname);
        formData.append('age', Datas.age);
        formData.append('birth_date', Datas.birth_date);
        formData.append('idCard', Datas.idCard);
        formData.append('email', Datas.email);
        formData.append('phone', Datas.phone);
        formData.append('faculty', Datas.faculty);
        formData.append('major', Datas.major);
        formData.append('slogan', Datas.slogan);
        formData.append('detail', Datas.detail);

        axios.post(process.env.REACT_APP_API + `api_Student_club.php/${id}/?xCase=6`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate('../Candidate_Student_club');
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
                                    <div class="col-12 py-4">
                                        <div className='d-flex justify-content-center'>
                                            <img src={File_pic == '' ? process.env.REACT_APP_API + `canidate/${Datas.picture}` : File_pic} className='rounded-circle  profile object-fit-cover' width={'235px'} height={'235px'} />
                                        </div>
                                        {isChecked ? '' :
                                            <div className="col-12 my-2">
                                                <label htmlFor="" class="fs-5">รูปภาพ</label>
                                                <input class="form-control" type="file" name="picture" id="img" onChange={imgChange} />
                                            </div>
                                        }
                                    </div>
                                    <div class="col-2">
                                        <label >เบอร์</label>
                                        <input type="text" class="form-control" name='club_president_id' value={Datas.club_president_id} hidden />
                                        <input type="text" class="form-control" name='number' value={Datas.number} onChange={handleChange} disabled />
                                    </div>
                                    <div class="col-2">
                                        <label >คำนำหน้า</label>
                                        <input type="text" class="form-control" name='prefix' value={Datas.prefix} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label >ชื่อ</label>
                                        <input type="text" class="form-control" name='club_president_firstname' value={Datas.club_president_firstname} onChange={handleChange} disabled/>
                                    </div>
                                    <div class="col-4">
                                        <label >นามสกุล</label>
                                        <input type="text" class="form-control" name='club_president_lastname' value={Datas.club_president_lastname} onChange={handleChange} disabled />
                                    </div>
                                    <div class="col-2">
                                        <label >อายุ</label>
                                        <input type="number" class="form-control" name='age' max={99} min={0} value={Datas.age} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-2">
                                        <label >วันเกิด</label>
                                        <input type="date" class="form-control" name='birth_date' value={Datas.birth_date} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label >เลขบัตรประชาชน</label>
                                        <input type="text" class="form-control" name='idCard' maxLength={13} minLength={0} value={Datas.idCard} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label>อีเมล</label>
                                        <input type="email" class="form-control" name='email' value={Datas.email} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label>เบอร์โทร</label>
                                        <input type="text" class="form-control" name='phone' maxLength={10} minLength={0} value={Datas.phone} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label>คณะ/สำนัก</label>
                                        <input type="text" class="form-control" name='faculty' value={Datas.faculty} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-4">
                                        <label>สาขา</label>
                                        <input type="text" class="form-control" name='major' value={Datas.major} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-12">
                                        <label>สโลแกน</label>
                                        <textarea class="form-control" name='slogan' rows={'5'} value={Datas.slogan} onChange={handleChange} disabled={isChecked} />
                                    </div>
                                    <div class="col-12">
                                        <label>รายละเอียด</label>
                                        <textarea class="form-control" name='detail' rows={'6'} value={Datas.detail} onChange={handleChange} disabled={isChecked} />
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
