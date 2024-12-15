function addSearchBoxAndSortButton() {
  const playlistsContainer = document.querySelector(
    "ytd-add-to-playlist-renderer" // #playlists"
  );
  if (playlistsContainer) {
    const existingSearchBox = playlistsContainer.querySelector(
      'input[type="search"]'
    );
    const existingSortButton = playlistsContainer.querySelector(".sort-button");

    if (!existingSearchBox && !existingSortButton) {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.justifyContent = "space-evenly";
      container.style.width = "100%";
      container.style.padding = "10px";

      const searchBox = document.createElement("input");
      searchBox.type = "search";
      searchBox.placeholder = "Search playlists...";
      searchBox.className = "form-input-filter";
      searchBox.style.width = "70%";
      searchBox.style.padding = "10px";
      searchBox.style.fontSize = "16px";
      searchBox.addEventListener("input", filterPlaylists); // Add event listener

      const sortButton = document.createElement("button");
      sortButton.textContent = "Sort A-Z";
      sortButton.className = "sort-button";
      sortButton.addEventListener("click", sortPlaylists);

      container.appendChild(searchBox);
      container.appendChild(sortButton);

      playlistsContainer.appendChild(container);
    }
  }
}

function filterPlaylists(event) {
  const searchQuery = event.target.value.toLowerCase();
  const playlistItems = document.querySelectorAll(
    "ytd-playlist-add-to-option-renderer"
  );
  playlistItems.forEach((item) => {
    const title = item
      .querySelector("yt-formatted-string[title]")
      .title.toLowerCase();
    if (title.includes(searchQuery)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function sortPlaylists() {
  const playlistItems = document.querySelectorAll(
    "ytd-playlist-add-to-option-renderer"
  );
  const sortedItems = Array.from(playlistItems).sort((a, b) => {
    const titleA = a
      .querySelector("yt-formatted-string[title]")
      .title.toLowerCase();
    const titleB = b
      .querySelector("yt-formatted-string[title]")
      .title.toLowerCase();
    return titleA.localeCompare(titleB);
  });
  const playlistsContainer = document.querySelector("#playlists");
  playlistsContainer.innerHTML = "";
  sortedItems.forEach((item) => {
    playlistsContainer.appendChild(item);
  });
}

// Call Funcs
addSearchBoxAndSortButton();

// Call the function when the dialog is opened
const observer = new MutationObserver(() => {
  const dialog = document.querySelector("ytd-add-to-playlist-renderer");
  if (dialog && !dialog.querySelector('input[type="search"]')) {
    addSearchBoxAndSortButton();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

//CSS Load
function loadCss() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("style/styles.css");
  document.head.appendChild(link);
}

loadCss();
