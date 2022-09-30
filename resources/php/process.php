<?php


$name = $_POST["contact-name"];
$email = "";
$email_bool = filter_input(INPUT_POST, "contact-email", FILTER_VALIDATE_BOOL);
$message = $_POST["message"];

if(!$email_bool){
    $email = $_POST["contact-email"];
}else{
    die('Please fill out the required fields');
}

$host = "localhost";
$dbname = "forms_db";
$username = "root";
$password = "";

$conn = mysqli_connect(
    hostname: $host,
    username: $username,
    password: $password,
    database: $dbname
);

if(mysqli_connect_errno()) {
    die("Connection error: ". mysqli_connect_errno());
}

$sql = "INSERT INTO contact_form (name, email, message)
        VALUES (?, ?, ?)" ;

$stmt = mysqli_stmt_init($conn);

if(! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
};

mysqli_stmt_bind_param ($stmt, "sss", 
$name,
$email,
$message);

mysqli_stmt_execute($stmt);

echo "record saved.";