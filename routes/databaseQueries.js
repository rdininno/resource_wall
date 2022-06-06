module.exports = function (db) {
  return {
    getAllResources: (limit = 10) => {
      const allResourcesQuery = `SELECT * FROM resources LIMIT $1`;
      const allResourcesData = [limit];
      return db.query(allResourcesQuery, allResourcesData)
        .then((res) => {
          console.log("allResources:", res.rows);
          return res.rows;
        })
        .catch((err) => {
          console.log("error in allResources:", err);
        });
    }







  };

  const resourceSearchQuery = (limit = 10) => {
    const options = searchSubmit();
    let queryString = `
        SELECT * FROM resurces
        JOIN users ON resources.user_id = users.id
        JOIN tags ON resources.id = tags.resource_id
        WHERE 1=1`;
    const queryParams = [];

    if (options.search) {
      queryString += ` AND title LIKE $${queryParams.length + 1
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
};
