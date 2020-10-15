
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD7dOBg19mnoDdE_n2o5fV2FXoojeSDliw",
    authDomain: "eportfolio-74c20.firebaseapp.com",
    databaseURL: "https://eportfolio-74c20.firebaseio.com",
    projectId: "eportfolio-74c20",
    storageBucket: "eportfolio-74c20.appspot.com",
    messagingSenderId: "384834138871",
    appId: "1:384834138871:web:18aacf6823f9a0c3c219f2",
    measurementId: "G-LZ3LTNRGCB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



let profileView = document.getElementById('profile-view'),
aboutView = document.getElementById('about-view'),
fileView = document.getElementById('file-view'),
file2View = document.getElementById('file2-view'),
textView = document.getElementById('text-view'),
textShow = document.getElementById('text-show'),
firstName = document.getElementById('first-name'),
lastName = document.getElementById('last-name'),
job = document.getElementById('occupation'),
pdfView = document.getElementById('pdf-view'),
img = document.getElementById('img'),
imgAbout = document.getElementById('imgAbout'),
imgSkill = document.getElementById('imgSkill'),
pdf = document.getElementById('pdf');


let file = {};

function chooseFile(e){
  file = e.target.files[0];
}



function UploadButtonPressed(){
  var user = firebase.auth().currentUser;
  if(user){
    console.log("read uid");
  } else{
    console.log("not read uid");
  }

  firebase.storage().ref('user/' + user.uid + '/image/' + 'profile.jpg').put(file).then(function(){
    console.log('successful uploaded');
  }).catch(error => {
    console.log(error.message);
  })
}



function UploadpdfButtonPressed(){
  var user = firebase.auth().currentUser;
  if(user){
    console.log("read uid");
  } else{
    console.log("not read uid");
  }

  firebase.storage().ref('user/' + user.uid + '/image/' + 'research.pdf').put(file).then(function(){
    console.log('successful uploaded');
    window.alert("Your file is being uploaded. Please close this message, and wait for auto refresh.");
  }).catch(error => {
    console.log(error.message);
  })
}






firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.storage().ref('user/' + user.uid + '/image/' + 'profile.jpg').getDownloadURL().then(imgUrl =>{
      img.src = imgUrl;
      imgAbout.src = imgUrl;
      imgSkill.src = imgUrl;
    })
  }
})



firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.storage().ref('user/' + user.uid + '/image/' + 'research.pdf').getDownloadURL().then(pdfUrl =>{
      pdf.src = pdfUrl;
    })
  }
})








function SubmitButtonPressed(){
  var personal_info = document.getElementById('personal-introduction').value;
  //window.alert( "Welcome, "+firstname +" " + lastname);
  var rootRef = firebase.database().ref().child("Users");
  //window.alert("Database1");
  var userId = firebase.auth().currentUser.uid;
  //window.alert("Database2");
  var usersRef = rootRef.child(userId);
  //window.alert("Database3");
  if(userId){
    console.log("read uid")
  } else{
    console.log("not read uid")
  }


  if(personal_info != ""){
    /*
    var userData ={
      "User_info":personal_info
    };
    usersRef.set(userData, function(error)
    {
      //window.alert("Set");
      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
      }
   });
*/
  usersRef.update({
    "Intro": personal_info
  });
 }else{
   window.alert("Form is incomplete.");
 }
}

function AboutButtonPressed(){
  var personal_info = document.getElementById('personal-introduction').value;
  //window.alert( "Welcome, "+firstname +" " + lastname);
  var rootRef = firebase.database().ref().child("Users");
  //window.alert("Database1");
  var userId = firebase.auth().currentUser.uid;
  //window.alert("Database2");
  var usersRef = rootRef.child(userId);
  //window.alert("Database3");
  if(userId){
    console.log("read uid")
  } else{
    console.log("not read uid")
  }


  if(personal_info != ""){
  usersRef.update({
    "About": personal_info
  });
 }else{
   window.alert("Form is incomplete.");
 }
}


firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.database().ref('Users/' + user.uid).once('value').then(function (snapshort){
      var info = snapshort.val().Intro;

      document.getElementById('info-show').innerHTML = info;

    })
  }
})

firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.database().ref('Users/' + user.uid).once('value').then(function (snapshort){

      var about = snapshort.val().About;

      document.getElementById('about-show').innerHTML = about;
    })
  }
})

firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.database().ref('Users/' + user.uid).once('value').then(function (snapshort){
      var firstname = snapshort.val().First_Name;
      var job = snapshort.val().Occupation;
      var university = snapshort.val().University;
      //var about = snapshort.val().About;
      //var intro = snapshort.val().Intro;
      document.getElementById('first-name').innerHTML = firstname;
      document.getElementById('job').innerHTML = job;
      document.getElementById('school').innerHTML = university;
      //document.getElementById('about-show').innerHTML = about;
      //document.getElementById('info-show').innerHTML = intro;
    })
  }
})



/*
firebase.auth().onAuthStateChanged(user => {
  var user = firebase.auth().currentUser;
  if(user){
    firebase.database().ref('Users/' + user.uid).once('value').then(function (snapshort){
      var firstname = snapshort.val().First_Name;
      var job = snapshort.val().Occupation;
      var university = snapshort.val().University;
      var about = snapshort.val().About;
      var intro = snapshort.val().Intro;
      document.getElementById('first-name').innerHTML = firstname;
      document.getElementById('job').innerHTML = job;
      document.getElementById('school').innerHTML = university;
      document.getElementById('about-show').innerHTML = about;
      document.getElementById('info-show').innerHTML = intro;
    })
  }
})
*/
