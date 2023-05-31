$(document).ready(function () {
  $("#email").on("keyup", function (e) {
    e.preventDefault();
    var data = $("#email").val();
    $.ajax({
      url: "/form/checkemail",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email: data }),
      success: function (response) {
        $("#result").html("Email is " + response);

        if (response == "already taken") {
          $("#result").css("color", "red");
        } else {
          $("#result").css("color", "green");
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
