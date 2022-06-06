INSERT INTO
  resources (creator_id, title, description, url)
VALUES
  (
    1,
    'Reddit',
    'A useful website that has different pages to post questions',
    'http://www.reddit.com'
  ),
  (
    2,
    'Wikipedia',
    'A website that hosts a multitude of information, anyone can update a page though so not always reliable',
    'http://www.wikipedia.org'
  ),
  (
    3,
    'Medium',
    'A website that people post potentially useful and educational articles',
    'http://www.medium.com'
  ),
  (
    4,
    'Udemy',
    'A website where you can purchase course on a multitude of topics',
    'http://www.udemy.com'
  ),
  (
    2,
    'Skillshare',
    'A website where you can purchase a membership and you recieve a host of courses created by professionals',
    'http://www.skillshare.com'
  ),
  (
    4,
    'MDN',
    'A website that provides all the syntax and use-cases for inbuilt functions in multiple programming languages',
    'http://www.mdn.com'
  );

INSERT INTO
  favourites (resource_id, user_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 2),
  (6, 2),
  (3, 4),
  (4, 3),
  (5, 4),
  (6, 3);

INSERT INTO
  reviews (resource_id, reviewer_id, rating, comment)
VALUES
  (1, 1, 1, 'Not the best'),
  (2, 3, 5, 'Amazing, so much information!'),
  (3, 4, 2, 'Could be better'),
  (
    5,
    2,
    4,
    'Great resource, couldn''t find what I was looking for though'
  ),
  (4, 1, 5, 'Another great resource!'),
  (6, 2, 3, 'Middle of the field');

INSERT INTO
  tags (resource_id, user_id, tag)
VALUES
  (6, 1, 'programming'),
  (6, 2, 'fun'),
  (5, 3, 'education'),
  (5, 3, 'videos'),
  (4, 4, 'education'),
  (4, 4, 'videos'),
  (3, 2, 'education'),
  (3, 1, 'videos'),
  (2, 4, 'education'),
  (2, 3, 'videos'),
  (1, 2, 'education'),
  (1, 1, 'fun');
