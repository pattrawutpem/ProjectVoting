import React from 'react'
import { Link, useLocation } from "react-router-dom"
import '../style.css'

function Sidebar() {

    const location = useLocation();

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark side" >
            <Link to="/Dashboard" className="d-flex align-items-center mb-3 mx-4 mb-md-0 me-md-auto text-white text-decoration-none">
                {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> */}

                <strong><span className="fs-4 my-5">Admin</span></strong>
                {/* <span class="top-5 start-100 translate-middle p-1 ms-3 mt-2 bg-success border border-light rounded-circle"></span> */}
            </Link>
            <ul className="nav nav-pills flex-column mt-3 mb-auto">
                <li className={`nav-item ${location.pathname === '/Dashboard' ? 'active' : ''}`}>
                    <Link to="/Dashboard" className="nav-link text-white" aria-current="page">
                        <i className='fas fa-table fs-5 mx-2'></i>
                        ภาพรวม
                    </Link>
                </li>
                <li className={`nav-item ${location.pathname === '/Declare' ? 'active' : ''}`}>
                    <Link to="/Declare" className="nav-link text-white">
                        <i className="fa-solid fa-megaphone fs-5 mx-2"></i>
                        ประกาศ
                    </Link>
                </li>
                <li className={`nav-item ${location.pathname === '/VoterManage' ? 'active' : ''}`}>
                    <Link to="/VoterManage" className="nav-link text-white">
                        <i className='fas fa-address-book fs-5 mx-2'></i>
                        ข้อมูลผู้โหวต
                    </Link>
                </li>
                <li className={`nav-item ${location.pathname === '/CandidateType' ? 'active' : ''}`}>
                    <Link to="/CandidateType" className="nav-link text-white">
                        <i className='fas fa-address-card fs-5 mx-2'></i>
                        ข้อมูลผู้ลงสมัคร
                    </Link>
                </li>
                <li className={`nav-item ${location.pathname === '/ScoreType' ? 'active' : ''}`}>
                    <Link to="/ScoreType" className="nav-link text-white">
                        <i className='fas fa-archive fs-5 mx-2'></i>
                        คะแนน
                    </Link>
                </li>
            </ul>
            <div className="dropdown">
                <Link to="/" className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" onClick={() => { sessionStorage.removeItem('Token') }} role="button">
                    <i className='fas fa-sign-out-alt fs-5 mx-2'></i>
                    ออกจากระบบ
                </Link>
            </div>
        </div>
    )
}

export default Sidebar