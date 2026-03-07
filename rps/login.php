<?php
// Do not put any HTML or whitespace before this PHP tag

// Opcional (apenas para evitar "headers already sent" durante depuração):
// ob_start();

if (isset($_POST['cancel'])) {
    // Redirect back to index.php (use 303 to force GET)
    header("Location: index.php", true, 303);
    exit();
}

$salt = 'XyZzy12*_';
$stored_hash = '1a52e17fa899cf40fb04cfc42e6352f1';  // Pw is php123


$failure = false;  // If we have no POST data

if (isset($_POST['who']) && isset($_POST['pass'])) {
    if (strlen($_POST['who']) < 1 || strlen($_POST['pass']) < 1) {
        $failure = "User name and password are required";
    } else {
        $check = hash('md5', $salt . $_POST['pass']);
        if ($check === $stored_hash) {
            // Redirect the browser to game.php using 303 so the next request is a GET
            header("Location: game.php?name=" . urlencode($_POST['who']));
            exit();
        } else {
            $failure = "Incorrect password";
        }
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <?php require_once "bootstrap.php"; ?>
    <title>Sinval Felisberto's ca570775 Login Page</title>
</head>

<body>
    <div class="container">
        <h1>Please Log In</h1>
        <?php
        if ($failure !== false) {
            echo ('<p style="color: red;">' . htmlentities($failure) . "</p>\n");
        }
        ?>
        <form method="POST">
            <label for="nam">User Name</label>
            <input type="text" name="who" id="nam"><br />
            <label for="id_1723">Password</label>
            <input type="password" name="pass" id="id_1723"><br />
            <input type="submit" value="Log In">
            <input type="submit" name="cancel" value="Cancel">
        </form>
    </div>
</body>

</html>