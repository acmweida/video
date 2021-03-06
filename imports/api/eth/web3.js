// // import Web3 from "web3"
// import Set from './setting.json'
// if (typeof web3 === 'undefined')
//     web3 = new Web3( Set.eth.address);
import Web3 from "Web3"
import conAdd from "./setting.json"
import AuthorModule from './abi/AuthorModule'
import AdminModule from './abi/AdminModule'
import UserModule from './abi/UserModule'
import Config from './setting.json'

class WEB3Util {


    // static addressPre = "0x"

    static web3 = typeof web3 != "undefined" ? web3 = new Web3(web3.currentProvider) : new Web3(
        new Web3.providers.HttpProvider(Config.eth.address)
    );

    static createVideo(address, videoHash, thubanail, pictureHash, title, callback) {
        const web3 = this.web3;
        const AuthorModuleAddr = conAdd.contracts["AuthorModule"];
        console.log(address);
        console.log(AuthorModule);
        var AuthorModuleCon = new web3.eth.Contract(
            AuthorModule.abi,
            AuthorModuleAddr,
            {
                from: +address
            }
        );
        console.log(AuthorModuleCon);
        // AuthorModuleCon.methods
        //     .publish(videoHash, thubanail, pictureHash, title)
        //     .send({ gas: 20000000000,from:"0x5570675EA889e2EEb1Bb4fA60C4d5F5348fA57af" }, function (error, res) {
        //         console.log(error);
        //         console.log(res);
        //         callback(error,res);
        //     });

        AuthorModuleCon.methods
            .publish(videoHash, thubanail, pictureHash, title)
            .send({ gas: 20000000000, from: address })
            .on('receipt', function (receipt) {
                console.log(receipt);
                var resId = receipt.events.LogNewResourceResID.returnValues.resDb_
                callback(null, { receipt, resId })
            })
            .on("error", function (error, receipt) {
                callback(error, receipt);
            })
    }


    static changeResourceWaive(address, _resid, waive, callback) {
        if (typeof web3 != "undefined") {
            web3 = new Web3(web3.currentProvider);
        } else {
            var web3 = new Web3(
                new Web3.providers.HttpProvider(Meteor.settings.eth.address)
            );
        }
        const AuthorModuleAddr = conAdd.contracts["AuthorModule"];
        console.log(address);
        console.log(AuthorModule);
        var AuthorModuleCon = new web3.eth.Contract(
            AuthorModule.abi,
            AuthorModuleAddr,
            {
                from: address
            }
        );
        console.log(AuthorModuleCon);
        AuthorModuleCon.methods
            .changeResourceWaive(_resid, waive)
            .send({ gas: 20000000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                callback(null, receipt)
            })
            .on("error", function (error, receipt) {
                callback(error, receipt);
            })
    }


    static getBalance(address, callback) {
        this.web3.eth.getBalance(address, callback)
    }

    static toWei(number, unit) {
        return this.web3.utils.toWei(number, unit)
    }

    static transfor(from, to, value) {
        return this.web3.eth.sendTransaction({
            from: from,
            to: to,
            value: value
        })
    }

    static buy(from, value, _resid, callback) {
        const UserModuleAddr = conAdd.contracts["UserModule"];
        console.log(value)
        const web3 = this.web3;
        console.log(from);
        console.log(UserModuleAddr);
        var UserModuleCon = new web3.eth.Contract(
            UserModule.abi,
            UserModuleAddr,
            {
                from: from
            }
        );
        console.log(UserModuleCon);
        UserModuleCon.methods
            .buy(_resid, value)
            .send({ gas: 2000000, from: from, value: value }, function (error, res) {
                console.log(error);
                console.log(res);
                callback(error, res);
            });
    }

    static hexToBytes(hax) {
        return this.web3.utils.hexToBytes(hax);
    }


    static findResourceInfo(from, resId, callback) {
        const AuthorModuleAddr = conAdd.contracts["AuthorModule"];

        console.log(AuthorModule);
        var AuthorModuleCon = new web3.eth.Contract(
            AuthorModule.abi,
            AuthorModuleAddr,
            {
                from: from
            }
        );
        console.log(AuthorModuleCon);
        AuthorModuleCon.methods
            .findResourceInfo(resId)
            .call({ gas: 20000000000 }, function (error, res) {
                console.log(error);
                console.log(res);
                callback(error, res);
            });
    }


    static findOrderIdByUser(from, callback) {
        const UserModuleAddr = conAdd.contracts["UserModule"];
        console.log(from)
        console.log(UserModule);
        var UserModuleCon = new web3.eth.Contract(
            UserModule.abi,
            UserModuleAddr
        );
        // console.log(UserModuleCon);
        UserModuleCon.methods
            .myOrders()
            .call({ from: from }, function (error, res) {
                callback(error, res)
            })

    }


    static mangeDestWhite(from, _contract, _target, _allow, callback) {
        const AdminModuleAddr = conAdd.contracts["AdminModule"];

        // if (typeof web3 != "undefined") {
        //     web3 = new Web3(web3.currentProvider);
        // } else {
        //     web3 = new Web3(
        //         new Web3.providers.HttpProvider(Config.eth.address)
        //     );
        // }
        var web3 = this.web3;

        console.log(AdminModule);
        var AdminModuleCon = new web3.eth.Contract(
            AdminModule.abi,
            AdminModuleAddr,
            {
                from: from
            }
        );
        console.log(AdminModuleCon);
        AdminModuleCon.methods
            .mangeDestWhite(_contract, _target, _allow)
            .send({ gas: 20000000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                var success = receipt.events.LogWhileChangedSuccess.returnValues.success
                callback(null, success)
            })
            .on("error", function (error, receipt) {
                callback(error, false);
            })
    }

    static updateResource(
        _sId, _ipfs, _thubanail, _cover, _title,callback
    ) {
        const AuthorModuleAddr = conAdd.contracts["AuthorModule"];

        console.log(AuthorModule);
        var AuthorModuleCon = new web3.eth.Contract(
            AuthorModule.abi,
            AuthorModuleAddr,
            {
                from: from
            }
        );
        console.log(AuthorModuleCon);
        AuthorModuleCon.methods
            .updateResource(_sId, _ipfs, _thubanail, _cover, _title)
            .send({ gas: 20000000000 })
            .on('receipt', function (receipt) {
                console.log(receipt);
                callback(null, receipt)
            })
            .on("error", function (error, receipt) {
                callback(error, receipt);
            });
    }

}



module.exports = WEB3Util;