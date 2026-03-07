<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessing Game for Sinval Felisberto ca570775</title>
</head>
<body>
    <h1>Welcome to my guessing game</h1>
<?php
$guess = $_GET['guess'] ?? null;
$right = 57;
$return = "";

if ($guess == null || $guess == "") {
    $return = "Your guess is too short";
} elseif (!is_numeric($guess)) {
    $return = "Your guess is not a number";
} else {
    $guess = (int)$guess;

    if ($guess == $right) {
        $return = "Congratulations - You are right";
    } elseif ($guess < $right) {
        $return = "Your guess is too low";
    } elseif ($guess > $right) {
        $return = "Your guess is too high";
    }
}

echo "<p>$return</p>";
?>
</body>
</html>