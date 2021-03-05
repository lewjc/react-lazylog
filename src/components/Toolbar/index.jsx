import { Component } from 'react';
import { ReactNodeArray } from 'prop-types';
import { toolBar } from './index.module.css';

export default class Toolbar extends Component {
  static propTypes = {
    /**
     * List of functions available in the toolbar
     */
    children: ReactNodeArray,
  };

  static defaultProps = {
    children: [],
  };

  render() {
    return (
      <div className={`react-lazylog-toolbar ${toolBar}`}>
        {this.props.children}
      </div>
    );
  }
}
