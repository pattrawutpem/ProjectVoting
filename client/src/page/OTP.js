import { useEffect, useState } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

export default function OTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const storedToken = localStorage.getItem("Token");
    const { id_v } = useParams();
    const Token = JSON.parse(storedToken);
    const [count, setCount] = useState(40);

    useEffect(() => {
        timeCountDown();
    }, []);

    const handleInputChange = (e) => {
        setOtp(e.target.value);
    };

    const OTP = async () => {
        try {
          var formData = new FormData();
          formData.append("email", Token.email);
          formData.append("voter_id", Token.voter_id);
      
          const response = await axios.post(
            process.env.REACT_APP_API + "OTPGmail.php",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
      
          // ตรวจสอบว่ารับข้อมูลสำเร็จ
          if (response.status === 200) {
            // ทำสิ่งที่คุณต้องการกับข้อมูลที่ได้รับ
            console.log("รับข้อมูลสำเร็จ:", response.data);
            // ตรวจสอบและจัดการข้อมูลตามที่คุณต้องการ
          }
        } catch (error) {
          // แสดงข้อผิดพลาดหรือจัดการข้อผิดพลาดตามที่คุณต้องการ
          console.error("เกิดข้อผิดพลาดในการรับข้อมูล:", error);
        }
      };
      
    const timeCountDown = () => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                const newCount = prevCount - 1;
                console.log(newCount);
                if (newCount <= 0) {
                    clearInterval(interval);
                    setCount(0);
                      OTP(); 
                  }
                return newCount;
            });
        }, 1500);
        return () => {
            clearInterval(interval);
        };
    };

    const sendOTP = async () => {
        var formData = new FormData();
        formData.append("otp", otp);
        formData.append("voter_id", Token.voter_id);
        const response = await axios.post(
            process.env.REACT_APP_API + `api_user.php/?xCase=17`,
            formData
        );

        if (response.data.status == 1) {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'OTP ถูกต้อง!!',
            }).then(() => {
                navigate(`/Vote/${id_v}`);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'OTP ไม่ถูกต้อง',
            });
        }
    }

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div className="text-center col-12 col-lg-4 mt-5 ">
                    <h1 className="fw-bold fs-2">ยืนยัน OTP ที่ส่งให้ทางเมล</h1>
                    <p className="text-center fs-2 fw-bold">{count == 0 ? "" : count}</p>
                    <p className="text-danger fw-bold m-2">*โปรดเช็ครหัส OTP ทาง GMAIL</p>
                    <input type="text" name="otp" className="form-control text-center" onChange={handleInputChange} />

                    {count == 0 ? <button type="submit" className="btn btn-info mt-3 mx-3" onClick={OTP}>
                        ส่งอีกครั้ง
                    </button> : ""}
                    
                    <button type="submit" className="btn btn-success text-dark mt-3" onClick={sendOTP}>
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>
    );
}
