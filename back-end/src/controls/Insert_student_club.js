import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { checkTokenAndRedirect } from "../Component/authUtils";
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Insert_student_club() {
  const navigate = useNavigate();
  const [Datas, setDatas] = useState([]);
  const [File_pic, setFile_pic] = useState([]);

  const currentDate = new Date();
  const dateOnly = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    checkTokenAndRedirect(navigate);
  }, []);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );

  const contract = new web3.eth.Contract(
    contractABI,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDatas((values) => ({ ...values, [name]: value }));
  };
  const imgChange = (event) => {
    setFile_pic(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (typeof window.ethereum !== "undefined") {
        // Metamask เชื่อมต่อ
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const firstNameInput = Datas.club_president_firstname.trim();
        const lastNameInput = Datas.club_president_lastname.trim();
        const nameInput = `${firstNameInput} ${lastNameInput}`;
        const candidateTypeInput = "003";
        const number_ = Datas.number.trim();
        const toppic_ = "0";
        const date_ = dateOnly.trim();

        // ตรวจสอบความถูกต้องของค่า candidateType ในรูปแบบที่ต้องการ (integer)
        if (!nameInput || isNaN(candidateTypeInput)) {
          alert("กรุณากรอกข้อมูลให้ถูกต้อง");
          return;
        }

        const candidateTypeInt = parseInt(candidateTypeInput);

        const bytecode = contract.methods
        .addCandidate(nameInput, candidateTypeInt, date_,number_,toppic_)
          .encodeABI();

        const result = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [
              {
                from: accounts[0],
                to: process.env.REACT_APP_CONTRACT_ADDRESS,
                gas: "100000",
                gasPrice: "20",
                data: bytecode,
              },
            ],
          });
        
      } else {
        alert(
          "กรุณาเปิด Metamask และเชื่อมต่อกับเครือข่าย Ethereum ก่อนทำรายการ"
        );
        return;
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด: ", error);
      return;
    }

    var formData = new FormData();
    var img_File = document.querySelector("#img");
    formData.append("club_president_id", Datas.club_president_id);
    formData.append("picture", img_File.files[0]);
    formData.append("number", Datas.number);
    formData.append("prefix", Datas.prefix);
    formData.append("club_president_firstname", Datas.club_president_firstname);
    formData.append("club_president_lastname", Datas.club_president_lastname);
    formData.append("age", Datas.age);
    formData.append("birth_date", Datas.birth_date);
    formData.append("idCard", Datas.idCard);
    formData.append("email", Datas.email);
    formData.append("phone", Datas.phone);
    formData.append("faculty", Datas.faculty);
    formData.append("major", Datas.major);
    formData.append("slogan", Datas.slogan);
    formData.append("detail", Datas.detail);

    axios
      .post(
        process.env.REACT_APP_API + `api_Student_club.php/?xCase=5`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        navigate("../Candidate_Student_club");
        showAlertSubmit();
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
          <div className="card-type col-9 mx-lg mt-3 mx-auto mb-5">
            <div class="card ">
              <div class="card-header">
                <strong>
                  <h4 class="text-center">เพิ่มข้อมูลประธานสโมสร</h4>
                </strong>
              </div>
              <div class="card-body">
                <form onSubmit={handleSubmit}>
                  <div class="row row-cols-4">
                    <img
                      src={
                        File_pic == ""
                          ? process.env.REACT_APP_API + `canidate/noImage.jpg`
                          : File_pic
                      }
                      className="rounded-circle object-fit-cover mx-auto "
                      height={"200px"}
                    />
                    <div class="col-12">
                      <label class="form-label">รูปภาพ</label>
                      <input
                        class="form-control"
                        type="file"
                        name="picture"
                        id="img"
                        onChange={imgChange}
                      />
                    </div>
                    <div class="col-2">
                      <label>เบอร์</label>
                      <input
                        type="text"
                        class="form-control"
                        name="number"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>คำนำหน้า</label>
                      <input
                        type="text"
                        class="form-control"
                        name="prefix"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>ชื่อ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="club_president_firstname"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        name="club_president_lastname"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>อายุ</label>
                      <input
                        type="number"
                        class="form-control"
                        name="age"
                        max={99}
                        min={0}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>วันเกิด</label>
                      <input
                        type="date"
                        class="form-control"
                        name="birth_date"
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-4">
                      <label>เลขบัตรประชาชน</label>
                      <input
                        type="text"
                        class="form-control"
                        name="idCard"
                        maxLength={13}
                        minLength={0}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>อีเมล</label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>เบอร์โทร</label>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        maxLength={10}
                        minLength={0}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>คณะ/สำนัก</label>
                      <input
                        type="text"
                        class="form-control"
                        name="faculty"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>สาขา</label>
                      <input
                        type="text"
                        class="form-control"
                        name="major"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label>สโลแกน</label>
                      <textarea
                        class="form-control"
                        name="slogan"
                        rows={"5"}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label>รายละเอียด (นโยบาย)</label>
                      <textarea
                        class="form-control"
                        name="detail"
                        rows={"6"}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mt-3">
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
