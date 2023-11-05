import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import '../style.css'
import { Link } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate } from "react-router-dom";

export default function ScoreType() {
    const navigate = useNavigate();
    useEffect(() => {
        checkTokenAndRedirect(navigate);
    }, []);
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
                                            <th>#</th>
                                            <th>ประเภทของการเลือกตั้ง</th>
                                            <th>การจัดการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>ประธานสโมสร</td>
                                            <td><Link to='/Score_Student_club'><i className='fas fa-file-alt' style={{ fontSize: '24px' }}></i></Link></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>2</td>
                                            <td>สมาชิกสภาผู้แทนราษฎร( สส. )</td>
                                            <td><Link to='/Score_House_of_Representatives'><i className='fas fa-file-alt ' style={{ fontSize: '24px' }}></i></Link></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>3</td>
                                            <td>สมาชิกสภาจังหวัด( สจ. )</td>
                                            <td><Link to='/Score_Provincial_Council'><i className='fas fa-file-alt ' style={{ fontSize: '24px' }}></i></Link></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td>4</td>
                                            <td>อื่นๆ</td>
                                            <td><Link to='/Score_Other_Topic'><i className='fas fa-file-alt ' style={{ fontSize: '24px' }}></i></Link></td>
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
