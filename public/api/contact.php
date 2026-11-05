<?php
// RSBIZ enquiry handler. Configure PHP mail delivery on your hosting account.
header('Content-Type: text/html; charset=UTF-8');
function finish($message, $ok = false) {
  $color = $ok ? '#6b8d52' : '#a31c55';
  echo '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>RSBIZ Enquiry</title></head><body style="margin:0;background:#fffaf7;font-family:Arial,sans-serif;color:#42102f;display:grid;place-items:center;min-height:100vh"><main style="max-width:520px;margin:24px;padding:40px;background:white;border:1px solid #eadbd7;border-radius:8px;text-align:center"><div style="font-size:13px;letter-spacing:3px;color:#b77a25">RSBIZ</div><h1 style="font-size:26px"> '.htmlspecialchars($message).' </h1><p style="color:#786c73">Thank you for reaching out. You can return to the website.</p><a href="/" style="display:inline-block;background:#42102f;color:white;text-decoration:none;padding:13px 20px;margin-top:10px">Back to RSBIZ</a></main></body></html>';
  exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); finish('Please submit the enquiry form.'); }
if (!empty($_POST['website'])) { finish('Thank you. Your enquiry has been received.', true); }
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');
if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $phone === '' || $service === '') {
  http_response_code(422); finish('Please check the required fields and try again.');
}
$to = 'info@rsbiz.in';
$subject = 'New website enquiry — RSBIZ';
$body = "A new enquiry has been submitted on rsbiz.in\n\nName: $name\nEmail: $email\nPhone: $phone\nService: $service\n\nRequirement:\n$message\n";
$headers = "From: RSBIZ Website <no-reply@rsbiz.in>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";
if (mail($to, $subject, $body, $headers)) {
  finish('Your enquiry has been sent successfully.', true);
} else {
  http_response_code(500);
  finish('We could not send your enquiry right now. Please email info@rsbiz.in.');
}
?>