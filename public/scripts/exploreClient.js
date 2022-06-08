// Client facing scripts here
$(document).ready(() => {
  $(".explore_search_form").on("submit", searchSubmit);
  $("#allResources").on("click", loadResources);
  $(".resourceInfo").on("click", goToResource);
});

const goToResource = (evt) => {
  console.log($(evt.target).parent());
  const resourceId = $(evt.target).parent().attr("id");
  console.log(resourceId);
  $.get(`/resources/${resourceId}`)
    .then(() => {
      window.location = `/resources/${resourceId}`;
    })
    .catch((err) => {
      console.log(`resource with id: ${resourceId} not found. error: `, err);
    });
};

// function to use the form submit data to search for resources and prevent default
const searchSubmit = (evt) => {
  let tagValue;
  evt.preventDefault();
  //get all the values from the form
  let $inputs = $(".explore_search_form :input");
  //check which radio value is checked
  for (const i of $inputs) {
    if (i.type === "radio") {
      if (i.checked) tagValue = i.value;
    }
  }
  // save values to object
  const data = {
    searchValue: $("#search_value").val(),
    tagValue,
  };
  //clear search fields
  $(".explore_search_form").trigger("reset");

  //send data to server and replace the diplay container with the results
  $.post("api/explore/search", { data }).then((res) => {
    renderResources(res);
  });
  return data;
};

// function to render the resources
const renderResources = function (resources) {
  $(".resourceInfo").empty();
  for (const resource of resources) {
    const $resource = createResourceElement(resource);
    $(".resourceInfo").append($resource);
  }
};

// function to load the resources to the page
const loadResources = () => {
  $.get("api/explore").then((res) => {
    renderResources(res);
  });
};

function parseDate(input) {
  return new Date(input); // Note: months are 0-based
}

// function to create the html for each resource
const createResourceElement = (resource) => {
  const $resource = `<div class="flex flex-col border-solid border-4 border-black w-2/5 my-1 cursor-pointer" id="${
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
