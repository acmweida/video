User = new Mongo.Collection('USER');

export const userLogin = {
    name : 'user.login',
    validate(args) {
        new SimpleSchema({
            eth_account:{type:String},
            password:{type:String}
        }).validate(args)
    },
    run({eth_account,password}) {
        const user = User.findOne({eth_account:eth_account});
        return { exist: true,user:user};
        // if (user != null && user.password === this.password) {
        //     return { exist: true,user:user};
        // } else {
        //     return { exist:false,user:null};
        // }
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

 

