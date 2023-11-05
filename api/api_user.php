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
        $sql = "SELECT * FROM `voter` WHERE void = 0 ORDER BY voter_id DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 1:
        $sql = "UPDATE voter SET void = 1 WHERE voter_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 2:
        $sql = "SELECT MAX(voter_id) FROM `voter` WHERE void = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $maxIdResult = $stmt->fetchColumn();

        if ($maxIdResult !== false) {
            $voter_id = $maxIdResult + 1;
        }

        $sql = "INSERT INTO voter(voter_id, voter_firstname, voter_lastname, Gender, idCard, email, phone) 
        VALUES('$voter_id', :voter_firstname, :voter_lastname, :Gender, :idCard, :email, :phone)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':voter_firstname', $_POST["voter_firstname"]);
        $stmt->bindParam(':voter_lastname', $_POST["voter_lastname"]);
        $stmt->bindParam(':Gender', $_POST["Gender"]);
        $stmt->bindParam(':idCard', $_POST["idCard"]);
        $stmt->bindParam(':email', $_POST["email"]);
        $stmt->bindParam(':phone', $_POST["phone"]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;
    case 3:
        $sql = "SELECT * FROM voter WHERE void = 0 AND voter_id =:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        $stmt->execute();
        $location = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
        // case 4:
        //     $sql = "UPDATE  voter SET void = 1 WHERE voter_id =:id";
        //     $stmt = $conn->prepare($sql);
        //     $stmt->execute();
        //     $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     echo json_encode($location);
        //     break;
    case 5:
        try {
            $sql = "UPDATE voter SET voter_firstname = :voter_firstname, voter_lastname = :voter_lastname, Gender = :Gender, idCard = :idCard, email = :email, phone = :phone WHERE voter_id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $_POST["voter_id"]);
            $stmt->bindParam(':voter_firstname', $_POST["voter_firstname"]);
            $stmt->bindParam(':voter_lastname', $_POST["voter_lastname"]);
            $stmt->bindParam(':Gender', $_POST["Gender"]);
            $stmt->bindParam(':idCard', $_POST["idCard"]);
            $stmt->bindParam(':email', $_POST["email"]);
            $stmt->bindParam(':phone', $_POST["phone"]);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
        } catch (PDOException $e) {
            // Handle database errors here, e.g., log the error or return an error response.
            $response = ['status' => 0, 'message' => 'Database error: ' . $e->getMessage()];
            echo json_encode($response);
        }
        break;
    case 6:
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                // ตรวจสอบค่า voter_id ที่สูงสุด
                $sql = "SELECT MAX(voter_id) FROM `voter` WHERE void = 0";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $maxIdResult = $stmt->fetchColumn();

                if ($maxIdResult !== false) {
                    $voter_id = $maxIdResult + 1;
                } else {
                    $voter_id = 1; // หากไม่มีข้อมูลในตาราง voter ให้เริ่มต้นที่ 1
                }

                // ตรวจสอบว่ามีการส่งไฟล์ CSV มาหรือไม่
                if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
                    $csvFile = fopen($_FILES['file']['tmp_name'], 'r');

                    if ($csvFile) {
                        try {
                            while (($data = fgetcsv($csvFile)) !== false) {
                                // ตรวจสอบว่าข้อมูลในอาร์เรย์มีคีย์ที่ถูกต้องก่อนใช้งาน
                                if (count($data) >= 7) {
                                    $voter_firstname = $data[0];
                                    $voter_lastname = $data[1];
                                    $Gender = $data[2];
                                    $idCard = $data[3];
                                    $email = $data[4];
                                    $phone = $data[5];

                                    $stmt = $conn->prepare('INSERT INTO voter (voter_id, voter_firstname, voter_lastname, Gender, idCard, email, phone) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?)');
                                    $stmt->execute([$voter_id, $voter_firstname, $voter_lastname, $Gender, $idCard, $email, $phone]);

                                    // เพิ่มค่า voter_id สำหรับการเพิ่มข้อมูลในแถวถัดไป
                                    $voter_id++;
                                } else {
                                    echo 'Invalid CSV data format. Make sure each row has at least 6 columns.';
                                }
                            }
                            $conn->commit();
                            fclose($csvFile); // ปิดไฟล์ CSV
                            echo 'CSV data inserted successfully.';
                        } catch (PDOException $e) {
                            $conn->rollBack();
                            echo 'Error inserting CSV data: ' . $e->getMessage();
                        }
                    } else {
                        echo 'Error opening CSV file.';
                    }
                } else {
                    echo 'No file uploaded.';
                }
            } catch (PDOException $e) {
                echo 'Database Connection Error: ' . $e->getMessage();
            }
        }
        break;
    case 7:
        $sql = "SELECT COUNT(voter_id) as Total FROM `voter` WHERE void = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 8://ข้อมูล สส
        $sql = "SELECT COUNT(status_vote_hor) AS TotalD  FROM `voter` WHERE void = 0 AND status_vote_hor = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 9:
        $sql = "SELECT COUNT(status_vote_hor) AS TotalA FROM `voter` WHERE void = 0 AND status_vote_hor = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 10:
        $sql = "SELECT * FROM `type`";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 11: //สจ.
        $sql = "SELECT COUNT(status_vote_prc) AS TotalD  FROM `voter` WHERE void = 0 AND status_vote_prc = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 12:
        $sql = "SELECT COUNT(status_vote_prc) AS TotalA FROM `voter` WHERE void = 0 AND status_vote_prc = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 13: //สโม.
        $sql = "SELECT COUNT(status_vote_clp) AS TotalD  FROM `voter` WHERE void = 0 AND status_vote_clp = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 14:
        $sql = "SELECT COUNT(status_vote_clp) AS TotalA FROM `voter` WHERE void = 0 AND status_vote_clp = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 15: //อื่นๆ.
        $sql = "SELECT COUNT(status_vote_other) AS TotalD  FROM `voter` WHERE void = 0 AND status_vote_other = 0";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 16:
        $sql = "SELECT COUNT(status_vote_other) AS TotalA FROM `voter` WHERE void = 0 AND status_vote_other = 1";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $location = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($location);
        break;
    case 17: //เช็ค otp
        $sql = "SELECT * FROM voter WHERE void = 0 AND voter_id = :voter_id AND otp = :otp";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':otp', $_POST['otp']);
        $stmt->bindParam(':voter_id', $_POST['voter_id']);
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
