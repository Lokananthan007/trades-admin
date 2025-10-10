import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Data.css";

const API_URL = process.env.REACT_APP_API_URL;

function Data() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/purchases/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div className="main-content">
      <h1>Client Data</h1>
      <div className="table-container">
        <table className="purchase-table">
  <thead>
    <tr>
      <th>Date</th>
      <th>User Name</th>
      <th>Mobile</th>
      <th>Invest</th>
      <th>Daily Income</th>
      <th>Transaction ID</th>
      <th>Claim Type</th>
      <th>QR Name</th>
    </tr>
  </thead>
  <tbody>
    {purchases.map((purchase) => (
      <tr key={purchase._id}>
        <td>{new Date(purchase.createdAt).toLocaleDateString()}</td>
        <td>{purchase.user?.username}</td>
        <td>{purchase.user?.mobile}</td>
        <td>{purchase.invest}</td>
        <td>{purchase.dailyIncome}</td>
        <td>{purchase.upiId}</td>
        <td>{purchase.claimType}</td>
        <td>{purchase.qrName}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
}

export default Data;
