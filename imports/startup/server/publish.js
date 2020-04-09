import {Video}  from '../../api/mongo/db'
import {User} from '../../api/mongo/db'
Meteor.publish('nawVideos', function () {
    var res = Video.find({}, { limit: 25, sort: { createDate: -1 } });
    return res;
});

Meteor.publish('user', function () {
    var res = User.find({});
    return res;
});

Meteor.publish('hotVideos', function () {
    var res = Video.find({ $sample: { size: 25 } });
    return res;
});
