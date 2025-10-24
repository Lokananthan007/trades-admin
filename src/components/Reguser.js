import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reguser.css";

const API_URL = process.env.REACT_APP_API_URL; // e.g. http://localhost:5001 or your live URL

function Reguser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/users`);
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="main-content">
      <h1>Registered Users</h1>
      <div className="table-container">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>User Name</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{new Date(user.createdAt).toLocaleDateString("en-GB")}</td>
                <td>{user.username}</td>
                <td>{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reguser;
