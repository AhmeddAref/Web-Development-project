$(document).ready(function () {
  $("#search").keyup(function () {
    $("#result").html("");
    var searchfield = $("#search").val();
    var selectedOption = $("#dropdown").val();
    var expression = new RegExp(searchfield, "i");

    $.ajax({
      url: "/index/search",
      method: "POST",
      data: { searchfield: searchfield, selectedOption: selectedOption },
      success: function (data) {
        $.each(data, function (key, value) {
          if (
            value.name.search(expression) != -1 &&
            (selectedOption === "" || selectedOption === value.option)
          ) {
            $("#result").append(
              `<li class="list-group-item">
                <img src="/images/${value.image1}" height="40" width="40" class="img-thumbnail" />
                ${value.name}
              </li>` +
                value.name +
                "  </li>"
            );
          }
        });
      },
    });
  });
});
