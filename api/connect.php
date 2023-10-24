<?php
    /**
    * Database Connection
    */
    class Connect {
        // private $server = 'student.crru.ac.th';
        // private $dbname = '631463013';
        // private $user = '631463013';
        // private $pass = '17212';

        private $server = 'localhost';
        private $dbname = 'election';
        private $user = 'root';
        private $pass = '';

        //oooWebHost
        // private $server = 'localhost';
        // private $dbname = 'id21442045_voter';
        // private $user = 'id21442045_voter';
        // private $pass = 'Voter_1234';


        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }
        
    }
?>