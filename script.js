(function() {
    var lastId = 0;
    var noteWrapper = document.getElementById("panel");
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


      var removeIcon= document.createElement('button')
      var updateIcon = document.createElement('button')

      var details =  document.createElement('details')
      var summary = document.createElement('summary')
      var title = document.createElement('p')

    //   removeIcon.setAttribute("class","delete-btn")
      removeIcon.setAttribute("type","button")
      removeIcon.setAttribute ("class", "delete-btn remove_item clickeable");
      removeIcon.setAttribute("title", "Remove");
      removeIcon.innerHTML="Delete" 

      updateIcon.innerHTML = "Update";
      updateIcon.setAttribute("class",  "update-btn update_icon clickeable");
      updateIcon.setAttribute("title", "Update");
  


      var div =document.createElement('div')
      div.setAttribute("class","content")


       
       var Descriptions= document.createElement('p')
       Descriptions.innerHTML =note.noteState;
       div.appendChild(Descriptions)
        

       title.innerHTML=note.noteDes;
       summary.append(title)
       
       details.appendChild(summary);
       details.appendChild(div);
       details.appendChild(updateIcon)
       details.append(removeIcon)
       

    

     

   noteWrapper.appendChild(details);

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