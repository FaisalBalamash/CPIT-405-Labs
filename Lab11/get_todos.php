<?php 
function get_all_todos($filter_date = null) {
    $conn = $GLOBALS['conn'];
    $query = "SELECT id, task, date_added, done FROM tasks WHERE done = 0";

    if ($filter_date) {
        $query .= " AND DATE(date_added) = ?";
    }

    $stmt = $conn->prepare($query);

    if ($filter_date) {
        $stmt->bind_param("s", $filter_date);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo '<ul id="my-list">';
        while ($row = $result->fetch_array()) {
            echo "<li>".'<input type="checkbox" name="checkBoxList[]" value="'.$row["id"].'"><span>'.$row["task"]."</span></li>";
        }
        echo '</ul>';
    } else {
        echo '<h2>Your ToDo list is empty!</h2>';
    }
}

?>