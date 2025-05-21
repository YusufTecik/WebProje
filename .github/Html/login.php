<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $kullaniciAdi = trim($_POST["kullaniciAdi"]);
    $sifre = trim($_POST["sifre"]);

    // Kullanıcı adı ve şifre boş mu kontrolü
    if (empty($kullaniciAdi) || empty($sifre)) {
        header("Location: giris.Html");
        exit();
    }

    // Mail formatı kontrolü
    if (!filter_var($kullaniciAdi, FILTER_VALIDATE_EMAIL) || !preg_match('/@sakarya\.edu\.tr$/', $kullaniciAdi)) {
        header("Location: giris.Html");
        exit();
    }

    // Öğrenci numarasını mailden çek
    $numara = strstr($kullaniciAdi, '@', true);

    // Şifre kontrolü (şifre: öğrenci numarası, domain yok)
    if ($sifre === $numara) {
        echo "<h2>Hoşgeldiniz $numara</h2>";
    } else {
        header("Location: giris.Html");
        exit();
    }
} else {
    header("Location: giris.Html");
    exit();
}
?>