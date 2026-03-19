/* ================= GLOBAL SLIDER LOGIC ================= */
let slideIndex = 0;
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;
  if (n >= slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length - 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}
function plusSlides(n) {
  showSlides((slideIndex += n));
}

/* ================= INITIALIZATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Slider
  const checkSlides = document.getElementsByClassName("slide");
  if (checkSlides.length > 0) {
    showSlides(slideIndex);
    setInterval(() => {
      plusSlides(1);
    }, 5000);
  }

  // 2. Efek Muncul (Staggered Animation)
  const cards = document.querySelectorAll(
    ".glass-card, .org-card, .bento-item, .member-card",
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

  // 3. Highlight Kepengurusan (New Logic)
  const orgCards = document.querySelectorAll(".org-card");
  const bodyOverlay = document.getElementById("bodyOverlay");

  if (orgCards.length > 0 && bodyOverlay) {
    orgCards.forEach((card) => {
      card.addEventListener("click", function (e) {
        e.stopPropagation();
        // Tutup yang lain dulu
        orgCards.forEach((c) => c.classList.remove("highlight-active"));
        // Aktifkan yang diklik
        this.classList.add("highlight-active");
        bodyOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // Kunci scroll
      });
    });

    // Klik di mana saja pada overlay untuk menutup
    bodyOverlay.addEventListener("click", () => {
      orgCards.forEach((c) => c.classList.remove("highlight-active"));
      bodyOverlay.style.display = "none";
      document.body.style.overflow = "auto"; // Aktifkan scroll
    });
  }

  // 4. Galeri Modal (Bento Galeri)
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
    document.querySelector(".close-modal").onclick = () =>
      (gModal.style.display = "none");
  }
});

// 5. Modal Member (Pemisahan fungsi agar tidak konflik)
const pelatihData = [
  { nama: "Aryo", domisili: "Afrika" },
  { nama: "Noni", domisili: "India" },
  { nama: "Nola", domisili: "Inggris" },
  { nama: "Ahdian", domisili: "Thailand" },
  { nama: "Ferdilan", domisili: "Kamboja" },
];

// contoh auto generate sampai 100+
for (let i = 1; i <= 100; i++) {
  pelatihData.push({
    nama: "Pelatih " + i,
    domisili: "Indonesia",
  });
}

const tbody = document.getElementById("pelatihBody");

function tampilkanData(data) {
  tbody.innerHTML = "";

  data.forEach((p) => {
    let row = `
<tr>
<td>${p.nama}</td>
<td>${p.domisili}</td>
<td><button class="detail-btn">Detail</button></td>
</tr>
`;

    tbody.innerHTML += row;
  });
}

tampilkanData(pelatihData);

/* SEARCH */

document.getElementById("searchInput").addEventListener("keyup", function () {
  let keyword = this.value.toLowerCase();

  let hasil = pelatihData.filter(
    (p) =>
      p.nama.toLowerCase().includes(keyword) ||
      p.domisili.toLowerCase().includes(keyword),
  );

  tampilkanData(hasil);
});

/* SORT TABLE */

function sortTable(col) {
  pelatihData.sort((a, b) => {
    let x = col === 0 ? a.nama : a.domisili;
    let y = col === 0 ? b.nama : b.domisili;

    return x.localeCompare(y);
  });

  tampilkanData(pelatihData);
}