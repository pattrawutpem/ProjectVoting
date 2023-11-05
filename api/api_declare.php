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
        $sql = "SELECT * FROM `declare`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 1:
        $sql = "SELECT * FROM `declare` WHERE declare_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 2:
        $sql = "SELECT MAX(declare_id) FROM `declare`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $declare_id = $maxIdResult + 1;
        }

        $sql = "INSERT INTO `declare` (declare_id, toppic, detail, start_date, end_date ,type_id) 
        VALUES('$declare_id', :toppic, :detail, :start_date, :end_date, :type_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':toppic', $_POST["toppic"]);
        $stmt->bindParam(':detail', $_POST["detail"]);
        $stmt->bindParam(':start_date', $_POST["start_date"]);
        $stmt->bindParam(':end_date', $_POST["end_date"]);
        $stmt->bindParam(':type_id', $_POST["type_id"]);
        
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 3:
        $sql = "DELETE FROM `declare` WHERE declare_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 4:
        $sql = "UPDATE `declare` SET toppic = :toppic, detail = :detail, start_date = :start_date, end_date = :end_date , type_id = :type_id WHERE declare_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->bindParam(':toppic', $_POST["toppic"]);
        $stmt->bindParam(':detail', $_POST["detail"]);
        $stmt->bindParam(':start_date', $_POST["start_date"]);
        $stmt->bindParam(':end_date', $_POST["end_date"]);
        $stmt->bindParam(':type_id', $_POST["type_id"]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
    break;
    case 5:
        $sql = "SELECT *,SUBSTRING(start_date , 12,8) AS start_time, SUBSTRING(end_date , 12,8) AS end_time, DATE_FORMAT(SUBSTRING(REPLACE(start_date,'-','/'),1,10),'%d/%m/%Y') AS start_date1 , REPLACE(end_date,'-','/') as end_date1 ,DATE_FORMAT(end_date,'%d') AS day, DATE_FORMAT(end_date,'%m') AS month, DATE_FORMAT(end_date,'%Y') AS year FROM `declare` ORDER BY declare_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 6:
        $sql = "SELECT * FROM `type`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 7:
        $sql = "SELECT *,SUBSTRING(start_date , 12,8) AS start_time, SUBSTRING(end_date , 12,8) AS end_time, DATE_FORMAT(SUBSTRING(REPLACE(start_date,'-','/'),1,10),'%d/%m/%Y') AS start_date1 ,REPLACE(end_date,'-','/') as end_date1,DATE_FORMAT(end_date,'%d') AS day, DATE_FORMAT(end_date,'%m') AS month, DATE_FORMAT(end_date,'%Y') AS year FROM `declare` WHERE type_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
}
