
import {User} from '../db'
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