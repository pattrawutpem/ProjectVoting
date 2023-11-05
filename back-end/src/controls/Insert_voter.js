import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { checkTokenAndRedirect } from "../Component/authUtils";

export default function Insert_voter() {
  const [Datas, setDatas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenAndRedirect(navigate);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDatas((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("voter_firstname", Datas.voter_firstname);
    formData.append("voter_lastname", Datas.voter_lastname);
    formData.append("Gender", Datas.Gender);
    formData.append("idCard", Datas.idCard);
    formData.append("phone", Datas.phone);
    formData.append("email", Datas.email);

    axios.post(process.env.REACT_APP_API + `api_user.php/?xCase=2`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response.data);
        navigate(`/VoterManage`);
      });
  };

  // sweetalert2
  const showAlertSubmit = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "บันทึกเสร็จสิ้น",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Navbar />
          <div className="card-type col-9 mx-lg mt-3 mx-auto">
            <div className="card">
              <div className="card-header">
                <strong>
                  <h4 className="text-center">เพิ่มข้อมูลผู้โหวต</h4>
                </strong>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row row-cols-4">
                    <div className="col-6">
                      <label>ชื่อ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="voter_firstname"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label>นามสกุล</label>
                      <input
                        type="text"
                        className="form-control"
                        name="voter_lastname"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label>เพศ</label>
                      <br />
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="inlineCheckbox1"
                          name="Gender"
                          value="ชาย"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          for="inlineCheckbox1"
                        >
                          ชาย
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="inlineCheckbox2"
                          name="Gender"
                          value="หญิง"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          for="inlineCheckbox2"
                        >
                          หญิง
                        </label>
                      </div>
                    </div>
                    <div className="col-6 ">
                      <label>รหัสบัตรประชาชน</label>
                      <input
                        type="text"
                        className="form-control"
                        name="idCard"
                        onChange={handleChange}
                        required
                        maxLength={13}
                        minLength={0}
                      />
                    </div>
                    <div className="col-6">
                      <label>เบอร์โทร</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={handleChange}
                        required
                        maxLength={10}
                        minLength={0}
                      />
                    </div>
                    <div className="col-6">
                      <label>อีเมล</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      onClick={() => showAlertSubmit()}
                    >
                      บันทึกข้อมูล
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
