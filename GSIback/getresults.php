<?php
session_start();

include 'pdo_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $_SESSION['projectID'] = $_POST['arguments'];
    echo 1;
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $query = "SELECT name,impactTotal,processQuality,bigBurner,businessQuality,techQuality FROM `BusinessProcess` WHERE IDProject = (?)";
    $params = array($_SESSION['projectID']);
    $results = dataQuery($query,$params);

    echo json_encode($results);
}