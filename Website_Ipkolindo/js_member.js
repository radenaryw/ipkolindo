/* ================= SLIDER ================= */
let slideIndex = 0;

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== SLIDER ===== */
  const slides = document.getElementsByClassName("slide");
  if (slides.length > 0) {
    showSlides(slideIndex);
    setInterval(() => plusSlides(1), 5000);
  }

  /* ===== ANIMASI CARD ===== */
  const cards = document.querySelectorAll(
    ".glass-card, .org-card, .bento-item, .member-card"
  );

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100);
  });

  /* ===== ORG CARD (PROFILE) ===== */
  const orgCards = document.querySelectorAll(".org-card");
  const bodyOverlay = document.getElementById("bodyOverlay");

  if (orgCards.length > 0 && bodyOverlay) {
    orgCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        e.stopPropagation();
        orgCards.forEach((c) => c.classList.remove("highlight-active"));
        this.classList.add("highlight-active");
        bodyOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    bodyOverlay.addEventListener("click", () => {
      orgCards.forEach((c) => c.classList.remove("highlight-active"));
      bodyOverlay.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  /* ===== GALERI MODAL ===== */
  const gModal = document.getElementById("galleryModal");
  const gItems = document.querySelectorAll(".bento-item");

  if (gModal && gItems.length > 0) {
    gItems.forEach((item) => {
      item.addEventListener("click", function () {
        const title = this.getAttribute("data-title");
        const desc = this.getAttribute("data-description");

        let bgStyle = window.getComputedStyle(this).backgroundImage;
        let imageUrl = bgStyle
          .replace(/^url\(["']?/, "")
          .replace(/["']?\)$/, "");

        document.getElementById("modalImg").src = imageUrl;
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalDesc").innerText = desc;

        gModal.style.display = "flex";
      });
    });

    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.onclick = () => (gModal.style.display = "none");
    }
  }

  /* ===== MEMBER TABLE ===== */
  const tbody = document.getElementById("pelatihBody");

  if (tbody) {
    const pelatihData = [
      { nama: "Aryo", domisili: "Jakarta" },
      { nama: "Noni", domisili: "Manado" },
      { nama: "Ahdian", domisili: "Bandung" },
    ];

    // AUTO 100 DATA
    for (let i = 1; i <= 100; i++) {
      pelatihData.push({
        nama: "Pelatih " + i,
        domisili: "Indonesia",
      });
    }

    function tampilkanData(data) {
      tbody.innerHTML = "";

      data.forEach((p) => {
        tbody.innerHTML += `
          <tr>
            <td>${p.nama}</td>
            <td>${p.domisili}</td>
            <td><button class="detail-btn">Detail</button></td>
          </tr>
        `;
      });
    }

    tampilkanData(pelatihData);

    /* SEARCH */
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keyup", function () {
        let keyword = this.value.toLowerCase();

        let hasil = pelatihData.filter(
          (p) =>
            p.nama.toLowerCase().includes(keyword) ||
            p.domisili.toLowerCase().includes(keyword)
        );

        tampilkanData(hasil);
      });
    }

    /* SORT */
    window.sortTable = function (col) {
      pelatihData.sort((a, b) => {
        let x = col === 0 ? a.nama : a.domisili;
        let y = col === 0 ? b.nama : b.domisili;
        return x.localeCompare(y);
      });

      tampilkanData(pelatihData);
    };
  }

});