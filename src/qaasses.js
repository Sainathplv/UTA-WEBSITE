import React, { useState} from 'react';
import "./style.css";
import { BASE_URL_API } from "./base1";

const ManagementAssessment = () => {
    const [classID, setClassID] = useState('');
    const [courseDetails, setCourseDetails] = useState({});
    const [exams, setExams] = useState([]);

    const fetchCourseDetailsAndExams = async () => {
        try {
            const responseCourse = await fetch(`${BASE_URL_API}/getqaasses.php?classID=${classID}`);
            //const responseCourse = await fetch(`${BASE_URL_API}/course-details?classID=${classID}`);
            const dataCourse = await responseCourse.json();
            setCourseDetails(dataCourse.courseDetails); // Adjusted here

            const responseExams = await fetch(`${BASE_URL_API}/getExamsForClass.php?classID=${classID}`);
            //const responseExams = await fetch(`${BASE_URL_API}/class-exams?classID=${classID}`);
            const dataExams = await responseExams.json();
            setExams(dataExams.exams); // Adjusted here
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className='specialcontainer'>
            <div className='mainsection'>
                <h1 className="center">Search Class</h1>
                <input 
                    type="text" 
                    placeholder="Enter Class ID" 
                    value={classID} 
                    onChange={e => setClassID(e.target.value)} 
                />
                <button onClick={fetchCourseDetailsAndExams}>Search</button>

                {courseDetails.course_name && (
                    <div>
                        <h2>Course Details:</h2>
                        <p>Course Name: {courseDetails.course_name}</p>
                        <p>Instructor: {courseDetails.instructor_name}</p>
                        <p>Class ID: {courseDetails.class_id}</p>
                    </div>
                )}

                <h1 className="center">Exams List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Exam Date</th>
                            <th>Max Marks</th>
                            <th>Exam File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.map((exam, index) => (
                            <tr key={index}>
                                <td>{exam.exam_name}</td>
                                <td>{exam.exam_date}</td>
                                <td>{exam.max_marks}</td>
                                <td><a href={exam.exam_file_url} target="_blank" rel="noopener noreferrer">View Exam</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagementAssessment;
