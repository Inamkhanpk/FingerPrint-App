import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../context/userContext";
import { useNavigate } from "react-router-dom";
import { getFingerprint } from "react-fingerprint";
import axios from "axios";
import {
  takefingerprintEndpoint
} from "../services/axiosInceptor";
import { toast } from "react-toastify";
import moment from "moment";

const Dashboard = () => {
  const { setUserInfo, users, setAuthentic } = useContext(AuthContext);
  const [data, setData] = useState([]);
  //   const usr = JSON.parse(localStorage.getItem("user"));
  const [updateList, setUpdateList] = useState(false);
  //   console.log(users, isAuthenticated, users);
  const navigate = useNavigate();
  console.log(users)

  useEffect(() => { 
    console.log("useEffect")
    if(updateList === true ){
      axios
        .get(`http://localhost:4000/getFingerPrintHistory/${users?.id}`)
        .then((res) => {
          console.log(res);
          //   console.log(res.data.findUserFingerprintHistory[0].fingerprintData);
        //   const dataf = localStorage.setItem("data",JSON.stringify(res.data.findUserFingerprintHistory[0].fingerprintData))
        //    const datafp = JSON.parse(dataf)
        //    console.log(datafp)
          setData(res.data.findUserFingerprintHistory[0].fingerprintData);
          setUpdateList(false);
          console.log(updateList)
        //   localStorage.setItem("data",res.data.findUserFingerprintHistory[0].fingerprintData)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }, [updateList]);


//   useEffect(() => { 
    
//       axios
//         .get(`http://localhost:4000/getFingerPrintHistory/${users?.id}`)
//         .then((res) => {
//           console.log(res);
//           //   console.log(res.data.findUserFingerprintHistory[0].fingerprintData);

//           const dataf = localStorage.setItem("data",JSON.stringify(res.data.findUserFingerprintHistory[0].fingerprintData))
//            const datafp = JSON.PARSE(dataf)
//           setData(datafp);
//           setUpdateList(false);
//           localStorage.setItem("data",res.data.findUserFingerprintHistory[0].fingerprintData)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
    
//   }, []);

  const handlePrint = async () => {
    let fingerprint = await getFingerprint(); // fingerprint id
   
    axios
      .post(takefingerprintEndpoint, { fingerprint, userId: users.id })
      .then((res) => {
        if (res.data.message === "Fingerprint data saved successfully") {
          toast.success("Fingerprint data saved successfully");
          setUpdateList(true);
        }
      });
    
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      setAuthentic(false);
      setUserInfo(null);
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="bg-blue-100 h-screen">
        <div className="text-center text-5xl">
          <div>Dashboard</div>
        </div>

        <div className="text-right">
          <button
            className="border bg-indigo-500 p-4 m-2 rounded text-white"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
        <div>
          <div className="text-center text-3xl">Hello {users?.name}</div>

          <button
            onClick={handlePrint}
            className="border bg-indigo-500 p-4 rounded text-white"
          >
            Add FingerPrint
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <table className=" whitespace-no-wrap">
            <thead>
              <tr className="text-xs text-center font-medium tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">FingerPrint</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {  data ? data?.map((item) => (
                <tr key={item.id} className="text-sm text-gray-500">
                  <td className="px-4 py-3">
                    {moment(item.time).format("hh:mm:ss a")}
                  </td>
                  <td className="px-4 py-3">{item.fingerprint}</td>
                </tr>
              ))     : "No FingerPrint Detected" }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
