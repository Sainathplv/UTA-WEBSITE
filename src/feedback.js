import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { BlobServiceClient } from "@azure/storage-blob";
import "./style.css";
import { BASE_URL_API } from "./base1";
import { useParams } from 'react-router-dom';

const StudentFeedback= () => {
    const [courses, setCourses] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const { userId: contextUserId } = useUser();
    const { instructorId } = useParams();
    const userId = instructorId || contextUserId;

    const sasurl = "https://utastorageaccount.blob.core.windows.net/academicfiles?sp=racwdli&st=2023-10-28T20:29:00Z&se=2024-01-02T05:29:00Z&sv=2022-11-02&sr=c&sig=q3ALaFM3qzmcC%2BtiMCGtz0bxSz5WVynN1x9NBAFxsw4%3D";  // your SAS URL here
    const blobServiceClient = new BlobServiceClient(sasurl);
    const containerName = "academicfiles"; 
    const containerClient = blobServiceClient.getContainerClient(containerName);

    useEffect(() => {
        //fetch(`${BASE_URL_API}/fetchInstructorClasses.php?instructorId=${userId}`)
        fetch(`${BASE_URL_API}/instructor-classes?instructorId=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setCourses(data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching the classes data', error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        let fileURL = null;

        if (selectedFile) {
            fileURL = await uploadFileToBlob(selectedFile);
        }

        const contentData = {
            instructor_id: userId,
            class_id: event.target['course-id'].value,
            syllabus_link: fileURL
        };

        try {
            //const response = await fetch(`${BASE_URL_API}/updateSyllabusLink.php`, {
            const response = await fetch(`${BASE_URL_API}/update-syllabus-link`, {    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contentData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert("Syllabus uploaded successfully!");
            } else {
                alert("Error uploading the syllabus. Please try again.");
            }
        } catch (error) {
            console.error('Error submitting the form', error);
        }
    };

    return (
        <div className="mainsection">
            
            <h2 className="course-content-heading">Course Content Creation</h2>
            
            <form onSubmit={handleSubmit} className="course-content-form">
                <label htmlFor="course-select">Course:</label>
                <select id="course-select" name="course-id">
                    {courses.map(course => (
                        <option key={course.course_id} value={course.class_id}>
                            {course.course_id}{course.name}{course.section}
                        </option>
                    ))}
                </select>

                <label htmlFor="syllabus-file">Upload Syllabus:</label>
                <input type="file" id="syllabus-file" onChange={handleFileChange} />

                <button className="btn-submit" type="submit">Upload Syllabus</button>
            </form>
            
        </div>
    );
}

export default StudentFeedback;
