# Creating a post feed

Your objective is to create a social media feed to the given specifications.

1. `npm install` to install any dependencies
2. Fill out code in `feed.js`
3. `npm test` to run the test cases

If you want to run the tests for one problem file at a time, you can do so
with the following command in your terminal:

`npm test test/small-feed-spec.js`
`npm test test/large-feed-spec.js`

It's recommended to start with the small feed, then move on to the large feed.

## Test data

There are data sets provided for testing, both large and small, containing
user and post data. The key is the ID of the user/post and the value object is
the data. The small data sets are as follows:

```js
// data/small-users.js
users = {
    1: {'name': 'Alice', 'friends': [2, 3], 'closeFriends': [2]},
    2: {'name': 'Bob', 'friends': [1, 3], 'closeFriends': [3]},
    3: {'name': 'Charlie', 'friends': [1, 2, 4], 'closeFriends': [2, 4]},
    4: {'name': 'David', 'friends': [3, 5], 'closeFriends': [3]},
    5: {'name': 'Eve', 'friends': [4], 'closeFriends': []},
}

// data/small-posts.js
posts = {
    1: {'authorID': 1, 'title': "Alice's post", 'timestamp': 'January 01, 2020 10:29:40'},
    2: {'authorID': 2, 'title': "Bob's post", 'timestamp': 'February 08, 2020 05:16:22'},
    3: {'authorID': 3, 'title': "Charlie's post", 'timestamp': 'March 13, 2020 18:28:51'},
    4: {'authorID': 4, 'title': "David's post", 'timestamp': 'April 15, 2020 11:32:50'},
    5: {'authorID': 5, 'title': "Eve's post", 'timestamp': 'May 09, 2020 17:07:27'},
    6: {'authorID': 1, 'title': "Alice's post", 'timestamp': 'June 08, 2020 03:05:50'},
    7: {'authorID': 2, 'title': "Bob's post", 'timestamp': 'July 02, 2020 05:56:30'},
    8: {'authorID': 3, 'title': "Charlie's post", 'timestamp': 'August 06, 2020 11:41:52'},
    9: {'authorID': 4, 'title': "David's post", 'timestamp': 'September 25, 2020 08:12:19'},
    10: {'authorID': 5, 'title': "Eve's post", 'timestamp': 'October 17, 2020 16:55:54'},
    11: {'authorID': 1, 'title': "Alice's post", 'timestamp': 'November 26, 2020 16:28:04'},
    12: {'authorID': 5, 'title': "Eve's post", 'timestamp': 'December 31, 2020 22:20:36'}
}
```

The following specifications will refer to this small data set.

## Social network specifications

First, you will be filling out the social network portion of the feed. The
function, `getFriendIDs` takes in a userID and returns an array containing the
IDs of all friends of the given degree. 1st degree friends are direct friends
of the user, 2nd degree friends are friends-of-friends, 3rd degree friends are
friends-of-friends-of-friends, etc.

`getFriendIDs` will return the 2nd degree friends of user 1 (Alice). Alice's
first degree friends are users 2 and 3 (Bob and Charlie) and she has one second
degree friend: user 4 (David). So `getFriendIDs(1, 1)` will return `[2, 3]` and
`getFriendIDs(1, 2)` will return `[4]`.

## Feed specifications

You will be filling out four different feed algorithms. Posts in the same
category should be ordered with the most recent first, followed by the oldest
posts.

* `friendFeed(userID)` returns the posts from the user's friends
* `closeFriendFeed(userID)` returns the posts from the user's close friends,
followed by posts from that user's regular friends
* `friendOfFriendsFeed(userID)` returns the posts from the user's close friends,
followed by posts from that user's regular friends
* `fullFeed(userID)` returns the posts from the user's close friends, followed
by posts from that user's regular friends, followed by posts from the user's
2nd degree friends

`friendFeed(4)` returns posts from David's friends: `[12, 10, 8, 5, 3]`

`closeFriendFeed(3)` returns posts from Charlie's close friends (Bob, David)
followed by posts from his regular friends (Alice): `[9, 7, 4, 2, 11, 6, 1]`

`friendOfFriendsFeed(1)` returns posts from Alice's
friends-of-friends (David): `[9, 4]`

`fullFeed(1)` returns posts from Alice's close friends (Bob), then regular
friends (Charlie) followed by posts from
friends-of-friends (David): `[7, 2, 8, 3, 9, 4]`.

## Usage

1. Clone the assessment repository from
   [https://github.com/appacademy/assessment-for-week-06-v2-version-a-graphs].
2. `cd` into the folder and `npm install` to install dependencies
3. **Run the tests by typing `npm test`**. DO NOT USE THE COMMAND `mocha`.

## Submission

When you are ready to submit:

1. Delete the `node_modules` directory
2. Zip up your folder
3. Upload it

[https://github.com/appacademy/assessment-for-week-06-v2-version-a-graphs]: https://github.com/appacademy/assessment-for-week-06-v2-version-a-graphs