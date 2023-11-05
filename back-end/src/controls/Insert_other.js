import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { checkTokenAndRedirect } from "../Component/authUtils";
import Web3 from "web3";
import contractABI from "../contractABI.json";

export default function Insert_other() {
  const [Datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [File_pic, setFile_pic] = useState([]);
  const { id,id_ } = useParams();

  //web3
  const [transactionResult, setTransactionResult] = useState("");
  const [candidates, setCandidates] = useState([]);

  const currentDate = new Date();
  const dateOnly = currentDate.toISOString().split("T")[0];

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDatas((values) => ({ ...values, [name]: value }));
  };
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (typeof window.ethereum !== "undefined") {
        // Metamask เชื่อมต่อ
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const firstNameInput = Datas.register_other_fistname.trim();
        const lastNameInput = Datas.register_other_lastname.trim();
        const nameInput = `${firstNameInput} ${lastNameInput}`;
        const candidateTypeInput = "004";
        const number_ = Datas.number.trim();
        const toppic_ = `${id}`;
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
    formData.append("picture", img_File.files[0]);
    formData.append("toppic_id", Datas.toppic_id);
    formData.append("register_other_fistname", Datas.register_other_fistname);
    formData.append("register_other_lastname", Datas.register_other_lastname);
    formData.append("number", Datas.number);
    formData.append("detail", Datas.detail);

    axios
      .post(process.env.REACT_APP_API + `api_other.php/?xCase=9`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response.data);
        navigate(`/Other/${id}/Other_Topic`);
        showAlertSubmit();
      });
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/${id}/?xCase=15`
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
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
          <div className="card-type col-9 mx-lg my-5 mx-auto">
            <div class="card">
              <div class="card-header">
                <strong>
                  <h4 class="text-center">
                    เพิ่มข้อมูลของหัวข้อ{Datas.toppic_name}
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
                      <label>เบอร์ที่</label>
                      <input
                        type="text"
                        class="form-control"
                        name="number"
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="toppic_id"
                        value={Datas.toppic_id}
                        onChange={handleChange}
                        hidden
                      />
                    </div>
                    <div class="col-5">
                      <label>ชื่อ</label>
                      <input
                        type="text"
                        class="form-control"
                        name="register_other_fistname"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="col-5">
                      <label>นามสกุล</label>
                      <input
                        type="text"
                        class="form-control"
                        name="register_other_lastname"
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
