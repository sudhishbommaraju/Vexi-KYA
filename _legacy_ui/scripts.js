document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealElements = document.querySelectorAll('.reveal');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    // Floating Icons BG in Hero (Subtle tech elements)
    const floatContainer = document.getElementById('floating-icons');
    if (floatContainer) {
        const iconPaths = [
            '<rect width="24" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-width="2"/>',
            '<line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/>'
        ];

        for (let i = 0; i < 15; i++) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('width', Math.random() * 20 + 20);
            svg.setAttribute('height', Math.random() * 20 + 20);
            svg.classList.add('float-icon');
            
            // Random positioning
            svg.style.left = `${Math.random() * 100}%`;
            svg.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay
            svg.style.animationDelay = `${Math.random() * 10}s`;
            svg.style.animationDuration = `${Math.random() * 20 + 15}s`;
            
            svg.innerHTML = iconPaths[Math.floor(Math.random() * iconPaths.length)];
            floatContainer.appendChild(svg);
        }
    }

    // Dashboard navigation logic
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const pages = document.querySelectorAll('.page-content');

    if (navItems.length > 0 && pages.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target');
                
                // Update active state in nav
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Update active page
                pages.forEach(page => {
                    if (page.id === targetId) {
                        page.classList.remove('hidden');
                        // Trigger reveal animations inside the page
                        const pageReveals = page.querySelectorAll('.reveal');
                        pageReveals.forEach(el => {
                            el.classList.remove('active');
                            // Small delay to allow CSS transition to reset
                            setTimeout(() => {
                                el.classList.add('active');
                            }, 10);
                        });
                    } else {
                        page.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Modal behavior
    const createBtn = document.getElementById('createBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('closeModal');

    if (createBtn && modalBackdrop) {
        createBtn.addEventListener('click', () => {
            modalBackdrop.classList.add('active');
            // Populate modal depending on active section logic could go here
        });

        const closeModal = () => modalBackdrop.classList.remove('active');

        closeBtn?.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Copy token to clipboard
    window.copyToClipboard = function(text, btnElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = btnElement.innerHTML;
            btnElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
            }, 2000);
        });
    };
});
