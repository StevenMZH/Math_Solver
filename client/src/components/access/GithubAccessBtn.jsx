import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function GithubAccessBtn () {
    const handleSocialLogin = (provider) => {
        window.location.href = `http://127.0.0.1:8000/auth/social/login/${provider}/`;
    };
    
    return (
            <>
                <button className="google-btn" onClick={() => handleSocialLogin('github')}>Login with Github</button>
                <style>{`
                
                `}</style>
            </>
    );
};

export default GithubAccessBtn;
