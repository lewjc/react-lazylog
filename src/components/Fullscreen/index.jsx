import { Component } from 'react';
import { func } from 'prop-types';
import { fullscreen, button } from './index.module.css';
import FullscreenIcon from './FullscreenIcon';

export default class Fullscreen extends Component {
  static propTypes = {
    /**
     * Function that is run when fullscreen is entered.
     */
    onFullscreenEnter: func,
  };

  render() {
    return (
      <div className={`react-lazylog-fullscreen ${fullscreen}`}>
        <button
          title="Fullscreen"
          className={button}
          onClick={this.props.onFullscreenEnter}>
          <FullscreenIcon />
        </button>
      </div>
    );
  }
}
