import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Client, Account } from 'appwrite';

const GoogleAccessBtn = () => {
    // Configurar Appwrite
    const client = new Client();
    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Cambia si usas otro endpoint
        .setProject('67e909bb0039fc3b8366'); // Reemplázalo con tu ID de proyecto

    const account = new Account(client);

    const handleGoogleLogin = async (response) => {
        if (!response.credential) {
            console.error("No se recibió el token de Google");
            return;
        }

        try {
            // Enviar el token de Google a Appwrite para iniciar sesión
            const session = await account.createOAuth2Session(
                "google", 
                window.location.origin, 
                window.location.origin
            );

            console.log("Sesión iniciada en Appwrite:", session);

            // Obtener el JWT después de la autenticación
            const jwt = await account.createJWT();
            console.log("Token JWT de Appwrite:", jwt.jwt);

            // Guardar el token en localStorage
            localStorage.setItem("token", jwt.jwt);
        } catch (error) {
            console.error("Error autenticando con Appwrite:", error);
        }
    };

    const handleError = () => {
        console.log("Error en el login de Google");
    };

    return (
        <GoogleOAuthProvider clientId="966493847250-hglfvkd9dicq5eadghj7pteje00f3mrn.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleError}
                useOneTap
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAccessBtn;
