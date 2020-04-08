export const User = new Mongo.Collection('USER');
export const Video = new Mongo.Collection('VIDEO');

import './user/user'
import './video/video'

if (Meteor.isServer) {
    Meteor.publish('nawVideos', function () {
        var res = Video.find({}, { limit: 50, sort: { createDate: -1 } });
        return res;
    });

    Meteor.publish('user', function () {
        var res = User.find({});
        return res;
    });
}