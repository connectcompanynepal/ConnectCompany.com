// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 600);
});

// ===== Navbar =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('href') === '#' + id) l.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', highlightNav);

// ===== Counter Animation =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        update();
    });
}

const heroStats = document.querySelector('.hero-stats');
let counterAnimated = false;
if (heroStats) {
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 }).observe(heroStats);
}

// ===== Service Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// ===== Gallery Filter =====
const galleryFilterBtns = document.querySelectorAll('[data-gfilter]');
const galleryCards = document.querySelectorAll('.gallery-card');

galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-gfilter');

        galleryCards.forEach(card => {
            const category = card.getAttribute('data-gcategory');
            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// ===== Gallery Lightbox =====
const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-zoom').forEach(zoom => {
    zoom.addEventListener('click', (e) => {
        e.stopPropagation();
        const img = zoom.closest('.gallery-card').querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// ===== Scroll Animations =====
function addAnimationClasses() {
    const selectors = [
        '.service-card', '.industry-card', '.why-card', '.mvv-card',
        '.process-step', '.insight-card', '.faq-item', '.trend-card',
        '.stat-card', '.partner-logo', '.mini-card', '.highlight',
        '.about-content', '.about-visual', '.landscape-content', '.landscape-visual',
        '.gallery-card', '.blog-card', '.client-item'
    ];
    document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });
}
addAnimationClasses();

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ===== Contact Form (EmailJS) =====
(function() {
    emailjs.init('YOUR_PUBLIC_KEY');
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const formMessage = document.getElementById('formMessage');
    const original = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value,
        to_email: 'connectcompany1991@gmail.com'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function() {
            btn.innerHTML = '<span>Message Sent Successfully!</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00e5a0, #00c2ff)';
            formMessage.textContent = 'Thank you! Your message has been sent. We will contact you shortly.';
            formMessage.className = 'form-message success';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                document.getElementById('contactForm').reset();
            }, 3000);
        })
        .catch(function(error) {
            btn.innerHTML = '<span>Failed to Send</span><i class="fas fa-times"></i>';
            btn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
            formMessage.textContent = 'Sorry, something went wrong. Please try again or email us directly at connectcompany1991@gmail.com';
            formMessage.className = 'form-message error';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
});

// ===== Newsletter Form =====
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    const input = this.querySelector('input');
    btn.textContent = 'Subscribed!';
    btn.style.background = 'var(--accent)';
    input.value = '';
    setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
    }, 2500);
});

// ===== Cookie Notice =====
const cookieNotice = document.getElementById('cookieNotice');
const cookieAccept = document.getElementById('cookieAccept');
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => { cookieNotice.classList.add('visible'); }, 2000);
}
cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieNotice.classList.remove('visible');
});

// ===== Smooth scroll (fast & smooth) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===== Parallax subtle on hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-glow');
    if (hero && window.scrollY < 800) {
        hero.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.15}px))`;
    }
});

// ===== Service card hover tilt =====
document.querySelectorAll('.service-card, .industry-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});