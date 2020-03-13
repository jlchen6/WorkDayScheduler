$(document).ready(function() {
  // listen for save button clicks
  $(".saveBtn").on("click", function() {
    // get nearby values
    //Get the text from the input box
    var value = $(this).siblings(".description").val();
    // Get the id from the block row, which should refer to the hour
    var time = $(this).parent().attr("id");

    // save in localStorage
    //Events are stored in separate variables for each hour, based on the id of that hour
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    // get current number of hours by using moment.js API
    var currentHour = moment().hours();

    //Change the background color according to if it's working hours or not.
    if(currentHour < 8 || currentHour > 18){
      $("body").removeClass("working");
      $("body").addClass("doneWorking");
      $("#workStatus").text("You're off work! Take some time to relax.");
    }
    else{
      $("body").removeClass("doneWorking");
      $("body").addClass("working");
      $("#workStatus").text("Working hours... Focus Time!!");
    }


    // loop over time blocks
    $(".time-block").each(function() {
      //Parse out the block hour from the id by grabbing the number after the "-" character
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // check the relative time compared to the current hour and give it the relevant css styling class.
      //If the block hour is less than the current hour, it's in the past
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } 
      //If the block hour is the same as the current hour, it's in the present
      else if (blockHour === currentHour) {
        $(this).removeClass("past"); //Remove the "past" class if it has one
        $(this).addClass("present");
      } 
      //Otherwise, the hour must be in the future
      else {
        //Remove the past or present styling classes if it has them
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  hourUpdater();

  // set up interval to check if current time needs to be updated
  //set interval to update the planner every 15 seconds
  var interval = setInterval(hourUpdater, 15000);

  // load any saved data from localStorage by assigning the value of each input box to the data that is stored in local storage.
  $("#hour-8 .description").val(localStorage.getItem("hour-8"));
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));
  $("#hour-18 .description").val(localStorage.getItem("hour-18"));

  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
