import {baseUrl} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if(type === 'GET'){
        let str = '';
        //拼接字符串
        Object.keys(data).forEach((key) => {
            str += key + '=' + data[key] + '&';
        })

        if(str !== ''){
            str = str.substr(0, str.lastIndexOf('&'))
            url = url + '?' + str
        }
    }

    if(window.fetch && method === 'fetch'){
        let requestConfig = {
            method: type,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            mode: 'cors',   //跨域
            cache: 'reload' //是否使用缓存
        }

        if(type === 'POST'){
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        try{
            const response = await fetch(url, requestConfig)
            const responseJson = await response.json()
            return responseJson
        }catch(err){
            throw new Error(err)
        }

    }else{          //浏览器不支持fetch时使用XHR实现ajax
        return new Promise((resolve, reject) => {
            let xhr
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest()
            }else{
                xhr = new ActiveXObject()
            }

            let sendData = null
            if(type === 'POST'){
                sendData = JSON.stringify(data)
            }

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        let obj = xhr.responseText
                        if(typeof obj !== 'object'){
                            obj = JSON.parse(obj)
                        }
                        resolve(obj)
                    }else{
                        reject(xhr)
                    }
                }
            }

            xhr.open(type, url, true)
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
            xhr.send(sendData)
        })
    }
}