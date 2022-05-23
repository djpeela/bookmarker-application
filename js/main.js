// Listen for form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// function saveBookmark
function saveBookmark(e) {
  // prevent form from submitting
  e.preventDefault();
  // Get form Values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteURL").value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  }


  // local storage test
    //   localStorage.setItem('test', 'Hello World');
    //   console.log(localStorage.getItem('test'));
    //   localStorage.removeItem('test');
    //   console.log(localStorage.getItem('test'));

  // test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null || localStorage.getItem('bookmarks')=="") {
    // init array 
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); console.log(bookmarks);
    // add bookmark to array
    var matched = 0;
    bookmarks.forEach(element => {
      console.log(element.name+' +'+bookmark.name);
      if(element.name.trim() == bookmark.name.trim())
      {
        console.log("matched");
        matched = 1; 
      }
      else{
        console.log("did not matched");
      }
    });

    if(matched == 1)
    {
      alert('name already exists');
      
    }
    else{
      bookmarks.push(bookmark);
      // re-set back to local storage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
  }

  // fetch bookmarks
  fetchBookmarks();

}


// delete bookmarks
function deleteBookmark(url){
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop throught bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  // re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  // fetch bookmarks
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
  // get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));      
  // console.log(bookmarks);
  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class = "btn btn-default" target = "_blank" href = "'+url+'">Visit</a> ' +
                                  ' <a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href = "#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}












