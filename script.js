
  /*
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
  //import { getFirestore, getDocs, refEqual, doc, documentId } from "firebase/firestore";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAvH-ATDN2xzerh82wxCwcMQ-Dox8-gKIQ",
    authDomain: "gym-manager-14dd2.firebaseapp.com",
    projectId: "gym-manager-14dd2",
    storageBucket: "gym-manager-14dd2.appspot.com",
    messagingSenderId: "535480783900",
    appId: "1:535480783900:web:ab78228084d5c26e667bd9",
    measurementId: "G-X9D6F7PT1M",
    databaseURL: "https://gym-manager-14dd2-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };
/*
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);


  //YT
  const database = getDatabase(app);
  const memberlistinDB = ref(database, "memberlist");

  async function getData(db) {
    const member = collection(db, 'Name');
    const membercol = await getDocs(member);
    const memberlist = membercol.docs.map(doc => doc.data());
    return memberlist;

  }
*/



 // async function getmember(database)
  //{
    
  //}





//let loginEl = document.getElementById('login-container');
//let registerEl = document.getElementById('register-container');
//let loginBtn = document.getElementById('loginbtn');
//let registerBtn = document.getElementById('register');


/*function showLogin() {
  registerEl.style.display = 'none';
  loginEl.style.display= 'block';
}

function showRegister() {
  loginEl.style.display= 'none';
  registerEl.style.display = 'block';

}

loginBtn.onclick = function() {
  registerEl.style.display = 'none';
  loginEl.style.display = 'block';
}

loginBtn.onclick = showLogin();

let contactBtn = document.getElementById('contact')
contactBtn.onclick = function() {
  contactBtn.style.display = 'none';
  contactBtn.style.color = 'red';

}
*/


//firebase initialization

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://gympractice-8584a-default-rtdb.firebaseio.com/"

}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const memberListInDB = ref(database, "memberList");
let memberListEl = document.getElementById('memberlist-container');
let billsEl = document.getElementById('bills-container');
let createBillEl = document.getElementById('create-bill-container');
let homeEl = document.getElementById('home-container');
let AFContainer = document.getElementById('AF-container');
let MFContainer = document.getElementById('MF-container');


//login and register display, Modules display
document.addEventListener('DOMContentLoaded', function() {
  var loginButton = document.getElementById('loginbtn');
  var loginEl = document.getElementById('login-container');
  var registerEl = document.getElementById('register-container');
  var registerButton = document.getElementById('registerbtn');


  //login element display
  loginButton.addEventListener('click', function() {
    loginEl.style.display = 'block';
    registerEl.style.display = 'none';
    homeEl.style.display = 'none';
    billsEl.style.display = 'none';
  })
  //register element display
  registerButton.addEventListener('click', function() {
    registerEl.style.display = 'block';
    homeEl.style.display = 'none';
    loginEl.style.display = 'none';
    billsEl.style.display = 'none';

  })

  //sidebar onclick change display
  let sidebarLink = document.querySelectorAll('.sidebar-link');
  sidebarLink.forEach(link => {
    link.addEventListener('click', function(){
      homeEl.style.display = 'none';
    })
  })
  

 //memberlist sidebar element display
  let memberListButton = document.getElementById('memberlist');

  memberListButton.addEventListener('click', function(){
    memberListEl.style.display = 'block';
    billsEl.style.display = 'none';
    createBillEl.style.display = 'none';
    memberListButton.disabled = true;
    fetchData();

  })

  //manage bills sidebar element display
  let billsButton = document.getElementById('bills-btn');

  billsButton.addEventListener('click', e => {
    e.preventDefault();
    billsEl.style.display = 'block';
    memberListEl.style.display = 'none';

    fetchBills();
    billsButton.onclick = function() {
      return false;
    };

    
  })

  //create bills function
  let createBillsButton = document.getElementById('create-bill');
  

  createBillsButton.addEventListener('click', e => {
    e.preventDefault();
    createBillEl.style.display = 'block';

  })
})

//register form submit action

let registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userType = document.getElementById("usertype");
  let username = document.getElementById("register-username");
  let password = document.getElementById("register-password");
  let email =  document.getElementById("register-email");
  let uservalue = username.value;
  let passvalue = password.value;
  let emailvalue = email.value;
  let usertypevalue = userType.value;
  let bill = 0;

  if(username.value == "" || password.value == "" || email.value == ""){
    alert("Ensure you input a value in all required fields");
  }
  else{
    let memberArray = {bill,usertypevalue,emailvalue,uservalue,passvalue};

    push(memberListInDB,memberArray);
  
    alert("The username is "+username.value+"\nThe password is");
  }

})

//Login form submit action

let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userType = document.getElementById("usertype");
  let username = document.getElementById("login-username");
  let password = document.getElementById("login-password");

  let uservalue = username.value;
  let passvalue = password.value;
  let usertypevalue = userType.value;
  let found = false;

  if(username.value == "" || password.value == ""){
    alert("Ensure you input a value in all required fields");
  }
  else{
    onValue(memberListInDB, function(snapshot){
      let itemsArray = Object.entries(snapshot.val());

      //new code
      for(let i=0; i<itemsArray.length; i++)
      {
        let currentItem = Object.values(itemsArray[i]);
        console.log(currentItem);
        let currentItemID = currentItem[0];
        let currentItemUsername = currentItem[1].uservalue;
        let currentItemBill = currentItem[1].bill;
        let currentItemPass = currentItem[1].passvalue;
        let currentItemType = currentItem[1].usertypevalue;
        console.log("Object: "+currentItemUsername+currentItemBill+currentItemID);

        //checking for matching credentials
        if(currentItemUsername == username.value && currentItemPass == password.value && currentItemType == usertypevalue)
        {
          console.log("user found");
          found = true;
          let loginText = document.getElementById('login');
          var loginEl = document.getElementById('login-container');
          let loginButton = document.getElementById('loginbtn');


          loginText.innerHTML = "Logout " + currentItemUsername;
          loginEl.style.display = 'none';
          homeEl.style.display = 'block';
          loginButton.addEventListener('click', function(){
            loginText.innerHTML = "Login";
            AFContainer.style.display = 'none';
            MFContainer.style.display = 'none';

          })

          if(usertypevalue == 'Admin')
          {
            AFContainer.style.display = 'block';
            MFContainer.style.display = 'none';

          }

          if(usertypevalue == 'Member')
          {
            MFContainer.style.display = 'block';
            AFContainer.style.display = 'none';

          }

          
          
        }
      }


    },{
      onlyOnce: true
    });
  }
  

})



function fetchData(){
  onValue(memberListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val());
    memberListEl.innerHTML = "<h1>MEMBER LIST</h1>";
    console.log(itemsArray);
    
    
    /*for(let i=0; i<itemsArray.length; i++)
    {
        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        console.log(itemsArray[i]);
       memberListEl.innerHTML += `<li>${currentItemValue}</li>`+`  <button id="remove-image">&#215;</button>`;
       memberListEl.innerHTML += `<h1><HHHHHHHHHHHHHHhhhhhhhhhhhHHHHHHHHHHHHHHHH</h1>`;
        
    }*/
    
    /*itemsArray.forEach(item =>{
      let currentItem = itemsArray;
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        console.log(currentItem);
       memberListEl.innerHTML += `<li>${currentItemValue}</li>`+` <button id="remove-image">&#215;</button>`;
    })*/

    itemsArray.map(function(item){
          memberListEl.innerHTML += `<li>`+item.uservalue+`</li>`+` <button id="remove-image">&#215;</button>`;
      });
  })
}

function fetchBills(){
  onValue(memberListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val());
    //billsEl.innerHTML = "<h1>BILLS</h1>";
    let billsTable = document.getElementById('bills-table');
    let billsBody = document.getElementById('bills-body');
    //NEW
    billsBody.innerHTML = "";
    console.log(itemsArray);
    
    itemsArray.map(function(item){
      var row = billsBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.textContent = item.uservalue;
      cell2.textContent = item.bill;
      //billsEl.innerHTML += item.uservalue + ` : ` + item.bill + `<br/>`;
    })
    
  })
}

//create bill form submit action

let billForm = document.getElementById('create-bill-form');

billForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById('bill-name');
  let billamt = document.getElementById('bill-amt');
  

  if(username.value == "" || billamt.value == ""){
    alert("Ensure you input a value in all required fields");
  }
  else{
    onValue(memberListInDB, function(snapshot){
      let itemsArray = Object.entries(snapshot.val());
      //old code
      /*console.log(itemsArray[0]);

      itemsArray.map(function(item){
        if(item.uservalue == username.value)
        {
          item.bill += "+" + billamt.value;
          item.bill = eval(item.bill);
          //updating the database
        }
      })*/

      //new code
      for(let i=0; i<itemsArray.length; i++)
      {
        let currentItem = Object.values(itemsArray[i]);
        console.log(currentItem);
        let currentItemID = currentItem[0]
        let currentItemUsername = currentItem[1].uservalue;
        let currentItemBill = currentItem[1].bill;
        let currentItemPass = currentItem[1].passvalue;
        console.log("Object: "+currentItemUsername+currentItemBill+currentItemID);

        //updating the database
        if(currentItemUsername == username.value)
        {
          currentItemBill += "+" + billamt.value;
          currentItemBill = eval(currentItemBill);
          currentItem[1].bill = currentItemBill;

          console.log(currentItem[1].bill);
          //creating new data array
          var newData = {
            bill: currentItemBill,
            passvalue: currentItemPass,
            uservalue: currentItemUsername,
          };

          update(ref(database, 'memberList/' + currentItemID), {
            bill: currentItemBill,
            passvalue: currentItemPass,
            uservalue: currentItemUsername,
          })
          .then(() => {
        
          })
          .catch((error) => {
            alert("unsuccessful");
            console.log("error");
          })
          
          return ;
          
        }
      }

    },{
      onlyOnce: true
    });
  }

  createBillEl.style.display = 'none';
})

