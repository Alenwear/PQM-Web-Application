<?php

include 'pdo_connect.php';

$row = $_POST['arguments'];
$query = "DELETE FROM `Project` WHERE ID = ?";
$params = array($row);
$results = dataQuery($query, $params);

if ($results)
    echo 1;
else
    echo -1;