import HTTP from 'http'
import config from '../setting/setting'

const tips = {
    500: 'RPC endpoint returned an error',
    404: 'RPC endpoint doesn’t exist',
    403: 'RPC call forbidden',
    400: "Malformed RPC, argument type error, etc",

}
// # 解构
class Ajaxutil {


    constructor() {
        
    }

    static ajax(url, opent) {

        return this._request(url, opent)
    }

    static _request(url, option) {

       var _show_error = function (error_code) {
            console.log(error_code)
            if (!error_code) {
                error_code = 1
            }
            const tip = tips[error_code] ? tip[error_code] : tips[1];
            toastr.error(
                tip,
                "ipfs错误"
            )
        }
        // console.log(option.error);
        console.log(config.IPFS.api_base_url + url);

        var ajaxOption = option;

        ajaxOption.url = config.IPFS.api_base_url + url;
        ajaxOption.success = function (res) {
            const code = res.status.toString();
            if (code.startsWith('2')) {
                option.resolve(res.responseText);
            }
            else {
                if (option.reject)
                    option.reject(res)

                const error_code = res.data.code
                //    console.log(error_code)
                _show_error(error_code)
            }
        };
     
        ajaxOption.error = function (error) {
            console.log(error)
            const code = error.status.toString();
            if (code.startsWith('2')) {
                option.resolve(error.responseText);
            }
            else {
                _show_error(error_code)
                if (option.reject)
                    option.reject(res)
                const error_code = res.data.code
                //    console.log(error_code)
                _show_error(error_code)
            }

            // console.log(error_code)
         
            return;
        };
        $.ajax(ajaxOption)

        
    }

 

}

module.exports = Ajaxutil;
// export { Ajaxutil }
