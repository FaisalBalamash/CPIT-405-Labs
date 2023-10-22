// Select elements
const btnXHR = document.getElementById("xhrSearch");
const btnFetch = document.getElementById("fetchSearch");
const btnFetchAsyncAwait = document.getElementById("fetchAsyncAwait");
const searchQueryElem = document.getElementById("query");
const searchResults = document.getElementById("searchResults");

// API configuration
const API_URL = "https://api.unsplash.com/photos/random";
const ACCESS_KEY = "_X2599kN3yJzQhuM5cXYTmVpKoFdGGBweJ31k5fVS2k";
const PER_PAGE = 5;

// Event listeners for buttons
btnXHR.addEventListener("click", () => searchUsingXHR(searchQueryElem.value));
btnFetch.addEventListener("click", () => searchUsingFetch(searchQueryElem.value));
btnFetchAsyncAwait.addEventListener("click", () => searchUsingFetchAsyncAwait(searchQueryElem.value));

// Search using XHR
function searchUsingXHR(query) {
  if (!query.trim()) {
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => handleResponse(xhr));
  
  const params = new URLSearchParams({
    query,
    client_id: ACCESS_KEY,
    count: PER_PAGE
  });

  xhr.open("GET", `${API_URL}?${params}`);
  xhr.send();
}

// Search using Fetch
function searchUsingFetch(query) {
  if (!query.trim()) {
    return;
  }

  fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}&count=${PER_PAGE}`)
    .then(handleFetchResponse)
    .catch((error) => console.error(error));
}

// Search using Fetch with async/await
async function searchUsingFetchAsyncAwait(query) {
  if (!query.trim()) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}?query=${query}&client_id=${ACCESS_KEY}&count=${PER_PAGE}`);
    handleFetchResponse(await response.json());
  } catch (error) {
    console.error(error);
  }
}

// Handle XHR response
function handleResponse(xhr) {
  if (xhr.status === 200) {
    try {
      const data = JSON.parse(xhr.responseText);
      displayResults(data);
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    }
  } else {
    console.error(`Request failed with status code: ${xhr.status}`);
  }
}

// Handle Fetch response
function handleFetchResponse(data) {
  if (data) {
    displayResults(data);
  } else {
    console.error("Invalid response format:", data);
  }
}

// Create elements for displaying image information
function createImageContainer(url) {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const imgElement = document.createElement("img");
  imgElement.src = url;
  imgElement.alt = "Image";

  imageContainer.appendChild(imgElement);

  return imageContainer;
}

function createTextElement(text, label) {
    const element = document.createElement("p");
    if (text) {
      element.textContent = `${label}: ${text}`;
    } else {
      element.textContent = `${label}: Unknown`;
    }
    return element;
  }

  function displayResults(data) {
    searchResults.innerHTML = "";
  
    data.forEach((item) => {
      const { urls, description, user, location, views } = item;
      if (urls && urls.regular) {
        const imageContainer = createImageContainer(urls.regular);
        imageContainer.appendChild(createTextElement(description, "Description"));
        imageContainer.appendChild(createTextElement(user.username, "Creator"));
        const locationText = getLocationText(location);
        imageContainer.appendChild(createTextElement(locationText, "Location"));
  
        imageContainer.appendChild(createTextElement(views, "Views"));
        searchResults.appendChild(imageContainer);
      }
    });
  }
  
  function getLocationText(location) {
    if (location && location.city && location.country) {
      return `${location.city}, ${location.country}`;
    } else if (location && location.city) {
      return location.city;
    } else if (location && location.country) {
      return location.country;
    } else {
      return "Unknown";
    }
  }