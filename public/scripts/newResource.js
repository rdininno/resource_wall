$(document).ready(() => {
  $('.added_alert').hide();
  $('#create_new_resource_form').on('submit', (event) => {
    event.preventDefault();
    const formData = $(event.target).serialize();

    $.post('/resources', formData).then((response) => {
      console.log('success', response);
    })
    $('.added_alert').show('fast');
    $('#create_new_resource_form').trigger("reset");
  })
});
