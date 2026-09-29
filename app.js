console.log("Bismillah Praktikum Dimulai");

// Aktivitas 1 DOM SELLECTION / Seleksi elemen
// Kenapa kita harus seleksi karena "menangkap" atau ambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. Mengambil Elemen Judul Utama & Sub Judul
// document.getelementById("...") mengambil berdasarkan atribut id.

const judulUtama = document.getElementById("judul-utama"); // menangkap: <h1 id="judul-utama">

// document.querySelector('#...')
// tanda # artinya ID
const subJudul = document.querySelector("#sub-judul");  // menangkap: <p id="sub-judul">

// 2. Mengambil Elemen pada kartu 1 (Kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");


// 3. Mengambil elemen tombol - tombol aksi pada kartu 1 
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. Mengambil elemen pada kartu 2 (Fitur Catatan Dinamis / To Do List Sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");


// Aktivitas Ke 2 Manipulasi Teks & Style (Card 1)
// addEventListener("click", function() {...}) astinya adalah Tolong dengarkan dulu/ tunggu
// sampai di klik user. Jika di klik jalankan perintah didalam function

// A. Mengubah Teks & Warna secara langsung

BtnUbahTeks.addEventListener("click", function() {
    // .innertext = mengganti atau mengisi secara langsung teks yang ada didalam elemen HTML
    teksPreview.innerText = "Hebat! Teks inni berhasil diubah pake DOM!";

    //.style.color = mengubah warna teks secara langsung (Inline style)
    teksPreview.style.color = "#4138ee";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] Teks Preview telah diperbaharui!");
})

// B. Manipulasi Class CSS emnggunakan classlist.toggle()
btnToggleWarna.addEventListener("click", function(){
    // .classlist.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di switch!");

});

// C. Mengembalikan (Reset) Teks ke kondisi semula
btnReset.addEventListener("click", function(){
    // 1. Kmebalikan teks semula
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

    // 2. Kosongkan warna agar kembali ke warna css bawaan
    teksPreview.style.color = "";

    // 3. Hapus Class khusus untuk menggunakan .classList.remove
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");
});


// AKtivitas 3 & 4 : Elemen Dinamis & Event Handling (TO-DO List Sederhana)
// Di aktivitas ini kita belajar elemen HTML baru (<LI>) secara otomatis dalam Javascript
// mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)


// Langakah 1: Mmebuat Variable Penampung angka jumlah catatan
//"let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;


// Langkah 2: Fungsi Update angka counter & pesan status
function perbaruiJumlah() {
    // Masukan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

     // Conditional Statment berupa apakah catatan itu kosong/ 0?
    if (totalCatatan === 0){
        // Jika 0: Hapus Class "hidden" supaya teks "Belum ada catatan" muncu ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: Tambahkan Class "hidden" agar teks "Belum ada catatan " tersembunyi
        pesanKosong.classList.add("hidden");
    }
}


// Langkah 3: Fungsi Utama Logika Tambah Catatan Baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsi nya untuk mengambil teks yang diketik oleh user
    // //.trim() menghapus spasi diawal dan diakhir
    const isiTeks = inputCatatan.value.trim ();

    // 3.2 Validasi Input: Jika isi teks kosong maka tampilan alert
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menmabahkan pada tag li

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // Tanda backtick (`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 Menambahkan Telinga / Event Listener untuk tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function () {
        liBaru.remove(); //menghapus elemen list dari layar html
        totalCatatan--; //totalCatatan dikurangi sebanyak 1x
        perbaruiJumlah(); // panggil fungsi perbaruiJumlah untuk update angka dilayar
        console.log(`DOM Catatan "${isiTeks}" dihapus.` );
    });

    // 3.6 appendChild memasukan elemen li kedalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 Mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value = "";

    // 3.8 totalCatatan++ artinya tambah nilai total catatan sebanyak 1, lalu update angka ke layar
    totalCatatan++; perbaruiJumlah();

    console.log("Dos Catatan baru ditambahkan: 5(isiTeks)");

}

// Langkah 4: Event Listener Klik Tombol + "Tambah"
// ketika tombol "+ tambah" di klik oleh user, maka jalankan fungsi tambah catatan ()
btnTambah.addEventListener("click", function(){
    tambahCatatan();
});


// Langkah 5 : Event Listener Keyboard "Enter" pada kolom input
// Ketika user menegtik di kolom input dan melepas tombol keyboard('Event keyup);
inputCatatan.addEventListener("keyup", function(event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if(event.key === "Enter") {
        tambahCatatan(); // jika ya, jalankan fungsi tambah catatan()
    }
});