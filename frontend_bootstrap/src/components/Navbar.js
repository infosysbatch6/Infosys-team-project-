import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Navbar({ recipientEmail, setRecipientEmail, emailSending, setEmailSending }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const handleSendPDF = async (shareOption = "email") => {
    if (emailSending || (shareOption === "email" && !recipientEmail)) return;
    setEmailSending(true);
    try {
      const dashboardElement = document.querySelector(".dashboard-root");
      if (!dashboardElement) {
        alert("Dashboard not loaded yet!");
        setEmailSending(false);
        return;
      }

      const canvas = await html2canvas(dashboardElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");

      if (shareOption === "email") {
        const url = URL.createObjectURL(pdfBlob);
        window.open(`mailto:${recipientEmail}?subject=AQI Dashboard Report&body=See attached AQI report.&attachment=${url}`);
        alert("Gmail opened! Please send email manually.");
      } else if (shareOption === "whatsapp") {
        const text = "Check out the AQI Dashboard Report!";
        const url = URL.createObjectURL(pdfBlob);
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate share.");
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"}`} style={{ padding: "10px 0" }}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">Smart Air Quality Dashboard</a>

        <div className="d-flex gap-2 align-items-center">
          <button className={`btn btn-sm ${theme === "light" ? "btn-primary" : "btn-outline-light"}`} onClick={() => setTheme("light")}>Light</button>
          <button className={`btn btn-sm ${theme === "dark" ? "btn-light" : "btn-outline-dark"}`} onClick={() => setTheme("dark")}>Dark</button>

          {/* Hamburger Dropdown */}
          <div className="dropdown ms-3">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ☰
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: "220px" }}>
              <li>
                <button className="dropdown-item" onClick={() => navigate("/")}>Home</button>
              </li>
              <li className="mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
              </li>
              <li className="mb-2">
                <button
                  className="btn btn-primary w-100"
                  disabled={emailSending || !recipientEmail}
                  onClick={() => handleSendPDF("email")}
                >
                  {emailSending ? "Sending..." : "Email PDF"}
                </button>
              </li>
              <li>
                <button
                  className="btn btn-success w-100"
                  disabled={emailSending}
                  onClick={() => handleSendPDF("whatsapp")}
                >
                  {emailSending ? "Preparing..." : "Share via WhatsApp"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
