const smallUsers = require('./data/small-users');
const smallPosts = require('./data/small-posts');

const largeUsers = require('./data/users');
const largePosts = require('./data/posts');



class Feed {
  constructor (users, posts) {
    this.users = users
    this.posts = posts
  }

  // Given a userID, return an array containing
  // the IDs of each of that user's friends.
  // The variable `degree` is the number of degrees
  // of friendship away from the user: A degree-2
  // friend is a friend-of-a-friend, and not a friend.
  getFriendIDs(userID, degree = 1) {
    // Your code here
  }

  // Given a userID, return an array of postIDs:
  //   1. from the user's friends
  // All posts should be in reverse chronological order
  friendFeed(userID) {
    // Your code here
  }


  // Given a userID, return an array of postIDs:
  //   1. Posts from the user's close friends followed by
  //   2. Posts from the user's regular friends
  // All posts should be in reverse chronological order
  closeFriendFeed(userID) {
    // Your code here
  }


  // Given a userID, return an array of postIDs:
  //   1. From the user's friends-of-friends
  // All posts should be in reverse chronological order
  friendOfFriendsFeed(userID) {
    // Your code here
  }


  // Given a userID, return an array of postIDs:
  //   1. Posts from the user's close friends followed by
  //   2. Posts from the user's regular friends followed by
  //   3. Posts from the user's friends-of-friends
  // All posts should be in reverse chronological order
  fullFeed(userID) {
    // Your code here
  }


  // Given an array of postIDs, print out the post feed in order.
  // May be used for debugging.
  printFeed(postIDs) {
    for (let i = 0 ; i < postIDs.length ; i++) {
      console.log(this.posts[postIDs[i]]);
    }
  }

}


function tryLocalTests() {
  smallFeed = new Feed(smallUsers, smallPosts);
  // Alice is friends with Bob and Charlie
  console.log(smallFeed.getFriendIDs(1));
  // [2, 3]

  // Eve has one 2nd degree (friend-of-a-friend) friend: Charlie
  console.log(smallFeed.getFriendIDs(5, 2));
  // [3]

  // Bob has one 3rd degree (friend-of-a-friend-of-a-friend): Eve
  console.log(smallFeed.getFriendIDs(2, 3));
  // [5]

  // The IDs of posts from David's friends are:
  // [12, 10, 8, 5, 3]
  console.log(smallFeed.friendFeed(4));

  // The IDs of posts from Alice's friends-of-friends (David) are:
  // [9, 4]
  console.log(smallFeed.friendOfFriendsFeed(1));

  // The IDs of posts from Charlie's close friends,
  // then regular friends are:
  // [9, 7, 4, 2, 11, 6, 1]
  console.log(smallFeed.closeFriendFeed(3));

  // The IDs of posts from Alice's close friends (Bob),
  // then regular friends (Charlie), then friends-of-friends (David) are:
  // [7, 2, 8, 3, 9, 4]
  console.log(smallFeed.fullFeed(1));
}

tryLocalTests();



/*******************************************************************************
 * Do not change the code after this line.
 */

try {
  exports.Feed = Feed;
} catch(e) {
  module.exports = null;
}