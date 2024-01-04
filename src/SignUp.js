import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SignUp = () => {

    useEffect(() => {
        // Add a class to the body when the SignUp component mounts
        document.body.classList.add("signup-body");

        // Cleanup: Remove the class from the body when the SignUp component unmounts
        return () => {
            document.body.classList.remove("signup-body");
        };
    }, []);

    return (
        <main className="signup-main">
            <Header />
            <section className="signup">
                <br/><br/>
                <Link to="/register_student"><button type="button">Register As Student</button></Link>
                <Link to="/register_instructor"><button type="button">Register As Instructor</button></Link>
                <Link to="/register_qa"><button type="button">Register As QA Officer</button></Link>
                <Link to="/register_pc"><button type="button">Register As Program Coordinator</button></Link>
                <Link to="/register_admin"><button type="button">Register As Admin</button></Link>
            </section>
            <Footer />
        </main>
    );
}

export default SignUp;
