<?php

function check_email($conn) {
    if (isset ($_SESSION["contact-email"])) {
        $email = $_SESSION["contact-email"];
        $query = "select * from contact-form where email = $email limit 1";
    }

}