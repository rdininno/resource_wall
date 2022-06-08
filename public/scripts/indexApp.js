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

const createResourceElement = (resource) => {
  const $resource = `<article class="resourceContainer flex flex-col border-solid border-4 border-black w-2/5 my-1">
  <body>
      <div class="resourceInfo">
      <h2 class="resourceTitle text-4xl mx-3 my-2 underline">${resource.title}</h2>
      <div class="resourceDescription mx-3 my-2">${resource.description}</div>
      <div class="resourceFooter mx-3 my-2">
        <p class="resourceDate">${resource.created_at}</p>
        <div class="resourceIcons">
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-comment"></i>
          <i class="fa-solid fa-star-sharp"></i>
        </div>
      </div>
    </div>
  </body>
</article>`;
  return $resource;
};

// template for 3 user login button
const loginChange = function () {
  const $user_button = `
  <div class='userLogin'>
    <button id='1'  class="userButton" value="1">user1</button>
    <button id='2'  class="userButton" value="2">user2</button>
    <button id='3'  class="userButton" value="3">user3</button>
  </div>
  `;
  return $user_button;
};

// template for logout button
const logoutChange = function () {
  const $logout_button = `
  <div>
  <button class='logout'>Logout</button>
  </div>
  `;
  return $logout_button;
};

$("document").ready(() => {
  // Get ID from URL params
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const id = urlParams.get("id");

  // Call loadResource function with ID
  loadResources();

  $(".my_resources_button").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: `/users`,
      success: function () {
        $(".home_title").text("My Resources");
        loadResources();
      },
    });
  });

  $(".my_favourites_button").click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: `/favourites`,
      success: function () {
        $(".home_title").text("My Favourites");
        loadfavourite();
      },
    });
  });
});
