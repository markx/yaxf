import {remote} from 'electron'
import {request} from 'request'

export function storeCookies() {
        remote.getCurrentWebContents().session.cookies.get({domain: '.qq.com'}, function(error, cookies) {
            if (error) {
                console.error(error);
                return;
            }

            let cookieString = cookies.map((c) => {
                return c.name + '=' + c.value;
            }).join(';');
            console.log('cookieString:', cookieString);
            localStorage.setItem('cookieString', cookieString);

            let cookiesWithURL = cookies.map((c) => {
                c.url = 'http://lixian.qq.com/';
                return c;
            });
            localStorage.setItem('cookies', JSON.stringify(cookiesWithURL));
        });

}

export function loadCookies() {
    let savedCookies = JSON.parse(localStorage.getItem('cookies'));
    if (!savedCookies) { return; }

    let ses = remote.getCurrentWebContents().session;
    savedCookies.forEach((c) => {
        ses.cookies.set({ url: c.url, name: c.name, value: c.value}, () => {});
    });

}

export function fetchTasks() {
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

export function addTask() {

}

