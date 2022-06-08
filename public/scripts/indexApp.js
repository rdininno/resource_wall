// Load data from database by calling resource route
const loadResources = function () {
  $.get(`/users`, { method: "GET" }).then((data) => {
    renderResource(data);
  });
};

// Load data from database by calling favourite route
const loadfavourite = function () {
  $.get(`/favourites`, { method: "GET" }).then((data) => {
    renderResource(data);
  });
};

// Render resource with loop
const renderResource = function (resources) {
  // empty the old container

  $(".resource_display_container").empty();
  //loop thought the new data
  for (let resource of resources) {
    //call function for each
    let result = createResourceElement(resource);
    //add the resource one by one
    $(".resource_display_container").prepend(result);
  }
};

// Change the Date display
function parseDate(input) {
  return new Date(input); // Note: months are 0-based
}

const createResourceElement = (resource) => {
  const $resource = `<div class="resourceInfo flex flex-col border-solid border-4 border-black w-2/5 my-1 cursor-pointer" id="${
    resource.id
  }">
  <h2 class="resourceTitle text-4xl mx-3 my-2 underline decoration-wavy">${
    resource.title
  }</h2>
  <div class="resourceDescription mx-3 my-2">
    A useful website that has different pages to post
  </div>

  <div class="resourceFooter mx-3 my-2">
    <p class="resourceDate">${parseDate(resource.created_at)}</p>
    <div class="resourceIcons">
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-comment"></i>
      <i class="fa-solid fa-star-sharp"></i>
    </div>
  </div>
</div>`;
  return $resource;
};

// Show user resources
const showMyResource = function () {
  $.ajax({
    type: "GET",
    url: `/users`,
    success: function () {
      $(".home_title").text("My Resources");
      loadResources();
    },
  });
};

// Show user favorite
const showMyFavourites = function () {
  $.ajax({
    type: "GET",
    url: `/favourites`,
    success: function () {
      $(".home_title").text("My Favourites");
      loadfavourite();
    },
  });
};

// Go to resource
const goToResource = (evt) => {
  // console.log($(evt.target).closest());
  const resourceId = $(evt.target).closest(".resourceInfo").attr("id");

  console.log(resourceId);
  $.get(`/resources/${resourceId}`)
    .then(() => {
      window.location = `/resources/${resourceId}`;
    })
    .catch((err) => {
      console.log(`resource with id: ${resourceId} not found. error: `, err);
    });
};

$("document").ready(() => {
  // Call loadResource function with ID
  loadResources();
  // load resource with ajax
  $(".my_resources_button").click(showMyResource);
  // load favourite with ajax
  $(".my_favourites_button").click(showMyFavourites);
  // click and redirect to resource detail page
  $(".resource_display_container").on("click", goToResource);
});
