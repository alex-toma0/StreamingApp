import { useEffect, useState } from "react";

const Home = (props) => {
    useEffect(() => {
        (
            async () => {
            const response = await fetch('http://localhost:5011/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            });
    }
    )();
        
    
    }, []);
    return (
        <>
        {props.email ? 'Hi' + props.email : 'You are not logged in'};
        </>
    );
};

export default Home;