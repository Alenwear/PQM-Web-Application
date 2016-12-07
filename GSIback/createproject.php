<?php
session_start();

include 'pdo_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $csflength = $_POST['csflength'];
    $bplength = $_POST['bplength'];
    for ($i = 0; $i< $csflength; $i++){
        $query = 'INSERT INTO `CriticalSuccessFactor` (`name`, `IDProject`) VALUES (?,?)';
        $params = array($_POST['csf'.$i],$_SESSION['projectID']);
        $results = dataQuery($query,$params);
        if ($results != 1){
            echo -1;
            return;
        }
    }
    for ($i = 0; $i< $bplength; $i++){
        $query = 'INSERT INTO `BusinessProcess` (`name`, `impactTotal`,`processQuality`,`bigBurner`,`businessQuality`,`techQuality`,`IDProject`,`mostCritical`) VALUES (?,?,?,?,?,?,?,?)';
        $name = $_POST['bp'.$i];
        $impactTotal = $_POST['numImpacts'.$i];
        $processQuality = $_POST['processQuality'.$i];
        if(isset($_POST['bigBurner'.$i])){
            $bigBurner = 1;
        }
        else{
            $bigBurner = 0;
        }
        $businessQuality = $_POST['businessQuality'.$i];
        $techQuality = $_POST['techQuality'.$i];
        $ProjectID = $_SESSION['projectID'];
        $mostCritical = 0;
        $params = array($name,$impactTotal,$processQuality,$bigBurner,$businessQuality,$techQuality,$ProjectID,$mostCritical);
        $results = dataQuery($query,$params);
        if ($results != 1){
            echo -1;
            return;
        }
    }

    echo 1;
}