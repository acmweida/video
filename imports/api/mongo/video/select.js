import { Video } from "../db"
export const videoSelectOne = {
    name: 'video.selectOne',
    validate(args) {
        new SimpleSchema({
            ipfs: { type: String }
        }).validate(args)
    },
    run({  ipfs }) {
        // console.log(publicKey)s
        var video = Video.findOne({ipfs: ipfs});
        return video;
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