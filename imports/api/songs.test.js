import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';

import Posts from './posts.js';

const otherUserId = Random.id();
let userId;

Factory.define('user', Meteor.users, {
  createdAt: () => new Date(),
  username: () => faker.internet.userName(),
});

Factory.define('song', Posts, {
  country: () => faker.address.country(),
  data: () => faker.random.objectElement(),
  submittedOn: () => faker.date.past().toString(),
});

if (Meteor.isServer) {
  describe('Posts', () => {
    describe('methods', () => {
      beforeEach(() => {
        resetDatabase();
        userId = Factory.create('user')._id;
      });

      it('can insert song', () => {
        const song = Factory.build('song');
        const songInsert = Meteor.server.method_handlers.songInsert;
        const invocation = { userId };
        songInsert.apply(invocation, [song]);
        assert.equal(Posts.find().count(), 1);
      });

      it('cannot insert song when not logged in', () => {
        const song = Factory.build('song');
        const songInsert = Meteor.server.method_handlers.songInsert;
        const invocation = {};
        assert.throws(() => songInsert.apply(invocation, [song]), Error, 'not-authorized');
      });

      it('cannot rate song from same user', () => {
        const song = Factory.create('song', { submittedBy: userId });
        const rating = faker.random.number();
        const songRate = Meteor.server.method_handlers.songRate;
        const invocation = { userId };
        assert.throws(() => songRate.apply(invocation, [song._id, rating]), Error, 'not-authorized');
      });

      it('can rate not-owned song', () => {
        const song = Factory.create('song', { submittedBy: userId });
        const rating = faker.random.number();
        const songRate = Meteor.server.method_handlers.songRate;
        const invocation = { userId: otherUserId };
        songRate.apply(invocation, [song._id, rating]);
        assert.equal(Posts.findOne(song._id).ratingSum, rating);
      });
    });
  });
}

//No hay test de clases del lado del cliente. 
