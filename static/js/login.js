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
  
  // Language change function
  function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    location.reload();
  }
  
  let currentLang = localStorage.getItem("language") || "uz";
  function changeLanguage(lang) {
    fetch(`../../lang/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        const navItems = ["home", "explore", "destinations", "packages", "adventures", "blog", "about", "contact", "account", "trips", "preferences", "login", "logout", "language"];
        navItems.forEach(id => {
          let element = document.getElementById(`nav-${id}`);
          if (element) element.textContent = data.navbar[id];
        });

        let contactData = data.Contact; // Get Contact object

            document.getElementById("contact-title").textContent = contactData.section_title;
            document.getElementById("contact-desc").textContent = contactData.section_desc;
            document.getElementById("contact-address-title").textContent = contactData.address_title;
            document.getElementById("contact-address-text").innerHTML = contactData.address_text;
            document.getElementById("contact-phone-title").textContent = contactData.phone_title;
            document.getElementById("contact-phone-number").textContent = contactData.phone_number;

            document.getElementById("form-name").textContent = contactData.form_name;
            document.getElementById("form-email").textContent = contactData.form_email;
            document.getElementById("form-subject").textContent = contactData.form_subject;
            document.getElementById("form-message").textContent = contactData.form_message;
            document.getElementById("form-submit").textContent = contactData.form_submit;
        localStorage.setItem("language", lang);
      })
      .catch(error => console.error("Language file not found:", error));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem("language") || "uz";
    changeLanguage(currentLang);
  });
