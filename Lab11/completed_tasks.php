<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="./style.css">
    <title>Completed Tasks</title>
    <script>
        function submitForm() {
            document.getElementById('completedForm').submit();
        }
    </script>
</head>
<body>
    <?php 
        require_once('./db_connection.php');
        require('./get_todos.php'); // Ensure this file contains the modified get_all_todos function

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($_POST['completed_date'])) {
                $completed_date = $_POST['completed_date'];
            }
        } 
    ?>

    <div id="content">
        <h1>Completed Tasks</h1>
        <form method="post" id="completedForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="buttons">
                <input type="date" class="btn" name="completed_date" id="completed-date-selector" onchange="submitForm()" />
            </div>
            <?php 
                // Use get_all_todos with true for $show_completed
                if (isset($completed_date)) {
                    get_all_todos($completed_date, true); // Fetch completed tasks for a specific date
                } else {
                    get_all_todos(null, true); // Fetch all completed tasks
                }
            ?>
        </form>
        <a href="index.php">Back to ToDo List</a>
    </div>
</body>
</html>
