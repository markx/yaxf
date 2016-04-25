const React = require('react');
const Modal = require('react-modal');
const request = require('request');
Modal.setAppElement('#content');

const NewTaskBox = React.createClass({
    getInitialState() {
        return {url: '', taskInfo: {fileName: '', fileSize: 0}}
    },

    handleModalClosing() {
        this.props.closeModal();
        this.setState({
            url: '',
            taskInfo: {}
        });
    },

    handleUrlChange(event) {
        let url = event.target.value;
        this.setState({ url: url });

        this.parseURL(url);
    },

    handleTaskNameChange(event) {
        let fileSize = this.state.taskInfo.fileSize;
        let newName = event.target.value;
        this.setState({
            taskInfo: { fileName: newName, fileSize }
        });
    },

    handleSubmit() {
        request.post({
            url:'http://lixian.qq.com/handler/lixian/add_to_lixian.php',
            headers: {
                Referer: 'http://lixian.qq.com/main.html',
                Cookie: localStorage.getItem('cookieString')
            },
            form: {
                down_link: this.state.url,
                filesize: this.state.taskInfo.fileSize,
                filename: this.state.taskInfo.fileName
            }},
            function(err,httpResponse,body) {
                console.log(body);

                if (err) {
                    console.log(err);
                    return;
                }

                if (body.ret != 0 || body.ret.errorcode != 0) {
                    return;
                }

                this.handleModalClosing();
                this.props.onNewTask();
            });
    },

    parseURL(url) {
        if (!url) { return; }
        if (url.startsWith('ed2k', 0)) {
            let sep_arr = url.split('|');
            if(sep_arr.length >= 4){
                let fileName = decodeURI(sep_arr[2]);
                let fileSize = sep_arr[3];
                this.setState({
                    taskInfo: { fileName, fileSize }
                });
            } else {
                console.log('bad ed2k url');
            }
        }
    },

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.openModal}
                    onRequestClose={this.handleModalClosing}
                >
                    <input type="text" value={this.state.url} onChange={this.handleUrlChange} />
                    <input type="text" value={this.state.taskInfo.fileName} onChange={this.handleTaskNameChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </Modal>
            </div>
        );
    }
});

module.exports = NewTaskBox;
