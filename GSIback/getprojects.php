<?php
session_start();
include 'pdo_connect.php';

$user = $_SESSION['userID'];
$array = array(array('userFirstName' => $_SESSION['userFirstName']));
$query = "SELECT * FROM `Project` WHERE User_ID = ?";
$params = array($user);
$results = dataQuery($query, $params);
$array = array_merge($array, $results);
echo json_encode($array);
?>
