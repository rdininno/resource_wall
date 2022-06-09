// Client facing scripts here
$(document).ready(() => {
  $(".explore_search_form").on("submit", searchSubmit);
  $("#allResources").on("click", loadResources);
  $(".resourceInfo").on("click", goToResource);
});

const goToResource = (evt) => {
  console.log($(evt.target).closest());
  const resourceId = $(evt.target).closest(".resource_container").attr("id");
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
  let date = Date.parse(input);
  date = new Date(date);
  return date.toLocaleString("en-US");
}

// function to create the html for each resource
const createResourceElement = (resource) => {
  const $resource = `<div class="resource_container flex flex-col border-solid border-1 border-black w-2/5 my-1 cursor-pointer" id="${
    resource.resource_id || resource.id
  }">
  <h2 class="resourceTitle text-4xl mx-3 my-2 underline">${resource.title}</h2>
  <div class="resourceDescription mx-3 my-2">
    ${resource.description}
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
