document.addEventListener('DOMContentLoaded', () => {

    /* 1. Graceful Editorial Reveals */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial trigger for in-viewport elements
    setTimeout(() => {
        document.querySelectorAll('.fade-up, .reveal-title').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('active');
            } else {
                revealObserver.observe(el);
            }
        });
    }, 80);

    /* 2. Soft Smooth Scroll */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.header-arboretum').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* 3. Architectural Tracing (Scroll Indicator) */
    const tracer = document.getElementById('scrollTracer');
    if (tracer) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            tracer.style.height = progress + '%';
        }, { passive: true });
    }

    /* 4. Magnetic Call-to-Action Physics */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* 5. Ambient Artwork Mouse Parallax */
    if (window.innerWidth > 992) {
        const parallaxLayers = [
            { container: '.hero-arboretum', target: '.botanical-art', speed: 12 },
            { container: '.partnership-arboretum', target: '.handshake-art', speed: 10 },
            { container: '.cta-arboretum', target: '.cta-arboretum img', speed: 8 }
        ];

        parallaxLayers.forEach(({ container, target, speed }) => {
            const wrap = document.querySelector(container);
            const art = wrap ? wrap.querySelector(target) : null;
            if (!wrap || !art) return;

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const relX = ((e.clientX - rect.left) / rect.width - 0.5) * speed;
                const relY = ((e.clientY - rect.top) / rect.height - 0.5) * speed;
                art.style.transform = `translate3d(${relX}px, ${relY}px, 0)`;
            });

            wrap.addEventListener('mouseleave', () => {
                art.style.transform = '';
            });
        });
    }

});
