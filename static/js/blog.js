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

// Tilni almashtirish funksiyasi
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

      let blogData = data.Blogs;

      document.getElementById("blog-title").textContent = blogData.blog_title;
      document.getElementById("blog-desc").textContent = blogData.blog_desc;
      document.getElementById("view-all").textContent = blogData.view_all;

      let blogContainer = document.getElementById("blog-posts");
      blogContainer.innerHTML = ""; // Avvalgi postlarni o‘chirish

      blogData.posts.forEach(post => {
          let colDiv = document.createElement("div");
          colDiv.classList.add("col-lg-4", "col-md-6", "mb-4");

          let cardDiv = document.createElement("div");
          cardDiv.classList.add("card", "h-100", "shadow-sm");

          let img = document.createElement("img");
          img.src = post.img;
          img.classList.add("card-img-top");
          img.alt = post.title;

          let cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          let title = document.createElement("h5");
          title.classList.add("card-title");
          title.textContent = post.title;

          let desc = document.createElement("p");
          desc.classList.add("card-text");
          desc.textContent = post.desc;

          let link = document.createElement("a");
          link.href = post.link;
          link.classList.add("btn", "btn-warning");
          link.textContent = "Batafsil o‘qish"; // Til o‘zgarganda avtomatik o‘zgartiriladi

          // Elementlarni bir-biriga qo‘shamiz
          cardBody.appendChild(title);
          cardBody.appendChild(desc);
          cardBody.appendChild(link);

          cardDiv.appendChild(img);
          cardDiv.appendChild(cardBody);

          colDiv.appendChild(cardDiv);

          blogContainer.appendChild(colDiv); // DOM ga qo‘shish
      });

      
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
      localStorage.setItem("language", lang);
    })
    .catch(error => console.error("Language file not found:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("language") || "uz";
  changeLanguage(currentLang);
});
