class Note {
  constructor(id, title, body, date, time) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.time = time;
  }
}


const addBtn = document.getElementById('addBtn');
let notes = loadFromStorage('noteData') ? loadFromStorage('noteData') : [];
let idNumber = loadFromStorage('noteId') ? loadFromStorage('noteId') : 0;



addBtn.addEventListener('click', () => {
  const noteTitle = document.getElementById('noteTitle').value;
  const noteBody = document.getElementById('noteBody').value;
  const noteDate = document.getElementById('date').value;
  const noteTime = document.getElementById('time').value;


  if (noteTitle == '' || noteBody == '') {
    alert('You must add note title and note body!');
  } else {
    idNumber++
    const note = new Note(idNumber, noteTitle, noteBody, noteDate, noteTime);
    notes.push(note)
    displayNote(note);
    saveInStorage()
  }
});




function displayNote(note) {
  let result = document.getElementById('result');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let h5 = document.createElement('h5');
  let h61 = document.createElement('h6');
  let h62 = document.createElement('h6');
  let par = document.createElement('p');
  let btnDelete = document.createElement('button');

  div1.classList = 'card col-lg-4';
  div1.setAttribute('id', 'noteCard')
  div1.style.width = '18rem';

  div2.classList = 'card-body';

  h5.classList = 'card-title';
  h5.textContent = note.title;
  div2.appendChild(h5);

  h61.classList = 'card-subtitle mb-2 text-muted';
  h61.textContent = note.date;
  div2.appendChild(h61);

  h62.classList = 'card-subtitle mb-2 text-muted';
  h62.textContent = note.time;
  div2.appendChild(h62);

  par.classList = 'card-text';
  par.textContent = note.body;
  div2.appendChild(par);

  btnDelete.classList = 'btn btn-danger deleteBtn';
  btnDelete.addEventListener('click', () => deleteThis(note.id))
  btnDelete.setAttribute('data-toggle', 'modal');
  btnDelete.setAttribute('data-target', '#deleteOneNote');
  btnDelete.textContent = 'DELETE';
  div2.appendChild(btnDelete);

  div1.appendChild(div2);
  result.appendChild(div1);

}



const deleteThis = (noteId) => {
  noteIndex = notes.map(e => e.id).indexOf(noteId)
  notes.splice(noteIndex, 1);
  document.getElementById('result').innerHTML = '';
  notes.forEach(displayNote)
  saveInStorage();
}

const deleteAll = document.getElementById('deleteAll');
deleteAll.addEventListener('click', () => {
  window.localStorage.clear();
  location.reload();
});

//search

function searchNote(text) {
  text = text.trim();
  matchItems = notes.filter(el => el.title.startsWith(text));
  if (matchItems.length > 0) {
    document.getElementById('result').innerHTML = '';
    matchItems.forEach(displayNote);
  } else {
    document.getElementById('result').innerHTML = `<h3>Sorry, nothing found!</h3>`;

  }
}

//get storage function
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

//save to storage

const saveInStorage = () => {
  localStorage.setItem('noteId', idNumber);
  localStorage.setItem('noteData', JSON.stringify(notes))
}

//start function
window.onload = notes.forEach(displayNote)