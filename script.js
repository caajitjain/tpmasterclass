document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navLinks = document.getElementById("navLinks");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (openMenu) {
    openMenu.addEventListener("click", function () {
      navLinks.classList.add("active");
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  }

  // Close menu when clicking a nav link on mobile
  const navLinkItems = document.querySelectorAll(".nav-links ul li a");
  navLinkItems.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
      }
    });
  });

  // Testimonial Slider
  let currentSlide = 0;
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  function showSlide(index) {
    // Reset active slide
    testimonialCards.forEach((card) => {
      card.classList.remove("active");
      card.style.transform = "translateX(100%)";
      card.style.opacity = "0";
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Activate current slide
    testimonialCards[index].classList.add("active");
    testimonialCards[index].style.transform = "translateX(0)";
    testimonialCards[index].style.opacity = "1";

    dots[index].classList.add("active");

    currentSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = testimonialCards.length - 1;
      }
      showSlide(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonialCards.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      showSlide(index);
    });
  });

  // Auto-rotate testimonials
  setInterval(function () {
    if (testimonialCards.length > 0) {
      let newIndex = currentSlide + 1;
      if (newIndex >= testimonialCards.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }
  }, 8000);

  // Form Submission - using Formspree
  // Note: Replace 'yourformspreeID' in the index.html form action with your actual Formspree form ID
  const inquiryForm = document.getElementById("inquiryForm");

  if (inquiryForm) {
    // Show success message after form submission
    if (window.location.search.includes("success=true")) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const successMessage = document.createElement("div");
        successMessage.classList.add("form-success-message");
        successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Thank You!</h3>
                    <p>Your inquiry has been submitted successfully. We'll get back to you shortly.</p>
                `;

        // Insert success message before the form
        const contactContent = document.querySelector(".contact-content");
        if (contactContent) {
          contactContent.insertBefore(
            successMessage,
            document.querySelector(".contact-form")
          );
        }

        // Scroll to the success message
        window.scrollTo({
          top: contactSection.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }
  }

  // Highlight active navigation based on scroll position
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scroll for course buttons
  const courseButtons = document.querySelectorAll(".course-btn");

  courseButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Set the course dropdown to match the course button clicked
        const courseSelect = document.getElementById("course");
        const courseCard = this.closest(".course-card");

        if (courseSelect && courseCard) {
          const courseType = courseCard.getAttribute("data-course");

          // Map data-course attributes to select options
          const courseMapping = {
            "uae-tp": "UAE Transfer Pricing",
            "global-tp": "Global Transfer Pricing",
            "indian-tp": "Indian Transfer Pricing",
            adit: "Transfer Pricing for ADIT",
            "int-tax": "Basics of International Taxation",
            pillar2: "Pillar 2",
            qdmtt: "QDMTT - UAE, Bahrain",
            vca: "Value Chain Analysis",
          };

          if (courseMapping[courseType]) {
            courseSelect.value = courseMapping[courseType];
          }
        }

        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".course-card, .expertise-card, .about-content, .contact-content"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initial setup for animations
  document
    .querySelectorAll(
      ".course-card, .expertise-card, .about-content, .contact-content"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

  // Run animation check on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
