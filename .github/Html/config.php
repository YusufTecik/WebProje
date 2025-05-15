<?php
// Veritabanı bağlantı ayarları
$db_host = 'localhost';  // MySQL sunucu adresi
$db_user = 'root';       // MySQL kullanıcı adı (varsayılan olarak 'root')
$db_password = '';       // MySQL kullanıcı parolası (varsayılan olarak boş)
$db_name = 'webprojectdb'; // Veritabanı adı

// Veritabanı bağlantısı oluşturma
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Bağlantı kontrolü (hata kontrolü)
if ($conn->connect_error) {
    die("Veritabanı bağlantısı başarısız: " . $conn->connect_error);
}
?>