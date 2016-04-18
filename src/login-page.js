let React = require('react');

module.exports = React.createClass({
    saveCookie() {
        let webview = this.refs.webview;
        webview.getWebContents().session.cookies.get({domain: '.qq.com'}, function(error, cookies) {
            if (error) {
                console.error(error);
                return;
            }

            let cookieString = cookies.map((c) => {
                return c.name + '=' + c.value;
            }).join(';');
            console.log(cookieString);
            localStorage.setItem('cookieString', cookieString);

            let cookiesWithURL = cookies.map((c) => {
                c.url = 'http://lixian.qq.com/';
                return c;
            });
            localStorage.setItem('cookies', JSON.stringify(cookiesWithURL));
        });
    },

    componentDidMount () {
        let webview = this.refs.webview;

        webview.addEventListener('will-navigate', (evt, url) => {
            webview.addEventListener('did-get-response-details', (evt) => {
                console.log(evt.type);
                console.log(evt);
                if (evt.newURL == 'http://lixian.qq.com/handler/lixian/get_lixian_items.php') {
                    this.saveCookie();
                    document.location.hash = '#/';
                }
            });

            console.log('successful login!');
        });
    },

    render () {
        return (
            <webview ref="webview"
                src="http://ui.ptlogin2.qq.com/cgi-bin/login?appid=567008010&s_url=http%3A//lixian.qq.com/main.html&lang=0&enable_qlogin=1&style=1"
                style= {{
                    display: 'inline-flex',
                    width: '100%',
                    height: '100%'
                }}
            ></webview>
            // <webview ref="webview" src="http://lixian.qq.com/login.html?opt=open_login"  ></webview>
        );
    }
})
