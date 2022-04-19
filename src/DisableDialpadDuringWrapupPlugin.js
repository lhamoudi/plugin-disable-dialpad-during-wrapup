import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import DialpadButton from './components/DialpadButton';

const PLUGIN_NAME = 'DisableDialpadDuringWrapupPlugin';

export default class DisableDialpadDuringWrapupPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {

    // Custom dialpad button that is disabled until all voice tasks are wrapped
    flex.MainHeader.Content.add(
      <DialpadButton key="new-dialpad-button" />,
      { align: 'end', sortOrder: 1 }
    );
    flex.MainHeader.Content.remove("dialpad-button");
  }
}
