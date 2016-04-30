const React = require('react');
const Modal = require('react-modal');
Modal.setAppElement('#content');

import {connect} from 'react-redux'
const request = require('request');

import {updateTasks, hideNewTaskBox} from '../actions'
import * as api from '../utils/api'

const NewTaskBox = React.createClass({
    getInitialState() {
        return {url: '', fileName: '', fileSize: 0}
    },


    handleModalOpen() {
        this.setState({showNewTaskBox: true})
    },

    handleModalClosing() {
        this.setState({
            showNewTaskBox: false,
            url: '',
            fileName: '',
            fileSize: 0
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
        let {url, fileName, fileSize} = this.state
        api.addURLTask(url, fileName, fileSize)
        .then(() => {
            this.handleModalClosing()
            this.props.updateTasks()
        }).catch((error) => {
            console.log(error)
        })
    },

    parseURL(url) {
        if (!url) { return; }
        if (url.startsWith('ed2k', 0)) {
            let sep_arr = url.split('|');
            if (sep_arr.length >= 4) {
                let fileName = decodeURI(sep_arr[2]);
                let fileSize = sep_arr[3];
                this.setState({ fileName, fileSize } )
            } else {
                console.log('bad ed2k url');
            }
        }
    },

    render() {
        return (
            <div style={{display: "inline-block"}}
            >
                <button onClick={this.handleModalOpen}>Add</button>
                <Modal
                    isOpen={this.state.showNewTaskBox}
                    onRequestClose={this.handleModalClosing}
                >
                    <input type="text" value={this.state.url} onChange={this.handleUrlChange} />
                    <input type="text" value={this.state.fileName} onChange={this.handleTaskNameChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </Modal>
            </div>
        );
    }
});


const mapDispatchToProps = {
    updateTasks,
}

export default connect(null, mapDispatchToProps)(NewTaskBox)
