$(document).ready(() => {
  $("#review_form").on("submit", (event) => {
    event.preventDefault();
    let resourceId = window.location.pathname;
    resourceId = resourceId.split("/");
    resourceId = resourceId[resourceId.length - 1];

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
  });

  // Delete button onclick
  $("#delete_button").on("click", deleteResource);

  // Like  button onclick
  $("#like_button").on("click", addFavourite);
});

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
    window.location = `/`;
  });
};

// Delete resource
const deleteResource = function () {
  const resourceId = getPath();
  $.post(`/resources/${resourceId}/delete`).then(() => {
    window.location = `/`;
  });
};
