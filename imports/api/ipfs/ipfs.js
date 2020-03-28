import Ajaxutil from '../../util/AjaxUtil'


api_name = {
    "addFile": "/api/v0/add"
}

class IpfsUtil extends Ajaxutil {
    
    constructor() {
        super();
    }

    upFile(option) {
        console.log(option);
        console.log(api_name.addFile);
       super.ajax(api_name.addFile,option)
    }
}

//  ipfsUtil = new IpfsUtil();


export { IpfsUtil };