import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Web3 from "web3";

export default function Login() {
  const navigate = useNavigate();
  const [idCard, setUser] = useState(null);
  const [phone, setPassword] = useState(null);

  useEffect(() => {}, [idCard]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("idCard", idCard);
    formData.append("phone", phone);
  
    try {
      // เชื่อมต่อ Metamask
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
  
      // ตรวจสอบว่าผู้ใช้เชื่อมต่อ Metamask แล้ว
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        // ผู้ใช้เชื่อมต่อ Metamask แล้ว
        const result = await axios.post(
          process.env.REACT_APP_API + `admin.php?xCase=1`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // ตรวจสอบผลลัพธ์และดำเนินการตามที่คุณต้องการ
        if (result.data.status === 1) {
          localStorage.setItem("Token", JSON.stringify(result.data));
          Swal.fire({
            icon: "success",
            title: "เข้าระบบสำเร็จ",
            text: "ล็อคอินสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เข้าระบบไม่สำเร็จ",
            text: "ชื่อผู้ใช้ไม่ถูกต้องหรือรหัสผ่านผิดพลาด",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      } else {
        // ผู้ใช้ยังไม่ได้เชื่อมต่อ Metamask
        // แจ้งให้ผู้ใช้ทำการเชื่อมต่อ Metamask
        console.log("กรุณาเชื่อมต่อ Metamask");
      }
    } catch (error) {
      // ผู้ใช้ปฏิเสธการเชื่อมต่อ Metamask หรือเกิดข้อผิดพลาดอื่น ๆ
      console.error(error);
    }
  };
  

  return (
    <div>
      <div className="container-fluid vh-100">
        <div className="row items-center ">
          <div className="col-lg-6 hidden lg:block">
            <img src="image/voteLog.png" alt="" className="w-100" />
          </div>
          <div className="col-lg-6 justify-center">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="p-2 bd-highlight login">
                <div className="fs-2 fw-bold color darkbluetheme text-center my-3">เข้าสู่ระบบ</div>
                <div className="col-11 mx-4">
                  <label htmlFor="" className="txtH3">
                    ชื่อผู้ใช้
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ชื่อผู้ใช้"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                <div className="col-11 mx-4 mt-3">
                  <label htmlFor="" className="txtH3">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="รหัสผ่าน"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-11 mx-2 mt-3">
                  <button type="submit" className="btn w-100 btn-theme  mx-3" >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
