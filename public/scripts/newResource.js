$(document).ready(() => {
  $('#create_new_resource_form').on('submit', (event) => {
    event.preventDefault();
    const formData = $(event.target).serialize();

    $.post('/resources', formData).then((response) => {
      console.log('success: ', response);
    })

  })
});
