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

            // **Hero Sectionni yangilash**
            document.getElementById("hero-title").textContent = data.hero.title;
            document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
            document.getElementById("hero-destination").textContent = data.hero.cta.destination;
            document.getElementById("hero-package").textContent = data.hero.cta.package;

            // ** Achiement sectionni yangilash 

            document.getElementById("achievements-title").textContent = data.achievements.title;
            document.getElementById("achievements-subtitle").textContent = data.achievements.subtitle;
            document.getElementById("stat-happy-travelers").textContent = data.achievements.stats.happy_travelers;
            document.getElementById("stat-years-experience").textContent = data.achievements.stats.years_experience;
            document.getElementById("stat-destinations").textContent = data.achievements.stats.destinations;
            document.getElementById("stat-customer-satisfaction").textContent = data.achievements.stats.customer_satisfaction;
            document.getElementById("stat-repeat-customers").textContent = data.achievements.stats.repeat_customers;
            document.getElementById("stat-community-projects").textContent = data.achievements.stats.community_projects;

            // ** Futures section yangilash 
            document.getElementById("features-title").textContent = data.features.title;
            document.getElementById("features-subtitle").textContent = data.features.subtitle;
            document.getElementById("feature-exploration-title").textContent = data.features.list.exploration.title;
            document.getElementById("feature-exploration-desc").textContent = data.features.list.exploration.description;
            document.getElementById("feature-guidance-title").textContent = data.features.list.guidance.title;
            document.getElementById("feature-guidance-desc").textContent = data.features.list.guidance.description;
            document.getElementById("feature-experiences-title").textContent = data.features.list.experiences.title;
            document.getElementById("feature-experiences-desc").textContent = data.features.list.experiences.description;

            // // ** Destenetion section yangilash 
            document.getElementById("destinations-title").textContent = data.destinations.title;
            document.getElementById("destinations-subtitle").textContent = data.destinations.subtitle;

            let destinationsHTML = "";
            data.destinations.cards.forEach(card => {
              destinationsHTML  += `
                <div class="col">
                  <div class="card h-100 shadow-sm">
                    <img src="${card.img_url}" class="card-img-top" alt="Bali">
                    <div class="card-body">
                     <h5 class="card-title">${card.name}</h5>
                     <p class="card-text">${card.description}</p>
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${card.best_time}</small>
                        <div class="btn-group">
                          <a href="bali-details.html" class="btn btn-sm btn-outline-secondary">${card.read_more}</a>
                         <button type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal"
                           data-bs-target="#bookingModal" data-destination="Bali, Indonesia"
                           data-package-name="Bali Bliss: 8-Day Cultural Escape" data-best-time="April - October">${card.book_now}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
            document.getElementById("destinationsCards").innerHTML = destinationsHTML;
           
            document.getElementById("explore-more").textContent = data.destinations.explore_more;
            // //**Package */
            document.getElementById("packages-title").textContent = data.packages.title;
            document.getElementById("packages-subtitle").textContent = data.packages.subtitle;

            const packageCards = document.getElementById("packageCards");

            function renderPackages() {
                // Eski kontentni tozalash
                packageCards.innerHTML = "";
            
                // Yangi paketlarni qo'shish
                packageCards.innerHTML = data.packages.list.map(package => `
                    <div class="col">
                        <div class="card shadow-sm">
                            <img src="${package.image}" class="card-img-top" alt="${package.title}">
                            <div class="card-body">
                                <h5 class="card-title">${package.title}</h5>
                                <p class="card-text">${package.description}</p>
                                <ul class="list-unstyled">
                                    ${package.details.map(detail => `<li><i class="bi bi-check2-circle"></i> ${detail}</li>`).join('')}
                                </ul>
                                <p class="card-text text-warning fw-bold text-center">${package.price}</p>
                                <div class="d-flex justify-content-center">
                                    <a href="#" class="btn btn-warning">View Details & Book</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            // Funksiyani chaqirish
            renderPackages();


           
            

            // ** About sectionni yangilash

            document.getElementById("about-title").textContent = data.about.title;
            document.getElementById("about-subtitle").textContent = data.about.subtitle;
            document.getElementById("about-description").textContent = data.about.description;
            document.getElementById("feature-paradises-title").textContent = data.about.features.paradises.title;
            document.getElementById("feature-paradises-description").textContent = data.about.features.paradises.description;
            document.getElementById("feature-delights-title").textContent = data.about.features.delights.title;
            document.getElementById("feature-delights-description").textContent = data.about.features.delights.description;
            document.getElementById("feature-memories-title").textContent = data.about.features.memories.title;
            document.getElementById("feature-memories-description").textContent = data.about.features.memories.description;
            document.getElementById("about-cta").textContent = data.about.cta;

            // ** Booking config

            document.getElementById("booking-title").textContent = data.booking.title;
            document.getElementById("booking-destination-label").textContent = data.booking.destination;
            document.getElementById("booking-placeholder").textContent = data.booking.placeholder;
            document.getElementById("booking-checkin-label").textContent = data.booking.checkin;
            document.getElementById("booking-checkout-label").textContent = data.booking.checkout;
            document.getElementById("booking-travelers-label").textContent = data.booking.travelers;
            document.getElementById("booking-budget-label").textContent = data.booking.budget;
            document.getElementById("booking-additional-label").textContent = data.booking.additional_info;
            document.getElementById("booking-cancel").textContent = data.booking.cancel;
            document.getElementById("booking-confirm").textContent = data.booking.confirm;

            // ** tesminals

            document.getElementById("testimonialTitle").innerText = data.testimonials.title;
            document.getElementById("testimonialSubtitle").innerText = data.testimonials.subtitle;

            let testimonialHTML = "";
            data.testimonials.reviews.forEach(review => {
              testimonialHTML += `
                <div class="testimonial-card p-3 shadow rounded-3 mx-3">
                 <i class="bi bi-quote quote-icon text-warning mb-3"></i>
                 <p class="testimonial-text">"${review.text}”</p>
                 <footer class="blockquote-footer mt-3">${review.author}</footer>
                 <cite title="Source Title">${review.source}</cite>
                </div>
              `;
            });
            document.getElementById("testimonialSlider").innerHTML = testimonialHTML;

            


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

            // ** Booking modal 

            document.getElementById("footerBookingModalLabel").textContent = data.modal.title;
            document.getElementById("destination-label").textContent = data.modal.destination;
            document.getElementById("destination-placeholder").textContent = data.modal.destination_placeholder;
            document.getElementById("checkin-label").textContent = data.modal.checkin;
            document.getElementById("checkout-label").textContent = data.modal.checkout;
            document.getElementById("travelers-label").textContent = data.modal.travelers;
            document.getElementById("trip-style-label").textContent = data.modal.trip_style;
            document.getElementById("trip-style-placeholder").textContent = data.modal.trip_style_placeholder;
            document.getElementById("interests-label").textContent = data.modal.interests;
            document.getElementById("budget-label").textContent = data.modal.budget;
            document.getElementById("additional-info-label").textContent = data.modal.additional_info;
            document.getElementById("cancel-btn").textContent = data.modal.cancel;
            document.getElementById("submit-btn").textContent = data.modal.submit;

            // ** Chat

            document.getElementById("chat-assistant-name").textContent = data.chat.assistant_name;
            document.getElementById("chat-close-btn").setAttribute("title", data.chat.close);
            document.getElementById("user-input").setAttribute("placeholder", data.chat.placeholder);
             // Xush kelibsiz xabarini o‘zgartirish
            setWelcomeMessage(data.welcome_message);

            
            // Login bo'limi
            document.getElementById("login-tab").textContent = data.login.tab;
            document.getElementById("login-welcome").textContent = data.login.welcome;
            document.getElementById("login-text").textContent = data.login.text;
            document.getElementById("loginEmail").setAttribute("placeholder", data.login.email_placeholder);
            document.getElementById("loginPassword").setAttribute("placeholder", data.login.password_placeholder);
            document.getElementById("login-remember").textContent = data.login.remember_me;
            document.getElementById("login-btn").textContent = data.login.btn;

            // Signup bo'limi
            document.getElementById("signup-tab").textContent = data.signup.tab;
            document.getElementById("signup-welcome").textContent = data.signup.welcome;
            document.getElementById("signup-text").textContent = data.signup.text;
            document.getElementById("signupName").setAttribute("placeholder", data.signup.name_placeholder);
            document.getElementById("signupEmail").setAttribute("placeholder", data.signup.email_placeholder);
            document.getElementById("signupPassword").setAttribute("placeholder", data.signup.password_placeholder);
            document.getElementById("signup-terms-text").textContent = data.signup.terms_conditions;
            document.getElementById("signup-terms-link").textContent = data.signup.terms_link;
            document.getElementById("signup-btn").textContent = data.signup.btn;

            // Saqlash
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