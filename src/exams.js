import React, { useState, useEffect } from "react";
import { BlobServiceClient } from "@azure/storage-blob";
import { Link } from "react-router-dom";
import "./style.css";
import { BASE_URL_API } from "./base1";
import { useUser } from "./UserContext";

const StudentExams = () => {
  const [exams, setExams] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [submittedExams, setSubmittedExams] = useState([]);
  const { userId } = useUser();
  
  const sasurl = "https://utastorageaccount.blob.core.windows.net/academicfiles?sp=racwdli&st=2023-10-28T20:29:00Z&se=2024-01-02T05:29:00Z&sv=2022-11-02&sr=c&sig=q3ALaFM3qzmcC%2BtiMCGtz0bxSz5WVynN1x9NBAFxsw4%3D";
  const blobServiceClient = new BlobServiceClient(sasurl);
  const containerName = "academicfiles";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  useEffect(() => {
    fetch(`${BASE_URL_API}/fetchStudentExams.php?studentId=${userId}`)
    //fetch(`${BASE_URL_API}/fetchStudentExams/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setExams(data.data);
        } else {
          console.error("Error fetching data:", data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the exam data", error);
      });
  }, [userId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileToBlob = async (file) => {
    const blobName = `${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file);
    return blockBlobClient.url;
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const fileURL = await uploadFileToBlob(selectedFile);
    console.log("File URL after upload:", fileURL);
    setUploadedFileURL(fileURL);
    alert("File uploaded to storage. Please submit to complete the process.");
  };

  const handleSubmit = async (examId) => {
    console.log("File URL during submit:", uploadedFileURL);
    if (!uploadedFileURL) {
      alert("Please upload a file first.");
      return;
    }

    const uploadData = {
      student_id: userId,
      exam_id: examId,
      uploaded_file_url: uploadedFileURL,
    };

    try {
      const response = await fetch(`${BASE_URL_API}/uploadStudentExam.php`, {
      //const response = await fetch(`${BASE_URL_API}/uploadStudentExam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("File details successfully sent!");

        // Add exam ID to the submittedExams array
        setSubmittedExams((prevSubmitted) => [...prevSubmitted, examId]);

        setUploadedFileURL(null); // Reset the URL after submission
      } else {
        alert("There was an error sending the file details. Please try again.");
      }
    } catch (error) {
      console.error("There was an error sending the file details", error);
    }
  };

  return (
    <div className="exam-main-content">
      <div className="mainsection">
        {exams.map((exam) => (
          <div key={exam.exam_id} className="exam-card">
            <h3>
              {exam.exam_name} - {exam.course_name}
            </h3>
            <p>Date: {exam.exam_date}</p>
            <p>Location: {exam.location}, Section: {exam.section}</p>
            <p>Max Marks: {exam.max_marks}</p>
            <Link to={exam.exam_file_url} target="_blank" className="exam-download-link">
              Download Exam
            </Link>
            <div className="exam-upload-section">
              <input type="file" onChange={handleFileChange} disabled={submittedExams.includes(exam.exam_id)} />
              <button onClick={handleFileUpload} className="exam-upload-btn" disabled={submittedExams.includes(exam.exam_id)}>
                Upload to Storage
              </button>
              <button onClick={() => handleSubmit(exam.exam_id)} disabled={submittedExams.includes(exam.exam_id)}>
                {submittedExams.includes(exam.exam_id) ? 'Submitted' : 'Submit File Details'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExams;
