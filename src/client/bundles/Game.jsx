import React from 'react';

import Bundle from 'client/components/common/Bundle';

import loadGameRoute from 'bundle-loader?lazy!isomerism/routes/Game';

class Game extends React.PureComponent {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @method
   */
  render() {
    return (
      <Bundle load={loadGameRoute}>
        {(GameRoute) => <GameRoute {...this.props}/>}
      </Bundle>
    );
  }
}

export default Game;
