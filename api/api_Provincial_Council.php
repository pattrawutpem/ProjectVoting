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
        $sql = "SELECT * FROM `register_provincial_council` WHERE void = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 1:
        $sql = "UPDATE score_voter SET void = 1 WHERE score_vID = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 2: // fetch data register_provincial_council
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_provincial_council WHERE void = 0)) * 100, 2) AS percentage FROM register_provincial_council WHERE void = 0 order by score DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 3: //delete register_provincial_council
        $sql = "UPDATE register_provincial_council SET void = 1 WHERE provincial_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        break;
    case 4:
        //เพิ่มข้อมูล สจ.
        $sql = "SELECT MAX(provincial_id) FROM `register_provincial_council`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $Representatives_id = $maxIdResult + 1;
        }

        $target_dir = "../api/canidate/"; //ที่อยู่ไฟล์ที่จะเก็บรูป
        $target_file =  $target_dir . uniqid() . basename($_FILES["picture"]["name"]);
        $file_name = basename($target_file); //ตัด parth เอาแค่ ชื่อ
        move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);

        $sql = "INSERT INTO register_provincial_council(provincial_id, picture, number, 
         prefix, provincial_firstname, provincial_lastname, age, birth_date, idCard, email, phone, 
         nationality, career, house_number, moo , tumbon, district, province, post, constituency,
          educational, type_id, regis_date, void) VALUES('$Representatives_id', :picture, :number, :prefix,
           :provincial_firstname, :provincial_lastname, :age, :birth_date, :idCard, :email, :phone, :nationality,
            :career, :house_number, :moo, :tumbon,:district, :province, :post, :constituency, :educational, 2,date(now()), 0)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':picture', $file_name);
        $stmt->bindParam(':number', $_POST["number"]);
        $stmt->bindParam(':prefix', $_POST["prefix"]);
        $stmt->bindParam(':provincial_firstname', $_POST["provincial_firstname"]);
        $stmt->bindParam(':provincial_lastname', $_POST["provincial_lastname"]);
        $stmt->bindParam(':age', $_POST["age"]);
        $stmt->bindParam(':birth_date', $_POST["birth_date"]);
        $stmt->bindParam(':idCard', $_POST["idCard"]);
        $stmt->bindParam(':email', $_POST["email"]);
        $stmt->bindParam(':phone', $_POST["phone"]);
        $stmt->bindParam(':nationality', $_POST["nationality"]);
        $stmt->bindParam(':career', $_POST["career"]);
        $stmt->bindParam(':house_number', $_POST["house_number"]);
        $stmt->bindParam(':moo', $_POST["moo"]);
        $stmt->bindParam(':tumbon', $_POST["tumbon"]);
        $stmt->bindParam(':district', $_POST["district"]);
        $stmt->bindParam(':province', $_POST["province"]);
        $stmt->bindParam(':post', $_POST["post"]);
        $stmt->bindParam(':constituency', $_POST["constituency"]);
        $stmt->bindParam(':educational', $_POST["educational"]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 5:
        $sql = "SELECT * FROM `register_provincial_council` WHERE void = 0 AND provincial_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 6:
        $user = json_decode(file_get_contents('php://input'));
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $statement = $conn->prepare("SELECT picture FROM register_provincial_council WHERE provincial_id = :id");
        $statement->bindParam(':id', $path[5]);
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

                        $sql = "UPDATE register_provincial_council SET number = :number , picture = :picture, prefix = :prefix ,
                        provincial_firstname = :provincial_firstname , provincial_lastname = :provincial_lastname ,age = :age , 
                        birth_date = :birth_date , idCard = :idCard , email = :email , phone = :phone , nationality = :nationality ,
                        career = :career , house_number = :house_number, moo = :moo, tumbon = :tumbon, district = :district, 
                        province = :province, post = :post, constituency = :constituency, educational = :educational WHERE provincial_id = :id";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':id', $_POST["provincial_id"]);
                        $stmt->bindParam(':picture', $file_name);
                        $stmt->bindParam(':number', $_POST["number"]);
                        $stmt->bindParam(':prefix', $_POST["prefix"]);
                        $stmt->bindParam(':provincial_firstname', $_POST["provincial_firstname"]);
                        $stmt->bindParam(':provincial_lastname', $_POST["provincial_lastname"]);
                        $stmt->bindParam(':age', $_POST["age"]);
                        $stmt->bindParam(':birth_date', $_POST["birth_date"]);
                        $stmt->bindParam(':idCard', $_POST["idCard"]);
                        $stmt->bindParam(':email', $_POST["email"]);
                        $stmt->bindParam(':phone', $_POST["phone"]);
                        $stmt->bindParam(':nationality', $_POST["nationality"]);
                        $stmt->bindParam(':career', $_POST["career"]);
                        $stmt->bindParam(':house_number', $_POST["house_number"]);
                        $stmt->bindParam(':moo', $_POST["moo"]);
                        $stmt->bindParam(':tumbon', $_POST["tumbon"]);
                        $stmt->bindParam(':district', $_POST["district"]);
                        $stmt->bindParam(':province', $_POST["province"]);
                        $stmt->bindParam(':post', $_POST["post"]);
                        $stmt->bindParam(':constituency', $_POST["constituency"]);
                        $stmt->bindParam(':educational', $_POST["educational"]);

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
            $sql = "UPDATE register_provincial_council SET number = :number , prefix = :prefix ,provincial_firstname = :provincial_firstname, 
            provincial_lastname = :provincial_lastname ,age = :age , birth_date = :birth_date , idCard = :idCard , email = :email, 
            phone = :phone , nationality = :nationality ,career = :career , house_number = :house_number, moo = :moo, tumbon = :tumbon, 
            district = :district, province = :province, post = :post, constituency = :constituency, educational = :educational WHERE provincial_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $_POST["provincial_id"]);
            $stmt->bindParam(':number', $_POST["number"]);
            $stmt->bindParam(':prefix', $_POST["prefix"]);
            $stmt->bindParam(':provincial_firstname', $_POST["provincial_firstname"]);
            $stmt->bindParam(':provincial_lastname', $_POST["provincial_lastname"]);
            $stmt->bindParam(':age', $_POST["age"]);
            $stmt->bindParam(':birth_date', $_POST["birth_date"]);
            $stmt->bindParam(':idCard', $_POST["idCard"]);
            $stmt->bindParam(':email', $_POST["email"]);
            $stmt->bindParam(':phone', $_POST["phone"]);
            $stmt->bindParam(':nationality', $_POST["nationality"]);
            $stmt->bindParam(':career', $_POST["career"]);
            $stmt->bindParam(':house_number', $_POST["house_number"]);
            $stmt->bindParam(':moo', $_POST["moo"]);
            $stmt->bindParam(':tumbon', $_POST["tumbon"]);
            $stmt->bindParam(':district', $_POST["district"]);
            $stmt->bindParam(':province', $_POST["province"]);
            $stmt->bindParam(':post', $_POST["post"]);
            $stmt->bindParam(':constituency', $_POST["constituency"]);
            $stmt->bindParam(':educational', $_POST["educational"]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        }
        break;
    case 7:
        $sql = "SELECT *,SUBSTRING_INDEX(((score / 100)*sum(score)),'.',1) AS per FROM `register_provincial_council` WHERE void = 0 GROUP BY provincial_id ORDER BY score DESC LIMIT 4";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 8:
        $sql = "UPDATE `register_provincial_council` SET score = score + 1 WHERE provincial_id = :id";
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
    case 9: // fetch data register_provincial_council
        $sql = "SELECT *, ROUND((score / (SELECT SUM(score) FROM register_provincial_council WHERE void = 0)) * 100, 2) AS percentage FROM register_provincial_council WHERE void = 0 order by score DESC LIMIT 4";
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
                $sql = "UPDATE register_provincial_council SET score = :score WHERE number = :number AND regis_date = :regis_date AND type_id = :type_id";
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
