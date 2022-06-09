$(document).ready(() => {
  $("#review_form").on("submit", addReview);

  // Delete button onclick
  $("#delete_button").on("click", deleteResource);

  // Like  button onclick
  $("#like_button").on("click", addFavourite);

  // Dislike button onclick
  $("#dislike_button").on("click", removeFavourite);

  $("#edit_resource_form").on("submit", editResource);
});

const editResource = (evt) => {
  evt.preventDefault();
  let resourceId = getPath();
  const data = $(evt.target).serialize();

  $.post(`/resources/${resourceId}`, data)
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.log("error on edit resource", err);
    });
};

const addReview = function (event) {
  event.preventDefault();
  let resourceId = getPath();
  const comment = $(".commentBoxInput").val();
  let $input = $("#review_form :input");
  let tagValue;

  for (const i of $input) {
    if (i.type === "radio") {
      if (i.checked) {
        tagValue = i.value;
      }
    }
  }

  const data = {
    comment,
    rating: tagValue,
  };

  $.post(`/reviews/${resourceId}`, data);
};

// Get URL param
const getPath = function () {
  let resourceId = window.location.pathname;
  resourceId = resourceId.split("/");
  resourceId = resourceId[resourceId.length - 1];
  return resourceId;
};

// Add Like to resource
const addFavourite = function () {
  let resourceId = getPath();
  const data = { resource_id: resourceId };
  $.post(`/favourites/`, { data }).then(() => {
    window.location.reload();
  });
};

// Remove Like
const removeFavourite = function () {
  let resource_id = getPath();
  $.post(`/favourites/${resource_id}/delete`).then(() => {
    window.location = `/resources/${resource_id}`;
  });
};

// Delete resource
const deleteResource = function () {
  const resourceId = getPath();
  $.post(`/resources/${resourceId}/delete`).then(() => {
    window.location = `/`;
  });
};
