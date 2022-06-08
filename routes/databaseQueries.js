module.exports = function (db) {
  //query to get all resources
  return {
    getAllResources: (limit = 10) => {
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
    },

    resourceSearchQuery: (options, limit = 10) => {
      const queryData = options.body.data;
      let queryString = `
          SELECT DISTINCT resources.* FROM resources LEFT JOIN tags ON resources.id = tags.resource_id
          WHERE 1=1`;
      const queryParams = [];

      // if search value is not empty add to query
      if (queryData.searchValue) {
        queryString += ` AND title ILIKE $${
          queryParams.length + 1
        } OR description ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${queryData.searchValue}%`);
      }
      // if tag value is not empty add to query
      if (queryData.tagValue) {
        queryString += ` AND tag ILIKE $${queryParams.length + 1}`;
        queryParams.push(`%${queryData.tagValue}%`);
      }

      queryParams.push(limit);
      queryString += `
          GROUP BY resources.title, resources.id, tags.id
          ORDER BY resources.created_at
          LIMIT $${queryParams.length}`;

      //return the results of the query
      return db
        .query(queryString, queryParams)
        .then((res) => {
          console.log(res.rows);
          return res.rows;
        })
        .catch((err) => {
          console.log("error in searchQuery:", err);
          return null;
        });
    },
  };
};
