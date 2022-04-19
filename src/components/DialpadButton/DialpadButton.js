import React from 'react';
import { connect } from 'react-redux';

import {   
  Actions,
  IconButton,
  TaskHelper, 
  withTheme 
} from '@twilio/flex-ui';


class DialpadButton extends React.PureComponent {

  render() {
    const { theme, isLiveVoiceConnection, hasIncomingCallReservation, hasWrappingVoiceTask } = this.props;

    // We've adapted the button to also disable whenever there's a wrapping voice task too.
    return (
        <IconButton
          themeOverride={theme.MainHeader.Button}
          icon="Dialpad"
          onClick={this.onDialpadClick}
          disabled={isLiveVoiceConnection || hasWrappingVoiceTask || hasIncomingCallReservation}
        />
    );
  }

  onDialpadClick() {
    Actions.invokeAction("ToggleOutboundDialer");
  }
}


const mapStateToProps = (state) => {

  const workerTasks = state?.flex?.worker?.tasks || [];
  const hasWrappingVoiceTask = [...workerTasks.values()]
    .some(task => TaskHelper.isCallTask(task) && TaskHelper.isInWrapupMode(task));

  return {
    hasWrappingVoiceTask
  };
}

export default connect(mapStateToProps)(withTheme(DialpadButton));
