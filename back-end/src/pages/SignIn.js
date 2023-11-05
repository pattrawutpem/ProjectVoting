import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path

export default function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {}, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("user", user);
    formData.append("password", password);
    axios
      .post(process.env.REACT_APP_API + `admin.php?xCase=0`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status === 1) {
          sessionStorage.setItem("Token", JSON.stringify(result.data));
          Swal.fire({
            icon: "success",
            title: "เข้าระบบสำเร็จ",
            text: "ล็อคอินสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(function () {
            navigate("/Dashboard");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เข้าระบบไม่สำเร็จ",
            text: "อีเมลไม่ถูกต้องหรือรหัสผ่านผิดพลาด",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  return (
    <section className="mx-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <img
              src={process.env.REACT_APP_PATH + `dist/img/VotingLog.png`}
              alt=""
              className="w-100"
            />
          </div>
          <div className="col-4 my-auto mx-5">
            <h1 className="text-center mb-5"><strong>ADMIN MENAGEMENT</strong></h1>
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <label htmlFor="" className="fs-4">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  
                />
              </div>
              <div className="my-2">
                <label htmlFor="" className="fs-4">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
