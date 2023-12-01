<?php
function insert_task($task)
{
    // validate the given task
    $new_task = validate_input($_POST["new_task"]);
    if(empty($new_task)){
        return;
    }
    // create a prepared statement to protect against SQL injections
    $insert_statement = $GLOBALS['conn']->prepare("INSERT INTO tasks (task, date_added, done) VALUES(?, now(),0);");
    if ($insert_statement) {
        // Bind our variable to the prepared statement as a parameter
        $insert_statement->bind_param("s", $new_task); // s indicates the data type is string.
        /* execute the prepared statement, and check if it was successful
        * If it was inserted successfully, then the affected rows should be 1
        */
        if (!$insert_statement->execute() || $insert_statement->affected_rows !=1) {
            print_r('Error executing MySQL insert statement: ' . $insert_statement->err);
            return;
        }
        // close the prepared statement
        $insert_statement->close();
    } else {
        printf("Failed to insert into the database:Erro number: %d,  %s\n",
        $insert_statement->errorno, $insert_statement->error);
    }
}

// trim any extra white spaces and escape special HTML characters
function validate_input($data)
{
    $data = trim($data); 
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>