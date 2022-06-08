$(document).ready(() => {
  $('.ratings_stars').on('click', (event) => {
    const data = {
      rating: $(event.target).val()
    }
  })
});
