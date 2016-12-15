<?php

session_start();

include 'pdo_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['arguments'])){
        $_SESSION['projectID'] = $_POST['arguments'];
        echo 1;
    }

    else {
        $name = $_POST['name'];
        $mission = $_POST['mission'];
        $enterprise = $_POST['enterprise'];
        $upwards = $_POST['upwards'];
        $external = $_POST['external'];
        $functional = $_POST['functional'];
        $peer = $_POST['peer'];


        if ($name != "" && $mission != "" && $enterprise != "" && $upwards != "" && $external != "" && $functional != "" && $peer != "") {
            $query = 'UPDATE `Project` SET `name` = ?, `mission` = ?, `enterprise` = ? WHERE `ID` = ?';
            $params = array($name, $mission, $enterprise, $_SESSION['projectID']);
            $results = dataQuery($query, $params);
            $upwards = explode(",", $upwards);
            $external = explode(",", $external);
            $functional = explode(",", $functional);
            $peer = explode(",", $peer);
            $query = 'DELETE FROM `DominantInfluence` WHERE `IDProject` = ?';
            $params = array($_SESSION['projectID']);
            $results = dataQuery($query, $params);
            foreach ($upwards as $value) {
                $query = 'INSERT INTO `DominantInfluence` (`IDProject`, `type`,`name`) VALUES (?,?,?)';
                $params = array($_SESSION['projectID'], 0, $value);
                $results = dataQuery($query, $params);
            }
            foreach ($external as $value) {
                $query = 'INSERT INTO `DominantInfluence` (`IDProject`, `type`,`name`) VALUES (?,?,?)';
                $params = array($_SESSION['projectID'], 1, $value);
                $results = dataQuery($query, $params);
            }
            foreach ($functional as $value) {
                $query = 'INSERT INTO `DominantInfluence` (`IDProject`, `type`,`name`) VALUES (?,?,?)';
                $params = array($_SESSION['projectID'], 2, $value);
                $results = dataQuery($query, $params);
            }
            foreach ($peer as $value) {
                $query = 'INSERT INTO `DominantInfluence` (`IDProject`, `type`,`name`) VALUES (?,?,?)';
                $params = array($_SESSION['projectID'], 3, $value);
                $results = dataQuery($query, $params);
            }
        } else {
            echo 'Fill in all of the required parameters';
            return;
        }

        // for testing only
        echo 1 == $results ? 1 : -1;
    }
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $query = 'SELECT * FROM `Project` WHERE `ID` = ?';
    $params = array($_SESSION['projectID']);
    $result1 = dataQuery($query, $params);
    $query = 'SELECT * FROM `DominantInfluence` WHERE `IDProject` = ?';
    $result2 = dataQuery($query, $params);
    $results = array_merge($result1, $result2);

    echo json_encode($results);
}