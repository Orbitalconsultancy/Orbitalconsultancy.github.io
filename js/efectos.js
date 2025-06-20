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
});
