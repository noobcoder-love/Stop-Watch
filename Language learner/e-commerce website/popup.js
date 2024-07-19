document.getElementById('saveNote').addEventListener('click', () => {
    const note = document.getElementById('note').value;
    chrome.storage.sync.get(['notes'], (result) => {
      const notes = result.notes || [];
      notes.push(note);
      chrome.storage.sync.set({ notes });
      displayNotes(notes);
      document.getElementById('note').value = ''; // Clear the textarea after saving
    });
  });
  
  document.getElementById('openOptions').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  function displayNotes(notes) {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';
    notes.forEach((note, index) => {
      const noteElem = document.createElement('div');
      noteElem.textContent = note;
      notesDiv.appendChild(noteElem);
    });
  }
  
  chrome.storage.sync.get(['notes'], (result) => {
    displayNotes(result.notes || []);
  });
  