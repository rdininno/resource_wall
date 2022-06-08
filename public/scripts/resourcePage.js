$(document).ready(() => {
<<<<<<< HEAD
  $(".ratings_stars").on("click", (event) => {
    const data = {
      rating: $(event.target).val(),
    };
  });
});

//will delete
=======
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
>>>>>>> 21d78c0f176b8b6e9064e4522250a63af33a50d8
