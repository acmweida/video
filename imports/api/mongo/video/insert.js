import { Video,User } from "../db"
export const videoCreate = {
    name: 'video.create',
    validate(args) {
        new SimpleSchema({
            publicKey: { type: String },
            ipfs: { type: String },
            resid: { type: String },
            title: { type: String },
            cover: { type: String },
            description: { type: String },
            kind: { type: String }
        }).validate(args)
    },
    run({ publicKey, ipfs, resid, title, cover, description, kind }) {
        // console.log(publicKey)s
        var videoid = Video.insert({ author: publicKey, ipfs: ipfs, resid: resid, title: title, cover: cover, waive: true, gratuityNum: 0, description: description, kind: kind, thumbsup: 0,createDate:new Date(),check:0,isdelete:false });
        if (videoid) {
            User.update({ publicKey: publicKey }, { $push: { videos: videoid } });
            return true;
        } else {
            return false;
        }
    },
    call(args, callback) {
        const options = {
            returnLoginbValue: true,
            throwLoginExecption: true
        }
        Meteor.apply(this.name, [args], options, callback);
    }

};

Meteor.methods({
    [videoCreate.name]: function (args) {
        videoCreate.validate.call(this, args);
        return videoCreate.run.call(this, args);
    }
})