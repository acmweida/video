export const userLogin = {
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
    [userLogin.name]:function(args) {
        userLogin.validate.call(this,args);
        return userLogin.run.call(this,args);
    }
})