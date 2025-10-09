import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Withdraw.css"; // reuse your table styles

const API_URL = process.env.REACT_APP_API_URL;

function Withdraw() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/claims/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClaims(data);
      } catch (err) {
        console.error("Error fetching claims:", err);
      }
    };
    fetchClaims();
  }, []);

  const handleStatusUpdate = async (id, status) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `${API_URL}/api/claims/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // update local state to reflect change immediately
    setClaims((prev) =>
      prev.map((claim) =>
        claim._id === id ? { ...claim, status } : claim
      )
    );
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

  return (
    <div className="main-content">
      <h1>All Claim Requests</h1>
      <div className="table-container">
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User Name</th>
              <th>Mobile</th>
              <th>Invest</th>
              <th>Amount</th>
              <th>Account No</th>
              <th>IFSC</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id}>
                <td>{new Date(claim.createdAt).toLocaleDateString()}</td>
                <td>{claim.user?.username}</td>
                <td>{claim.user?.mobile}</td>
                <td>{claim.purchase?.invest}</td>
                <td>{claim.amount}</td>
                <td>{claim.accountNo}</td>
                <td>{claim.ifsc}</td>
                <td>{claim.address}</td>
<td className="action-buttons">
  <button
    className="accept-btn"
    onClick={() => handleStatusUpdate(claim._id, "Accepted")}
    disabled={claim.status === "Accepted" || claim.status === "Paid"} // optional: prevent repeated click
  >
    Accept
  </button>
  <button
    className="paid-btn"
    onClick={() => handleStatusUpdate(claim._id, "Paid")}
    disabled={claim.status !== "Accepted" || claim.status === "Paid"} // optional: must be accepted first
  >
    Paid Success
  </button>
  <span className="status-label">{claim.status}</span>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Withdraw;
