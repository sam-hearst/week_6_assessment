
const { expect } = require('chai');

const largeUsers = require('../data/users');
const largePosts = require('../data/posts');

const assert = require('assert')

let Feed = () => {
  throw new Error('Could not load feed');
};

try {
  ({ Feed } = require('../feed'));
} catch (e) {}

describe('Large Feed', () => {

  const largeFeed = new Feed(largeUsers, largePosts);

  context('returns userIDs of all friends of a given user', () => {

    it(`Lutetia's friends`, () => {

      const friendsOfLutetia = largeFeed.getFriendIDs(2);

      expect(friendsOfLutetia).to.have.members([1, 73, 77, 47, 5, 17]);

    });

    it(`Bertram's friends of friends`, () => {

      const friendsOfFriendsOfBertram = largeFeed.getFriendIDs(101, 2);

      expect(friendsOfFriendsOfBertram).to.have.members([7, 110, 34, 70, 91, 64, 4, 113, 20, 27, 81, 30, 73, 3, 56, 62, 40, 50, 80, 96, 5, 86, 45, 78]);

    });


    it(`Alethia's friends of friends of friends`, () => {

      const friendsOfFriendsOfAlethia = largeFeed.getFriendIDs(80, 3);

      expect(friendsOfFriendsOfAlethia).to.have.members([7, 88, 100, 21, 29, 6, 107, 47, 65, 33, 38, 95, 1, 69, 77, 82, 31, 111, 70, 17, 75, 8, 42, 67, 66, 97, 9, 19, 52, 78, 106, 59, 73, 74, 83, 5, 86, 45, 63, 25, 110, 24, 98, 62, 18, 58, 60, 22, 44, 68, 27, 56, 37, 94, 72, 87]);

    });


  });


  context('creates a dynamic post feed', () => {

    it(`posts from Ophelia's friends in reverse chronological order`, () => {

      const postsFromFriendsOfOphelia = largeFeed.friendFeed(19);

      assert.deepEqual(postsFromFriendsOfOphelia, [968, 944, 924, 867, 861, 762, 758, 745, 734, 722, 675, 660, 640, 623, 543, 525, 423, 403, 390, 321, 307, 228, 211, 198, 197, 177, 167, 144, 143, 135, 105, 104, 35, 22]);
    });


    it(`posts from Napoleon's close friends, then regular friends in reverse chronological order`, () => {

      const postsFromCloseFriendsOfNapoleon = largeFeed.closeFriendFeed(4);

      assert.deepEqual(postsFromCloseFriendsOfNapoleon, [977, 971, 963, 873, 860, 806, 781, 688, 356, 296, 188, 149, 5, 985, 942, 869, 810, 783, 754, 747, 704, 677, 671, 630, 609, 494, 476, 445, 414, 376, 359, 282, 189, 174, 141, 124, 74, 73, 70]);
    });

    it(`posts from Fumiko's close friends, then regular friends, then friends-of-friends in reverse chronological order`, () => {

      const postsFromAllFriendsOfFumiko = largeFeed.fullFeed(104);

      assert.deepEqual(postsFromAllFriendsOfFumiko, [952, 946, 945, 935, 920, 903, 886, 875, 868, 855, 843, 764, 714, 691, 607, 605, 604, 593, 582, 569, 513, 505, 472, 470, 452, 368, 308, 305, 210, 176, 154, 130, 90, 81, 974, 959, 815, 800, 757, 571, 463, 405, 379, 346, 327, 203, 202, 146, 137, 95, 85, 34, 3, 999, 992, 988, 984, 976, 975, 972, 967, 965, 962, 961, 933, 929, 925, 922, 921, 919, 911, 902, 900, 898, 893, 888, 885, 882, 877, 866, 858, 848, 845, 840, 835, 831, 825, 823, 820, 819, 818, 817, 804, 802, 794, 792, 791, 786, 778, 775, 766, 765, 763, 762, 760, 752, 742, 737, 733, 731, 728, 708, 692, 678, 673, 667, 665, 658, 652, 647, 645, 643, 633, 632, 617, 614, 611, 598, 597, 594, 590, 588, 587, 585, 580, 578, 567, 563, 551, 545, 543, 540, 520, 516, 511, 508, 499, 489, 487, 486, 477, 462, 454, 446, 438, 424, 419, 416, 406, 404, 403, 392, 391, 385, 384, 372, 370, 362, 360, 354, 344, 341, 335, 326, 322, 318, 312, 310, 302, 298, 289, 285, 280, 274, 271, 258, 257, 254, 250, 244, 238, 237, 234, 231, 229, 222, 221, 212, 199, 197, 196, 195, 194, 193, 190, 184, 180, 178, 171, 168, 164, 160, 155, 152, 148, 140, 138, 128, 126, 123, 120, 119, 114, 105, 100, 75, 64, 51, 50, 49, 46, 39, 38, 33, 32, 31, 29, 28, 18, 14, 8]);
    });

  });

});

