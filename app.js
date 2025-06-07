/*==================== PORTFOLIO JAVASCRIPT ====================*/

document.addEventListener('DOMContentLoaded', function() {
    
    /*==================== NAVIGATION FUNCTIONALITY ====================*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show menu
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    // Hide menu
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // Remove menu mobile when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    /*==================== THEME TOGGLE ====================*/
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
    body.setAttribute('data-color-scheme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = body.getAttribute('data-color-scheme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-color-scheme', theme);
        localStorage.setItem('portfolio-theme', theme);
    });

    /*==================== PARTICLE BACKGROUND ====================*/
    function createParticleBackground() {
        const particleContainer = document.getElementById('particle-background');
        const particleCount = 50;

        for(let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            particleContainer.appendChild(particle);
        }
    }

    /*==================== TYPING ANIMATION ====================*/
    function typeWriter() {
        const textElement = document.getElementById('typing-text');
        const texts = [
            'Data Analyst',
            'Full-Stack Developer', 
            'Problem Solver',
            'IIT Ropar Graduate'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            
            if (!isDeleting && charIndex < currentText.length) {
                textElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                setTimeout(type, isDeleting ? 1000 : 2000);
            }
        }

        type();
    }

    /*==================== SMOOTH SCROLLING & ACTIVE NAVIGATION ====================*/
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /*==================== RESUME DOWNLOAD FUNCTIONALITY ====================*/
    function downloadResume() {
        const link = document.createElement('a');
        link.href = 'resume.pdf';
        link.download = 'Samarth_Sharma_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadResume();
        });
    }

    /*==================== PROJECT FILTERING ====================*/
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.projects__filter');
        const projectCards = document.querySelectorAll('.project__card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const cardTags = card.getAttribute('data-tags');
                    
                    if (filterValue === 'all' || cardTags.includes(filterValue)) {
                        card.classList.remove('hide');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hide');
                        setTimeout(() => {
                            if (card.classList.contains('hide')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    /*==================== SKILLS RADAR CHART ====================*/
    function createSkillsRadarChart() {
        const ctx = document.getElementById('skillsRadarChart');
        if (!ctx) return;

        const skillsData = {
            labels: [
                'Programming',
                'Frontend',
                'Backend', 
                'Data Analysis',
                'Tools & Version Control',
                'Problem Solving',
                'Team Collaboration',
                'Communication'
            ],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 78, 88, 85, 95, 90, 85],
                fill: true,
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                borderColor: 'rgba(31, 184, 205, 1)',
                pointBackgroundColor: 'rgba(31, 184, 205, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(31, 184, 205, 1)',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 2
            }]
        };

        const config = {
            type: 'radar',
            data: skillsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 20,
                            display: false
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(245, 245, 245, 0.8)',
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 2
                    }
                }
            }
        };

        new Chart(ctx, config);
    }

    /*==================== PROJECT MODAL ====================*/
    function initProjectModal() {
        const modal = document.getElementById('project-modal');
        const modalContent = document.querySelector('.modal__project-content');
        const closeBtn = document.querySelector('.modal__close');
        const viewDetailsButtons = document.querySelectorAll('.view-details');

        const projectDetails = {
            1: {
                title: 'LearnAI – AI Awareness and Education Website',
                fullDescription: `
                    <div class="modal__project-details">
                        <h3>Project Overview</h3>
                        <p>LearnAI is a comprehensive educational platform designed to bridge the gap between complex AI concepts and everyday understanding. The platform specifically targets non-technical audiences including school students, office workers, and individuals with limited technical backgrounds.</p>
                        
                        <h3>Technical Implementation</h3>
                        <ul>
                            <li><strong>Frontend:</strong> Built with React.js for dynamic user interfaces and component reusability</li>
                            <li><strong>Backend:</strong> Node.js server handling API requests and content management</li>
                            <li><strong>Responsive Design:</strong> Mobile-first CSS approach ensuring accessibility across all devices</li>
                            <li><strong>Performance:</strong> Optimized loading times and smooth user experience</li>
                        </ul>
                        
                        <h3>Key Features</h3>
                        <ul>
                            <li>Interactive tutorial system with progressive learning paths</li>
                            <li>Tool showcase section demonstrating practical AI applications</li>
                            <li>Real-world case studies and examples</li>
                            <li>Accessibility features for users with disabilities</li>
                            <li>Multi-language support capabilities</li>
                        </ul>
                        
                        <h3>Impact & Results</h3>
                        <p>The platform successfully makes AI education accessible to non-technical audiences, helping users understand how AI can be integrated into their daily lives and work processes. The intuitive design and progressive learning approach have proven effective in demystifying complex technological concepts.</p>
                    </div>
                `
            },
            2: {
                title: 'Interactive Particle Simulation with Visual Effects',
                fullDescription: `
                    <div class="modal__project-details">
                        <h3>Project Overview</h3>
                        <p>This physics-based simulation demonstrates fundamental principles of electrostatics through interactive particle dynamics, making complex physics concepts accessible and engaging for educational purposes.</p>
                        
                        <h3>Technical Implementation</h3>
                        <ul>
                            <li><strong>Physics Engine:</strong> Custom implementation of Coulomb's laws and electrostatic force calculations</li>
                            <li><strong>Real-time Calculations:</strong> Optimized algorithms for smooth particle interactions</li>
                            <li><strong>Visual Effects:</strong> Dynamic color-coding based on charge strength and particle properties</li>
                            <li><strong>Performance:</strong> Efficient rendering techniques for real-time visualization</li>
                        </ul>
                        
                        <h3>Scientific Accuracy</h3>
                        <ul>
                            <li>Accurate implementation of electrostatic force equations</li>
                            <li>Realistic particle behavior including attraction and repulsion</li>
                            <li>Educational annotations explaining physical phenomena</li>
                            <li>Customizable parameters for different experimental scenarios</li>
                        </ul>
                        
                        <h3>Educational Value</h3>
                        <p>The simulation serves as an effective educational tool that makes abstract physics concepts tangible and interactive. Students can experiment with different charge configurations and observe the resulting particle behaviors in real-time.</p>
                    </div>
                `
            },
            3: {
                title: 'Plagiarism Detection Using Trie and N-Gram Analysis',
                fullDescription: `
                    <div class="modal__project-details">
                        <h3>Project Overview</h3>
                        <p>A sophisticated plagiarism detection system that identifies textual similarities between documents using advanced algorithmic approaches, specifically designed for academic integrity applications.</p>
                        
                        <h3>Algorithm Design</h3>
                        <ul>
                            <li><strong>Trie Data Structure:</strong> Efficient string storage and retrieval for phrase matching</li>
                            <li><strong>N-gram Analysis:</strong> Context-aware similarity detection using variable-length text sequences</li>
                            <li><strong>Text Preprocessing:</strong> Comprehensive pipeline including tokenization, stemming, and stopword removal</li>
                            <li><strong>Similarity Scoring:</strong> Advanced algorithms with customizable threshold settings</li>
                        </ul>
                        
                        <h3>Performance Optimization</h3>
                        <ul>
                            <li>Scalable architecture capable of handling large document collections</li>
                            <li>Memory-efficient Trie implementation</li>
                            <li>Optimized search algorithms for fast similarity detection</li>
                            <li>Parallel processing capabilities for batch document analysis</li>
                        </ul>
                        
                        <h3>Applications</h3>
                        <p>The system addresses real-world challenges in academic integrity by providing accurate and efficient detection of textual similarities. It's designed to scale from individual document comparisons to institutional-level plagiarism detection systems.</p>
                    </div>
                `
            },
            4: {
                title: 'Customer Spending Analysis and Insights using Python',
                fullDescription: `
                    <div class="modal__project-details">
                        <h3>Project Overview</h3>
                        <p>Comprehensive analysis of customer financial behavior using real-world datasets to uncover actionable business insights and support data-driven decision making processes.</p>
                        
                        <h3>Data Analysis Process</h3>
                        <ul>
                            <li><strong>Data Collection:</strong> Customer acquisition, spending patterns, and repayment trend data</li>
                            <li><strong>Data Cleaning:</strong> Extensive preprocessing to handle missing values and outliers</li>
                            <li><strong>Statistical Analysis:</strong> Advanced statistical methods for pattern recognition</li>
                            <li><strong>Visualization:</strong> Interactive dashboards and comprehensive reporting</li>
                        </ul>
                        
                        <h3>Key Insights Generated</h3>
                        <ul>
                            <li>Customer segmentation based on spending behavior and demographics</li>
                            <li>Age-based spending pattern analysis revealing target market opportunities</li>
                            <li>Profitability analysis with monthly profit calculations</li>
                            <li>Interest rate optimization strategies for different customer segments</li>
                            <li>Customer lifetime value predictions and retention strategies</li>
                        </ul>
                        
                        <h3>Business Impact</h3>
                        <p>The analysis provided actionable recommendations that could improve customer acquisition strategies, optimize marketing campaigns, and enhance customer retention through data-driven insights into spending behaviors and preferences.</p>
                        
                        <h3>Tools & Technologies</h3>
                        <ul>
                            <li>Python for data processing and analysis</li>
                            <li>pandas and NumPy for data manipulation</li>
                            <li>Excel for executive reporting and dashboard creation</li>
                            <li>Statistical libraries for advanced analytics</li>
                        </ul>
                    </div>
                `
            }
        };

        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                const project = projectDetails[projectId];
                
                if (project) {
                    modalContent.innerHTML = `
                        <h2>${project.title}</h2>
                        ${project.fullDescription}
                    `;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    /*==================== CONTACT FORM ====================*/
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name') || document.getElementById('name').value;
                const email = formData.get('email') || document.getElementById('email').value;
                const subject = formData.get('subject') || document.getElementById('subject').value;
                const message = formData.get('message') || document.getElementById('message').value;
                
                // Create mailto link
                const mailtoLink = `mailto:samarthsharma1703@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open email client
                window.open(mailtoLink);
                
                // Show success message
                alert('Thank you for your message! Your email client should open now.');
                
                // Reset form
                contactForm.reset();
            });
        }
    }

    /*==================== SCROLL ANIMATIONS ====================*/
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        const animateElements = document.querySelectorAll('.card, .section');
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill__progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const width = progress.style.width;
                    progress.style.width = '0%';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    /*==================== SCROLL TO TOP ====================*/
    function initScrollToTop() {
        const scrollTop = document.getElementById('scroll-top');
        
        if (scrollTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY >= 560) {
                    scrollTop.classList.add('show');
                } else {
                    scrollTop.classList.remove('show');
                }
            });

            scrollTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    /*==================== HEADER SCROLL EFFECT ====================*/
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80) {
                header.style.backgroundColor = 'rgba(38, 40, 40, 0.95)';
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(38, 40, 40, 0.9)';
                header.style.boxShadow = 'none';
            }
        });
    }

    /*==================== INITIALIZE ALL FUNCTIONS ====================*/
    function init() {
        createParticleBackground();
        typeWriter();
        initProjectFiltering();
        createSkillsRadarChart();
        initProjectModal();
        initContactForm();
        initScrollAnimations();
        initScrollToTop();
        initHeaderScrollEffect();
        
        // Add scroll event listener for navigation
        window.addEventListener('scroll', updateActiveNavLink);
        
        // Initial call to set active nav link
        updateActiveNavLink();
        
        console.log('Portfolio website initialized successfully!');
    }

    /*==================== UTILITY FUNCTIONS ====================*/
    
    // Debounce function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Optimize scroll events with throttling
    const optimizedScrollHandler = throttle(updateActiveNavLink, 100);
    window.addEventListener('scroll', optimizedScrollHandler);

    /*==================== LAZY LOADING FOR IMAGES ====================*/
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /*==================== PERFORMANCE MONITORING ====================*/
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart + 'ms');
            });
        }
    }

    /*==================== ERROR HANDLING ====================*/
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
    });

    // Initialize everything
    init();
    initLazyLoading();
    logPerformance();
    
    /*==================== ADDITIONAL INTERACTIVE FEATURES ====================*/
    
    // Add hover effects for social links
    const socialLinks = document.querySelectorAll('.home__social-link, .footer__social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close modal if open
            const modal = document.getElementById('project-modal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });

    // Add loading states for dynamic content
    function showLoading(element) {
        element.classList.add('loading');
    }

    function hideLoading(element) {
        element.classList.remove('loading');
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalResources = [
            'resume.pdf'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'document';
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources();

    /*==================== SERVICE WORKER REGISTRATION ====================*/
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    /*==================== ANALYTICS AND TRACKING ====================*/
    function trackUserInteraction(action, element) {
        // Placeholder for analytics tracking
        console.log('User interaction:', action, element);
    }

    // Track important user interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            trackUserInteraction('button_click', e.target.textContent);
        }
        if (e.target.classList.contains('nav__link')) {
            trackUserInteraction('navigation_click', e.target.textContent);
        }
    });

    console.log('🚀 Portfolio website fully loaded and interactive!');
});