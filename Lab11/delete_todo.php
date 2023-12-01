<?php 

function delete_item($checkBoxList){
    foreach($checkBoxList as $value) {
        // create a prepared update statement
        $delete_statement = $GLOBALS['conn']->prepare("DELETE FROM tasks WHERE id = ?");
        if($delete_statement) {
            $delete_statement->bind_param("s", $value);
            if (!$delete_statement->execute()) {
                print_r('Error executing MySQL delete statement: ' . $delete_statement->err);
                return;
            }
            // close the prepared statement
            $delete_statement->close();
        }
    }
}

?>