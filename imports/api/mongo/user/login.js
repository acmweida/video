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





// function usreLogin(args,callback) {
//     console.log( args.email+" : "+ args.publicKey)
//     new SimpleSchema({
//         email: { type: String },
//         publicKey: { type: String }
//     }).validate({ email:args.email,publicKey:args.publicKey})

//     var user = User.findOne({ email: args.email, publicKey: args.publicKey });
//     console.log(user)
//     if (null == user) {
//         res = { exist: false, user: null };
//     } else {
//         res = { exist: true, user: user };
//     }
//     // return res;
//     console.log(res)
//    callback(null,res);

// }

// Meteor.methods({
//     "user.login": function(args) {
//        syncFunc = Meteor.wrapAsync(usreLogin);
//        res = syncFunc(args);    
//        return res;
//     }
//   });


// Meteor.methods({
//     "user.login"(args) {

//         // Set up a future
//         var fut = new Future();

//         // This should work for any async method
//         console.log(args.email + " : " + args.publicKey)
//         new SimpleSchema({
//             email: { type: String },
//             publicKey: { type: String }
//         }).validate({ email: args.email, publicKey: args.publicKey })

//         var user = User.findOne({ email: args.email, publicKey: args.publicKey });
//         console.log(user)
//         if (null == user) {
//             res = { exist: false, user: null };
//         } else {
//             res = { exist: true, user: user };
//         }
//         // return res;
//         console.log(res)
//         // Return the results
//         fut['return'](res);

//         // Wait for async to finish before returning
//         // the result
//         return fut.wait();
//     }
// });

// const userLogin = {
//     name: 'user.login',
//     run({ email, publickey }) {
//         new SimpleSchema({
//             email: { type: String },
//             publicKey: { type: String }
//         }).validate({ email, publicKey })
//         const user = User.findOne({ email: email, publickey: publickey });
//         if (null == user) {
//             res = { exist: false, user: null };
//         } else {
//             res = { exist: true, user: user };
//         }
//         return res;
//     },

// };


// Meteor.methods({

//     [userLogin.name]: function (args) {
//         console.log(args.email+"\r\n"+ args.publicKey);
//         publicKeytemp = args.publicKey;
//         var charge = Meteor.wrapAsync(userLogin.run);
//         return charge({
//             email: args.email,
//             publickey:publicKeytemp
//         }, function (err, res) {
//             if (err && err.type === 'StripeCardError') {
//                 // The card has been declined
//                 throw new Meteor.Error("stripe-charge-error", err.message);
//             }

//             //Insert your 'on success' code here
//             return  (err,res);

//         });
//     }
// });
// Meteor.methods({
//     "user.login"(arg1) {

//       // Set up a future
//       var fut = new Future();

//       // This should work for any async method
//       setTimeout(function() {

//         // Return the results
//         fut['return'](message + " (delayed for 3 seconds)");

//       }, 3 * 1000);

//       // Wait for async to finish before returning
//       // the result
//       return fut.wait();
//     }
//   });

// Meteor.methods

// Meteor.methods({
//     [userLogin.name]: function (args) {
//         // userLogin.validate.call(this,args);
//         sync = Meteor.wrapAsync(userLogin.run);
//         return sync(this, args);
//     }
// })



