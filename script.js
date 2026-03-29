let nav = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const skillsSection = document.querySelector("#skills");
const navLinks = document.querySelectorAll("nav ul li");
const hamburger = document.getElementById("hamburger");
const navListOfLinks = document.querySelector("nav ul");

const themeToggle = document.getElementById("darkmode-toggle");

const texts = ["Full Stack Developer", "MEAN Stack Developer"];

const typingEl = document.getElementById("typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 120;
const deletingSpeed = 80;
const pauseAfterTyping = 1800;

const form = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((li) => {
    li.classList.remove("active");
    const a = li.querySelector("a");

    if (a.getAttribute("href") === `#${current}`) {
      li.classList.add("active");
    }
  });
});

const observer1 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

sections.forEach((section) => {
  observer1.observe(section);
});

window.addEventListener("scroll", () => {
  const rect = skillsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = 1.1 - rect.top / windowHeight;

  progress = Math.max(0, Math.min(1, progress));
  progress = 1 - Math.pow(1 - progress, 2);
  skillsSection.style.setProperty("--progress", progress);
});

hamburger.addEventListener("click", () => {
  navListOfLinks.classList.toggle("activeMobile");
  hamburger.classList.toggle("activeMenu");
});

document.querySelectorAll("nav ul li").forEach((link) => {
  link.addEventListener("click", () => {
    navListOfLinks.classList.remove("activeMobile");
    hamburger.classList.remove("activeMenu");
  });
});

themeToggle.addEventListener("click", () => {
  themeToggle.classList.toggle("active");
  document.body.classList.toggle("light-theme");
});

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingEl.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }
  } else {
    typingEl.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeEffect, speed);
}

typeEffect();

function sendEmail(formData) {
  emailjs
    .send("service_ole8drd", "template_065hc9o", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    })
    .then(
      function () {
        alert("Message sent successfully!");
        form.reset();
      },
      function (error) {
        alert("Failed to send message. Please try again.");
      },
    );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const firstName = formData.get("firstName").trim();
  const lastName = formData.get("lastName").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  if (!firstName || !lastName || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (message.length < 10) {
    alert("Message must be at least 10 characters long.");
    return;
  }

  sendEmail(formData);
});
