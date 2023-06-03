function myFunction() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}
function selectCategory(category) {
  var encodedCategory = encodeURIComponent(category);

  window.location.href = "/category/getproductbycat/" + encodedCategory;
}
