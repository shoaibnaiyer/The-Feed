// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var userName = localStorage.getItem("nUserName");
var name = localStorage.getItem("nName");

//var userName = sessionStorage.getItem("nUserName");
//var name = sessionStorage.getItem("nName");

function checkUser(){
    //userName = sessionStorage.getItem("nUserName");
    //name = sessionStorage.getItem("nName");

    userName = localStorage.getItem("nUserName");
    name = localStorage.getItem("nName");

    console.log(typeof userName);

    if(userName==null || typeof name==null){
        window.location.href = "index.html";
        alert("Please login again!");
    }else if(userName=="null" || typeof name=="null"){
        window.location.href = "index.html";
        alert("Please login again!");
    }
}

function getTimeDate(){
    var today = new Date();
    var date = +today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    var dateTime = time+'   on  '+date;

    return dateTime;
};

function tweetIt(){

    var getTweet = document.getElementById("tweet").value;

    if(getTweet.trim() == "")
        return false;
    
    var getTD = getTimeDate();
    userName = localStorage.getItem("nUserName");

    //Save in database
    firebase.database().ref("tweets").push().set({
        "tweet": getTweet,
        "name": name,
        "time": getTD,
        "uname": userName
    });
    
    document.getElementById('tweet').value = "";

    return false;
}

function loginUser(){
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    
    //On success open home page.
    var ref = firebase.database().ref("users");
    ref.once("value").then(function(snapshot) {
        var firebasePassword = snapshot.child(`${userName}/password`).val();
        var firebaseName = snapshot.child(`${userName}/name`).val();
        if(firebasePassword==password){
            localStorage.setItem("nUserName",userName);
            localStorage.setItem("nName",firebaseName);
            //sessionStorage.setItem("nUserName",userName);
            //sessionStorage.setItem("nName",firebaseName);
            window.location.href = "home.html";
        } else{
            alert("Login failed!");
        }
    });
    
    return false;
}

function addUser(){
    var name = document.getElementById("name").value;
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(userName.trim() == "" || name.trim() == "")
    {
        alert("You might have left Username or Name empty!");
    }
    else{
        firebase.database().ref(`users/${userName}`).set({
            "name":name,
            "password":password,
             "email":email
        });
        
        localStorage.setItem("nUserName",userName);
        localStorage.setItem("nName",name);
        //sessionStorage.setItem("nUserName",userName);
        //sessionStorage.setItem("nName",name); 
                  
        window.location.href = "home.html";
    }
    
}	

function logMeOut(){
    //sessionStorage.setItem("nUserName",null);
    //sessionStorage.setItem("nName",null); 

    localStorage.setItem("nUserName",null);
    localStorage.setItem("nName",null);

    window.location.href = "index.html";
}

function deleteMessage(self){
    var messageID = self.getAttribute("data-id");

    firebase.database().ref("tweets").child(messageID).remove();
    return false;
    //document.getElementById(`message-${messageID}`).innerHTML = "";
}


function popup(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        document.getElementById('img-message').innerHTML = "";
        document.getElementById('tweet-text').value = "";
        document.getElementById('tweet-img').value = "";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    return false;
}

function imagePost(){
    console.log("imagepost?");
    
    var getTweet = document.getElementById("tweet-text").value;
    var getImage = document.getElementById("tweet-img").value;

    if(getImage.trim() == ""){
        document.getElementById('img-message').innerHTML = "<p> Image link can't be empty! </p>";
        return false;
    }
    var getTD = getTimeDate();

    var modTweet = "";
    modTweet += `${getTweet}<img src='${getImage}' width="100%" height="40%">`;

    userName = sessionStorage.getItem("nUserName");

    //Save in database
    firebase.database().ref("tweets").push().set({
        "tweet": modTweet,
        "name": name,
        "time": getTD,
        "uname": userName
    });
    
    document.getElementById('tweet-text').value = "";
    document.getElementById('tweet-img').value = "";
    document.getElementById('img-message').innerHTML = "<p> Image posted successfully! <br> You can now close the popup or post more!</p>";
    return false;
}

function alreadyLoggedIn(){

    //userName = sessionStorage.getItem("nUserName");
    userName = localStorage.getItem("nUserName");
    
    if(userName==null || userName=="null")
        return false;
    else{
        window.location.href = "home.html";
    }

    return false;
}

function muteMe(){
    var mute = document.getElementById("mute");

    if(mute.checked == true )
        return true;
    else
        return false;

}
