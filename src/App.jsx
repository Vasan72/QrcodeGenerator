import React, { useState } from 'react'
import './App.css'

function App() {
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setqrData] = useState("");
  const [qrSize, setSize] = useState("200");
  const generateQr = () => {
    console.log(qrdata);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrdata
      )}`;
      setImage(url);
    } catch (error) {
      console.error("Error in Qr code : ", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQr = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error in QR generting", error);
      });
  };
  return (
    <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img className="qrImage" src={img} alt="" />}
      <div className="mini-div">
        <label className="input-label" htmlFor="dataInput">
          Data for QR code:
        </label>
        <input
          type="text"
          placeholder="Enter the URL"
          value={qrdata}
          onChange={(e) => {
            setqrData(e.target.value);
          }}
        />
        <label className="input-label" htmlFor="size">
          Image size (e.g, 150):
        </label>
        <input
          type="text"
          value={qrSize}
          placeholder="Enter the size"
          onChange={(e) => setSize(e.target.value)}
        />

        <button className="generateBtn" disabled={loading} onClick={generateQr}>
          Generate QR Code
        </button>
        <button className="downloadBtn" onClick={downloadQr}>
          Download QR Code
        </button>
      </div>
      <p>
        Designed By <a href="https://github.com/Vasan72">Vasanth</a>
      </p>
    </div>
  );
}

export default App
