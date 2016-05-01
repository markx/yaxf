import {remote} from 'electron'
import request from 'request'

export function storeCookies() {

    return new Promise((resolve, reject) => {
        remote.getCurrentWebContents().session.cookies.get({domain: '.qq.com'}, function(error, cookies) {
            if (error) {
                console.error(error);
                reject(error)
                return
            }

            let cookieString = cookies.map((c) => {
                return c.name + '=' + c.value;
            }).join(';');
            localStorage.setItem('cookieString', cookieString);

            let cookiesWithURL = cookies.map((c) => {
                c.url = 'http://' + c.domain
                return c;
            });
            localStorage.setItem('cookies', JSON.stringify(cookiesWithURL));

            resolve()
        })
    })

}

export function clearCookieStorage() {
    localStorage.removeItem('cookies')
    localStorage.removeItem('cookieString')
}

export function loadCookies() {
    let savedCookies = JSON.parse(localStorage.getItem('cookies'));
    if (!savedCookies) {
        return Promise.resolve('no cookie stored')
    }
    let ses = remote.getCurrentWebContents().session;

    return Promise.all(savedCookies.map(c => {
        return new Promise((resolve, reject) => {
            console.log('setting cookie')
            ses.cookies.set({ url: c.url, name: c.name, value: c.value}, (error) => {
                if (error) {
                    console.log('error: set cookie: ', c)
                    resolve(c)
                } else {
                    resolve()
                }
            })
        })
    }))
}

export function clearSession() {
    let ses = remote.getCurrentWebContents().session;
    console.log('clear session')
    localStorage.removeItem('cookies')
    localStorage.removeItem('cookieString')

    return new Promise(resolve => {
        ses.clearStorageData({
            storages: ['cookies']
        }, resolve)
    })
}

export function fetchTasks() {
    console.log('fetching task')

    return fetch('http://lixian.qq.com/handler/lixian/get_lixian_status.php', {
        credentials: 'include'
    }).then(response => {
        if (!response.ok) throw response
        return response.json()
    }).then(json => {
        if (json.ret != 0) throw json
        return json
    })
}

function modifyDownloadURL(url) {
    return url
    .replace('xflx.store.cd.qq.com:443', 'xfcd.ctfs.ftn.qq.com')
    .replace('xflx.sz.ftn.qq.com:80', 'sz.disk.ftn.qq.com')
    .replace('xflx.cd.ftn.qq.com:80', 'cd.ctfs.ftn.qq.com')
    .replace('xflxsrc.store.qq.com:443', 'xfxa.ctfs.ftn.qq.com')
    .replace('xflx.tjctfs.ftn.qq.com:80', 'tj.ctfs.ftn.qq.com')
    .replace('xflx.tjbtfs.ftn.qq.com:80', 'tj.ctfs.ftn.qq.com')
    .replace('xflx.store.sh.qq.com:443', 'xfsh.ctfs.ftn.qq.com')
    .replace('xflx.sh.ftn.qq.com:80', 'sh.ctfs.ftn.qq.com')
    .replace('xflx.hz.ftn.qq.com:80', 'hz.ftn.qq.com')
    .replace('xflx.shbtfs.ftn.qq.com:80', 'sh-btfs.yun.ftn.qq.com')
    .replace('xflx.xa.ftn.qq.com:80', 'xa.ctfs.ftn.qq.com')
}

export function fetchTaskURL(hash, filename) {
    let url = 'http://lixian.qq.com/handler/lixian/get_http_url.php';
    let data = `hash=${hash}&filename=${encodeURIComponent(filename)}`;

    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: data
    }).then((response) => {
        if (!response.ok) throw response
        return response.json()
    }).then(json => {
        if (json.ret != 0) throw json

        json.data.com_url = modifyDownloadURL(json.data.com_url)
        return json.data
    });
}

export function addURLTask(url, fileName, fileSize) {
    return new Promise((resolve, reject) => {
        request.post({
            url:'http://lixian.qq.com/handler/lixian/add_to_lixian.php',
            headers: {
                // Referer is required
                Referer: 'http://lixian.qq.com/main.html',
                Cookie: localStorage.getItem('cookieString')
            },
            form: {
                down_link: url,
                filesize: fileSize,
                filename: fileName
            }},
            (err,httpResponse,body) => {
                console.log(body)

                if (err) {
                    reject(err)
                    return
                }

                let json = JSON.parse(body)
                if (json.ret != 0)  {
                    reject(json)
                    return
                }
                let failedFiles = json.data.filter((data) => (data.errcode != 0))
                if (failedFiles.length > 0) {
                    reject(failedFiles)
                    return
                }
                resolve(json.data)
            })
    })
}

export function removeTask(ids) {
    let url = 'http://lixian.qq.com/handler/lixian/del_lixian_task.php'
    let data = `mids=${ids.join(',')}`
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: data
    }).then(response => {
        if (!response.ok) throw response
        return response.json()
    }).then(json => {
        if (json.ret != 0) throw json
        return json.data
    });
}

export function redirectToLogin() {
    document.location.hash = '#/login'
}

