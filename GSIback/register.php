<?php


include 'pdo_connect.php';

if(!empty($_POST)) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $mail = $_POST['mail'];
    $uname = $_POST['uname'];
    $upassword = md5($_POST['upassword']);
    $confirmpassword = $_POST['confirmpassword'];

    if ($confirmpassword != $_POST['upassword']){
        echo 'Passwords don\'t match';
        return;
    }

    if ($fname != "" && $lname!="" && $mail!="" && $uname!="" && $_POST['upassword']!="") {
        $query = 'INSERT INTO `User` (`firstName`, `lastName`, `mail`,`username`, `password`) VALUES (?,?,?,?,?)';
        $params = array($fname, $lname, $mail, $uname, $upassword);
        $results = dataQuery($query, $params);
    }
    else{
        echo 'Fill in all of the required parameters';
        return;
    }

    // for testing only
    echo 1 == $results ? 'Thanks for registering, ' . $fname : 'There has been a problem processing your request, please try again later.';
}

?>
