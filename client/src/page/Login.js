import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

    const result = await axios.post(
      process.env.REACT_APP_API + `admin.php?xCase=1`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    var formData2 = new FormData();
    formData2.append("voter_id", result.data.voter_id );
    formData2.append("email", result.data.email);
      await axios.post(
        process.env.REACT_APP_API + "OTPGmail.php",
      formData2,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
                <div className="fs-2 fw-bold color darkbluetheme text-center my-3">
                  เข้าสู่ระบบ
                </div>
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
                  <button type="submit" className="btn btn-blue bt w-100 mx-3">
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
