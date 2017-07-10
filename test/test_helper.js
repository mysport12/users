const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  const promise = mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true,
  });
  promise.then(() => {
    done();
  });
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
