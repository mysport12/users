const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of the database', () => {
  let alex;
  let joe;
  let maria;
  let zach;

  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
      });
      done();
  });

  it('find user with a particular id', (done) => {
    User.findOne({ _id: joe.id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
    });

  it('can limit and skip entries', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});
