import myJsonp from 'jsonp'
export default function jsonp(url, data, option) {
    url += (url.endsWith('?')?'&':"?") + format(data);
    return new Promise((resolve,reject) => {
        myJsonp(url, option, (err,data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}
function format(data) {
    let url = '';
    for (var i in data) {
        let value = data[i] !== undefined ? data[i] : '';
        url+=`&${i}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : '';
}