
export function GithubAccessBtn () {
    const handleSocialLogin = (provider) => {
        window.location.href = `${window._env_.REACT_APP_API_URL}/auth/social/login/${provider}/`;
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
