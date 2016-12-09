<?php
session_start();

include 'pdo_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $query = "SELECT name,impactTotal,processQuality,businessQuality,techQuality FROM `BusinessProcess` WHERE IDProject = (?)";
    $params = array($_SESSION['projectID']);
    $results = dataQuery($query,$params);

    echo json_encode($results);
}