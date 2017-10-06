import { createStore, bindActionCreators, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import deepEqual from 'deep-equal';

import snakeEatEggs from 'reducers/components/game/snakeEatEggs';

import snakeActionCreators from 'actions/game/snakeEatEggs/snake';

import eggsActionCreators from 'actions/game/snakeEatEggs/eggs';

import boundaryActionCreators from 'actions/game/snakeEatEggs/boundary';

import snakeEatEggsActionCreators from 'actions/game/snakeEatEggs/snakeEatEggs.js';

import {
  translateEggs,
  correctionClean,
  boundaryDetection,
  collisionDetection,
  selfEatingDetection,
} from 'middlewares/game/snakeEatEggs';

import Status from '../GluttonousSnake/Status';

import Rtl from './Rtl';

import Eggs from './Eggs';

import Snake from './Snake';

import Background from './Background';

const Sym = Object.freeze({
  STATUS: Symbol('status'),
  BOUNDARY: Symbol('boundary'),
});

/**
 * @class
 */
class SnakeEatEggs {
  /**
   * @constructor
   */
  constructor({ context=null, boundary=null, actions=null }) {
    this.initStore();
    this.initActions(actions);

    this.initInstances(context);
    this.bindSubscribe();

    this.boundary = boundary;
  }

  /**
   * @static
   * @method
   */
  initStore() {
    const middleware = [
      translateEggs.bind(this),
      correctionClean.bind(this),
      boundaryDetection.bind(this),
      collisionDetection.bind(this),
      selfEatingDetection.bind(this),
    ];
    const store = createStore(
      snakeEatEggs,
      composeWithDevTools(
        // other store enhancers if any
        applyMiddleware(...middleware),
      ),
    );
    this.store = store;
  }

  initActions(actions={}) {
    const {
      store: {
        dispatch,
      },
    } = this;
    const innerActions = bindActionCreators({
      ...eggsActionCreators,
      ...snakeActionCreators,
      ...boundaryActionCreators,
      ...snakeEatEggsActionCreators,
    }, dispatch);
    this.actions = {
      ...actions,
      ...innerActions,
    };
  }

  /**
   * @method
   */
  bindSubscribe() {
    const {
      store,
      eggs,
      snake,
    } = this;
    store.subscribe(() => {
      const state = store.getState().toJS();
      eggs.mapStateToProps(state);
      snake.mapStateToProps(state);
    });
  }

  /**
   * @method
   */
  initInstances(context={}) {
    const {
      actions,
    } = this;
    this.snake = new Snake({ context, actions });
    this.eggs = new Eggs({ context, actions });
    this.background = new Background({ context, actions });
    this.status = Status.PENDING;
  }

  /**
   * @method
   */
  processStatus(status) {
    switch (status) {
      case Status.PENDING:
        if (this.status === Status.END) {
          this.actions.resetSnakeEatEggs();
          this.eggs.translate();
          this.actions.changeGameStatus({ status: Status.UNDERWAY });
        }
        break;
    }
  }

  /**
   * @method
   */
  set status(status) {
    if (!deepEqual(this.status, status)) {
      const {
        snake,
        eggs,
      } = this;
      snake.status = status;
      eggs.status = status;

      this.processStatus(status);
      this[Sym.STATUS] = status;
    }
  }

  /**
   * @method
   */
  get status() {
    return this[Sym.STATUS];
  }

  /**
   * @method
   */
  set boundary(boundary) {
    if (!deepEqual(this.boundary, boundary)) {
      this[Sym.BOUNDARY] = boundary;
      this.actions.resizeBoundary(boundary);
    }
  }

  /**
   * @method
   */
  get boundary() {
    return this[Sym.BOUNDARY];
  }
}

export default SnakeEatEggs;
