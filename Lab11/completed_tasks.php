<?php
require_once('./db_connection.php');

function get_completed_tasks() {
    $query = "SELECT task, date_added FROM tasks WHERE done = 1 ORDER BY date_added DESC;";
    $response = $GLOBALS['conn']->query($query);

    if ($response && $response->num_rows > 0) {
        echo '<ul>';
        while ($row = $response->fetch_assoc()) {
            echo "<li>{$row['task']} - Completed on: " . date("F j, Y", strtotime($row["date_added"])) . "</li>";
        }
        echo '</ul>';
    } else {
        echo '<h2>No completed tasks!</h2>';
    }
}

get_completed_tasks();
?>
