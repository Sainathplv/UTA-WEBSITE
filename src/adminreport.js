// ManageReports.js
import React, { useState, useEffect} from 'react';
import styles from "./Adminreport.module.css";
import { BASE_URL_API } from "./base1";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
const ManageReports = () => {
    const [selectedTable, setSelectedTable] = useState('students');
    const [selectedColumns, setSelectedColumns] = useState([]); // Columns to include in report
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50); // Number of records per page

    const handleGenerateReport = () => {
        const columns = selectedColumns.join(',');
        const url = `${BASE_URL_API}/generate-report.php?table=${selectedTable}&columns=${columns}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
        //const url = `${BASE_URL_API}/generate-report?table=${selectedTable}&columns=${columns}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`;
        window.location.href = url;
    };

    const [enrollmentData, setEnrollmentData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    });

    useEffect(() => {
        // Fetch data for the pie chart
        fetch(`${BASE_URL_API}/getSemesterEnrollmentData.php`)
        //fetch(`${BASE_URL_API}/getSemesterEnrollmentData`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setEnrollmentData({
                        labels: data.labels,
                        datasets: [{
                            data: data.values,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                        }]
                    });
                }
            })
            .catch(err => console.error('Error fetching semester data:', err));
    }, []);
    



    const columnsOptions = {
        students: ['user_id', 'enrollmentYear', 'enrollmentSeason'],
        instructors: ['instructor_id', 'start_date'],
        admins: ['admin_id', 'start_date', 'experience'],
        courses: ['course_id', 'course_name', 'Program_code'],
        // Add more as needed
    };

    return (
        <div className={styles.managereportscontainer}>
            <div>
                <label>
                    Choose Table:
                    <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                        <option value="students">Students</option>
                        <option value="instructors">Instructors</option>
                        <option value="admins">Admins</option>
                        <option value="courses">Courses</option>
                    </select>
                </label>
                <label>
                    Columns (Multiple select):
                    <select multiple value={selectedColumns} onChange={e => setSelectedColumns([...e.target.options].filter(option => option.selected).map(option => option.value))}>
                        {columnsOptions[selectedTable].map(column => (
                            <option key={column} value={column}>{column}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Page:
                    <input type="number" value={page} onChange={e => setPage(e.target.value)} />
                </label>
                <label>
                    Records Per Page:
                    <input type="number" value={limit} onChange={e => setLimit(e.target.value)} />
                </label>
            </div>
            <div>
                <button onClick={handleGenerateReport}>Generate and Download Report</button>
            </div>

            <div className={styles.chartContainer}>
                <h2 className={styles.chartTitle}>Enrollment Data</h2>
                <div className={styles.chart}>
                <Pie data={enrollmentData} />
                </div>
            </div>
        </div>
    );
}

export default ManageReports;
