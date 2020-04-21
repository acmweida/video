import WEB3Util from './web3'
import Config  from './setting.json'
export const WhiteManage = {
    name: 'user.WhiteAuto',
    validate(args) {
        new SimpleSchema({
            address: { type: String },
            _allow:{type:Boolean}
        }).validate(args)
    },
    run({ address,_allow }) {
        // console.log(publicKey)s
        var CenterAddres = Config.contracts['CenterControl']
        var sysnc =  Meteor.wrapAsync(WEB3Util.mangeDestWhite);
        var res = "";
        callback = function(err,res) {
            
        };
        sysnc("0xbd9372CC2A4162421C75AF47B60F38DFC3f9A69C",CenterAddres,address,_allow,callback)
        
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
    [WhiteManage.name]: function (args) {
        WhiteManage.validate.call(this, args);
        return WhiteManage.run.call(this, args);
    }
})