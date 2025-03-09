// Get the button element
const backToTopButton = document.getElementById("myBtn");

// Function to scroll to the top of the page smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Get references to elements
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const heroSection = document.getElementById("home");
const userInputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to show/hide icon based on scroll position
function handleScroll() {
  const heroRect = heroSection.getBoundingClientRect();
  const chatIconRect = chatIcon.getBoundingClientRect();

  if (heroRect.top <= chatIconRect.bottom && heroRect.bottom >= chatIconRect.top) {
    chatIcon.style.display = "none";
  } else {
    // Only show the icon if the chat window is closed
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
      chatIcon.style.display = "block";
    }
  }
}

// Toggle chat window function
function toggleChatWindow() {
  const chatWindow = document.getElementById("chat-window");
  const chatIcon = document.getElementById("chat-icon");

  if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
    chatWindow.style.display = "block";
    chatIcon.style.display = "none";

    // Send welcome message ONLY when the chat window is opened
    sendWelcomeMessage();
  } else {
    chatWindow.style.display = "none";
    // Show the icon if the user is not on the hero section
    const heroRect = heroSection.getBoundingClientRect();
    const chatIconRect = chatIcon.getBoundingClientRect();
    if (!(heroRect.top <= chatIconRect.bottom && heroRect.bottom >= chatIconRect.top)) {
      chatIcon.style.display = "block";
    }
  }
}

// Function to send the welcome message
function sendWelcomeMessage() {
  addToChat("bot", "Welcome to PalmStar! How can I help you plan your dream vacation?");
}

// Function to add messages to the chat
function addToChat(sender, message) {
  const chatBody = document.querySelector(".chat-body");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender === "bot" ? "bot" : "user");
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

// Function to send a message
function sendMessage() {
  const userInput = userInputField.value;
  if (userInput.trim() !== "") {
    addToChat("user", userInput);
    userInputField.value = "";
    getBotResponse(userInput).then(response => {
      addToChat("bot", response);
    });
  }
}

// Placeholder function to simulate getting a bot response (replace with your actual chatbot API call)
function getBotResponse(userInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("How can I be of help?"); // Replace with your actual chatbot logic
    }, 1000); // Simulate a 1-second delay
  });
}

// Add event listeners
window.addEventListener('scroll', handleScroll);
handleScroll();
sendButton.addEventListener('click', sendMessage);
userInputField.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});



const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');

// Generate Dots dynamically
testimonialCards.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) {
    dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
    scrollToCard(index);
  });
  testimonialDots.appendChild(dot);
});

function scrollToCard(index) {
  const cardWidth = testimonialCards[0].offsetWidth + 30; // 30 for margin
  testimonialSlider.scrollLeft = cardWidth * index;
  updateActiveDot(index);
}

function scrollToCard(index) {
  const cardWidth = testimonialCards[0].offsetWidth + 30; // 30 for margin
  testimonialSlider.scrollLeft = cardWidth * index;
  updateActiveDot(index);
  // Stop automatic scrolling when a dot is clicked
  clearInterval(autoScrollInterval);
}

function updateActiveDot(index) {
  const dots = testimonialDots.querySelectorAll('.dot');
  dots.forEach((dot) => {
    dot.classList.remove('active'); // Reset active class for all dots
  });
  dots[index].classList.add('active'); // Set active class for the new dot
}

// Automatic scroll (Optional)
let currentCard = 0;
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    currentCard = (currentCard + 1) % testimonialCards.length;
    scrollToCard(currentCard);
  }, 4000); // Change card every 5 seconds
}

// Start the auto scroll when the page loads
startAutoScroll();

testimonialSlider.addEventListener('scroll', () => {
  // Calculate the current card based on scroll position
  const cardWidth = testimonialCards[0].offsetWidth + 30;
  const scrollLeft = testimonialSlider.scrollLeft;
  const newCurrentCard = Math.round(scrollLeft / cardWidth);

  // Update active dot only if the current card has changed
  if (newCurrentCard !== currentCard) {
    currentCard = newCurrentCard;
    updateActiveDot(currentCard);
  }
});

function openTab(event, tabName) {
  let i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }

  // Remove the active class from all tab buttons
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab content and add the active class to the button that opened the tab
  document.getElementById(tabName).classList.add("active");
  event.currentTarget.className += " active";
}

// Set the default tab to be open
document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("tab")[0].click();
});


document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn) {
    document.getElementById("nav-login").classList.add("d-none");
    document.getElementById("nav-logout").classList.remove("d-none");
   }
   document.getElementById("nav-logout").addEventListener("click", () => {
     localStorage.removeItem("loggedIn");
     location.reload();
   });
});

  // Language switching function
function changeLanguage(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

/* Navbar background change on scroll */
window.addEventListener("scroll", function() {
  let navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("bg-opacity-75");
  } else {
    navbar.classList.remove("bg-opacity-75");
  }
});


let currentLang = localStorage.getItem("language") || "uz"; // Saqlangan til yoki default "uz"

function changeLanguage(lang) {
    fetch(`lang/${lang}.json`) // JSON faylni yuklash
        .then(response => response.json())
        .then(data => {
            // **Navbarni yangilash**
            const navItems = ["home", "explore", "destinations", "packages", "adventures", "blog",
                              "about", "contact", "account", "trips", "preferences", "login", "logout", "language"];
            navItems.forEach(id => {
                let element = document.getElementById(`nav-${id}`);
                if (element) element.textContent = data.navbar[id];
            });



            // ** Footer yangilash :
            document.getElementById("footer-tagline").textContent = data.footer.tagline;

            document.getElementById("footer-explore-title").textContent = data.footer.explore;
            document.getElementById("footer-destinations").textContent = data.footer.explore_links.destinations;
            document.getElementById("footer-packages").textContent = data.footer.explore_links.packages;
            document.getElementById("footer-adventures").textContent = data.footer.explore_links.adventures;
            document.getElementById("footer-blog").textContent = data.footer.explore_links.blog;

            document.getElementById("footer-plan-title").textContent = data.footer.plan;
            document.getElementById("footer-booking").textContent = data.footer.plan_links.booking;
            document.getElementById("footer-insurance").textContent = data.footer.plan_links.insurance;
            document.getElementById("footer-faqs").textContent = data.footer.plan_links.faqs;

            document.getElementById("footer-company-title").textContent = data.footer.company;
            document.getElementById("footer-about").textContent = data.footer.company_links.about;
            document.getElementById("footer-contact").textContent = data.footer.company_links.contact;
            document.getElementById("footer-careers").textContent = data.footer.company_links.careers;

            document.getElementById("footer-legal-title").textContent = data.footer.legal;
            document.getElementById("footer-privacy").textContent = data.footer.legal_links.privacy;
            document.getElementById("footer-terms").textContent = data.footer.legal_links.terms;

            document.getElementById("footer-cta-title").textContent = data.footer.cta_title;
            document.getElementById("footer-cta-text").textContent = data.footer.cta_text;
            document.getElementById("footer-cta-button").textContent = data.footer.cta_button;
            
            document.getElementById("footer-copyright").textContent = data.footer.copyright;

            // ** Chat

            document.getElementById("chat-assistant-name").textContent = data.chat.assistant_name;
            document.getElementById("chat-close-btn").setAttribute("title", data.chat.close);
            document.getElementById("user-input").setAttribute("placeholder", data.chat.placeholder);
             // Xush kelibsiz xabarini o‘zgartirish
            setWelcomeMessage(data.welcome_message);

            
           
            localStorage.setItem("language", lang);

            // **Tilni almashtirish dropdownini yangilash**
            document.querySelectorAll(".dropdown-menu a").forEach(link => {
                const langKey = link.getAttribute("onclick").match(/'(\w+)'/)[1]; // 'uz', 'ru', 'en' ni olish
                if (data.languages[langKey]) {
                    link.textContent = data.languages[langKey];
                }
            });

            localStorage.setItem("language", lang); // Tilni saqlash
        })
        .catch(error => console.error("Language file not found:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("language") || "uz";
  changeLanguage(currentLang);
});
// Botdan keladigan xush kelibsiz xabarni chiqarish funksiyasi
function setWelcomeMessage(message) {
  let chatBody = document.querySelector(".chat-body");

  let botMessage = document.createElement("div");
  botMessage.classList.add("bot-message");
  botMessage.textContent = message;

  chatBody.appendChild(botMessage);
}