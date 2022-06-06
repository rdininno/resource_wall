module.exports = function (db) {
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
          SELECT resources.* FROM resources
          WHERE 1=1`;
      const queryParams = [];

      queryString += ` AND title ILIKE $${queryParams.length + 1
        } OR description ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${queryData}%`);


      queryParams.push(limit);
      queryString += `
          GROUP BY resources.title, resources.id
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
    },
  };
};
