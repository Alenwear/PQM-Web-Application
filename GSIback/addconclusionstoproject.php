<?php
session_start();

include 'pdo_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conclusions = $_POST['conclusions'];
    $results = -1;
    if ($conclusions != ""){
        $query = "UPDATE `Project` SET `conclusions` = ? WHERE ID = ?";
        $params = array($conclusions, $_SESSION['projectID']);
        $results = dataQuery($query, $params);
    }

    echo 1 == $results ? 1: -1;
}