import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { BlobServiceClient } from "@azure/storage-blob";
import "./style.css";
import { BASE_URL_API } from "./base1";
import { useParams } from "react-router-dom";
const ExamDesign = () => {
  const [courses, setCourses] = useState([]);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { userId: contextUserId } = useUser();
  const { instructorId } = useParams();
  const [maxMarks, setMaxMarks] = useState("");
  const [exams, setExams] = useState([]);

  const userId = instructorId || contextUserId;

  const sasurl =
    "https://utastorageaccount.blob.core.windows.net/academicfiles?sp=racwdli&st=2023-10-28T20:29:00Z&se=2024-01-02T05:29:00Z&sv=2022-11-02&sr=c&sig=q3ALaFM3qzmcC%2BtiMCGtz0bxSz5WVynN1x9NBAFxsw4%3D";
  const blobServiceClient = new BlobServiceClient(sasurl);
  const containerName = "academicfiles";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  useEffect(() => {
    fetch(`${BASE_URL_API}/fetchInstructorClasses.php?instructorId=${userId}`)
    //fetch(`${BASE_URL_API}/instructor-classes?instructorId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCourses(data.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the classes data", error);
      });
  }, [userId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFileToBlob = async (file) => {
    const blobName = `${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file);
    console.log(blockBlobClient.url);
    return blockBlobClient.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let fileURL = null;
    if (selectedFile) {
      fileURL = await uploadFileToBlob(selectedFile);
    }

    const examData = {
      instructor_id: userId,
      class_id: event.target["course-id"].value,
      exam_name: examName,
      exam_date: examDate,
      exam_file_url: fileURL,
      max_marks: maxMarks,
    };

    try {
      const response = await fetch(`${BASE_URL_API}/createExam.php`, {
      //const response = await fetch(`${BASE_URL_API}/create-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Exam successfully created!");
      } else {
        alert("There was an error creating the exam. Please try again.");
      }
    } catch (error) {
      console.error("There was an error submitting the form", error);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL_API}/get-exams/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setExams(data.exams);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the exams", error);
      });
  }, [userId]);

  const handleDeleteExam = async (examId) => {
    try {
      const response = await fetch(`${BASE_URL_API}/delete-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ examId: examId }),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("Exam deleted successfully");
        // Remove the deleted exam from the state
        setExams(exams.filter((exam) => exam.exam_id !== examId));
      } else {
        alert("Failed to delete the exam");
      }
    } catch (error) {
      console.error("There was an error deleting the exam", error);
    }
  };

  return (
    <div className="mainsection">
      <h2 className="exam-design-heading">Exam Design</h2>

      <form onSubmit={handleSubmit} className="design-exam-form">
        <label htmlFor="course-select">Course:</label>
        <select id="course-select" name="course-id">
          {courses.map((course) => (
            <option key={course.course_id} value={course.class_id}>
              {course.course_id}
              {course.name}
              {course.section}
            </option>
          ))}
        </select>

        <label htmlFor="exam-name">Exam Name:</label>
        <input
          type="text"
          id="exam-name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <label htmlFor="max-marks">Maximum Marks:</label>
        <input
          type="number"
          id="max-marks"
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
        />

        <label htmlFor="exam-date">Exam Date:</label>
        <input
          type="date"
          id="exam-date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
        />

        <label htmlFor="exam-file">Upload Exam File:</label>
        <input type="file" id="exam-file" onChange={handleFileChange} />

        <button className="btn-submit" type="submit">
          Create Exam
        </button>
      </form>

      <div className="exam-list">
        <h2>Created Exams</h2>
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Class ID</th>
              <th>Date</th>
              <th>Max Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.exam_id}>
                <td>{exam.exam_name}</td>
                <td>{exam.class_id}</td>
                <td>{exam.exam_date}</td>
                <td>{exam.max_marks}</td>
                <td>
                  <a
                    href={exam.exam_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Exam
                  </a>
                  {" | "}
                  <button onClick={() => handleDeleteExam(exam.exam_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamDesign;
