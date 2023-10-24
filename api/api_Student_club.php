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
    case 0: //ดึงข้อมูลคะนน
        $sql = "SELECT * FROM register_club_president WHERE void = 0";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[4]) && is_numeric($path[4])) {
            $sql .= " and type_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4]);
            $stmt->execute();
            $location = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($location);
        break;
    case 1:         // ลบข้อมูลคะแนน
        $sql = "UPDATE score_voter SET void = 1 WHERE score_vID = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 2:     //ดึงข้อมูลผู้สมัคร
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_club_president WHERE void = 0)) * 100, 2) AS percentage FROM register_club_president WHERE void = 0 order by score DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 3: // ลบข้อมูลผู้สมัคร
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $statement = $conn->prepare("SELECT picture FROM register_club_president WHERE club_president_id = :id");
        $statement->bindParam(':id', $path[4]);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        $pathImg = "../public/dist/img/canidate/";
        foreach ($result as $row) {
            if ($result != '') {
                unlink($pathImg . $row["picture"]);
            }
        }
        $sql = "UPDATE register_club_president SET void = 1 WHERE club_president_id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 4: //ดึงข้อมูลผู้สมัครประธานสโมสร
        $sql = "SELECT * FROM `register_club_president` WHERE void = 0 AND club_president_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 5: //เพิ่มข้อมูลประธานสโมสร
        $sql = "SELECT MAX(club_president_id) FROM `register_club_president`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $club_president_id = $maxIdResult + 1;
        }

        $target_dir = "../api/canidate/"; //ที่อยู่ไฟล์ที่จะเก็บรูป
        $target_file =  $target_dir . uniqid() . basename($_FILES["picture"]["name"]);
        $file_name = basename($target_file); //ตัด parth เอาแค่ ชื่อ
        move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);

        $sql = "INSERT INTO register_club_president(club_president_id, picture, number, prefix, club_president_firstname, club_president_lastname, age, birth_date, idCard, email, phone, faculty, major, slogan, detail, type_id, score, regis_date,void) 
        VALUES('$club_president_id', :picture, :number, :prefix, :club_president_firstname, :club_president_lastname, :age, :birth_date, :idCard, :email, :phone, :faculty, :major, :slogan, :detail, '3', '0',date(now()), 0)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':picture', $file_name);
        $stmt->bindParam(':number', $_POST["number"]);
        $stmt->bindParam(':prefix', $_POST["prefix"]);
        $stmt->bindParam(':club_president_firstname', $_POST["club_president_firstname"]);
        $stmt->bindParam(':club_president_lastname', $_POST["club_president_lastname"]);
        $stmt->bindParam(':age', $_POST["age"]);
        $stmt->bindParam(':birth_date', $_POST["birth_date"]);
        $stmt->bindParam(':idCard', $_POST["idCard"]);
        $stmt->bindParam(':email', $_POST["email"]);
        $stmt->bindParam(':phone', $_POST["phone"]);
        $stmt->bindParam(':faculty', $_POST["faculty"]);
        $stmt->bindParam(':major', $_POST["major"]);
        $stmt->bindParam(':slogan', $_POST["slogan"]);
        $stmt->bindParam(':detail', $_POST["detail"]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 6: //แก้ไขข้อมูลประธานสโมสร
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $statement = $conn->prepare("SELECT picture FROM register_club_president WHERE club_president_id = :id");
        $statement->bindParam(':id', $path[4]);
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

                        $sql = "UPDATE register_club_president SET picture = :picture ,number = :number , prefix = :prefix , 
                        club_president_firstname = :club_president_firstname , club_president_lastname = :club_president_lastname , 
                        age = :age , birth_date = :birth_date , idCard = :idCard , email = :email , phone = :phone , faculty = :faculty ,
                        major = :major , slogan = :slogan , detail = :detail WHERE club_president_id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $_POST["club_president_id"]);
                        $stmt->bindParam(':picture', $file_name);
                        $stmt->bindParam(':number', $_POST["number"]);
                        $stmt->bindParam(':prefix', $_POST["prefix"]);
                        $stmt->bindParam(':club_president_firstname', $_POST["club_president_firstname"]);
                        $stmt->bindParam(':club_president_lastname', $_POST["club_president_lastname"]);
                        $stmt->bindParam(':age', $_POST["age"]);
                        $stmt->bindParam(':birth_date', $_POST["birth_date"]);
                        $stmt->bindParam(':idCard', $_POST["idCard"]);
                        $stmt->bindParam(':email', $_POST["email"]);
                        $stmt->bindParam(':phone', $_POST["phone"]);
                        $stmt->bindParam(':faculty', $_POST["faculty"]);
                        $stmt->bindParam(':major', $_POST["major"]);
                        $stmt->bindParam(':slogan', $_POST["slogan"]);
                        $stmt->bindParam(':detail', $_POST["detail"]);

                        if ($stmt->execute()) {
                            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
                        } else {
                            $response = ['status' => 0, 'message' => 'Failed to update record.'];
                        }
                        echo json_encode($response);
                    }
                }
            }
        } else {
            $sql = "UPDATE register_club_president SET number = :number , prefix = :prefix , 
            club_president_firstname = :club_president_firstname , club_president_lastname = :club_president_lastname , 
            age = :age , birth_date = :birth_date , idCard = :idCard , email = :email , phone = :phone , faculty = :faculty ,
            major = :major , slogan = :slogan , detail = :detail WHERE club_president_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $_POST["club_president_id"]);
            $stmt->bindParam(':number', $_POST["number"]);
            $stmt->bindParam(':prefix', $_POST["prefix"]);
            $stmt->bindParam(':club_president_firstname', $_POST["club_president_firstname"]);
            $stmt->bindParam(':club_president_lastname', $_POST["club_president_lastname"]);
            $stmt->bindParam(':age', $_POST["age"]);
            $stmt->bindParam(':birth_date', $_POST["birth_date"]);
            $stmt->bindParam(':idCard', $_POST["idCard"]);
            $stmt->bindParam(':email', $_POST["email"]);
            $stmt->bindParam(':phone', $_POST["phone"]);
            $stmt->bindParam(':faculty', $_POST["faculty"]);
            $stmt->bindParam(':major', $_POST["major"]);
            $stmt->bindParam(':slogan', $_POST["slogan"]);
            $stmt->bindParam(':detail', $_POST["detail"]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        }
        break;
    case 7:
        $sql = "SELECT *,SUBSTRING_INDEX(((score / 100)*sum(score)),'.',1) AS per FROM `register_club_president` WHERE void = 0 GROUP BY club_president_id ORDER BY score DESC LIMIT 4";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 8:
        $sql = "UPDATE `register_club_president` SET score = score + 1 WHERE club_president_id = :id";
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
    case 9:     //ดึงข้อมูลผู้สมัคร
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_club_president WHERE void = 0)) * 100, 2) AS percentage FROM register_club_president WHERE void = 0 order by score DESC LIMIT 4";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 10:
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
                $sql = "UPDATE register_club_president SET score = :score WHERE number = :number AND regis_date = :regis_date AND type_id = :type_id";
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
