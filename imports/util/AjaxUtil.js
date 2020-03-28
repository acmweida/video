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

    ajax(url, opent) {

        return this._request(url, opent)
    }

    _request(url, option) {
        // console.log(option.error);
        console.log(config.IPFS.api_base_url + url);

        var ajaxOption = option;

        ajaxOption.url = config.IPFS.api_base_url + url;
        ajaxOption.success = function (res) {
            const code = res.status.toString()
            console.log(res)
            if (code.startsWith('2')) {
                // resolve(res.data);
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
            if (option.reject)
                option.reject(error)
            const error_code = error.status
            // console.log(error_code)
            _show_error(error_code)
            return;
        };

        console.log(ajaxOption.type)
        $.ajax(ajaxOption)

        // console.log(config.IPFS.api_base_url + url)
        /*     HTTP.call(method, config.api_base_url + url, header, {
                 params: params,
                 data: data,
                 content: content
             }, function (err, res) {
                 if (err) {
                     console.log(err)
                     if (reject)
                         reject()
                     const error_code = err.data.code
                     // console.log(error_code)
                     this._show_error(error_code)
                     return;
                 }
                 const code = res.statusCode.toString()
                 console.log(res)
                 if (code.startsWith('2')) {
                     resolve(res.data);
     
                 }
                 else {
                     if (reject)
                         reject()
     
                     const error_code = res.data.code
                     //    console.log(error_code)
                     this._show_error(error_code)
                 }
             })*/
    }

     _show_error(error_code) {
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

}

module.exports = Ajaxutil;
// export { Ajaxutil }
