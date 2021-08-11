const smallUsers = require('./data/small-users');
const smallPosts = require('./data/small-posts');

const largeUsers = require('./data/users');
const largePosts = require('./data/posts');



class Feed {
    constructor(users, posts) {
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
        let friendsIds = []
        let queue = [[userID]]
        let currentDegree = 0;
        let visited = new Set();

        while (queue.length) {
            let path = queue.shift();

            currentDegree = path.length - 1
            let currentId = path[path.length - 1]

            if (currentDegree > degree) {
                break
            }

            if (!visited.has(currentId)) {
                visited.add(currentId);

                if (currentDegree === degree) {
                    friendsIds.push(currentId);
                }

                let friends = this.users[currentId].friends
                for (let i = 0; i < friends.length; i++) {
                    let friend = friends[i]

                    let pathCopy = [...path]
                    pathCopy.push(friend);
                    queue.push(pathCopy)
                }
            }
        }

        return friendsIds
    }

    // Given a userID, return an array of postIDs:
    //   1. from the user's friends
    // All posts should be in reverse chronological order
    friendFeed(userID) {
        // Your code here
        // initialize an empty array
        // find friends and put friends in a set
        // loop through the posts obj and check if the authorId is inside the set
        // if it is then push that postId
        // before returning do an array.reverse method

        let posts = []
        let friends = new Set(this.users[userID].friends)


        for (let postId in this.posts) {
            let post = this.posts[postId]

            if (friends.has(post.authorID)) {
                posts.push(postId)
            }
        }

        return posts.reverse();
    }


    // Given a userID, return an array of postIDs:
    //   1. Posts from the user's close friends followed by
    //   2. Posts from the user's regular friends
    // All posts should be in reverse chronological order
    closeFriendFeed(userID) {
        // Your code here
        // initialize a set with close friends
        // initialize a set with regular friends putting in the close friends set
        // iterate over posts like before and push to postIds the close friends
        // iterate over posts like before and push to postIds the regular friends
        // return array.reversed
        let postIdsCloseFriends = [];
        let postIdsRegFriends = []
        let closeFriends = new Set(this.users[userID].closeFriends);
        let regFriends = new Set(this.users[userID].friends)

        for (let postId in this.posts) {
            let post = this.posts[postId]

            if (regFriends.has(post.authorID)) {
                if (closeFriends.has(post.authorID)) {
                    postIdsCloseFriends.push(postId)
                } else {
                    postIdsRegFriends.push(postId)
                }
            }
        }

        postIdsCloseFriends.reverse();
        postIdsRegFriends.reverse();
        return [...postIdsCloseFriends, ...postIdsRegFriends]
    }


    // Given a userID, return an array of postIDs:
    //   1. From the user's friends-of-friends
    // All posts should be in reverse chronological order
    friendOfFriendsFeed(userID) {
        // Your code here
        // find all friend of friends
        // get all friends of friends of userID by calling method, and making a set
        // then iterate through to find all the posts
        // push the right posts into an array // if authorId is in set, then push that postId
        // return that array at the end reversed
        let fOfFsIds = []
        let fOfFs = new Set(this.getFriendIDs(userID, 2)); // these dont incude friends of previous degrees that are also friend of friends

        for (let postId in this.posts) {
            let value = this.posts[postId]

            if (fOfFs.has(value.authorID)) {
                fOfFsIds.push(postId)
            }
        }

        return fOfFsIds.reverse();
    }


    // Given a userID, return an array of postIDs:
    //   1. Posts from the user's close friends followed by
    //   2. Posts from the user's regular friends followed by
    //   3. Posts from the user's friends-of-friends
    // All posts should be in reverse chronological order
    fullFeed(userID) {
        // Your code here
        let closeAngReg = this.closeFriendFeed(userID);
        let fOfFs = this.friendOfFriendsFeed(userID);

        return [...closeAngReg, ...fOfFs]
    }


    // Given an array of postIDs, print out the post feed in order.
    // May be used for debugging.
    printFeed(postIDs) {
        for (let i = 0; i < postIDs.length; i++) {
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
} catch (e) {
    module.exports = null;
}
