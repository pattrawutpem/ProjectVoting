import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { useParams } from "react-router-dom";
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";

export default function Score_Other() {
    const navigate = useNavigate();
    const [Datas, setDatas] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        checkTokenAndRedirect(navigate);
        getData();
    }, []);
    
    const getData = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_API + `api_other.php/${id}/?xCase=0`
            );
            setDatas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <Navbar />
                    <strong><h1 className='text1 text-center'>ประเภทคะแนนการเลือกตั้ง</h1></strong>
                    <div className="card-type col-9 mx-lg mx-auto">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">ประเภทคะแนนการเลือกตั้ง</h3>
                            </div>
                            <div class="card-body">
                                <table id="example1" class="table table-bordered table-striped text-center">
                                    <thead className='table-primary'>
                                        <tr>
                                            <th width={'100px'}>เบอร์ที่</th>
                                            <th>รูป</th>
                                            <th width={'600px'}>ชื่อ</th>
                                            <th width={'150px'}>คะแนน</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{Datas.number}</td>
                                            <td>{Datas ? <img src={process.env.REACT_APP_API + `canidate/${Datas.picture}`} className='rounded-circle object-fit-cover' width={'80px'} height={'80px'} /> : ''}</td>
                                            <td>{Datas.register_other_fistname}  {Datas.register_other_lastname}</td>
                                            <td>{Datas.score}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
