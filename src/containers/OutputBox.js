const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#content');

const OutputBox = React.createClass({
    getInitialState() {
        return {output: []};
    },

    afterOpenModal() {
        this.updateOutput();
    },

    updateOutput() {
        let tasksToOutput = this.props.tasks.filter((task) => {
            return !!task.isChecked && task.comp_size == task.file_size;
        });


        for(let task of tasksToOutput) {
            this.getURL(task.hash, task.file_name).then((data) => {
                if (data.ret != 0) { return; }

                let output = this.state.output;
                let newOutput = output.concat({ filename: task.file_name, cookie: data.data.com_cookie, url: data.data.com_url})

                this.setState({output: newOutput});
            })
        }

    },

    getURL(hash, filename) {
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
            return response.json();
        });
    },


    outputToCommands() {
        let commandList = this.state.output.map((task) => {
            return `aria2c -c -s10 -x10 --file-allocation=falloc -o "${task.filename}" --header "Cookie: FTN5K=${task.cookie}" "${task.url}"`;
        });
        return  commandList.join('\n');
    },

    handleModalClosing() {
        this.props.closeModal();
        this.setState({output: []});
    },

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.openModal}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.handleModalClosing}
                    >
                        <button onClick={this.props.closeModal}>X</button>
                        <textarea value={this.outputToCommands()} />
                </Modal>
            </div>
        );
    }
});

module.exports = OutputBox;
