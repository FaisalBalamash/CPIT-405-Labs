const apiUrl = "http://localhost:3000/api";
const todoListElem = document.getElementById("todoList");
const addButton = document.getElementById("add-btn");
const newItemInput = document.getElementById("new-item");
const errorMessage = document.getElementById("errorMessage");

addButton.addEventListener("click", addNewTodo);

document.addEventListener("DOMContentLoaded", () => {
  fetchAllTodos().catch(handleError);
});

async function fetchAllTodos() {
    try {
        const response = await fetch(`${apiUrl}/readAll.php`);
        const text = await response.text(); 
        const todos = JSON.parse(text);
        todos.forEach(addItem);
    } catch (error) {
        handleError(error);
    }
}

async function addNewTodo() {
  const task = newItemInput.value.trim();
  if (task) {
    try {
      await fetch(`${apiUrl}/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      addItem({ task });
      newItemInput.value = "";
    } catch (error) {
      handleError(error);
    }
  }
}

async function markAsComplete(id) {
  try {
    await fetch(`${apiUrl}/update.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done: true }),
    });
    document.getElementById(id).parentNode.parentNode.style.textDecoration =
      "line-through";
  } catch (error) {
    handleError(error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${apiUrl}/delete.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    document.getElementById(id).parentNode.parentNode.remove();
  } catch (error) {
    handleError(error);
  }
}

function addItem(item) {
  let liElem = document.createElement("li");
  liElem.appendChild(document.createTextNode(item.task));

  let spanContainerElem = document.createElement("span");
  spanContainerElem.setAttribute("class", "span-btns");

  let spanCompleteElem = document.createElement("span");
  spanCompleteElem.id = item.id;
  spanCompleteElem.title = "completed";
  spanCompleteElem.onclick = () => markAsComplete(item.id);
  spanCompleteElem.appendChild(document.createTextNode("✓"));

  let spanDeleteElem = document.createElement("span");
  spanDeleteElem.id = item.id;
  spanDeleteElem.title = "delete";
  spanDeleteElem.onclick = () => deleteTodo(item.id);
  spanDeleteElem.appendChild(document.createTextNode("X"));

  spanContainerElem.appendChild(spanCompleteElem);
  spanContainerElem.appendChild(spanDeleteElem);
  liElem.appendChild(spanContainerElem);
  todoListElem.appendChild(liElem);
}

function handleError(error) {
  console.error(error);
  errorMessage.textContent = "An error occurred: " + error.message;
}
