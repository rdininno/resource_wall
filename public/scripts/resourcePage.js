$(document).ready(() => {
  $('#review_form').on('submit', (event) => {
    event.preventDefault();
    let resourceId = window.location.pathname;
    resourceId = resourceId.split('/');
    resourceId = resourceId[resourceId.length -1];

    const comment = $('.commentBoxInput').val();
    let $input = $('#review_form :input');
    let tagValue;

    for(const i of $input) {
      if(i.type === 'radio') {
        if(i.checked) {
          tagValue = i.value;
        }
      }
    }

    const data = {
      comment,
      rating: tagValue
    }

    $.post(`/reviews/${resourceId}`, data)
  })
});
