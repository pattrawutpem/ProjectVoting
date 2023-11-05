import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Swal from "sweetalert2";
import { checkTokenAndRedirect } from "../Component/authUtils"; // Update the import path
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Insrt_Provincial_Council() {
  const navigate = useNavigate();
  const [Datas, setDatas] = useState([]);
  const [File_pic, setFile_pic] = useState([]);

  const currentDate = new Date();
  const dateOnly = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getData();
  }, []);

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3)
  );

  const contract = new web3.eth.Contract(
    contractABI,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );

  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=2`
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (typeof window.ethereum !== "undefined") {
        // Metamask เชื่อมต่อ
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const firstNameInput = Datas.provincial_firstname.trim();
        const lastNameInput = Datas.provincial_lastname.trim();
        const nameInput = `${firstNameInput} ${lastNameInput}`;
        const candidateTypeInput = "002";
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
          .addCandidate(nameInput, candidateTypeInt, date_, number_, toppic_)
          .encodeABI();

        await window.ethereum.request({
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
    formData.append("provincial_id", Datas.provincial_id);
    formData.append("picture", img_File.files[0]);
    formData.append("number", Datas.number);
    formData.append("prefix", Datas.prefix);
    formData.append("provincial_firstname", Datas.provincial_firstname);
    formData.append("provincial_lastname", Datas.provincial_lastname);
    formData.append("age", Datas.age);
    formData.append("birth_date", Datas.birth_date);
    formData.append("idCard", Datas.idCard);
    formData.append("email", Datas.email);
    formData.append("phone", Datas.phone);
    formData.append("nationality", Datas.nationality);
    formData.append("career", Datas.career);
    formData.append("house_number", Datas.house_number);
    formData.append("moo", Datas.moo);
    formData.append("tumbon", Datas.tumbon);
    formData.append("district", Datas.district);
    formData.append("province", Datas.province);
    formData.append("post", Datas.post);
    formData.append("constituency", Datas.constituency);
    formData.append("educational", Datas.educational);

    axios
      .post(
        process.env.REACT_APP_API + `api_Provincial_Council.php/?xCase=4`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        navigate("../Candidate_Provincial_Council");
        showAlertSubmit();
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDatas((values) => ({ ...values, [name]: value }));
  };
  const imgChange = (event) => {
    setFile_pic(URL.createObjectURL(event.target.files[0]));
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
          <div className="card-type col-10 mx-lg my-5 mx-auto">
            <div class="card">
              <div class="card-header">
                <strong>
                  <h4 class="text-center">
                    เพิ่มข้อมูลสมาชิกสภาผู้แทนราษฎร( สส. )
                  </h4>
                </strong>
              </div>
              <div class="card-body">
                <form onSubmit={handleSubmit}>
                  <div class="row row-cols-4">
                    <img
                      src={
                        File_pic == ""
                          ? process.env.REACT_APP_API + "canidate/noImage.jpg"
                          : File_pic
                      }
                      className="rounded-circle object-fit-cover mx-auto "
                      width={"50px"}
                      height={"235px"}
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
                        name="Representatives_id"
                        value={Datas.Representatives_id}
                        hidden
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="number"
                        value={Datas.number}
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
                        value={Datas.prefix}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>ชื่อ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="provincial_firstname"
                        value={Datas.provincial_firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        name="provincial_lastname"
                        value={Datas.provincial_lastname}
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
                        value={Datas.age}
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
                        value={Datas.birth_date}
                        onChange={handleChange}
                        required
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
                        value={Datas.idCard}
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
                        value={Datas.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>เบอร์โทร</label>
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        maxLength={10}
                        minLength={0}
                        value={Datas.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>สัญชาติ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="nationality"
                        value={Datas.nationality}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-3">
                      <label>อาชีพ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="career"
                        value={Datas.career}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>บ้านเลขที่</label>
                      <input
                        type="number"
                        class="form-control"
                        name="house_number"
                        min={0}
                        value={Datas.house_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-1">
                      <label>หมู่ที่</label>
                      <input
                        type="number"
                        class="form-control"
                        name="moo"
                        min={0}
                        value={Datas.moo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>ตำบล</label>
                      <input
                        type="text"
                        class="form-control"
                        name="tumbon"
                        value={Datas.tumbon}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>อำเภอ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="district"
                        value={Datas.district}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-4">
                      <label>จังหวัด</label>
                      <input
                        type="text"
                        class="form-control"
                        name="province"
                        value={Datas.province}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>รหัสไปรษณีย์</label>
                      <input
                        type="number"
                        class="form-control"
                        name="post"
                        min={0}
                        value={Datas.post}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-2">
                      <label>เขตพื้นที่</label>
                      <input
                        type="text"
                        class="form-control"
                        name="constituency"
                        value={Datas.constituency}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-12">
                      <label>การศึกษา</label>
                      <textarea
                        class="form-control"
                        name="educational"
                        rows={"6"}
                        value={Datas.educational}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary mt-3">บันทึกข้อมูล</button>
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
