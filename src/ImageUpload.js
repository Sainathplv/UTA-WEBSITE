import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import styles from './ImageUpload.module.css';
import { Link} from "react-router-dom";
import { BASE_URL_API } from "./base";

const FileUpload = () => {
    const [imageFile, setImageFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    //const [transcription, setTranscription] = useState('');
    const [transcriptionResult, setTranscriptionResult] = useState({
        transcript: '',
        confidence: 0
    });

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setAudioFile(null); // Ensure audio file is cleared when image is set
    };

    const handleAudioChange = (e) => {
        setAudioFile(e.target.files[0]);
        setImageFile(null); // Ensure image file is cleared when audio is set
    };

    const handleImageSubmit = async () => {
        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            const response = await axios.post(`${BASE_URL_API}/ocr_backend.php`, formData);
            console.log('OCR Text:', response.data);
            if (response.data.text) {
                alert('OCR Text: ' + response.data.text);
                // Create a new PDF with jspdf and add the OCR text to it
                const pdf = new jsPDF();
                pdf.text(response.data.text, 10, 10);
                // Save the PDF to the client's device
                pdf.save('ocr-result.pdf');
            } else {
                alert('No text found in image.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error in OCR processing');
        }
    };

    const handleAudioSubmit = async () => {
        if (!audioFile) {
            alert('Please select an audio file.');
            return;
        }

        const formData = new FormData();
        formData.append('audioFile', audioFile);

        try {
            const response = await axios.post(`${BASE_URL_API}/speechtotext.php`, formData);
            console.log('Speech to Text result:', response.data);
            //alert('Transcription: ' + response.data.transcription);
            if (response.data.results && response.data.results.length > 0) {
                const transcriptData = response.data.results[0].alternatives[0];
                setTranscriptionResult({
                    transcript: transcriptData.transcript,
                    confidence: transcriptData.confidence
                });
                alert('Transcription: ' + transcriptData.transcript + '\nConfidence: ' + transcriptData.confidence);
            } else {
                setTranscriptionResult({ transcript: '', confidence: 0 });
                alert('No transcription found.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error in audio processing');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Media Transcription Service</h1>
            <p>Convert your images and audio to text with ease.</p>
            <h2>Image to Text Conversion</h2>
            <div className={styles.uploadSection}>
                <input type="file" className={styles.fileInput} onChange={handleImageChange} accept="image/*" />
                <button className={styles.button} onClick={handleImageSubmit}>Convert Image to Text</button>
            </div>
            <h2>Audio to Text Conversion</h2>
            <div className={styles.uploadSection}>
                <input type="file" className={styles.fileInput} onChange={handleAudioChange} accept="audio/*" />
                <button className={styles.button} onClick={handleAudioSubmit}>Convert Audio to Text</button>
                {transcriptionResult.transcript && (
                <div className={styles.results}>
                    <h3>Transcription Result:</h3>
                    <p>{transcriptionResult.transcript}</p>
                    <p>Confidence: {transcriptionResult.confidence}</p>
                </div>
                )}
            </div>
            <Link to="/" className={styles.link}>Back to Homepage</Link>
        </div>
    );
};

export default FileUpload;
