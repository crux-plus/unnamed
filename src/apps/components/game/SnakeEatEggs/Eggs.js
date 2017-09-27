/**
 * @class
 */
class Eggs {
  /**
   * @constructor
   */
  constructor(options = { size: 10, color: '#000' }) {
    const defaultOptitons = Eggs.getDefaultOptions();
    const instances = Eggs.getInstances();
    Object.assign(this, defaultOptitons, options, instances);

    const {
      size,
    } = this;
  }

  /**
   * @method
   */
  static getDefaultOptions() {
    return {
      size: 10,
      color: '#000',
      context: null,
   };
  }

  /**
   * @static
   * @method
   */
  static getInstances() {
    return {
      location: {
        x: 0,
        y: 0,
      },
    };
  }

  /**
   * @method
   */
  mapStateToProps(state) {
    this.clear();
    const {
      eggs: {
        size,
        location: {
          x,
          y,
        },
      },
    } = state.toJS();
    this.setSize(size);
    this.setLocation({ x, y });
    this.draw();
  }

  /**
   * @method
   */
  lay() {
    this.actions.createEgg();
  }

  /**
   * @method
   */
  setSize(size) {
    if (this.size !== size) {
      this.size = size;
    }
  }

  /**
   * @method
   */
  setLocation({ x, y }) {
    this.location = {
      x,
      y,
    };
  }

  /**
   * @method
   */
  reset() {
    this.clear();
    this.lay();
  }

  /**
   * @method
   */
  draw() {
    const {
      size,
      color,
      location: {
        x,
        y,
      },
    } = this;
    this.context.fillStyle = color;
    this.context.fillRect(x, y, size, size);
  }

  /**
   * @method
   */
  clear() {
    const {
      size,
      location: {
        x,
        y,
      },
    } = this;
    this.context.clearRect(x, y, size, size);
  }
}

export default Eggs;
