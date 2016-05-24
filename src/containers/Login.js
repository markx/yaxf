const React = require('react');

import {clearCookieStorage} from '../utils/api'

module.exports = React.createClass({

    componentDidMount () {
        clearCookieStorage()

        let webview = this.refs.webview
        webview.addEventListener('will-navigate', (evt, url) => {
            webview.addEventListener('did-get-response-details', (evt) => {
                console.log(evt.type, evt)
                if (evt.newURL == 'http://lixian.qq.com/handler/lixian/do_lixian_login.php') {
                    document.location.hash = '#/'
                }
            })

            console.log('successful login!');
        })
    },

    render () {
        return (
            <div style={{
                width: '100vw',
                height: '100vh'

            }}
        >
            <webview
                ref="webview"
                src="http://ui.ptlogin2.qq.com/cgi-bin/login?uin=&appid=567008010&f_url=loginerroralert&hide_title_bar=1&style=1&s_url=http%3A//lixian.qq.com/main.html&lang=0&enable_qlogin=1&css=http%3A//imgcache.qq.com/ptcss/r1/txyjy/567008010/login_mode_new.css"
                autosize="on"
                style= {{
                    width: '100%',
                    height: '100%'
                }}
                    />
                </div>

                // <webview ref="webview" src="http://lixian.qq.com/login.html?opt=open_login"  ></webview>
                // <webview ref="webview" src="http://ui.ptlogin2.qq.com/cgi-bin/login?appid=567008010&s_url=http%3A//lixian.qq.com/main.html&lang=0&enable_qlogin=1&style=1" ></webview>
        )
    }
})
