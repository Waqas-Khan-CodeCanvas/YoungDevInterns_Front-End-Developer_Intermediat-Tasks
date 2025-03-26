// Theme Toggle
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const icon = themeToggle.querySelector("i");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateIcon(savedTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nameInput = document.querySelector('input[type="text"]');
  const emailInput = document.querySelector('input[type="email"]');
  const messageInput = document.querySelector("textarea");

  // Add validation styles
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const error =
      formControl.querySelector(".error-message") ||
      document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    if (!formControl.querySelector(".error-message")) {
      formControl.appendChild(error);
    }
  }

  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    const error = formControl.querySelector(".error-message");
    if (error) {
      error.remove();
    }
  }

  // Validate email
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required");
      isValid = false;
    } else {
      showSuccess(nameInput);
    }

    // Email validation
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    // Message validation
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message is required");
      isValid = false;
    } else {
      showSuccess(messageInput);
    }

    if (isValid) {
      showSuccessMessage();
    }
  });

  // Success message modal
  function showSuccessMessage() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully.</p>
                <button class="modal-btn">OK</button>
            </div>
        `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector(".close");
    const modalBtn = modal.querySelector(".modal-btn");

    closeBtn.onclick = function () {
      modal.remove();
      form.reset();
    };

    modalBtn.onclick = function () {
      modal.remove();
      form.reset();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.remove();
        form.reset();
      }
    };
  }

  // Mobile Navigation Toggle
  const navToggle = document.createElement("button");
  navToggle.className = "nav-toggle";
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector("nav").appendChild(navToggle);

  navToggle.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Project cards hover effect
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
