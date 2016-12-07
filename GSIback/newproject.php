<?php
session_start();

include 'pdo_connect.php';

/*
 * type 0 = upwards
 * type 1 = external
 * type 2 = functional
 * type 3 = peer
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $mission= $_POST['mission'];
    $enterprise = $_POST['enterprise'];
    $upwards = $_POST['upwards'];
    $external = $_POST['external'];
    $functional = $_POST['functional'];
    $peer = $_POST['peer'];


    if ($name != "" && $mission!="" && $enterprise!="" && $upwards!="" && $external!="" && $functional!="" && $peer!="") {
        $query = 'INSERT INTO `Project` (`name`, `mission`, `enterprise`,`dateCreated`,`User_ID`) VALUES (?,?,?,NOW(),?)';
        $params = array($name, $mission, $enterprise ,$_SESSION['userID']);
        $results = dataQuery($query, $params);
        $query = 'SELECT ID FROM `Project` ORDER BY ID DESC LIMIT 1;';
        $params = array();
        $results = dataQuery($query, $params);
        $_SESSION['projectID'] = $results[0]['ID'];
        $upwards = explode(",",$upwards);
        $external = explode(",", $external);
        $functional = explode(",", $functional);
        $peer = explode(",", $peer);
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
    }
    else{
        echo 'Fill in all of the required parameters';
        return;
    }

    // for testing only
    echo 1 == $results ? 1: -1;
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($_SESSION['userFirstName']);
}