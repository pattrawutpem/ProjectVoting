import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const storedToken = localStorage.getItem("Token");
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <span className="flex justify-center drop-shadow-lg">
      <nav className="sticky z-10 mt-4 rounded navbar navbar-expand-lg navbar-dark navbar-shadow position-absolute w-11/12 bg-white">
        <div className="container-fluid text-gray-900">
          <Link
            to="/"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
          >
            {/* <img src="image/voting.png" classNameName='h-10' alt="" /> */}
            VOTING BLOCKCHIAN
          </Link>
          <ul className="ml-auto mr-8 hidden items-center gap-6 lg:flex">
            <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
              <Link
                to="/typeVote"
                className={`nav-item flex items-center ${location.pathname == "/typeVote" ? "active" : ""
                  }`}
              >
                โหวต
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
              <Link
                to="/Candidate/1"
                className={`nav-item flex items-center ${location.pathname == "/Candidate/1" ? "active" : ""
                  }`}
              >
                ข้อมูลผู้ลงสมัคร
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm font-normal leading-normal text-inherit antialiased">
              <Link
                to="/Result"
                className={`nav-item flex items-center ${location.pathname == "/Result" ? "active" : ""
                  }`}
              >
                ดูคะแนน
              </Link>
            </li>
          </ul>
          {storedToken === null ? (
            <Link to="/Login">
              <button
                className="middle none center hidden rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <span>เข้าสู่ระบบ</span>
              </button>
            </Link>
          ) : (
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("Token");
              }}
            >
              <button
                className="middle none center hidden rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
                data-ripple-light="true"
              >
                <span>ออกจากระบบ</span>
              </button>
            </Link>
          )}
          {/* overlay */}
          <div className={`overlay ${showSidebar ? 'show' : ''}`} onClick={toggleSidebar}></div>
          {/* mobile */}
          <button className="navbar-toggler shadow-none border-0" type="button" onClick={toggleSidebar}>
            <i class="fa-solid fa-bars fs-2 color-theme text-black"></i>
          </button>
          <div className={`sidebar vh-100 ${showSidebar ? 'show' : ''} d-block d-lg-none`}>
            <div className='d-flex justify-content-end'>
              <i class="fa-solid fa-xmark" onClick={toggleSidebar}></i>
            </div>
            <div className='d-flex justify-content-center'>
              <ul className="navbar-nav fs-5 d-inline-flex d-lg-none">
                <li className="nav-item my-3">
                  <Link to="/typeVote"  >
                    <i class="fa-solid fa-light fa-box-check fs-2 me-2"></i>โหวต</Link>
                </li>
                <li className="nav-item my-3">
                  <Link to="/Candidate/1" >
                    <i class="fa-solid fa-light fa-address-card fs-2 me-2"></i>ข้อมูลผู้ลงสมัคร</Link>
                </li>
                <li className="nav-item my-3">
                  <Link to="/Result" >
                    <i class="fa-solid fa-light fa-hundred-points fs-2 me-2"></i>ดูคะแนน</Link>
                </li>
                <li className="nav-item my-3">
                  <Link to="/Login" onClick={() => { localStorage.removeItem('Token') }}>
                    <i class="fa-solid fa-light fa-right-from-bracket fs-2 me-2"></i>ออกจากระบบ
                  </Link>
                </li>
              </ul>

            </div>
            {/* <div className="d-flex justify-content-center">
              <ul className="navbar-nav fs-5 d-lg-none">
                <li className="nav-item my-3">
                  <Link to="/Login" className={`nav-link lower-menu-item align-items-center d-flex`} onClick={() => { localStorage.removeItem('Token') }}>
                    <i class="fa-duotone fa-arrow-right-from-bracket fs-2 me-2"></i>ออกจากระบบ
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </nav >
    </span>

  );
}
