const User = new Mongo.Collection('USER');
const Video = new Mongo.Collection('VIDEO');
import './user/user'
import './user/login'
import './user/register'
import './user/hasRegister'
import './user/getUserName'
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

export const userGetUserName = {
    name : 'user.getUserName',
    validate(args) {
        new SimpleSchema({
            publicKey:{type:String}
        }).validate(args)
    },
    run({publicKey}) {
        const username = User.findOne({publicKey:publicKey},{account:1});
        console.log(username);
       return username.account;
    },
    call(args,callback) {
        const options = {
            returnLoginbValue:true,
            throwLoginExecption:true
        }
        Meteor.apply(this.name,[args],options,callback);
    }
    
};

Meteor.methods({
    [userGetUserName.name]:function(args) {
        console.log(args)
        userGetUserName.validate.call(this,args);
        return userGetUserName.run.call(this,args);
    }
})