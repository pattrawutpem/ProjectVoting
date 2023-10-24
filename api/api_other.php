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
        $sql = "SELECT *,SUBSTRING(((score / 100)*sum(score)),1,5) AS per FROM register_other WHERE void = 0 AND toppic_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 1:
        $sql = "SELECT * FROM register_toppic where void = 0 ORDER BY toppic_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 3:
        $sql = "UPDATE register_toppic SET void = 1 WHERE toppic_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 4:
        $sql = "UPDATE register_other SET void = 1 WHERE register_other_id = :id_o";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_o', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 5:
        $sql = "SELECT * FROM register_other WHERE void = 0 AND toppic_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 6:
        $sql = "SELECT MAX(toppic_id) FROM `register_toppic`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $Representatives_id = $maxIdResult + 1;
        }

        $sql = "INSERT INTO register_toppic(toppic_id,toppic_name,void) VALUES('$Representatives_id',:toppic_name,0)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':toppic_name', $_POST["toppic_name"]);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 7:
        $sql = "UPDATE register_toppic SET void = 1 WHERE toppic_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 8:
        $sql = "SELECT * FROM register_other JOIN register_toppic USING(toppic_id) WHERE register_toppic.void = 0 AND register_toppic.toppic_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 9:
        $sql = "SELECT MAX(register_other_id) FROM `register_other`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $register_other_id = $maxIdResult + 1;
        }

        $target_dir = "../api/canidate/"; //ที่อยู่ไฟล์ที่จะเก็บรูป
        $target_file =  $target_dir . uniqid() . basename($_FILES["picture"]["name"]);
        $file_name = basename($target_file); //ตัด parth เอาแค่ ชื่อ
        move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);

        $sql = "INSERT INTO register_other ( register_other_id, register_other_fistname, register_other_lastname, number, detail, picture,
        type_id, toppic_id, score, regis_date, void)
        VALUES('$register_other_id', :register_other_fistname, :register_other_lastname, :number, :detail, :picture, 4, :toppic_id, 0, date(now()),0) ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':picture', $file_name);
        $stmt->bindParam(':toppic_id', $_POST["toppic_id"]);
        $stmt->bindParam(':register_other_fistname', $_POST["register_other_fistname"]);
        $stmt->bindParam(':register_other_lastname', $_POST["register_other_fistname"]);
        $stmt->bindParam(':number', $_POST["number"]);
        $stmt->bindParam(':detail', $_POST["detail"]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 10:
        $sql = "SELECT * FROM register_other JOIN register_toppic USING(toppic_id) WHERE register_toppic.void = 0 AND register_other.register_other_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 11:
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $statement = $conn->prepare("SELECT picture FROM register_other WHERE register_other_id = :no");
        $statement->bindParam(':no', $path[5]);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        $pathImg = "../api/canidate/";

        if ($_FILES["picture"]["error"] === UPLOAD_ERR_OK) {
            $uploadedPicture = $_FILES["picture"]["name"];  // รับชื่อรูปที่อัปโหลด
            // เปรียบเทียบรูปที่อัปโหลดกับรูปที่ดึงมาจากฐานข้อมูล
            if ($uploadedPicture != $result["picture"]) {
                foreach ($result as $row) {
                    if ($_POST["picture"] != $result) {
                        unlink($pathImg . $row["picture"]);
                        $target_dir = $pathImg;
                        $target_file =  $target_dir . uniqid() . basename($_FILES["picture"]["name"]);
                        $file_name = basename($target_file);
                        move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);

                        $sql = "UPDATE register_other SET register_other_fistname = :register_other_fistname, register_other_lastname = :register_other_lastname 
                        ,number = :number , picture = :picture, detail = :detail WHERE register_other_id = :no";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':no', $_POST["register_other_id"]);
                        $stmt->bindParam(':picture', $file_name);
                        $stmt->bindParam(':number', $_POST["number"]);
                        $stmt->bindParam(':detail', $_POST["detail"]);
                        $stmt->bindParam(':register_other_fistname', $_POST["register_other_fistname"]);
                        $stmt->bindParam(':register_other_lastname', $_POST["register_other_lastname"]);

                        if ($stmt->execute()) {
                            $response = ['status' => 1, 'message' => 'Record created successfully.'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to create record.'];
                        }
                        echo json_encode($response);
                    }
                }
            }
        } else {
            $sql = "UPDATE register_other SET register_other_fistname = :register_other_fistname, register_other_lastname = :register_other_lastname
            ,number = :number , detail = :detail WHERE register_other_id = :no";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':no', $_POST["register_other_id"]);
            $stmt->bindParam(':number', $_POST["number"]);
            $stmt->bindParam(':detail', $_POST["detail"]);
            $stmt->bindParam(':register_other_fistname', $_POST["register_other_fistname"]);
            $stmt->bindParam(':register_other_lastname', $_POST["register_other_lastname"]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
            echo json_encode($response);
        }
        break;
    case 13:
        $sql = "SELECT * FROM `register_other` JOIN register_toppic USING(toppic_id) WHERE register_other.void = 0 AND register_toppic.toppic_id ORDER BY toppic_id";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 14:
        $sql = "SELECT * FROM `register_toppic` WHERE void = 0 ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 15:
        $sql = "SELECT * FROM `register_toppic` WHERE toppic_id =:id AND void = 0";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 16:
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_other ro2 WHERE ro2.void = 0 AND ro2.toppic_id = register_other.toppic_id)) * 100, 2) AS percentage FROM register_other WHERE void = 0 GROUP BY register_other_id ORDER BY score DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 17:
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_other ro2 WHERE ro2.void = 0 AND ro2.toppic_id = register_other.toppic_id)) * 100, 2) AS percentage FROM register_other WHERE void = 0 GROUP BY register_other_id ORDER BY score DESC LIMIT 4";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 18:
        $sql = "UPDATE `register_other` SET score = score + 1 WHERE club_president_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);

        $sql = "UPDATE `voter` SET status_vote = 1 WHERE voter_id = :id_";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_', $path[6]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 19:
        $sql = "SELECT * FROM `register_toppic`JOIN register_other USING(toppic_id) WHERE register_toppic.void = 0 AND toppic_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 20:
        $sql = "SELECT * FROM register_other WHERE void = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 21:
        // รับข้อมูลที่ส่งมาจาก Axios
        $data = json_decode(file_get_contents("php://input"), true);
        // รับข้อมูลที่ส่งมาจาก Axios โดยใช้ 'multipart/form-data'
        $data = $_POST;

        // ตรวจสอบว่าข้อมูลถูกต้องและครบถ้วน
        if (isset($data["number"]) && isset($data["type_id"]) && isset($data["score"]) && isset($data["regis_date"])) {
            // ทำงานกับ $data ได้
            foreach ($data["number"] as $key => $number) {
                $type_id = $data["type_id"][$key];
                $score = $data["score"][$key];
                $regis_date = $data["regis_date"][$key];

                // เขียนโค้ดเพื่ออัปเดตข้อมูลในฐานข้อมูล SQL
                $sql = "UPDATE register_other SET score = :score WHERE number = :number AND regis_date = :regis_date AND type_id = :type_id";
                $stmt = $conn->prepare($sql);

                // ใช้ bindParam ในการผูกพารามิเตอร์
                $stmt->bindParam(':number', $number);
                $stmt->bindParam(':type_id', $type_id);
                $stmt->bindParam(':score', $score);
                $stmt->bindParam(':regis_date', $regis_date);

                // สั่งให้รันคำสั่ง SQL
                if ($stmt->execute()) {
                    // อัปเดตข้อมูลสำเร็จ
                    http_response_code(200); // OK
                    echo json_encode(array("message" => "อัปเดตข้อมูลสำเร็จ"));
                } else {
                    // มีข้อผิดพลาดในการอัปเดต
                    $errorInfo = $stmt->errorInfo();
                    http_response_code(500); // Internal Server Error
                    echo json_encode(array("message" => "เกิดข้อผิดพลาดในการอัปเดตข้อมูล: " . $errorInfo[2]));
                    exit;
                }
            }
        } else {
            // ถ้าข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน
            http_response_code(400); // Bad Request
            echo json_encode(array("message" => "ข้อมูลไม่ถูกต้องหรือไม่ครบถ้วน"));
        }
        break;
}
