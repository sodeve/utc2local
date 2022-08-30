let txtOffset = document.getElementById("txtOffset");
let chkActive = document.getElementById("chkActive");

// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {

  chrome.storage.sync.set({ options: { offset: txtOffset.value, active: chkActive.checked } });
}

// Add a button to the page for each supplied color
function constructOptions() {
  chrome.storage.sync.get("options", (data) => {
    if (data.options) {
      let currentOffset = data.options.offset;
      txtOffset.value = currentOffset;
      chkActive.checked = data.options.active;
    }
    chkActive.addEventListener('change', handleButtonClick);
    txtOffset.addEventListener('change', handleButtonClick);
  });
}

// Initialize the page by constructing the color options
constructOptions();
