// Client facing scripts here
$(document).ready(() => {
  $(".explore_search").on("submit", searchSubmit);
  $("#allResources").on("click", (evt) => {
    console.log("clicked!");
  });
});

// function to use the form submit data to search for resources and prevent default
const searchSubmit = (evt) => {
  evt.preventDefault();
  const data = $(this).serialize();
  console.log(data);
  return data;
};

//function to take the form data and use it in a search query in the resources database
const resourceSearchQuery = (limit = 10) => {
  const options = searchSubmit();
  let queryString = `
      SELECT * FROM resurces
      JOIN users ON resources.user_id = users.id
      JOIN tags ON resources.id = tags.resource_id
      WHERE 1=1`;
  const queryParams = [];

  if (options.search) {
    queryString += ` AND title LIKE $${
      queryParams.length + 1
    } OR description LIKE $${queryParams.length + 1}`;
    queryParams.push(`%${options.search}%`);
  }

  if (options.tag) {
    queryString += ` AND tag LIKE $${queryParams.length + 1}`;
    queryParams.push(`%${options.tags}%`);
  }

  queryParams.push(limit);
  queryString += `
      GROUP BY resources.title
      ORDER BY resources.created_at
      LIMIT $${queryParams.length}`;

  return db
    .query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log("error in searchQuery:", err);
      return null;
    });
};

// function that just queries the resources database and returns all resources
const allResources = (limit = 10) => {
  const allResourcesQuery = `SELECT * FROM resources LIMIT $1`;
  const allResourcesData = [limit];
  return db
    .query(allResourcesQuery, allResourcesData)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log("error in allResources:", err);
    });
};

// function to render the resources
const renderResources = () => {
  let resource;
  if (resourceSearchQuery()) {
    resource = resourceSearchQuery();
  } else {
    resource = allResources();
  }
  for (let i = 0; i < resource.length; i++) {
    const $resource = createResourceElement(resource[i]);
    $(".resourceContainer").append($resource);
  }
};

// function to create the html for each resource
const createResourceElement = (resource) => {
  const $resource = `<div class="resourceInfo">
                <h2 class="resourceTitle">${resource.title}</h2>
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
  $.get("/resources/").then((res) => {
    renderResources(res);
  });
};
