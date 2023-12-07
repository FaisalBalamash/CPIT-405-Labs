import React, { useState, useEffect } from "react";
import "../styles.css";


const Bookmark = ({ bookmark, onCrudOperation }) => {
  const [newLink, setNewLink] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch("http://localhost:3001/api/delete.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookmark.id }),
      });
      setIsUpdated(true);
      onCrudOperation();
    } catch (error) {
      console.log("Error deleting bookmark", error);
    }
  }

  const handleUpdate = async () => {
    const formattedLink = newLink.startsWith('http://') || newLink.startsWith('https://')
      ? newLink
      : `http://${newLink}`;
  
    try {
      await fetch("http://localhost:3001/api/update.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookmark.id, link: formattedLink }),
      });
      setIsUpdated(true);
      onCrudOperation();
    } catch (error) {
      console.log("Error updating bookmark", error);
    }
  }

  useEffect(() => {
    if (isUpdated) {
      // Reset update state and perform any additional logic if needed
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const shareBookmark = (platform) => {
    let url;
    switch (platform) {
      case 'Twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this bookmark: ${bookmark.title} - ${bookmark.link}`)}`;
        break;
      case 'Facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(bookmark.link)}`;
        break;
      case 'LinkedIn':
        url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(bookmark.link)}&title=${encodeURIComponent(bookmark.title)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };


  return (
    <div className="bookmark-container">
      <h1 className="bookmark-title">{bookmark.title}</h1>
      <a className="bookmark-link" href={bookmark.link} target="_blank" rel="noopener noreferrer">
        {bookmark.link}
      </a>
      <div className="bookmark-actions">
        <input
          className="bookmark-input"
          type="text"
          placeholder="Enter the New Link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <button className="bookmark-button-delete" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className="bookmark-button-update" onClick={handleUpdate}>
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="bookmark-share-buttons">
        <button className="bookmark-button-share" onClick={() => shareBookmark('Twitter')}>
          <i className="fab fa-twitter"></i>
        </button>
        <button className="bookmark-button-share" onClick={() => shareBookmark('Facebook')}>
          <i className="fab fa-facebook-f"></i>
        </button>
        <button className="bookmark-button-share" onClick={() => shareBookmark('LinkedIn')}>
          <i className="fab fa-linkedin-in"></i>
        </button>
      </div>
    </div>
  );
};


export default Bookmark;
