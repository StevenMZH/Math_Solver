const I18n = (function() {
    const defaultLang = 'en';  // Idioma predeterminado
    let currentLang = defaultLang;
    const translationsPath = '../static/lang/';  // Ruta a los archivos de traducción

    // Cargar las traducciones desde un archivo JSON
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`${translationsPath}${lang}.json`);
            if (!response.ok) {
                throw new Error(`No se pudieron cargar las traducciones para el idioma: ${lang}`);
            }
            const translations = await response.json();
            return translations;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    // Aplicar las traducciones a los elementos con el atributo data-lang-key
    async function applyTranslations(lang) {
        const translations = await loadTranslations(lang);
        if (!translations) return;

        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const keys = element.getAttribute('data-lang-key').split('.');
            let text = translations;

            // Navega por los objetos para obtener la traducción correcta
            keys.forEach(key => {
                text = text[key];
                if (text === undefined) {
                    console.warn(`Falta la traducción para la clave: ${key}`);
                    text = '';
                }
            });

            // Aplicar el texto traducido según el tipo de elemento
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                if (element.type === 'button' || element.type === 'submit') {
                    element.value = text;
                } else {
                    element.placeholder = text;
                }
            } else if (element.tagName.toLowerCase() === 'meta') {
                element.setAttribute('content', text);
            } else {
                element.textContent = text;
            }
        });
    }

    // Detectar el idioma del navegador
    function detectBrowserLanguage() {
        const lang = navigator.language || navigator.userLanguage;
        const shortLang = lang.split('-')[0];
        const supportedLangs = ['en', 'es']; // Añade más idiomas según tus archivos JSON
        return supportedLangs.includes(shortLang) ? shortLang : defaultLang;
    }

    // Inicializar el sistema de traducción
    async function init() {
        const savedLang = localStorage.getItem('preferredLanguage') || detectBrowserLanguage();
        currentLang = savedLang;
        document.getElementById('language-selector').value = currentLang;
        await applyTranslations(currentLang);
    }

    // Cambiar el idioma y aplicar las traducciones
    async function changeLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        await applyTranslations(lang);
    }

    // Función expuesta globalmente para cambiar el idioma
    window.updateLanguage = async function(lang) {
        await changeLanguage(lang);
    };

    // Configurar el evento del selector de idioma
    function setupEventListeners() {
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                updateLanguage(e.target.value);
            });
        }
    }

    return {
        init,
        changeLanguage,
        setupEventListeners
    };
})();

// Iniciar el sistema de traducción al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    I18n.init();  // Inicializa y aplica las traducciones
    I18n.setupEventListeners();  // Configura el selector de idiomas
});
