//All your smarty pants stuff goes here...

var config = {
    apiKey: "AIzaSyDc1tbAMjRl3Py1JrrIBjKmKHx4lyv3whY",
    authDomain: "train-scheduler-edd4c.firebaseapp.com",
    databaseURL: "https://train-scheduler-edd4c.firebaseio.com",
    projectId: "train-scheduler-edd4c",
    storageBucket: "train-scheduler-edd4c.appspot.com",
    messagingSenderId: "364340501956"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var firstTrain = moment($("#frequency-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#train-time-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDes,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.re().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);

    alert("New train succesfully added!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#train-time-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;

    console.log(trainName);
    console.log(traineDes);
    console.log(trainFrequency);
    console.log(trainTime);

    var trainStart = moment.unix(trainTime).format("HH:mm");

    var minsAway = moment().diff(moment(trainTime, "X"), "minutes");
    console.log(minsAway);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        $("<td>").text(trainFrequency),
        $("<td>").text(trainTime),
        $("<td>").text(minsAway),
    );

    $("#train-table > tbody").append(newRow);
});

var firstTime = "04:00";

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("HH:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in time: " + diffTime);

var timeLeft = diffTime % trainFrequency;