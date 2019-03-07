//All your smarty pants stuff goes here...

var config = {
    apiKey: "AIzaSyBx9F67PMVdl3JW5qlkPLUL4vLPEORumNo",
    authDomain: "trainhomework-4cea5.firebaseapp.com",
    databaseURL: "https://trainhomework-4cea5.firebaseio.com",
    projectId: "trainhomework-4cea5",
    storageBucket: "trainhomework-4cea5.appspot.com",
    messagingSenderId: "330976074136"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    //This isn't working
    var firstTrain = $("#train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDes,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);
    alert("New train succesfully added!");

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.frequency);
    // console.log(newTrain.firstTrain);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    // return false;
});
 
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    console.log(name);
    console.log(destination + " destination");
    console.log(frequency + " Frequency");
    console.log(firstTrain + " first train");


    
    // var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    // console.log(remainder + " Remainder");
    
    // var minsAway = frequency - remainder;
    // console.log(minsAway + " Mins Away");
    
    // Minutes away 
    
    // Get the current time
    var currentTime = moment();
    console.log("The current time is " + moment(currentTime).format("HH:mm"));

    //Convert the time
    var convertTime = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(convertTime + " - Convert Time");
    
    //Subtract minutes from convert to get minsaway
    var minsAway = moment().diff(moment(convertTime), "minutes");
    console.log(minsAway + " - Minutes Away");

    // Time left 
    var timeRemain = minsAway % frequency;
    console.log(timeRemain + " time remaining");
   
    //
    var minTillTrain = frequency - timeRemain;
    console.log(minTillTrain + " Minutes til train");

    // Next train to arrive
    var nextTrain = moment().add(minTillTrain, "minutes");
    console.log(moment(nextTrain).format("HH:mm") + "Next train to arrive!");


    //This works
    // var nextArrival = moment().add(minsAway,"m").format("hh:mm A");
    // console.log(nextArrival + " - Next arrival");

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("HH:mm")),
        $("<td>").text(minTillTrain),
    );

    $("#train-table > tbody").append(newRow);
});

// var firstTime = "";

// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// var currentTime = moment();
// console.log("Current Time: " + moment(currentTime).format("HH:mm"));

// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("Difference in time: " + diffTime);

// var timeLeft = diffTime % trainFrequency;
// console.log(timeLeft);

// var tMinutesTillTrain = trainFrequency - timeLeft;
// console.log("Minutes till train: " + tMinutesTillTrain);

// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));