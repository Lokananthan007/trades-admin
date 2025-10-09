import React, { useState, useCallback, useEffect} from "react";
import axios from "axios";
import "./Qr.css";

function Qr() {
  const [qrName, setQrName] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [qrs, setQrs] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setQrFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

const fetchQrs = useCallback(async () => {
  try {
    const res = await axios.get(`${API_URL}/api/qr`);
    setQrs(res.data);
  } catch (err) {
    console.error(err);
  }
}, [API_URL]); // dependencies

useEffect(() => {
  fetchQrs();
}, [fetchQrs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!qrFile || !qrName) {
      alert("Please enter a name and upload a QR image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", qrName);
      formData.append("qrImage", qrFile);

      await axios.post(`${API_URL}/api/qr/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("QR uploaded successfully!");
      setQrName("");
      setQrFile(null);
      setPreview(null);
      fetchQrs(); // refresh table
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/api/qr/status/${id}`, { status });
      fetchQrs(); // refresh table
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

// ✅ Delete
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this QR?")) return;

  try {
    await axios.delete(`${API_URL}/api/qr/${id}`);
    fetchQrs();
  } catch (err) {
    console.error(err);
    alert("Failed to delete QR");
  }
};


  return (
    <div className="main-content">
      <h1>QR Code Upload</h1>

      <form onSubmit={handleSubmit} className="qr-form">
        <div className="form-group">
          <label>QR Name:</label>
          <input
            type="text"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
            placeholder="Enter QR name"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload QR Code Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        {preview && (
          <div className="preview">
            <p>Preview:</p>
            <img src={preview} alt="QR Preview" />
          </div>
        )}

        <button type="submit" className="upload-btn">Upload</button>
      </form>

      <h2>QR Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>QR Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {qrs.map((qr) => (
    <tr key={qr._id}>
      <td data-label="Name">{qr.name}</td>
      <td data-label="QR Image">
        <img src={qr.qrImage} alt={qr.name} width="100" />
      </td>
      <td data-label="Status">{qr.status}</td>
<td data-label="Action">
  <button
    className="btn-display"
    onClick={() => handleStatusChange(qr._id, "display")}
    disabled={qr.status === "display"}
  >
    Display
  </button>

  <button
    className="btn-hide"
    onClick={() => handleStatusChange(qr._id, "hide")}
    disabled={qr.status === "hide"}
  >
    Hide
  </button>

  <button
    className="btn-delete"
    onClick={() => handleDelete(qr._id)}
  >
    Delete
  </button>
</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default Qr;
