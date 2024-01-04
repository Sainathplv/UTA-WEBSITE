import React from 'react';
import './style.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-address">
                    <p>The University of Texas at Arlington</p>
                    <p>701 S. Nedderman Drive, Arlington, TX, 76019</p>
                    <p>Email: ABC.uta@outlook.com</p>
                    <p>Phone: +1 (682)-272-2011</p>
                </div>

                <div className="footer-social">
                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-pinterest-p"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-snapchat-ghost"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div className="footer-copyright">
                <p>© 2023 The University of Texas at Arlington</p>
                <p>
                    <h3>Note:</h3> All the Front-End Data regarding this website are taken from the UTA official website, <a href="https://www.uta.edu/">https://www.uta.edu</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
