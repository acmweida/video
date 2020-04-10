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

export const userGetUserInfo = {
    name: 'user.getUserInfo',
    validate(args) {
        new SimpleSchema({
            publicKey: { type: String }
        }).validate(args)
    },
    run({ publicKey }) {
        const username = User.findOne({ publicKey: publicKey });
        username.email = undefined;
        return username;
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
    [userGetUserInfo.name]: function (args) {
        // console.log(args)
        userGetUserInfo.validate.call(this, args);
        return userGetUserInfo.run.call(this, args);
    }
})


export const userHasRegister = {
    name : 'user.hasRegister',
    validate(args) {
        new SimpleSchema({
            email:{type:String}
        }).validate(args)
    },
    run({email}) {
        const user = User.findOne({email:email});
       if (null  == user) {
            return false;
       } 
       return true;
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
    [userHasRegister.name]:function(args) {
        userHasRegister.validate.call(this,args);
        return userHasRegister.run.call(this,args);
    }
})

 const userLogin = {
    name : 'user.login',
    validate(args) {
        new SimpleSchema({
            email:{type:String},
            publicKey:{type:String}
        }).validate(args)
    },
    run({email,publickey}) {
        const user = User.findOne({email:email,publickey:publickey});
        if  (null == user) {
            return { exist:false,user:null };
        }
        return { exist: true,user:user};
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
    [userLogin.name]: function (args) {
        userLogin.validate.call(this, args);
        return userLogin.run.call(this, args);
    }
})
