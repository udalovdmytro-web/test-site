// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к секциям
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Добавляем анимацию к карточкам услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Обработка формы контактов
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }
            
            // Имитация отправки (в реальном проекте здесь будет AJAX запрос)
            alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }

    // Добавляем эффект параллакса для hero секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Мобильное меню (если нужно)
    const createMobileMenu = () => {
        const header = document.querySelector('header nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Создаем кнопку мобильного меню
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        header.appendChild(mobileMenuBtn);
        
        // Показываем кнопку на мобильных устройствах
        const checkMobile = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navLinks.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                navLinks.style.display = 'flex';
            }
        };
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
        
        // Обработка клика по кнопке
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'none') {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                navLinks.style.padding = '1rem';
            } else {
                navLinks.style.display = 'none';
            }
        });
    };
    
    createMobileMenu();
});

// Добавляем эффект печатания для заголовка
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Применяем эффект печатания к заголовку hero секции
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

