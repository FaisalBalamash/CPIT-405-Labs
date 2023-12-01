<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="./style.css">
    <title>My ToDo List App</title>
</head>
<body>
    <?php 
        require_once('./db_connection.php');
        require('./insert_todo.php');
        require('./get_todos.php');
        require('./update_todo.php');
        require('./delete_todo.php');
        
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (isset($_POST['add_btn'])) {
                insert_task($_POST["new_task"]);
            } else if (isset($_POST['mark_done_btn'])) {
                if (!empty($_POST['checkBoxList'])) {
                    mark_as_done($_POST['checkBoxList']);
                }
            } else if (isset($_POST['delete_btn'])) {
                if (!empty($_POST['checkBoxList'])) {
                    delete_item($_POST['checkBoxList']);
                }
                // Function 1: Add a button to mark all items/tasks as done
            } else if (isset($_POST['mark_all_done_btn'])) {
                $update_statement = $GLOBALS['conn']->prepare("UPDATE tasks SET done = 1;");
                if ($update_statement) {
                    $update_statement->execute();
                    $update_statement->close();
                } else {
                    echo "Error preparing statement: " . $GLOBALS['conn']->error;
                }
                // Function 2: Group the items by the date they were added on (e.g., today, last week, etc.) NOTE: Some changes are made to get_todos.php file
            } else if (isset($_POST['selected_date'])) {
                $selected_date = $_POST['selected_date'];
            }
        } 
    ?>

    <div id="content">
        <h1>My ToDo List App</h1>
        <form method="post" id="addForm" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <input type="text" name="new_task" id="new-item" placeholder="A new item..." />
            <button name="add_btn" id="add-btn">Add</button>
            <div class="buttons">
                <button type="submit" class="btn" name="delete_btn">Delete</button>
                <button type="submit" class="btn" name="mark_done_btn">Mark as done</button>
                <button type="submit" class="btn" name="mark_all_done_btn">Mark All as Done</button>
                <input type="date" class="btn" name="selected_date" id="date-selector" onchange="submitForm()" />
            </div>
            <?php 
                if (isset($selected_date)) {
                    get_all_todos($selected_date); 
                } else {
                    get_all_todos(); 
                }
            ?>
        </form>
             <!-- Function 3: Show the tasks that were marked as done in a different web page !-->
        <a href="completed_tasks.php">View Completed Tasks</a>
    </div>
    <script>
        function submitForm() {
            document.getElementById('addForm').submit();
        }
    </script>
</body>
</html>
