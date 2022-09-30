<?php

use PHPMailer\PHPMailer\PHPMailer;
require 'C:\xampp\composer\vendor\autoload.php';

use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// passing true in constructor enables exceptions in PHPMailer
// require 'class.phpmailer.php';
 
$yahoo_mail = new PHPMailer(true);
 
$yahoo_mail->IsSMTP();
// Send email using Yahoo SMTP server
$yahoo_mail->Host = 'smtp.mail.yahoo.com';
// port for Send email
$yahoo_mail->Port = 465;
$yahoo_mail->SMTPSecure = 'ssl';
$yahoo_mail->SMTPDebug = 1;
$yahoo_mail->SMTPAuth = true;
$yahoo_mail->Username = 'kenechukwuchukwuorji@Yahoo.com';
$yahoo_mail->Password = 'ndoenxssmexlyklc';
 
$yahoo_mail->From = 'kenechukwuchukwuorji@Yahoo.com';
$yahoo_mail->FromName = 'Kenechukwu Chukwuorji';// frome name
$yahoo_mail->AddAddress('kenechukwuchukwuorji@gmail.com', 'To Name');  // Add a recipient  to name
// $yahoo_mail->AddAddress('kenechukwuchukwuorji@Yahoo.com');  // Name is optional
 
$yahoo_mail->IsHTML(true); // Set email format to HTML
$yahoo_mail->SMTPDebug = false;
$yahoo_mail->do_debug = 0;
 
// $yahoo_mail->Subject = 'Here is the subject for onlinecode';
// $yahoo_mail->Body    = 'Send email using Yahoo SMTP server <br>This is the HTML message body <strong>in bold!</strong> <a href="https://onlinecode.org/" target="_blank">onlincode.org</a>';
// $yahoo_mail->AltBody = 'This is the body in plain text for non-HTML mail clients at https://onlinecode.org/';
 

function emailExists($email){
  $mysqli = new mysqli("localhost", "root", "", "forms_db");
  $result = $mysqli->query("SELECT email FROM email_list WHERE email = '$email'");
  if($result->num_rows == 0) {
      return false;
  } else {
      return true;
  }
  $mysqli->close();
}

function news_emailExists($email){
  $mysqli = new mysqli("localhost", "root", "", "forms_db");
  $result = $mysqli->query("SELECT email FROM news_list WHERE email = '$email'");
  if($result->num_rows == 0) {
      return false;
  } else {
      return true;
  }
  $mysqli->close();
}

$name = htmlspecialchars($_POST["contact-name"]);
$email = htmlspecialchars($_POST["contact-email"]);
$message = htmlspecialchars($_POST["message"]);



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
 

  if(!empty($email) && !empty($name)){    
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){

      $yahoo_mail->Subject = "From: $name <$email>";
      $yahoo_mail->Body    =nl2br("Name: $name \nEmail: $email \nMessage: $message \n\nRegards,$name");
      
      if (!emailExists($email) && !news_emailExists($email)){
        $sql = "INSERT INTO email_list (email)
        VALUES (?)" ;

        $stmt = mysqli_stmt_init($conn);

        if(! mysqli_stmt_prepare($stmt, $sql)) {
          die(mysqli_error($conn));
        };

        mysqli_stmt_bind_param ($stmt, "s", $email);

        mysqli_stmt_execute($stmt);
      }
      if($yahoo_mail->Send()) {
        echo 'Sent';
        }else {
          echo "Your message failed to send, sorry";
        }
    }else{
      echo "Enter a valid email address!";
    }
  }else{
    echo "Email field required";

  }




  
?>