import Ajaxutil from '../../util/AjaxUtil'


api_name = {
    "addFile": "/api/v0/add"
}

class IpfsUtil {

    static upFile(option) {
        console.log(option);
        console.log(api_name.addFile);
        Ajaxutil.ajax(api_name.addFile,option)
    }
}

//  ipfsUtil = new IpfsUtil();


module.exports = IpfsUtil;