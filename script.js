(function() {
    'use strict';
    var lastId = 0;
    var noteWrapper = document.getElementById("notes");
    var btnSave = document.getElementById("save_note");
    var removeIcon;
    var updateIcon;
    var noteList;
  
    // Initialize noteList 
    
    function init() {
  
      if (!!(window.localStorage.getItem('noteList'))) {
        noteList = JSON.parse(window.localStorage.getItem('noteList'));
      } else {
        noteList = [];
      }
      btnSave.addEventListener('click', saveNote);
      showList();
    }
  
  
    //   start crud opperations


//   show the note list
    function showList() {
  
      if (!!noteList.length) {
        getLastNoteId();
        for (var item in noteList) {
          var note = noteList[item];
          addNoteToList(note);
        }
        syncEvents();
      }
      
    }
  

    // create new note
    function saveNote(event) {
      var note = {
        noteId: lastId,
        noteDes: document.getElementById("note_title").value,
        noteState: document.getElementById("note_description").value
      };
      noteList.push(note);
      syncNote();
      addNoteToList(note);
      syncEvents();
      lastId++;
    }
  

//  append note to current list

    function addNoteToList(note) {

    var wrapCollabsible= document.createElement('div');
    var checkbox = document.createElement('input')
    var lable = document.createElement('label')
    var collapsibleContent =document.createElement('div')
    var contentInner =document.createElement('div')
    var showDecriptions = document.createElement('p')
    var removeIcon= document.createElement('button')
    var updateIcon = document.createElement('button')

    wrapCollabsible.setAttribute("class", "wrap-collabsible")
    checkbox.setAttribute('type',"checkbox")
    checkbox.setAttribute('id',"collapsible")
    checkbox.setAttribute("class","check")
    lable.setAttribute("class","label-name")
    lable.setAttribute("for","collapsible")
    collapsibleContent.setAttribute("class","collapsible-content")
    contentInner.setAttribute("class","content-inner")
    removeIcon.setAttribute("class","delete-btn")
    removeIcon.setAttribute("type","button")
    removeIcon.setAttribute ("class", "delete-btn remove_item clickeable");
    removeIcon.setAttribute("title", "Remove");
    removeIcon.innerHTML="Delete" 
    updateIcon.innerHTML = "Update";
    updateIcon.className = "update-btn update_icon clickeable";
    updateIcon.setAttribute("title", "Update");


//    content inner
   showDecriptions.innerHTML= note.noteState; 
   contentInner.appendChild(showDecriptions);
//    contentInner.appendChild(removeIcon);

   collapsibleContent.appendChild(contentInner);
   lable.innerHTML = note.noteDes
   wrapCollabsible.appendChild(checkbox);
   wrapCollabsible.appendChild(lable)
   wrapCollabsible.appendChild(collapsibleContent);
   wrapCollabsible.appendChild(updateIcon);
   wrapCollabsible.appendChild(removeIcon);

   noteWrapper.appendChild(wrapCollabsible);

    }
  

//================= update note

function updateNote(event) {
  
      var noteTag = event.currentTarget.parentNode;
      var noteId = noteTag.id;
      var noteToUpdate = findNote(noteId).note;
      var pos = findNote(noteId).pos;

      if (!!noteToUpdate) {
        var des = prompt("Note Description", noteToUpdate.noteDes);
        var state = prompt("Note State", noteToUpdate.noteState);
        noteToUpdate.noteDes = des;
        noteToUpdate.noteState = state;
        noteList[pos] = noteToUpdate;
        noteTag.lastChild.textContent = noteToUpdate.noteDes;
        syncNote();
        window.location.reload()
      }
    }

  
    function removeNote(event) {
      var noteToRemove = event.currentTarget.parentNode;
      var noteId = noteToRemove.id;
      noteWrapper.removeChild(noteToRemove);
       
   
      noteList.forEach(function(value, i) {
        if (value.noteId == noteId) {
          noteList.splice(i, 1);
        }
      })
  
      syncNote();
    }
  
    
  
    
//   automaticaly sync list
    function syncNote() {

      window.localStorage.setItem('noteList', JSON.stringify(noteList));
      noteList = JSON.parse(window.localStorage.getItem('noteList'));
    }
  

    function getLastNoteId() {
      var lastNote = noteList[noteList.length - 1];
      lastId = lastNote.noteId + 1;
    }
  

    function syncEvents() {
  
      updateIcon = document.getElementsByClassName("update_icon");
      removeIcon = document.getElementsByClassName("remove_item");
      if (!!removeIcon.length) {
        for (var i = 0; i < removeIcon.length; i++) {
          removeIcon[i].addEventListener('click', removeNote);
        }
      }
      if (!!updateIcon.length) {
        for (var j = 0; j < updateIcon.length; j++) {
          updateIcon[j].addEventListener('click', updateNote);
        }
      }
    }
  

    function findNote(id) {
      var response = {
        note: '',
        pos: 0
      };
      noteList.forEach(function(value, i) {
        if (value.noteId == id) {
          response.note = value;
          response.pos = i;
        }
      });
  
      return response;
    }
  
    //End Common
  
  
    init();
  
  
  })();