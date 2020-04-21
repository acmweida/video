import {Video}  from '../../api/mongo/db'
import {User} from '../../api/mongo/db'
import {Order} from '../../api/mongo/db'
import {VideoCreateLog} from '../../api/mongo/db'
Meteor.publish('nawVideos', function () {
    var res = Video.find({}, { limit: 25, sort: { createDate: -1 } });
    return res;
});

Meteor.publish('user', function () {
    return  User.find({});
});

Meteor.publish('hotVideos', function () {
    var res = Video.find({ $sample: { size: 25 } });
    return res;
});

Meteor.publish('video', function () {
    var res = Video.find({});
    return res;
});

Meteor.publish('order',function(){
    var res =  Order.find({});
    return res;
})


Meteor.publish('videolog',function() {
    var res = VideoCreateLog.find({});
    return res;
})

