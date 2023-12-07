<?php

class Bookmark
{
    private $id;
    private $title;
    private $date_added;
    private $link;
    private $dbConnection;
    private $dbTable = 'bookmarks';

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getDateAdded() {
        return $this->date_added;
    }

    public function getLink() {
        return $this->link;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function setDateAdded($date_added) {
        $this->date_added = $date_added;
    }

    public function setLink($link) {
        $this->link = $link;
    }

    public function create() {
        $query = "INSERT INTO " . $this->dbTable . " (title, date_added, link) VALUES(:title, now(), :link);";
        $stmt = $this->dbConnection->prepare($query);

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":link", $this->link);

        try {
            if ($stmt->execute()) {
                return true;
            }
        } catch (PDOException $e) {
            printf("Database Error: %s", $e->getMessage());
        }

        return false;
    }

    public function readAll() {
        $query = "SELECT * FROM " . $this->dbTable;
        $stmt = $this->dbConnection->prepare($query);

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return [];
    }

    public function delete() {
        $query = "DELETE FROM " . $this->dbTable . " WHERE id = :id";
        $stmt = $this->dbConnection->prepare($query);

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return $stmt->rowCount() > 0;
        }

        return false;
    }

    public function update()
    {
        $query = "UPDATE " . $this->dbTable . " SET link = :link WHERE id = :id";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(":link", $this->link);
        $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
    
        if ($stmt->execute() && $stmt->rowCount() > 0) {
            return true;
        }
        return false;
    }
    
   
}
?>
