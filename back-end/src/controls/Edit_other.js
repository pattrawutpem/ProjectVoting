import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function Edit_other() {

    const [Datas, setDatas] = useState([]);
    const navigate = useNavigate();
    const [File_pic, setFile_pic] = useState([]);
    const { no, id } = useParams();
    const [isChecked, setisChecked] = useState(true);

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
    }, []);
    const getData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_other.php/${no}/?xCase=10`
            );
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const imgChange = (event) => {
        setFile_pic(URL.createObjectURL(event.target.files[0]));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData();
        var img_File = document.querySelector('#img');
        formData.append("picture", img_File.files[0]);
        formData.append('register_other_id', Datas.register_other_id);
        formData.append('register_other_fistname', Datas.register_other_fistname);
        formData.append('register_other_lastname', Datas.register_other_lastname);
        formData.append('number', Datas.number);
        formData.append('detail', Datas.detail);
        formData.append('start_time', Datas.start_time);
        formData.append('end_time', Datas.end_time);
        axios.post(process.env.REACT_APP_API + `api_other.php/${no}/?xCase=11`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function (response) {
            console.log(response.data);
            navigate(`/Other/${id}/Other_Topic`);
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
                    <div className="card-type col-9 mx-lg  mx-auto my-5">
                        <div class="card">
                            <div class="card-header">
                                <strong><h4 class="text-center">เพิ่มข้อมูลหัวข้อ</h4></strong>
                            </div>
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="row row-cols-4">
                                        <div class="col-12">
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
                                            <label >เบอร์ที่</label>
                                            <input type="text" class="form-control" name='number' value={Datas.number} onChange={handleChange} required disabled />
                                        </div>
                                        <div class="col-5">
                                            <label >ชื่อ</label>
                                            <input type="text" class="form-control" name='register_other_fistname' value={Datas.register_other_fistname} onChange={handleChange} required disabled/>
                                        </div>
                                        <div class="col-5">
                                            <label >นามสกุล</label>
                                            <input type="text" class="form-control" name='register_other_lastname' value={Datas.register_other_lastname} onChange={handleChange} required disabled />
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
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}