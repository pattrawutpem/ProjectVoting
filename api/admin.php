<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include("connect.php");
$objDb = new Connect;
$conn = $objDb->connect();

$case = $_GET['xCase'];
switch ($case) {
    case 0:
        $sql = "SELECT * FROM account where account_username = :user AND account_password = :password AND void = 0;";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user', $_POST["user"]);
        $stmt->bindParam(':password', $_POST["password"]);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($results) {
            $results['status'] = 1;
            $results['message'] = 'successfully.';
        } else {
            $results['status'] = 0;
            $results['message'] = 'Failed.';
        }
        echo json_encode($results);
        break;
    case 1:
        $sql = "SELECT * FROM voter where idCard = :idCard AND phone = :phone AND void = 0;";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idCard', $_POST["idCard"]);
        $stmt->bindParam(':phone', $_POST["phone"]);
        $stmt->execute();
        $results = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($results) {
            $results['status'] = 1;
            $results['message'] = 'successfully.';
        } else {
            $results['status'] = 0;
            $results['message'] = 'Failed.';
        }
        echo json_encode($results);
        break;
}
