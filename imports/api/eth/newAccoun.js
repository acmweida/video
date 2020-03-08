export const userCreate = {
    name: 'user.newAccount',
    run() {
        //console.log(web3);
        return web3.eth.accounts.create(web3.utils.randomHex(32));
    },
    call(callback) {
        const options = {
            returnLoginbValue: true,
            throwLoginExecption: true
        }
        Meteor.apply(this.name, options, callback);
    }

};




Meteor.methods({
    [userCreate.name]: function () {
        return userCreate.run.call();
    }
    
})