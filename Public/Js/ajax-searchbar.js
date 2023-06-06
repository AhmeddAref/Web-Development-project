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
        // Clear the previous search results
        $("#result").empty();

        // Iterate over the data and create HTML elements for each result
        $.each(data, function (key, value) {
          if (
            value.name.search(expression) != -1 &&
            (selectedOption === "" || selectedOption === value.option)
          ) {
            // Create a new list item
            var listItem = $("<li>", { class: "list-group-item" });

            // Create an image element
            var image = $("<img>", {
              src: "/images/" + value.image1,
              height: "40",
              width: "40",
              class: "img-thumbnail",
            });

            // Create a span element for the product name
            var name = $("<span>").text(value.name);

            // Append the image and name to the list item
            listItem.append(image, name);

            // Append the list item to the result container
            $("#result").append(listItem);
          }
        });
      },
    });
  });
});
