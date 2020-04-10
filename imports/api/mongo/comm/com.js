import { Video,User } from "../db"
export const videoSelectOne = {
    name: 'videoPlay.selectOne',
    validate(args) {
        new SimpleSchema({
            ipfs: { type: String }
        }).validate(args)
    },
    run({  ipfs }) {
        // console.log(publicKey)s
        var videoinfo = Video.findOne({ipfs: ipfs});
        var authorinfo = User.findOne({publicKey:videoinfo.author});
        authorinfo.email = undefined;
        var res = {
            videoinfo : videoinfo,
            authorinfo : authorinfo
        }
        return res;
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
    [videoSelectOne.name]: function (args) {
        videoSelectOne.validate.call(this, args);
        return videoSelectOne.run.call(this, args);
    }
})