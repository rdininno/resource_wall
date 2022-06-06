// Client facing scripts here
$(document).ready(() => {
  $(".explore_search_form").on("submit", searchSubmit);
  $("#allResources").on("click", loadResources);
});

// function to use the form submit data to search for resources and prevent default
const searchSubmit = (evt) => {
  evt.preventDefault();
  const data = $('#search_value').val();
  $('.explore_search_form').trigger("reset");

  $.post("api/explore/search", { data }).then((res) => {
    $('.resourceInfo').replaceWith(renderResources(res));
  });
  return data;
};


// function to render the resources
const renderResources = (resourceResponse) => {
  let resource = resourceResponse;
  for (let i = 0; i < resource.length; i++) {
    const $resource = createResourceElement(resource[i]);
    $(".explore_display_container").append($resource);
  }
};

// function to create the html for each resource
const createResourceElement = (resource) => {
  const $resource = `<div class="resourceInfo">
                <h2 class="resourceTitle">${resource.title}</h2>
                <a href="${resource.url}" target="_blank">${resource.url}</a>
                <div class="resourceDescription">${resource.description}</div>

                <div class="resourceFooter">
                  <p class="resourceDate">${resource.created_at}</p>
                  <div class="resourceIcons">
                    <i class="fa-solid fa-heart"></i>
                    <i class="fa-solid fa-comment"></i>
                    <i class="fa-solid fa-star-sharp"></i>
                   </div>

                </div>
              </div>`;
  return $resource;
};

// function to load the resources to the page
const loadResources = () => {
  $.get("api/explore").then((res) => {
    console.log(res)
    $('.resourceInfo').replaceWith(renderResources(res));
  });
};