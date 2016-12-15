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
    $result1 = dataQuery($query,$params);

    $query = "SELECT conclusions FROM `Project` WHERE ID = (?)";
    $result2 = dataQuery($query, $params);

    $results = array_merge($result1, $result2);

    echo json_encode($results);
}