import React from 'react';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TypeVote() {
  const storedToken = localStorage.getItem("Token");
  const Token = JSON.parse(storedToken);
  const navigate = useNavigate();

  const AlertLogin = async () => {
    Swal.fire({
      icon: "error",
      title: "กรุณาล็อคอินก่อน",
      text: "ถึงจะมีการโหวตได้",
      showConfirmButton: false,
      timer: 2500,
    }).then(function () {
      navigate("/Login");
    });
  };

  return (
    <div className="vh-100">
      <Navbar />
      <div class="container text-center vh-100">
        <div class="fs-1 fw-bold color theme text-center mt-5 mb-3">
          เลือกประเภทการเลือกเลือกตั้ง
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 mt-5">
          <div className="col-3">
            <Link to={Token ? `/Vote/1` : ``} onClick={Token ? "" : ()=> AlertLogin()}>
              <div className="d-flex justify-content-center">
                <img
                  src="image/box.png"
                  alt=""
                  width={"80%"}
                  className="mx-3 image-detail"
                />
              </div>
              <div className="text-center fs-5 fw-bold mt-3">
                สมาชิกสภาผู้แทนราษฎร( สส. )
              </div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={Token ? `/Vote/2` : ``} onClick={Token ? "" : ()=> AlertLogin()}>
              <div className="d-flex justify-content-center">
                <img
                  src="image/box.png"
                  alt=""
                  width={"80%"}
                  className="mx-3 image-detail"
                />
              </div>
              <div className="text-center fs-5 fw-bold mt-3">
                สมาชิกสภาจังหวัด( สจ. )
              </div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={Token ? `/Vote/3` : ``} onClick={Token ? "" : ()=> AlertLogin()}>
              <div className="d-flex justify-content-center">
                <img
                  src="image/box.png"
                  alt=""
                  width={"80%"}
                  className="mx-3 image-detail"
                />
              </div>
              <div className="text-center fs-5 fw-bold mt-3">ประธานสโมสร</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={Token ? `/Vote/4` : ``} onClick={Token ? "" : ()=> AlertLogin()}>
              <div className="d-flex justify-content-center">
                <img
                  src="image/box.png"
                  alt=""
                  width={"80%"}
                  className="mx-3 image-detail"
                />
              </div>
              <div className="text-center fs-5 fw-bold mt-3">อื่นๆ</div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TypeVote;
