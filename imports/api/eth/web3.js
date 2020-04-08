// // import Web3 from "web3"
// import Set from './setting.json'
// if (typeof web3 === 'undefined')
//     web3 = new Web3( Set.eth.address);
import Web3 from "Web3"
import conAdd from "./setting.json"
import AuthorModule from './abi/AuthorModule'

class WEB3Util {

    static createVideo(address,videoHash,thubanail,pictureHash,title,callback) {
        if (typeof web3 != "undefined") {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(
                new Web3.providers.HttpProvider(Meteor.settings.eth.address)
            );
        }
        const AuthorModuleAddr =  conAdd.contracts["AuthorModule"];
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
            .publish(videoHash, thubanail, pictureHash, title)
            .call({ gas: 20000000000 }, function (error, res) {
                console.log(error);
                console.log(res);
                callback(error,res);
            });
    }


    static changeResourceWaive(address,waive,callback) {
        if (typeof web3 != "undefined") {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(
                new Web3.providers.HttpProvider(Meteor.settings.eth.address)
            );
        }
        const AuthorModuleAddr =  conAdd.contracts["AuthorModule"];
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
            .changeResourceWaive(_resid,waive)
            .call({ gas: 20000000000 }, function (error, res) {
                console.log(error);
                console.log(res);
                callback(error,res);
            });
    }


}



module.exports = WEB3Util;