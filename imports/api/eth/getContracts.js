import Set from './setting.json'
const getContracts = {
    name:'getContract',
    validate(args) {
        new SimpleSchema({
            contractName:{type:String}
        }).validate(args)
    },
    run(args) {
      //  if (args.contractName === null) {
            return Set.contracts;
        //}
        return Set.contracts[args.contractName];
    },
    call(callback) {
        const options = {
            returnLoginbValue: true,
            throwGetAddressExecption: true
        }
        Meteor.apply(this.name, options, callback);
    }
}


Meteor.methods({
    [getContracts.name]: function (args) {
        getContracts.validate.call(this,args);
        return getContracts.run.call(this,args);
    }
})