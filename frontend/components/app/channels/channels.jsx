import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Channel from './channel';
import Modal from 'react-modal';
import CreateChannelForm from './create_channel_form';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.removeServer = this.removeServer.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.serverId) {
      this.props.fetchChannels(this.props.match.params.serverId).then((action) => this.props.history.push(`/channels/${Object.values(action.channels)[0].server_id}/${Object.values(action.channels)[0].id}`));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.server.id != this.props.match.params.serverId) {
      this.props.fetchChannels(this.props.match.params.serverId).then((action) => this.props.history.push(`/channels/${Object.values(action.channels)[0].server_id}/${Object.values(action.channels)[0].id}`));
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.removeChannelErrors();
  }

  updateContent(type) {
    this.setState({ content: type });
  }

  removeServer() {
    this.props.deleteServer(this.props.server.id).then(() => (
      this.props.history.push('/channels/@me')
    ));
  }

  render() {
    const channels = this.props.channels.map((channel, idx) => {
      return <Channel server={this.props.server} channel={channel} key={idx} />;
    });

    return (
      <div className="right-main">
        <div className="channels">
          <div className="channel-header">
            <span className="server-name">{this.props.server.name}</span>
            <svg width="18" height="18" className="leave-server-button" onClick={this.removeServer}><g fill="none" fillRule="evenodd"><path d="M0 0h18v18H0"></path><path stroke="#FFF" d="M4.5 4.5l9 9" strokeLinecap="round"></path><path stroke="#FFF" d="M13.5 4.5l-9 9" strokeLinecap="round"></path></g></svg>
          </div>
          <div className="channel-scroll-wrapper">
            <div className="channel-overflow-container">
              <div className="channel-list">
                <div className="text-channels-label">
                  <div>
                    <button className="text-channels-button" onClick={this.handleOpenModal}>+</button>
                    <h3 id="text-channels">Text Channels</h3>
                  </div>
                </div>
                {channels}
              </div>
            </div>
          </div>
          <div className="user-actions">
            <div className="icon-name-wrapper">
              <div className="user-icon" style={{ backgroundImage: `url(${this.props.currentUser.image_url})` }}></div>
              <div className="actions-username">{this.props.currentUser.username}</div>
            </div>
            <button className="gear" onClick={() => this.props.logout()}>
              <svg name="Gear" width="18" height="18" viewBox="0 0 18 18">
                <path fill="currentColor" d="M7.15546853,6.47630098e-17 L5.84453147,6.47630098e-17 C5.36185778,-6.47630098e-17 4.97057344,0.391750844 4.97057344,0.875 L4.97057344,1.9775 C4.20662236,2.21136254 3.50613953,2.61688993 2.92259845,3.163125 L1.96707099,2.61041667 C1.76621819,2.49425295 1.52747992,2.46279536 1.30344655,2.52297353 C1.07941319,2.58315171 0.88846383,2.73002878 0.77266168,2.93125 L0.117193154,4.06875 C0.00116776262,4.26984227 -0.0302523619,4.50886517 0.0298541504,4.73316564 C0.0899606628,4.9574661 0.236662834,5.14864312 0.437644433,5.26458333 L1.39171529,5.81583333 C1.21064614,6.59536289 1.21064614,7.40609544 1.39171529,8.185625 L0.437644433,8.736875 C0.236662834,8.85281521 0.0899606628,9.04399223 0.0298541504,9.2682927 C-0.0302523619,9.49259316 0.00116776262,9.73161606 0.117193154,9.93270833 L0.77266168,11.06875 C0.88846383,11.2699712 1.07941319,11.4168483 1.30344655,11.4770265 C1.52747992,11.5372046 1.76621819,11.5057471 1.96707099,11.3895833 L2.92259845,10.836875 C3.50613953,11.3831101 4.20662236,11.7886375 4.97057344,12.0225 L4.97057344,13.125 C4.97057344,13.6082492 5.36185778,14 5.84453147,14 L7.15546853,14 C7.63814222,14 8.02942656,13.6082492 8.02942656,13.125 L8.02942656,12.0225 C8.79337764,11.7886375 9.49386047,11.3831101 10.0774016,10.836875 L11.032929,11.3895833 C11.2337818,11.5057471 11.4725201,11.5372046 11.6965534,11.4770265 C11.9205868,11.4168483 12.1115362,11.2699712 12.2273383,11.06875 L12.8828068,9.93270833 C12.9988322,9.73161606 13.0302524,9.49259316 12.9701458,9.2682927 C12.9100393,9.04399223 12.7633372,8.85281521 12.5623556,8.736875 L11.6082847,8.185625 C11.7893539,7.40609544 11.7893539,6.59536289 11.6082847,5.81583333 L12.5623556,5.26458333 C12.7633372,5.14864312 12.9100393,4.9574661 12.9701458,4.73316564 C13.0302524,4.50886517 12.9988322,4.26984227 12.8828068,4.06875 L12.2273383,2.93270833 C12.1115362,2.73148712 11.9205868,2.58461004 11.6965534,2.52443187 C11.4725201,2.46425369 11.2337818,2.49571128 11.032929,2.611875 L10.0774016,3.16458333 C9.49400565,2.61782234 8.79351153,2.2117896 8.02942656,1.9775 L8.02942656,0.875 C8.02942656,0.391750844 7.63814222,6.47630098e-17 7.15546853,6.47630098e-17 Z M8.5,7 C8.5,8.1045695 7.6045695,9 6.5,9 C5.3954305,9 4.5,8.1045695 4.5,7 C4.5,5.8954305 5.3954305,5 6.5,5 C7.03043298,5 7.53914081,5.21071368 7.91421356,5.58578644 C8.28928632,5.96085919 8.5,6.46956702 8.5,7 Z"
                  transform="translate(2.5 3)"></path>
              </svg>
            </button>
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgb(0, 0, 0, 0.85)',
              zIndex: 99,
            },
            content: {
              height: '382px',
              width: '440px',
              padding: 0,
              borderRadius: '5px',
              margin: 'auto',
              boxShadow: '0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2)',

              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#36393f',
              border: 'none'
            }
          }}
        >
          <CreateChannelForm
            server={this.props.server}
            createChannel={this.props.createChannel}
            closeModal={this.handleCloseModal}
            errors={this.props.errors} 
            />
        </Modal>
      </div>
    )
  }
}

export default Channels;