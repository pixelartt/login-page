// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import{getauth, createuserwithemailandpasword, signInwithemailpasword} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"
import{getfirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbk-MoGNzpq72b5jCkXX3msSwBr0g_yg8",
  authDomain: "loginform-44fb4.firebaseapp.com",
  projectId: "loginform-44fb4",
  storageBucket: "loginform-44fb4.appspot.com",
  messagingSenderId: "959093545288",
  appId: "1:959093545288:web:3631d1bba36867439dfb7d"
};
// Initialize Firebase
function showmessage(message, divld){
  var messagediv=document.getElementById(divld);
  messagediv.style.display ="block";
  messagediv.innerHTML=message;
  messagediv.style.opacity=1;
  setTimeout(function(){
    messagediv.style.opacity=0;

   },5000);
  }
const app = initializeApp(firebaseConfig);

const signup=document.getElementById('subnitsignup');
signup.addEventListener('click', (Event)=>{
  Event.preventDefault();
  const email=document.getElementById('remail').value;
  const password=document.getElementById('rpassword').value;
  const firstname=document.getElementById('fname').value;
  const lastname=document.getElementById('lname').value;

  const auth=getauth()
  const db=getfirestore();

  createuserwithemailandpasword(auth, email, password)
  .then((usercredential)=>{
  const user=usercredential.user;
  const userdata={
    email: email,
    firstname: firstname,
    lastname: lastname,
  };
  showmessage('account created seccessfully', 'signupmessage');
  const docref=doc(db, "users", user.uid);
  setDoc(docref,userdata)
  .then(()=>{
    window.location.href='index.html';
  })
    .catch((erorr)=>{
    console.error("error writing document", error);

    });

  })
  .catch((error)=>{
    const erorrcode=error.code;
    if(erorrcode=='auth/email-already-in-use'){
      showmessage('email alrready exsist !!!', 'signupmessage');
    }
    else{
      showmessage('unable to create user', 'signupmessage');
    }
   
    
  })
});