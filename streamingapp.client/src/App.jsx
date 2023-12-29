import NavbarComponent from "../components/NavbarComponent";
import {Route,Routes } from "react-router-dom"
import { useState, useEffect } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
function App() {
    const [email, setEmail] = useState('');
    useEffect(() => {
        (
            async () => {
            const response = await fetch('http://localhost:5011/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            });
            const content = await response.json();
            setEmail(content.email);
    }
    )();
        
    
    }, []);

    return (
        <>
            <NavbarComponent email={email} setEmail={setEmail}/>
            <>
                <Routes>
                    <Route path="/" element={<Home email={email} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setEmail = {setEmail} />} />
                </Routes>
            </>
        </>
    );
    
   
}

export default App;