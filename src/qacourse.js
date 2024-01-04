import React, { useState, useEffect } from "react";
import "./style.css";
import { BASE_URL_API } from "./base1";

const ReviewCourseContent = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL_API}/getreviewcourses.php`)
        //fetch(`${BASE_URL_API}/review-courses`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setCourses(data.courses);
                } else {
                    throw new Error(data.message || "Failed to fetch courses");
                }
            })
            .catch((err) => {
                console.error("Error fetching courses:", err);
                setError(err.message);
            });
    }, []);

    return (
        <div className="mainsection">
            <h2>Fall 2023</h2>

            {error && (
                <div className="error-message">
                    <p>Error fetching courses. Please try again later.</p>
                </div>
            )}

            <div className="grid-container">
                {courses.map((course) => course.classes.map((courseClass) => (
                    <div className="course-card" key={courseClass.class_id}>
                        <h3>{course.id}</h3>
                        <h3>{course.title}</h3>
                        <h4>Class ID: {courseClass.class_id}</h4>
                        <p>{courseClass.professor || 'Professor not assigned'}</p>
                        <p>Location: {courseClass.building || 'Not specified'}</p>
                        {courseClass.syllabus && <a href={courseClass.syllabus} target="_blank" rel="noopener noreferrer" download>Download Syllabus</a>}
                    </div>
                )))}
            </div>
        </div>
    );
};

export default ReviewCourseContent;
