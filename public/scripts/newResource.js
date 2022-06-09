$(document).ready(() => {
  $(".added_alert").hide();
  $(".formValidation").toggle();
  $("#create_new_resource_form").on("submit", newResourceFormSubmit);
});

newResourceFormSubmit = (event) => {
  event.preventDefault();

  if (!formValidation()) {
    return null;
  }
  const formData = $(event.target).serialize();

  $.post("/resources", formData).then((response) => {
    console.log("success", response);
  });
  $(".added_alert").show("fast");
  $("#create_new_resource_form").trigger("reset");
};

const formValidation = () => {
  if (
    $("#create_new_resource_form-description").val() === "" ||
    $("#create_new_resource_form-tile").val() === "" ||
    $("#create_new_resource_form-description").val() === "" ||
    !$("input[type=radio]:checked").length
  ) {
    $(".formValidation").toggle();
    setTimeout(() => {
      $(".formValidation").toggle();
    }, 2000);
    return false;
  }
  return true;
};
