<?php
session_start();
include 'pdo_connect.php';

if(!empty($_POST)) {
    if ($_POST['uname'] != "" && $_POST['upassword']) {
        $query = "SELECT * FROM `User` WHERE `username` = ?";
        $params = array($_POST['uname']);
        $results = dataQuery($query, $params);
    }
    else{
        echo 'Fill in all of the required parameters';
    }
}

if ($results != null) {
    $hash = $results[0]['password']; // first and only row if username exists;

    if (md5($_POST['upassword']) === $hash) {
        $_SESSION['userFirstName'] = $results[0]['firstName'];
        $_SESSION['userID'] = $results[0]['ID'];
        echo json_encode($_SESSION['userFirstName']);
        return;
    }
}

echo -1;


?>



