document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slides.length;

    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }
        
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    
    setInterval(() => goToSlide(currentSlide + 1), 5000);

    
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.style.borderColor = 'red';
    }

    function hideError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        input.style.borderColor = '#ddd';
    }

    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            return false;
        }
        hideError(nameInput);
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            return false;
        }
        hideError(emailInput);
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            return false;
        }
        hideError(messageInput);
        return true;
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
});