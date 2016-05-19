import React from 'react'
import {connect} from 'react-redux'

import { Modal, Alert, Panel } from 'react-bootstrap'


const MessageBoxStyle = {
    margin: 0,
    textAlign: 'center',
}

class MessageOverlay extends React.Component {

    render() {
        let messageNode
        if (this.props.isError) {
            messageNode = (
                <Alert style={MessageBoxStyle} bsStyle='danger'>
                    {this.props.text}
                </Alert>
            )
        } else {
            messageNode = (
                <Panel style={MessageBoxStyle}>
                    {this.props.text}
                </Panel>
            )
        }

        return (
            <div>
                <Modal
                    show={this.props.show}
                    backdrop='static'
                    bsSize='small'
                >
                    {messageNode}
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ...state.messageOverlay
    }
}

export default connect(mapStateToProps)(MessageOverlay)
