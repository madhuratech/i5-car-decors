<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Get form data
    $name    = trim($_POST['name'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validate
    if ($name === "" || $phone === "" || $service === "" || $message === "") {
        die("All fields are required.");
    }

    // WhatsApp number (WITHOUT + or spaces)
    $whatsappNumber = "919500369980";

    // ✅ Write message normally (NO %0A)
    $whatsappMessage =
        "Hello I-5 Car Decors\n\n" .
        "Name: $name\n" .
        "Phone: $phone\n" .
        "Service Interested: $service\n" .
        "Message: $message";

    // Encode ONCE
    $whatsappURL = "https://wa.me/$whatsappNumber?text=" . urlencode($whatsappMessage);
    header("Location: $whatsappURL");
    exit;
}
?>
