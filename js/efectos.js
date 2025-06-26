// Efectos visuales sencillos para animaciones al hacer scroll y hover

document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos al hacer scroll
    const animados = document.querySelectorAll('.servicios-web, .servicios-ia, .anuncio, .servicios-consultoria, .quienes-somos');
    function mostrarAnimados() {
        animados.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', mostrarAnimados);
    mostrarAnimados();

    // Efecto de parpadeo en el anuncio
    const anuncio = document.querySelector('.anuncio-titulo');
    if(anuncio) {
        setInterval(() => {
            anuncio.classList.toggle('parpadeo');
        }, 1200);
    }

    // Animación de fade-in para elementos con la clase fade-in
    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = 1;
        }, 600 + i * 300);
    });

    // Animación de fade-in para elementos con la clase animate-fadein (hero y logos)
    const fadeInEls = document.querySelectorAll('.animate-fadein');
    fadeInEls.forEach((el, i) => {
        let delay = 0;
        // Si el elemento tiene animation-delay en el style, úsalo
        const styleDelay = el.style.animationDelay;
        if (styleDelay && styleDelay.includes('s')) {
            delay = parseFloat(styleDelay) * 1000;
        } else {
            delay = 400 + i * 200;
        }
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0) scale(1)';
        }, delay);
    });

    // Navegación activa
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 80;
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if(section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Efecto smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contador animado
    const contadores = document.querySelectorAll('.contador');
    contadores.forEach(contador => {
        const actualizar = () => {
            const objetivo = +contador.getAttribute('data-numero');
            let actual = +contador.innerText;
            const incremento = Math.ceil(objetivo / 60);
            if(actual < objetivo) {
                contador.innerText = actual + incremento;
                setTimeout(actualizar, 30);
            } else {
                contador.innerText = objetivo;
            }
        };
        actualizar();
    });

    // FAQ acordeón
    const preguntas = document.querySelectorAll('.faq-pregunta');
    preguntas.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
        });
    });

    // Modal video
    const btnVideo = document.querySelector('.btn-video');
    const modalVideo = document.querySelector('.modal-video');
    const cerrarModal = document.querySelector('.cerrar-modal');
    if(btnVideo && modalVideo && cerrarModal) {
        btnVideo.addEventListener('click', () => {
            modalVideo.style.display = 'flex';
        });
        cerrarModal.addEventListener('click', () => {
            modalVideo.style.display = 'none';
        });
        modalVideo.addEventListener('click', (e) => {
            if(e.target === modalVideo) modalVideo.style.display = 'none';
        });
    }

    // --- Lógica SPA: mostrar/ocultar secciones sin recargar la página ---
    const spaSections = document.querySelectorAll('.spa-section');
    const spaNavLinks = document.querySelectorAll('.nav-link[data-section]');

    function mostrarSeccionSPA(id) {
        spaSections.forEach(sec => {
            if (sec.id === id) {
                sec.style.display = '';
            } else {
                sec.style.display = 'none';
            }
        });
        spaNavLinks.forEach(link => {
            if (link.getAttribute('data-section') === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    spaNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.getAttribute('data-section');
            mostrarSeccionSPA(seccion);
        });
    });

    // Mostrar la sección de inicio por defecto al cargar
    mostrarSeccionSPA('inicio');

    // Microinteracción: scroll suave al hacer click en beneficio del inicio
    const linksBeneficio = document.querySelectorAll('.link-beneficio');
    linksBeneficio.forEach(el => {
        el.addEventListener('click', function() {
            const target = document.querySelector(this.dataset.target);
            if(target) {
                target.style.display = '';
                window.scrollTo({
                    top: target.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
});
