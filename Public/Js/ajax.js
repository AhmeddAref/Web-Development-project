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
        $("#result1").html("Email is " + response);

        if (response == "already taken") {
          $("#result1").css("color", "red");
        } else {
          $("#result1").css("color", "green");
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
