import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function GoogleCallback() {
    const navigate = useNavigate();
    const alreadyProcessed = useRef(false);

    useEffect(() => {
        if (alreadyProcessed.current) return;
        alreadyProcessed.current = true;

        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace("#", ""));

        const id_token = params.get("id_token");
        const access_token = params.get("access_token");

        if (id_token) {
            const decoded = jwtDecode(id_token);
            console.log("Usuario autenticado:", decoded);

            // Guardar temporalmente el id_token (Google)
            localStorage.setItem("google_id_token", id_token);

            axios
                .post("http://127.0.0.1:8000/account/auth/google/", {
                    access_token,
                    id_token,
                })
                .then((res) => {
                    const { access, refresh, user } = res.data;

                    localStorage.setItem("accessToken", access);
                    localStorage.setItem("refreshToken", refresh);
                    window.location.href = "/profile";
                })
                .catch((err) => {
                    console.error("Error al autenticar con el backend", err);
                });

        } else {
            console.error("Token no encontrado en la URL");
        }
    }, []);

    return null; // No necesitas renderizar nada
}

export default GoogleCallback;
