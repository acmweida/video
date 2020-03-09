

export const userRegister = {
    name : 'user.register',
    validate(args) {
        new SimpleSchema({
            eth_account:{type:String},
            password:{type:String}
        }).validate(args)
    },
    run({eth_account,password}) {
        return User.insert({account:eth_account,password:password}); 
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
    [userRegister.name]:function(args) {
        userRegister.validate.call(this,args);
        return userRegister.run.call(this,args);
    }
})