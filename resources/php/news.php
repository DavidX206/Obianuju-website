<?php

function emailExists($email){
  $mysqli = new mysqli("localhost", "root", "", "forms_db");
  $result = $mysqli->query("SELECT email FROM news_list WHERE email = '$email'");
  if($result->num_rows == 0) {
      return false;
  } else {
      return true;
  }
  $mysqli->close();
}

$email = htmlspecialchars($_POST["news-email"]);



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
 

  if(!empty($email)){    
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
      
      if (!emailExists($email)){
        $sql = "INSERT INTO news_list (email)
        VALUES (?)" ;

        $stmt = mysqli_stmt_init($conn);

        if(! mysqli_stmt_prepare($stmt, $sql)) {
          die(mysqli_error($conn));
        };

        mysqli_stmt_bind_param ($stmt, "s", $email);

        mysqli_stmt_execute($stmt);
        echo "Saved";
      }
      else {
        echo "Email already exists";
      }
    }else{
      echo "Enter a valid email address!";
    }
  }else{
    echo "Email field required";

  }
?>