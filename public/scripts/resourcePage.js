$(document).ready(() => {
  $(".commentValidation").toggle();
  $("#review_form").on("submit", addReview);

  // Delete button onclick
  $("#delete_button").on("click", deleteResource);

  // Like  button onclick
  $("#like_button").on("click", addFavourite);

  // Dislike button onclick
  $("#dislike_button").on("click", removeFavourite);

  $("#edit_button").on("click", showHideEditForm);
});

const showHideEditForm = function () {
  console.log($(".edit_resource_container").children("#edit_resource_form"));

  if ($(".edit_resource_container").find("#edit_resource_form").length) {
    console.log(true);
    $("#edit_resource_form").toggle();
    $(".resourceInfo").toggle();
  } else {
    $(".resourceInfo").toggle();
    $(".edit_resource_container").prepend(editForm);
    $("#edit_resource_form").on("submit", editResource);
    $(".editFormValidation").toggle();
  }
};

function parseDate(input) {
  let date = Date.parse(input);
  date = new Date(date);
  return date.toLocaleString("en-US");
}

const formValidation = () => {
  if (
    $("#edit_resource_form-description").val() === "" ||
    $("#edit_resource_form-title").val() === "" ||
    $("#edit_resource_form-url").val() === "" ||
    !$("input[type=radio]:checked").length
  ) {
    $(".editFormValidation").toggle();
    setTimeout(() => {
      $(".editFormValidation").toggle();
    }, 2000);
    return false;
  }
  return true;
};

const editResource = (evt) => {
  evt.preventDefault();
  let resourceId = getPath();
  const data = $(evt.target).serialize();
  if (!formValidation()) {
    console.log(evt.target, "this is a test");
    return null;
  }

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
  if (!$("input[type=radio]:checked").length) {
    $(".commentValidation").toggle();
    setTimeout(() => {
      $(".commentValidation").toggle();
    }, 2000);
    return null;
  }

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

  $.post(`/reviews/${resourceId}`, data)
    .then(() => {
      location.reload();
    })
    .catch((err) => {
      console.log("error on add review", err);
    });
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
    window.location.reload();
  });
};

// Delete resource
const deleteResource = function () {
  const resourceId = getPath();
  $.post(`/resources/${resourceId}/delete`).then(() => {
    window.location = `/`;
  });
};

const editForm = `<section class="container flex justify-center edit_resource_section">

<div class="edit_resource_form_wrapper">
  <form actions="/resources" method='post' id="edit_resource_form" >
    <div class="flex flex-col justify-center">
    <label for="edit_resource_form-url" class="place-self-center">Link URL</label>
    <input type="url" name="url" placeholder="link url" id="edit_resource_form-url" class="border-solid border-black border-2 rounded">
  </div> </br>
  <div class="flex flex-col justify-center">
    <label for="edit_resource_form-title" class="place-self-center">Title</label>
    <input type="text" name="title" placeholder="title" id="edit_resource_form-title" class="border-solid border-black border-2 rounded">
  </div></br>
  <div class="flex flex-col justify-center">
    <label for="edit_resource_form-description" class="place-self-center">Description</label>
    <input type="text" name="description" placeholder="description" id="edit_resource_form-description" class="border-solid border-black border-2 rounded">
  </div></br>
  <div class="inline-flex flex-col flex-wrap justify-center">
    <input
      type="radio"
      class="tag block place-self-center"
      value="fun"
      name="tags"
    />
    <label for="tag" class="block mx-2">fun</label>
  </div>
  <div class="inline-flex flex-col flex-wrap justify-center">
    <input
      type="radio"
      class="tag block place-self-center"
      value="education"
      name="tags"
    />
    <label for="tag" class="block mx-2">education</label>
  </div>
  <div class="inline-flex flex-col flex-wrap justify-center">
    <input
      type="radio"
      class="tag block place-self-center"
      value="videos"
      name="tags"
    />
    <label for="tag" class="block mx-2">videos</label>
  </div>
  <div class="inline-flex flex-col flex-wrap justify-center">
    <input
      type="radio"
      class="tag block place-self-center"
      value="programming"
      name="tags"
    />
    <label for="tag" class="block mx-2">programming</label>
  </div> <br>
  <div class="flex justify-center">
  <input type="submit" name="submit" value="submit" class="edit_resource_form-submit bg-brown hover:bg-dark-red font-bold py-2 px-4 mr-2 border-b-4 border-r-4 text-cream border-dark-cream hover:border-reg-red rounded active:border-0 cursor-pointer" ></input>
  </div>
  </form>
  <div class="editFormValidation flex justify-center">
  <h3 class="text-l text-red-600">Please fill out all fields</h3>
</div>

</div>
</section>`;
