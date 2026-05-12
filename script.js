document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. EFEKT HOLO - ŚLEDZENIE MYSZKI
    // ==========================================
    const holoElements = document.querySelectorAll('[data-holo]');
    
    holoElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            // Obliczanie relatywnej pozycji kursora względem elementu
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Przekazanie współrzędnych do CSS jako zmienne
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);
        });
    });

// ==========================================
    // 2. ZMIANA MOTYWU (DARK / LIGHT MODE)
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Pobranie zapisanej preferencji lub wymuszenie 'dark' jako absolutnie domyślnego
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme ? savedTheme : 'dark';
    
    // Aplikacja motywu przy starcie
    root.setAttribute('data-theme', currentTheme);

    themeBtn.addEventListener('click', () => {
        const activeTheme = root.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        // Zmiana atrybutu i zapis do Local Storage
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    // Opcje: animacja odpali się, gdy 15% sekcji wejdzie w viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodanie klasy aktywującej animację CSS
                entry.target.classList.add('active');
                // Opcjonalnie: odpięcie obserwatora po pierwszej animacji (zwiększa wydajność)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Znajdź wszystkie sekcje, dodaj klasę bazową i zacznij obserwować
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
        sectionObserver.observe(section);
    });

    // ==========================================
    // 4. OBSŁUGA MENU MOBILNEGO (HAMBURGER)
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Otwieranie/Zamykanie menu po kliknięciu w hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Automatyczne zamykanie menu po kliknięciu w jakikolwiek link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

});