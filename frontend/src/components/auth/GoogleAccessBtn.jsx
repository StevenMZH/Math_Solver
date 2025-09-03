// GoogleAccessBtn.jsx
function GoogleAccessBtn() {
    const handleGoogleLogin = () => {
      const clientId = "966493847250-hglfvkd9dicq5eadghj7pteje00f3mrn.apps.googleusercontent.com";
      const redirectUri = "http://localhost:5173/google-callback"; // Debe coincidir con lo registrado en Google Console
      const scope = "openid profile email";
      const responseType = "token id_token";
      const state = "random_state_value"; // Para seguridad opcional
      const nonce = "random_nonce"; // Obligatorio para seguridad
  
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&nonce=${nonce}&prompt=select_account`;
  
      // Redirigir a Google en la misma ventana
      window.location.href = url;
    };
  
    return (
        <>
            <button type="button" className="login-with-google-btn" onClick={handleGoogleLogin}>
                Sign in with Google
            </button>
        
        
            <style>{`
                .login-with-google-btn {
                    transition: background-color .3s, box-shadow .3s;

                    width: 100%;
                    padding: 12px 16px 12px 42px;
                    border: none;
                    border-radius: 3px;
                    
                    color: #757575;
                    font-size: 14px;
                    font-weight: 500;
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
                    
                    background-image: url(/images/global/google.svg);
                    background-color: white;
                    background-repeat: no-repeat;
                    background-position: 12px 11px;
                                
                    &:hover {
                        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
                    }
                    
                    &:active {
                        background-color: #eeeeee;
                    }
                    
                    &:focus {
                        outline: none;
                        box-shadow: 
                        0 -1px 0 rgba(0, 0, 0, .04),
                        0 2px 4px rgba(0, 0, 0, .25),
                        0 0 0 3px #c8dafc;
                    }
                    
                    &:disabled {
                        filter: grayscale(100%);
                        background-color: #ebebeb;
                        box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
                        cursor: not-allowed;
                    }
                }

                .dark .login-with-google-btn {
                    color: var(--text_subtitle);
                    background-color: var(--button);

                    &:hover {
                        background-color: var(--button_hover);
                    }
                }
            `}</style>
        </>
    );
  }
  
  export default GoogleAccessBtn;