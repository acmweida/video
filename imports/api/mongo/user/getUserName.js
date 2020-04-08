
export const userGetUserName = {
    name : 'user.getUserName',
    validate(args) {
        new SimpleSchema({
            publicKey:{type:String}
        }).validate(args)
    },
    run({publicKey}) {
        const username = User.findOne({publicKey:publicKey},{account:1});
       return username;
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
        userHasRegister.validate.call(this,args);
        return userHasRegister.run.call(this,args);
    }
})