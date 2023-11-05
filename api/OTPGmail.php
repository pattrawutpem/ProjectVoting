<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include("connect.php");
$objDb = new Connect;
$conn = $objDb->connect();

require 'vendor/autoload.php';

// สร้างรหัส OTP สุ่ม
$otp = rand(1000, 9999);
$voter_id = $_POST["voter_id"];
$email = $_POST["email"];
// เซ็ตข้อมูลอีเมลสำหรับการส่ง OTP
$mail = new PHPMailer();
try {
    // กำหนดการใช้ SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = '631463013@crru.ac.th'; // อีเมลของคุณ
    $mail->Password = 'mqkf llao wrmr dzha'; // รหัสผ่านของคุณ
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ใช้ TLS
    $mail->Port = 587;

    // กำหนดผู้รับและข้อความ
    $mail->setFrom('631463013@crru.ac.th', 'Development');
    $mail->addAddress($email, 'Recipient Name');
    $mail->isHTML(true);
    $mail->Subject = 'OTP Election';
    $mail->Body = "รหัส OTP ของคุณคือ: $otp";

    // ส่งอีเมล
    $mail->send();
    // After sending the email
    echo 'อีเมลถูกส่งสำเร็จ';

    $sql = "UPDATE voter SET otp = $otp WHERE voter_id = :voter_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':voter_id', $voter_id);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record updated successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to update record.'];
    }
    echo json_encode($response);

    $response = ['otp' => $otp];
    echo json_encode($response);

} catch (Exception $e) {
    echo "เกิดข้อผิดพลาดในการส่งอีเมล: {$mail->ErrorInfo}";
}
