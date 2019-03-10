$(function(){

//Initializes Firebase
var config = {
    apiKey: "AIzaSyBkkVINT-6zvvFwccd-Lu10etZdaJGy_J8",
    authDomain: "train-schedule-hw-1c831.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-1c831.firebaseio.com",
    projectId: "train-schedule-hw-1c831",
    storageBucket: "train-schedule-hw-1c831.appspot.com",
    messagingSenderId: "422169650440"
  };
  firebase.initializeApp(config);

var database = firebase.database();



// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();


  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#starttime-input").val().trim(), "HH:mm").format("HHmm");
  var trainFrequency = $("#frequency-input").val().trim();

  
 

  // Creates local "temporary" object for holding Train data
  var trainList = {
    name: trainName,
    destination: trainDest, 
    startTime: trainStart, 
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(trainList);

  // Logs everything to console
  // console.log(trainList.name);
  // console.log(trainList.destination);
  // console.log(trainList.startTime);
  // console.log(trainList.frequency);

  alert("New train entered.");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#starttime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName =  childSnapshot.val().name;
  var trainDest =  childSnapshot.val().destination;
  var trainStart = childSnapshot.val().startTime;
  var trainFrequency = childSnapshot.val().frequency;

//  var TimeDifference = moment().diff(
      // moment.unix(trainStart),
      // "minutes"
    // );
    var RemainderTime =
      moment().diff(moment.unix(trainStart), "minutes") %
      trainFrequency;
    var minutesAway = trainFrequency - RemainderTime;

    var nextArrival = moment()
      .add(minutesAway, "m")
      .format("hh:mm A");  

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(minutesAway);
  console.log(nextArrival);




  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
  );

  $("#train-table > tbody").append(newRow);

})


})