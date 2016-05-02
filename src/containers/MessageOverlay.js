import React from 'react'
import {connect} from 'react-redux'

import Modal from 'react-modal'
Modal.setAppElement('#content');


class MessageOverlay extends React.Component {

    render() {
        return (
            <div>
                <Modal
                    isOpen = {this.props.show}
                >
                    <div>
                        {this.props.text}
                    </div>
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
