import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from '../Component/Navbar'
import Sidebar from '../Component/Sidebar'
import { Link } from "react-router-dom"
import { checkTokenAndRedirect } from '../Component/authUtils'; // Update the import path
import { useNavigate} from "react-router-dom";

export default function Score_Other_Topic() {
  const navigate = useNavigate();
  const [Datas, setDatas] = useState([]);

  useEffect(() => {
    checkTokenAndRedirect(navigate);
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API + `api_other.php/?xCase=1`
      );
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <Navbar />
          <strong><h1 className='text1 text-center'>หัวข้อการโหวตอื่นๆ</h1></strong>
          <div className="card-type col-9 mx-lg mx-auto">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">หัวข้อการโหวตอื่นๆ</h3>
              </div>
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped text-center">
                  <thead className='table-primary'>
                    <tr>
                      <th>#</th>
                      <th>หัวข้อ(เรื่อง)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Datas.map((Data, key) => (
                      <tr>
                        <td>{Data.toppic_id}</td>
                        <td>{Data.toppic_name}</td>
                        <td>
                          <Link to={`/${Data.toppic_id}/Score_Other`}><i className='fas fa-file-alt mx-lg-2 wa ' style={{ fontSize: '24px' }}></i></Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
