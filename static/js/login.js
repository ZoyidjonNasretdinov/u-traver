function changeLanguage(lang) {
  fetch(`lang/${lang}.json`) // JSON faylni yuklash
      .then(response => response.json())
      .then(data => {
        
          
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

          

          localStorage.setItem("language", lang); // Tilni saqlash
      })
      .catch(error => console.error("Language file not found:", error));
}