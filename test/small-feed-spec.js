
const { expect } = require('chai');

const smallUsers = require('../data/small-users');
const smallPosts = require('../data/small-posts');

const assert = require('assert')

let Feed = () => {
  throw new Error('Could not load feed');
};

try {
  ({ Feed } = require('../feed'));
} catch (e) {}

describe('Small Feed', () => {

  const smallFeed = new Feed(smallUsers, smallPosts);

  context('returns userIDs of all friends of a given user', () => {

    it(`Alice's friends`, () => {

      const friendsOfAlice = smallFeed.getFriendIDs(1);

      expect(friendsOfAlice).to.have.members([2, 3]);

    });


    it(`Eve's friends of friends`, () => {

      const friendsOfFriendsOfEve = smallFeed.getFriendIDs(5, 2);

      expect(friendsOfFriendsOfEve).to.have.members([3]);

    });


    it(`Bob's friends of friends of friends`, () => {

      const friendsOfFriendsOfBob = smallFeed.getFriendIDs(2, 3);

      expect(friendsOfFriendsOfBob).to.have.members([5]);

    });

  });


  context('creates a dynamic post feed', () => {

    it(`posts from David's friends in reverse chronological order`, () => {

      const postsFromFriendsOfDavid = smallFeed.friendFeed(4);

      assert.deepEqual(postsFromFriendsOfDavid, [12, 10, 8, 5, 3]);
    });


    it(`posts from Charlie's close friends, then regular friends in reverse chronological order`, () => {

      const postsFromCloseFriendsOfCharlie = smallFeed.closeFriendFeed(3);

      assert.deepEqual(postsFromCloseFriendsOfCharlie, [9, 7, 4, 2, 11, 6, 1]);
    });

    it(`posts from Alice's close friends, then regular friends, then friends-of-friends in reverse chronological order`, () => {

      const postsFromAllFriendsOfAlice = smallFeed.fullFeed(1);

      assert.deepEqual(postsFromAllFriendsOfAlice, [7, 2, 8, 3, 9, 4]);
    });

  });

});


