/**
 * Grade 3: Tailwind + Modular GSAP Portfolio Demo
 * ES Modules pattern (compatible with Vite build)
 *
 * In a real Vite project, you would:
 * - npm install gsap
 * - import gsap from 'gsap'
 * - import { ScrollTrigger } from 'gsap/ScrollTrigger'
 */

// ==========================================================================
// 1. Configuration
// ==========================================================================

const config = {
	reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
	breakpoints: {
		sm: 640,
		md: 768,
		lg: 1024,
	},
};

// ==========================================================================
// 2. Animation Module
// ==========================================================================

const animations = {
	/**
	 * Initialize GSAP and register plugins
	 */
	init() {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

		if (config.reducedMotion) {
			console.log('⚠️ Reduced motion preference detected — animations disabled');
			this.showAllElements();
			return;
		}

		this.initFadeUp();
		this.initParallax();
		this.initProjectCards();

		console.log('✨ Animations initialized');
	},

	/**
	 * Show all animated elements immediately (for reduced motion)
	 */
	showAllElements() {
		document.querySelectorAll('[data-animate]').forEach((el) => {
			el.style.opacity = '1';
			el.style.transform = 'none';
		});
	},

	/**
	 * Fade-up animations for elements with data-animate="fade-up"
	 */
	initFadeUp() {
		const elements = gsap.utils.toArray('[data-animate="fade-up"]');

		elements.forEach((el, index) => {
			// Set initial state
			gsap.set(el, { opacity: 0, y: 40 });

			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none none',
				},
			});
		});
	},

	/**
	 * Parallax effect for elements with data-parallax attribute
	 */
	initParallax() {
		const parallaxElements = document.querySelectorAll('[data-parallax]');

		parallaxElements.forEach((el) => {
			const speed = parseFloat(el.dataset.parallax) || 0.2;

			gsap.to(el, {
				yPercent: -100 * speed,
				ease: 'none',
				scrollTrigger: {
					trigger: el.parentElement,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			});
		});
	},

	/**
	 * Staggered reveal for project cards
	 *
	 * Sets initial state explicitly to prevent visual glitches where
	 * the first column appears offset from other columns.
	 */
	initProjectCards() {
		const cards = gsap.utils.toArray('.project-card');

		// Set initial state explicitly for consistent starting position
		gsap.set(cards, { y: 50, opacity: 0 });

		ScrollTrigger.batch('.project-card', {
			onEnter: (batch) => {
				gsap.to(batch, {
					y: 0,
					opacity: 1,
					duration: 0.7,
					stagger: 0.12,
					ease: 'power2.out',
				});
			},
			start: 'top 90%',
			once: true,
		});
	},

	/**
	 * Cleanup (for SPA navigation)
	 */
	destroy() {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		gsap.killTweensOf('*');
	},
};

// ==========================================================================
// 3. Navigation Module
// ==========================================================================

const navigation = {
	navbar: null,
	mobileMenuBtn: null,
	mobileMenu: null,

	init() {
		this.navbar = document.getElementById('navbar');
		this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
		this.mobileMenu = document.getElementById('mobile-menu');

		this.initScrollBehavior();
		this.initMobileMenu();
		this.initScrollIndicator();
		this.initSmoothScroll();
		this.initActiveState();

		console.log('🧭 Navigation initialized');
	},

	/**
	 * Makes the hero scroll indicator clickable to scroll to the next section.
	 */
	initScrollIndicator() {
		const scrollIndicator = document.querySelector('.scroll-indicator');
		const nextSection = document.querySelector('#about');

		if (!scrollIndicator || !nextSection) return;

		// Make it visually interactive
		scrollIndicator.style.cursor = 'pointer';
		scrollIndicator.setAttribute('role', 'button');
		scrollIndicator.setAttribute('aria-label', 'Scroll to About section');
		scrollIndicator.setAttribute('tabindex', '0');

		/**
		 * Scroll to the next section using GSAP ScrollToPlugin
		 */
		const scrollToNext = () => {
			const navHeight = this.navbar?.offsetHeight || 0;

			if (config.reducedMotion) {
				// Instant scroll for reduced motion preference
				window.scrollTo({
					top: nextSection.offsetTop - navHeight,
					behavior: 'auto',
				});
			} else {
				gsap.to(window, {
					duration: 0.8,
					scrollTo: { y: nextSection, offsetY: navHeight },
					ease: 'power2.inOut',
				});
			}
		};

		// Handle click
		scrollIndicator.addEventListener('click', scrollToNext);

		// Handle keyboard (Enter/Space) for accessibility
		scrollIndicator.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				scrollToNext();
			}
		});
	},

	/**
	 * Navbar background change on scroll
	 */
	initScrollBehavior() {
		if (!this.navbar) return;

		ScrollTrigger.create({
			start: 'top -100',
			onUpdate: (self) => {
				if (self.scroll() > 100) {
					this.navbar.classList.add('bg-dark-900/95');
				} else {
					this.navbar.classList.remove('bg-dark-900/95');
				}
			},
		});
	},

	/**
	 * Mobile menu toggle
	 */
	initMobileMenu() {
		if (!this.mobileMenuBtn || !this.mobileMenu) return;

		this.mobileMenuBtn.addEventListener('click', () => {
			const isOpen = !this.mobileMenu.classList.contains('hidden');

			if (isOpen) {
				this.mobileMenu.classList.add('hidden');
			} else {
				this.mobileMenu.classList.remove('hidden');
			}
		});

		// Close menu when clicking a link
		this.mobileMenu.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				this.mobileMenu.classList.add('hidden');
			});
		});
	},

	/**
	 * Smooth scroll for anchor links
	 */
	initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', (e) => {
				const targetId = anchor.getAttribute('href');
				if (targetId === '#') return;

				const target = document.querySelector(targetId);
				if (target) {
					e.preventDefault();

					const navHeight = this.navbar?.offsetHeight || 0;

					if (config.reducedMotion) {
						// Instant scroll for reduced motion
						window.scrollTo({
							top: target.offsetTop - navHeight,
							behavior: 'auto',
						});
					} else {
						gsap.to(window, {
							duration: 0.8,
							scrollTo: { y: target, offsetY: navHeight },
							ease: 'power2.inOut',
						});
					}

					// Update URL
					history.pushState(null, '', targetId);
				}
			});
		});
	},

	/**
	 * Active nav link based on scroll position
	 */
	initActiveState() {
		const sections = document.querySelectorAll('section[id]');
		const navLinks = document.querySelectorAll('.nav-link');

		sections.forEach((section) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => this.setActiveLink(section.id),
				onEnterBack: () => this.setActiveLink(section.id),
			});
		});
	},

	setActiveLink(sectionId) {
		document.querySelectorAll('.nav-link').forEach((link) => {
			if (link.getAttribute('href') === `#${sectionId}`) {
				link.classList.add('text-primary-400');
				link.classList.remove('text-gray-400');
			} else {
				link.classList.remove('text-primary-400');
				link.classList.add('text-gray-400');
			}
		});
	},
};

// ==========================================================================
// 4. Initialization
// ==========================================================================

function init() {
	animations.init();
	navigation.init();

	// Refresh ScrollTrigger after images load
	window.addEventListener('load', () => {
		ScrollTrigger.refresh();
	});

	console.log('🚀 Grade 3 Demo: Tailwind + Modular GSAP initialized');
}

// Run on DOM ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

// ==========================================================================
// 5. Export for SPA / Vite (optional)
// ==========================================================================

// In a real Vite project, you would export these:
// export { animations, navigation, init };

// Expose cleanup globally for SPA routing
window.cleanupApp = () => {
	animations.destroy();
};
