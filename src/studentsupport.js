import React, { useState, useEffect } from 'react';
import "./style.css";
import { BASE_URL_API } from "./base1";
import { useUser } from './UserContext';

function StudentSupport() {
    const [concerns, setConcerns] = useState([]);
    const [response, setResponse] = useState('');
    const { userId } = useUser();

    // Extracted fetch logic to this function
    const fetchConcerns = () => {
        //fetch(`${BASE_URL_API}/fetch_concerns.php`)
        fetch(`${BASE_URL_API}/fetch-concerns`)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                setConcerns(data.concerns);
            }
        });
    };

    useEffect(() => {
        fetchConcerns();
    }, []);

    const handleResponse = (concern) => {
        const data = {
            email: concern.email,
            message: response.message,
            id: concern.id,
            coordinator_id: userId,
            datetime: new Date().toISOString()
        };
    
        fetch(`${BASE_URL_API}/send_response.php`, {
        //fetch(`${BASE_URL_API}/send-response`, {    
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                alert('Response sent successfully!');
                fetchConcerns(); // Refetch concerns after sending response
            } else {
                alert('Failed to send response.');
            }
        });
    };

    return (
        <div className='specialcontainer'>
            <div className="mainsection">
                <h2>Student Concerns</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Concern/Inquiry</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {concerns.map((concern, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>{concern.name}</td>
                                    <td>{concern.email}</td>
                                    <td>{concern.message}</td>
                                    <td>
                                        <button onClick={() => setResponse(concern)}>
                                            Respond
                                        </button>
                                    </td>
                                </tr>
                                {response && response.id === concern.id && (
                                    <tr>
                                        <td colSpan="4">
                                            <textarea rows="3" placeholder="Type your response..." style={{width: '100%'}} value={response.message} onChange={(e) => setResponse({...response, message: e.target.value})}></textarea>
                                            <button style={{marginTop: '10px'}} onClick={() => handleResponse(concern)}>Submit</button>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentSupport;
