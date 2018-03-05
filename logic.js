
  var config = {
    apiKey: "AIzaSyCrvzYG5Sc1IBbFcVnIcCU0mX9nfZx5TsU",
    authDomain: "train-scheduler-7c1f7.firebaseapp.com",
    databaseURL: "https://train-scheduler-7c1f7.firebaseio.com",
    projectId: "train-scheduler-7c1f7",
    storageBucket: "",
    messagingSenderId: "812689779812"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();


var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var firstTrainTime = $("#first-train-time-input").val().trim();
var frequency = $("#frequency-input").val().trim();



var newTrain = {
  name: trainName,
  destLocation: destination,
  timeFirst: firstTrainTime,
  howOften: frequency
  };


database.ref().push(newTrain);


 console.log(newTrain.name);
 console.log(newTrain.destLocation);
 console.log(newTrain.timeFirst);
 console.log(newTrain.howOften);

 //Alert
 alert("Train successfully added");

 //Clears all of the text boxes
 $("#train-name-input").val("");
 $("#destination-input").val("");
 $("#first-train-time-input").val("");
 $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

 
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destLocation;
  var firstTrainTime = childSnapshot.val().timeFirst;
  var frequency = childSnapshot.val().howOften;

 
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var tableRowData = $("<tr>");
  var nextTrainTime = getNextTrainTime(firstTrainTime, frequency);
  var minutes = moment(nextTrainTime, "HH:mm").fromNow();
  var tableData = $("<td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td><td>" + nextTrainTime + "</td>" + "</td><td>" + minutes + "</td>");



  tableRowData.append(tableData);
  $("tbody").append(tableRowData);

});



function getNextTrainTime(firstTrainTime, frequency) {

  var hr = moment(firstTrainTime,"HH:mm").hour();

  var min = moment(firstTrainTime,"HH:mm").minute();

  var currentTime = moment().hour(hr).minutes(min);
  
  do {
    currentTime.add(frequency, 'minutes');
  } while (currentTime < moment())


return currentTime.format('HH:mm');
}