import {Video}  from '../../api/mongo/db'
import {User} from '../../api/mongo/db'
import {Order} from '../../api/mongo/db'
import {VideoCreateLog} from '../../api/mongo/db'
import {Sub} from '../../api/mongo/db'
import {Admin} from '../../api/mongo/db'
import {Comment} from '../../api/mongo/db'

Meteor.publish('nawVideos', function () {
    var res = Video.find({waive:true,check:1,isdelete:false}, { limit: 25, sort: { createDate: -1 } });
    return res;
});

Meteor.publish('user', function () {
    return  User.find({});
});

Meteor.publish('hotVideos', function () {
    var res = Video.find({waive:true,check:1,isdelete:false},{ $sample: { size: 25 } });
    return res;
});

Meteor.publish('videoAll', function () {
    var res = Video.find({});
    return res;
});

Meteor.publish('video', function () {
    var res = Video.find({waive:true,check:1,isdelete:false});
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


Meteor.publish('sub',function() {
    var res = Sub.find({});
    return res;
})

Meteor.publish('admin',function() {
    var res = Admin.find({});
    return res;
})

Meteor.publish('comment',function() {
    var res = Comment.find({is_delete:false});
    return res;
})
