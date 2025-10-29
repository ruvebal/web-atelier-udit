/* ============================================
   PORTAFOLIO BOOTSTRAP - JAVASCRIPT PERSONALIZADO
   ============================================
   
   Este archivo contiene todas las interacciones JavaScript
   del portafolio. Está organizado en secciones:
   
   1. Smooth scroll y navegación
   2. Scroll to top button
   3. Animaciones al hacer scroll
   4. Validación de formularios
   5. Navbar shrink al hacer scroll
   6. Barras de progreso animadas
   
   IMPORTANTE: Este código usa JavaScript vanilla (sin jQuery)
   y está bien comentado para propósitos educativos.
   ============================================ */

// ============================================
// EJECUTAR TODO CUANDO EL DOM ESTÉ LISTO
// ============================================
// El evento DOMContentLoaded se dispara cuando el HTML está completamente cargado
// Esto asegura que todos los elementos existan antes de manipularlos
document.addEventListener('DOMContentLoaded', function () {
	console.log('🚀 Portfolio JavaScript cargado correctamente');

	// Inicializar todas las funcionalidades
	initSmoothScroll();
	initScrollToTop();
	initNavbarShrink();
	initScrollAnimations();
	initFormValidation();
	initProgressBars();
});

// ============================================
// SMOOTH SCROLL PARA ENLACES DE NAVEGACIÓN
// ============================================
/**
 * Hace que los enlaces internos (#seccion) se desplacen suavemente
 * en lugar de saltar instantáneamente
 */
function initSmoothScroll() {
	// Seleccionar todos los enlaces que apuntan a anclas (#)
	const navLinks = document.querySelectorAll('a[href^="#"]');

	navLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			// Obtener el ID de la sección objetivo
			const targetId = this.getAttribute('href');

			// Si es solo "#", no hacer nada
			if (targetId === '#') return;

			// Prevenir el comportamiento por defecto (salto)
			e.preventDefault();

			// Encontrar el elemento objetivo
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				// Calcular la posición teniendo en cuenta la navbar fija
				const navbarHeight = document.querySelector('.navbar').offsetHeight;
				const targetPosition = targetElement.offsetTop - navbarHeight;

				// Hacer scroll suave a la posición
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				});

				// En móvil, cerrar el menú después de hacer clic
				const navbarCollapse = document.querySelector('.navbar-collapse');
				if (navbarCollapse.classList.contains('show')) {
					// Usar Bootstrap para cerrar el menú correctamente
					const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
					if (bsCollapse) {
						bsCollapse.hide();
					}
				}

				// Actualizar la URL sin hacer scroll
				history.pushState(null, null, targetId);
			}
		});
	});

	console.log('✅ Smooth scroll inicializado');
}

// ============================================
// BOTÓN "SCROLL TO TOP"
// ============================================
/**
 * Muestra/oculta el botón de scroll to top según la posición del scroll
 * y maneja el clic para volver arriba
 */
function initScrollToTop() {
	const scrollButton = document.getElementById('scrollToTop');

	if (!scrollButton) {
		console.warn('⚠️ Botón scrollToTop no encontrado');
		return;
	}

	// Mostrar/ocultar botón según scroll
	window.addEventListener('scroll', function () {
		// Si el scroll es mayor a 300px, mostrar el botón
		if (window.scrollY > 300) {
			scrollButton.style.display = 'flex';
			// Añadir animación fade in
			scrollButton.style.opacity = '0';
			setTimeout(() => {
				scrollButton.style.opacity = '1';
			}, 10);
		} else {
			scrollButton.style.display = 'none';
		}
	});

	// Al hacer clic, volver arriba suavemente
	scrollButton.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});

	console.log('✅ Scroll to top inicializado');
}

// ============================================
// NAVBAR SHRINK AL HACER SCROLL
// ============================================
/**
 * Reduce el tamaño de la navbar al hacer scroll hacia abajo
 * para ahorrar espacio en pantalla
 */
function initNavbarShrink() {
	const navbar = document.querySelector('.navbar');

	if (!navbar) return;

	window.addEventListener('scroll', function () {
		// Si el scroll es mayor a 50px, añadir clase "shrink"
		if (window.scrollY > 50) {
			navbar.classList.add('navbar-shrink');
		} else {
			navbar.classList.remove('navbar-shrink');
		}
	});

	console.log('✅ Navbar shrink inicializado');
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
/**
 * Anima elementos cuando entran en el viewport (pantalla visible)
 * Usa Intersection Observer API para mejor rendimiento
 */
function initScrollAnimations() {
	// Opciones para el Intersection Observer
	const observerOptions = {
		// El elemento debe estar al menos 10% visible
		threshold: 0.1,
		// Activar 50px antes de que el elemento entre completamente
		rootMargin: '0px 0px -50px 0px',
	};

	// Callback que se ejecuta cuando un elemento entra/sale del viewport
	const observerCallback = (entries, observer) => {
		entries.forEach((entry) => {
			// Si el elemento está visible
			if (entry.isIntersecting) {
				// Añadir clase de animación
				entry.target.classList.add('fade-in');

				// Opcional: dejar de observar este elemento (la animación solo ocurre una vez)
				observer.unobserve(entry.target);
			}
		});
	};

	// Crear el observer
	const observer = new IntersectionObserver(observerCallback, observerOptions);

	// Seleccionar elementos a animar
	const animatedElements = document.querySelectorAll('.card, .progress, section h2, section .lead');

	// Observar cada elemento
	animatedElements.forEach((element) => {
		observer.observe(element);
	});

	console.log(`✅ ${animatedElements.length} elementos observados para animación`);
}

// ============================================
// VALIDACIÓN DE FORMULARIOS
// ============================================
/**
 * Añade validación HTML5 personalizada a los formularios
 * Usa las clases de validación de Bootstrap
 */
function initFormValidation() {
	const contactForm = document.getElementById('contactForm');

	if (!contactForm) {
		console.warn('⚠️ Formulario de contacto no encontrado');
		return;
	}

	// Manejar el submit del formulario
	contactForm.addEventListener('submit', function (event) {
		// Prevenir envío por defecto
		event.preventDefault();
		event.stopPropagation();

		// Si el formulario es válido
		if (contactForm.checkValidity()) {
			// Aquí irías normalmente el código para enviar el formulario
			// Por ejemplo, con fetch() a un backend o servicio como FormSpree

			// SIMULACIÓN: Mostrar mensaje de éxito
			showSuccessMessage();

			// Limpiar el formulario
			contactForm.reset();
			contactForm.classList.remove('was-validated');
		} else {
			// Si el formulario no es válido, mostrar los errores
			// Bootstrap mostrará automáticamente los mensajes de invalid-feedback
			console.log('❌ Formulario inválido');
		}

		// Añadir clase para mostrar validación visual
		contactForm.classList.add('was-validated');
	});

	console.log('✅ Validación de formulario inicializada');
}

/**
 * Muestra un mensaje de éxito usando un alert de Bootstrap
 */
function showSuccessMessage() {
	// Crear el elemento alert
	const alertDiv = document.createElement('div');
	alertDiv.className =
		'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5';
	alertDiv.style.zIndex = '9999';
	alertDiv.setAttribute('role', 'alert');

	alertDiv.innerHTML = `
    <i class="bi bi-check-circle-fill me-2"></i>
    <strong>¡Mensaje enviado!</strong> Te contactaremos pronto.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

	// Añadir al body
	document.body.appendChild(alertDiv);

	// Auto-remover después de 5 segundos
	setTimeout(() => {
		alertDiv.classList.remove('show');
		setTimeout(() => alertDiv.remove(), 150);
	}, 5000);
}

// ============================================
// ANIMACIÓN DE BARRAS DE PROGRESO
// ============================================
/**
 * Anima las barras de progreso de habilidades cuando se hacen visibles
 */
function initProgressBars() {
	const progressBars = document.querySelectorAll('.progress-bar');

	if (progressBars.length === 0) return;

	// Opciones para el Intersection Observer
	const observerOptions = {
		threshold: 0.5, // El 50% del elemento debe ser visible
	};

	// Callback cuando las barras entran en viewport
	const observerCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const progressBar = entry.target;

				// Obtener el valor objetivo de la barra
				const targetWidth = progressBar.style.width;

				// Resetear a 0
				progressBar.style.width = '0';

				// Animar con un pequeño delay
				setTimeout(() => {
					progressBar.style.width = targetWidth;
					progressBar.classList.add('animate');
				}, 100);

				// Dejar de observar (solo animar una vez)
				observer.unobserve(progressBar);
			}
		});
	};

	// Crear observer para las barras de progreso
	const progressObserver = new IntersectionObserver(observerCallback, observerOptions);

	// Observar cada barra
	progressBars.forEach((bar) => {
		progressObserver.observe(bar);
	});

	console.log(`✅ ${progressBars.length} barras de progreso inicializadas`);
}

// ============================================
// FUNCIÓN ADICIONAL: ACTIVE LINK EN NAVBAR
// ============================================
/**
 * Marca el enlace activo en la navbar según la sección visible
 * (Funcionalidad opcional avanzada)
 */
function updateActiveNavLink() {
	// Obtener todas las secciones
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

	// Posición actual del scroll
	const scrollPosition = window.scrollY + 100; // +100 para compensar navbar

	// Para cada sección, verificar si está visible
	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.offsetHeight;
		const sectionId = section.getAttribute('id');

		// Si la sección está en el viewport
		if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
			// Remover clase active de todos los links
			navLinks.forEach((link) => link.classList.remove('active'));

			// Añadir clase active al link correspondiente
			const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
			if (activeLink) {
				activeLink.classList.add('active');
			}
		}
	});
}

// Llamar la función en cada scroll (opcional - puede afectar rendimiento)
// window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// UTILIDADES DE DEPURACIÓN
// ============================================
/**
 * Muestra información de depuración en consola
 * Solo en entorno de desarrollo - eliminar en producción
 */
function debugInfo() {
	console.group('📊 Portfolio Debug Info');
	console.log('Viewport Width:', window.innerWidth);
	console.log('Viewport Height:', window.innerHeight);
	console.log('Scroll Position:', window.scrollY);
	console.log('User Agent:', navigator.userAgent);
	console.groupEnd();
}

// Llamar debug info si estás en localhost
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
	debugInfo();
}

// ============================================
// MEJORAS DE RENDIMIENTO
// ============================================

/**
 * Throttle function: Limita cuántas veces se ejecuta una función
 * Útil para eventos que se disparan muchas veces (scroll, resize)
 *
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en milisegundos
 */
function throttle(func, wait) {
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

// Ejemplo de uso del throttle para el scroll
// const throttledScroll = throttle(updateActiveNavLink, 200);
// window.addEventListener('scroll', throttledScroll);

// ============================================
// MANEJO DE ERRORES GLOBALES (OPCIONAL)
// ============================================
/**
 * Captura errores de JavaScript no manejados
 * En producción, podrías enviar estos errores a un servicio de logging
 */
window.addEventListener('error', function (event) {
	console.error('❌ Error capturado:', event.error);

	// En producción, podrías enviar el error a un servicio como Sentry
	// sendErrorToService(event.error);
});

// ============================================
// PERFORMANCE MONITORING (OPCIONAL)
// ============================================
/**
 * Mide el tiempo de carga de la página
 * Útil para optimización de rendimiento
 */
window.addEventListener('load', function () {
	// Performance API para obtener métricas
	const perfData = window.performance.timing;
	const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

	console.log(`⏱️ Tiempo de carga de página: ${pageLoadTime}ms`);

	// Mostrar advertencia si la carga es lenta
	if (pageLoadTime > 3000) {
		console.warn('⚠️ La página tardó más de 3 segundos en cargar. Considera optimizar.');
	}
});

// ============================================
// EXPORT PARA TESTING (OPCIONAL)
// ============================================
// Si usas módulos ES6 y quieres hacer testing:
// export { initSmoothScroll, initScrollToTop, initFormValidation };
