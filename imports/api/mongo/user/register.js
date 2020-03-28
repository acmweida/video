

export const userRegister = {
    name : 'user.register',
    validate(args) {
        new SimpleSchema({
            account:{type:String},
            publicKey:{type:String},
            email:{type:String}
        }).validate(args)
    },
    run({account,publicKey,email}) {
        // console.log(publicKey)
        return User.insert({account:account,publicKey:publicKey,email:email}); 
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