/**
 * Portfolio Website Interactivity Script
 * Ajay Amala Franklin A | Full Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // 2. Cursor Glow Follower
    const cursorGlow = document.getElementById('cursor-glow');
    window.addEventListener('mousemove', (e) => {
        // Move glow centered to cursor
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // 3. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;

    // Set correct icons initially
    updateThemeIcons();

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeIcons();
    });

    function updateThemeIcons() {
        // Since we are toggling classes on body, icons are controlled by CSS display rules
        // However, we trigger feather replace to verify icons render correctly if dynamic changes occur
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // 4. Mobile Menu Toggle
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    mobileMenuToggle.addEventListener('click', () => {
        navbar.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('menu-open');
        });
    });

    // 5. Sticky Navbar & Scroll Spy (Active Links)
    const sections = document.querySelectorAll('section[id]');
    const navLinksElements = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy active link highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal, .reveal-section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once shown to prevent re-triggering animations
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 7. Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Trigger a tiny animation refresh
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 8. Project Detailed Data (Mock Database for Modal)
    const projectDetails = {
        crm: {
            title: "Mini CRM System",
            category: "Full Stack Development",
            icon: "users",
            description: "A lightweight, secure, and user-friendly Customer Relationship Management (CRM) system designed for small and medium enterprises. It allows business administrators to register leads, track interactive stages (Contacted, In Progress, Closed-Won, Closed-Lost), and assign customer follow-up notes.",
            tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JSON Web Tokens", "REST APIs"],
            features: [
                "User Authentication and Role-based access control (Admin, Agent).",
                "Dynamic pipeline management using interactive drag-and-drop status boards.",
                "Activity tracking logs detailing all communication notes and follow-up alerts.",
                "Custom report generator showcasing monthly client conversions and lead acquisition paths."
            ],
            demoUrl: "#",
            codeUrl: "https://github.com/ajayfranklin-hub"
        },
        business: {
            title: "Local Business Portal",
            category: "Frontend Design",
            icon: "briefcase",
            description: "A modern, highly performant, responsive marketing website created for a boutique local store to enhance their digital footprint. It integrates dynamic product carousels, Google Maps location display, structured customer reviews, and a fully interactive booking calculator.",
            tech: ["HTML5", "Vanilla CSS", "JavaScript ES6", "Flexbox/Grid", "Feather Icons", "Intersection Observer"],
            features: [
                "Mobile-first responsive grids that display elegantly across screen sizes.",
                "Performance-optimized image loading to achieve page speed scores exceeding 95.",
                "Interactive service pricing calculator with custom booking inquiry submissions.",
                "Dynamic FAQs with accordion transitions and smooth hover styling."
            ],
            demoUrl: "#",
            codeUrl: "https://github.com/ajayfranklin-hub"
        },
        portfolio: {
            title: "Premium Developer Portfolio",
            category: "Frontend Interaction",
            icon: "layout",
            description: "This portfolio itself represents an engineering showcase. Designed from scratch with pure HTML, custom variables CSS, and modular vanilla JavaScript, it avoids bulk templates and heavy UI libraries to guarantee instantaneous load performance.",
            tech: ["HTML5", "CSS Custom Variables", "Vanilla JS", "Feather Vector Icons", "Intersection Observer API"],
            features: [
                "Persisted theme variables providing smooth, customized Light and Dark modes.",
                "Mouse-tracking radial glow backdrop filter that creates depth on modern screens.",
                "Dynamic modal content loading and custom element animation triggers.",
                "Custom layout grids and CSS-only timeline diagrams."
            ],
            demoUrl: "#",
            codeUrl: "https://github.com/ajayfranklin-hub"
        }
    };

    // 9. Interactive Project Modal Mechanics
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = modalOverlay.querySelector('.modal-close');
    const modalContent = document.getElementById('modal-detail-content');

    // Attach click events to open modals
    projectCards.forEach(card => {
        const detailBtn = card.querySelector('.open-modal-btn');
        const projectId = card.getAttribute('data-project-id');

        detailBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card bubble
            openProjectModal(projectId);
        });
    });

    function openProjectModal(id) {
        const data = projectDetails[id];
        if (!data) return;

        // Create tech tags HTML
        const techTagsHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

        // Create features list HTML
        const featuresHTML = data.features.map(f => `
            <li>
                <i data-feather="check"></i>
                <span>${f}</span>
            </li>
        `).join('');

        // Inject content
        modalContent.innerHTML = `
            <div class="modal-header-section">
                <span class="modal-badge">${data.category}</span>
                <h2>${data.title}</h2>
                <div class="modal-meta-tags">
                    ${techTagsHTML}
                </div>
            </div>

            <div class="modal-img-mockup">
                <i data-feather="${data.icon}" class="placeholder-icon"></i>
            </div>

            <div class="modal-body">
                <div>
                    <h3 class="modal-section-title">Project Overview</h3>
                    <p>${data.description}</p>
                </div>

                <div>
                    <h3 class="modal-section-title">Key Implementations</h3>
                    <ul class="modal-features-list">
                        ${featuresHTML}
                    </ul>
                </div>

                <div class="modal-actions">
                    <a href="${data.codeUrl}" target="_blank" rel="noopener" class="btn btn-outline">
                        <i data-feather="github"></i>
                        <span>View Source Code</span>
                    </a>
                    <button class="btn btn-primary" onclick="alert('Demo server link placeholder.')">
                        <i data-feather="external-link"></i>
                        <span>Live Preview</span>
                    </button>
                </div>
            </div>
        `;

        // Trigger feather icon replacement inside the modal
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Show Modal
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeProjectModal() {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        body.style.overflow = ''; // Unlock scroll
    }

    // Modal Close Triggers
    modalCloseBtn.addEventListener('click', closeProjectModal);
    
    modalOverlay.addEventListener('click', (e) => {
        // Close if click is outside the container
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });

    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
            closeProjectModal();
        }
    });

    // 10. Contact Form Submission simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const subjectInput = document.getElementById('subject').value;
        const messageInput = document.getElementById('message').value;

        // Basic sanity checks
        if (!nameInput || !emailInput || !subjectInput || !messageInput) {
            showFormFeedback("Please fill out all fields.", "error");
            return;
        }

        // Show simulated loading status on the button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const origBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <i data-feather="loader" class="animate-spin"></i>
        `;
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Simulate network latency (1.5 seconds)
        setTimeout(() => {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Success feedback
            showFormFeedback(`Thank you, ${nameInput}! Your message has been sent successfully.`, "success");
            
            // Reset fields
            contactForm.reset();

            // Clear feedback after 5 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 6000);

        }, 1500);
    });

    function showFormFeedback(msg, type) {
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.style.display = 'block';
    }
});
