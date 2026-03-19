document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah refresh halaman

    // Ambil data dari input
    const name = document.getElementById('userName').value;
    const comment = document.getElementById('userComment').value;
    const displayArea = document.getElementById('commentDisplay');

    // Buat elemen komentar baru
    const newComment = document.createElement('div');
    newComment.className = 'comment-bubble';
    
    // Isi konten (menggunakan template literal)
    newComment.innerHTML = `
        <strong>${name}</strong>
        <p>${comment}</p>
        <small>Baru saja</small>
    `;

    // Tambahkan ke bagian paling atas list komentar
    displayArea.prepend(newComment);

    // Reset form setelah mengirim
    this.reset();

    // Efek scroll otomatis ke komentar baru
    displayArea.scrollTop = 0;
});