import {User} from '../db'
export const userGetUserName = {
    name: 'user.getUserName',
    validate(args) {
        new SimpleSchema({
            publicKey: { type: String }
        }).validate(args)
    },
    run({ publicKey }) {
        const username = User.findOne({ publicKey: publicKey }, { account: 1 });
        return username.account;
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
    [userGetUserName.name]: function (args) {
        // console.log(args)
        userGetUserName.validate.call(this, args);
        return userGetUserName.run.call(this, args);
    }
})