<?php 

function get_all_todos($filter_date = null, $show_completed = false) {
    $conn = $GLOBALS['conn'];
    
    // Determine the 'done' status based on $show_completed
    $done_status = $show_completed ? 1 : 0;

    // Start building the SQL query
    $query = "SELECT id, task, date_added, done FROM tasks WHERE done = ?";

    // Append the date filter if provided
    if ($filter_date) {
        $query .= " AND DATE(date_added) = ?";
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare($query);

    // Bind parameters based on whether a filter date is provided
    if ($filter_date) {
        // Two parameters: $done_status and $filter_date
        $stmt->bind_param("is", $done_status, $filter_date); 
    } else {
        // Only one parameter: $done_status
        $stmt->bind_param("i", $done_status);
    }

    // Execute the prepared statement and get the result
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the result set contains any rows (tasks)
    if ($result->num_rows > 0) {
        echo '<ul id="'.($show_completed ? 'completed-list' : 'my-list').'">';
        while ($row = $result->fetch_array()) {
            echo "<li>";
            if (!$show_completed) {
                echo '<input type="checkbox" name="checkBoxList[]" value="'.$row["id"].'">';
            }
            echo "<span>".$row["task"];
            if ($show_completed) {
                echo " (Completed on: ".$row["date_added"].")";
            }
            echo "</span></li>";
        }
        echo '</ul>';
    } else {
        echo '<h2>'.($show_completed ? 'No completed tasks found!' : 'Your ToDo list is empty!').'</h2>';
    }
}

?>
