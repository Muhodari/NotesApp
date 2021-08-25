(function() {
    'use strict';
    var lastId = 0;
    var noteWrapper = document.getElementById("notes");
    var btnSave = document.getElementById("save_note");
    var removeIcon;
    var updateIcon;
    var noteList;
  
    // Initialize noteList 
    // Add event to save button
    // Render the list
  
    function init() {
  
      if (!!(window.localStorage.getItem('noteList'))) {
        noteList = JSON.parse(window.localStorage.getItem('noteList'));
      } else {
        noteList = [];
      }
      btnSave.addEventListener('click', saveNote);
      showList();
    }
  
    //End Init
  
    //CRUD note
  
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
  

    function addNoteToList(note) {

    //  =================

    var wrapCollabsible= document.createElement('div');
    wrapCollabsible.setAttribute("class", "wrap-collabsible")

   var checkbox = document.createElement('input')
    checkbox.setAttribute('type',"checkbox")
    checkbox.setAttribute('id',"collapsible")
    checkbox.setAttribute("class","check")

    var lable = document.createElement('label')
    lable.setAttribute("class","label-name")
    lable.setAttribute("for","collapsible")
      
    var collapsibleContent =document.createElement('div')
    collapsibleContent.setAttribute("class","collapsible-content")

    var contentInner =document.createElement('div')
     contentInner.setAttribute("class","content-inner")

    var showDecriptions = document.createElement('p')

    var removeIcon= document.createElement('button')

    removeIcon.setAttribute("class","delete-btn")
     removeIcon.setAttribute("type","button")
     removeIcon.setAttribute ("class", "delete-btn remove_item clickeable");
     removeIcon.setAttribute("title", "Remove");
     removeIcon.innerHTML="Delete"

     var updateIcon = document.createElement('span')
    updateIcon.innerHTML = "U";
    updateIcon.className = "update_icon clickeable";
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
  
    // End CRUD
  
  
    //Common
  
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