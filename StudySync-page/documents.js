// Selecting necessary elements from the DOM.
const form = document.querySelector("form"),
      fileInput = document.querySelector(".file-input"),
      progressArea = document.querySelector(".progress-area"),
      uploadedArea = document.querySelector(".uploaded-area");

// Adds an event listener to the form that triggers a click event on the file input when the form is clicked.
form.addEventListener("click", () => {
  fileInput.click();
});

// Functionality to handle file selection.
fileInput.onchange = ({target}) => {
  let file = target.files[0]; // Retrieves the selected file.
  if(file) {
    let fileName = file.name; // Stores the file name.
    // Shortens the file name if it's longer than 12 characters for display purposes.
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); // Calls the function to upload the file.
  }
}

// Function to upload the file.
function uploadFile(name){
  let xhr = new XMLHttpRequest(); // Creates a new XMLHttpRequest.
  xhr.open("POST", "php/upload.php"); // Configures the request with method and URL.
  // Event listener for upload progress.
  xhr.upload.addEventListener("progress", ({loaded, total}) => {
    let fileLoaded = Math.floor((loaded / total) * 100); // Calculates the percentage of the file loaded.
    let fileTotal = Math.floor(total / 1000); // Converts the total size to KB.
    let fileSize;
    // Formats the file size display in KB or MB.
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    
    // HTML template for displaying the upload progress.
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    
    uploadedArea.classList.add("onprogress"); // Adds a class to indicate upload is in progress.
    progressArea.innerHTML = progressHTML; // Inserts the progress HTML into the progress area.
    
    // When upload is complete.
    if(loaded == total){
      progressArea.innerHTML = ""; // Clears the progress area.
      // HTML template for displaying uploaded file details.
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress"); // Removes the progress indicator class.
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); // Inserts the uploaded file details at the beginning of the uploaded area.
    }
  });
  let data = new FormData(form); // Prepares form data for sending.
  xhr.send(data); // Sends the request with the form data.
}
