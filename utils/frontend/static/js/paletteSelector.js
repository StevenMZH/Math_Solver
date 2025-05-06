document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    document.getElementById('darkTheme_Button').addEventListener('click', function() {
        console.log('Selected theme: Dark');

        document.body.classList.remove('dark', 'light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    });

    document.getElementById('lightTheme_Button').addEventListener('click', function() {
        console.log('Selected theme: Light');

        document.body.classList.remove('dark', 'light');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    });
});
