if (document.getElementsByClassName("slide").length > 0) {
    let slideIndex = 0;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }
}



function jsKontrol() {
    var form = document.getElementById('iletisimForm');
    var adsoyad = form.adsoyad.value.trim();
    var email = form.email.value.trim();
    var telefon = form.telefon.value.trim();
    var cinsiyet = form.cinsiyet.value;
    var sehir = form.sehir.value;
    var mesaj = form.mesaj.value.trim();
    var hata = "";

    if (!adsoyad) hata += "Ad Soyad boş olamaz.<br>";
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) hata += "Geçerli bir e-posta giriniz.<br>";
    if (!telefon.match(/^\d+$/)) hata += "Telefon sadece rakamlardan oluşmalıdır.<br>";
    if (!cinsiyet) hata += "Cinsiyet seçiniz.<br>";
    if (!sehir) hata += "Şehir seçiniz.<br>";
    if (!mesaj) hata += "Mesaj boş olamaz.<br>";

    document.getElementById('hata').innerHTML = hata ? hata : "JS ile kontrol başarılı!";
}

function temizleForm() {
    document.getElementById('iletisimForm').reset();
    if (window.app) {
        app.adsoyad = "";
        app.email = "";
        app.telefon = "";
        app.cinsiyet = "";
        app.sehir = "";
        app.hobiler = [];
        app.mesaj = "";
        app.hata = "";
    }
    document.getElementById('hata').innerHTML = "";
}

var app = new Vue({
    el: '#app',
    data: {
        adsoyad: "",
        email: "",
        telefon: "",
        cinsiyet: "",
        sehir: "",
        hobiler: [],
        mesaj: "",
        hata: ""
    },
    methods: {
        vueKontrol: function() {
            this.hata = "";
            if (!this.adsoyad) this.hata += "Ad Soyad boş olamaz.<br>";
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) this.hata += "Geçerli bir e-posta giriniz.<br>";
            if (!/^\d+$/.test(this.telefon)) this.hata += "Telefon sadece rakamlardan oluşmalıdır.<br>";
            if (!this.cinsiyet) this.hata += "Cinsiyet seçiniz.<br>";
            if (!this.sehir) this.hata += "Şehir seçiniz.<br>";
            if (!this.mesaj) this.hata += "Mesaj boş olamaz.<br>";

            if (!this.hata) {
                this.hata = "Vue.js ile kontrol başarılı!";
            }
        },
        vueGonder: function() {
            this.hata = "";
            this.vueKontrol();
            if (this.hata === "Vue.js ile kontrol başarılı!") {
                document.getElementById('iletisimForm').submit();
            }
        }
    }
});


function filmAra() {
    const filmAdi = document.getElementById('filmArama').value;
    const sonucDiv = document.getElementById('filmSonuc');
    sonucDiv.innerHTML = "Yükleniyor...";
    fetch(`https://www.omdbapi.com/?apikey=thewdb&t=${encodeURIComponent(filmAdi)}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                sonucDiv.innerHTML = `
                    <h3>${data.Title} (${data.Year})</h3>
                    <img src="${data.Poster}" alt="Poster" style="max-width:200px;">
                    <p><strong>Tür:</strong> ${data.Genre}</p>
                    <p><strong>IMDB:</strong> ${data.imdbRating}</p>
                    <p><strong>Konu:</strong> ${data.Plot}</p>
                `;
            } else {
                sonucDiv.innerHTML = "Film bulunamadı.";
            }
        })
        .catch(() => sonucDiv.innerHTML = "Bir hata oluştu.");
}


function validateLoginForm() {
    var email = document.getElementById("kullaniciAdi").value.trim();
    var sifre = document.getElementById("sifre").value.trim();
    var emailPattern = /^[a-zA-Z0-9._%+-]+@sakarya\.edu\.tr$/;
    if(email === "" || sifre === "") {
        alert("Kullanıcı adı ve şifre boş bırakılamaz!");
        return false;
    }
    if(!emailPattern.test(email)) {
        alert("Kullanıcı adı geçerli bir Sakarya Üniversitesi mail adresi olmalıdır!");
        return false;
    }
    if(email !== "g231210013@sakarya.edu.tr" || sifre !== "g231210013") {
        alert("Kullanıcı adı veya şifre hatalı!");
        return false;
    }
    alert("Giriş başarılı!");
    return true;
}