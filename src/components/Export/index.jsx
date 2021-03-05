import { Component } from 'react';
import { bool, func } from 'prop-types';
import {
  exportButton,
  button,
  show,
  hide,
  modal,
  modalContent,
  exportInput,
  rightPad,
  actionButton,
  exportInputError,
  exportLabelError,
  submitDisabled,
} from './index.module.css';
import ExportIcon from './ExportIcon';

export default class ExportButton extends Component {
  static propTypes = {
    /**
     * Function to handle export
     */
    onExport: func,
    /**
     * Whether or not the export button is active
     */
    disabled: bool,
  };

  static defaultProps = {
    onExport: () => {},
    disabled: false,
  };

  state = {
    showModal: false,
    index: {
      start: -1,
      end: -1,
    },
    error: {
      start: {
        isNaN: false,
      },
      end: {
        isNaN: false,
      },
    },
  };

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      index: {
        start: -1,
        end: -1,
      },
    });
  };

  handleEndIndexChange = evt => {
    const idx = Number(evt.target.value || -1);

    if (Number.isNaN(idx)) {
      this.setState(prevState => ({
        ...prevState,
        error: {
          ...prevState.error,
          end: {
            isNaN: true,
          },
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        index: {
          ...prevState.index,
          end: idx,
        },
        error: {
          ...prevState.error,
          end: {
            isNaN: false,
          },
        },
      }));
    }
  };

  handleStartIndexChange = evt => {
    const idx = Number(evt.target.value || -1);

    if (Number.isNaN(idx)) {
      this.setState(prevState => ({
        ...prevState,
        error: {
          ...prevState.error,
          start: {
            isNaN: true,
          },
        },
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        index: {
          ...prevState.index,
          start: idx,
        },
        error: {
          ...prevState.error,
          start: {
            isNaN: false,
          },
        },
      }));
    }
  };

  handleExport = () => {
    const { index } = this.state;
    const { onExport } = this.props;

    if (this.errorsExist()) {
      return;
    }

    this.handleClose();
    onExport(index.start, index.end);
  };

  errorsExist = () => {
    const { error } = this.state;
    const checkErrors = errorValues => Object.values(errorValues).some(x => x);

    return checkErrors(error.end) || checkErrors(error.start);
  };

  render() {
    const { showModal, error, index } = this.state;
    const errorsExist = this.errorsExist();

    return (
      <div className={`react-lazylog-export ${exportButton}`}>
        <button
          title="Export logs"
          className={`${button}`}
          onClick={this.handleOpen}>
          <ExportIcon />
        </button>
        <div
          onClick={this.handleClose}
          className={`${modal} ${showModal ? show : hide}`}>
          <div
            onClick={e => e.stopPropagation()}
            className={`react-lazylog-modal-bg ${modalContent}`}>
            {(error.end.isNaN || error.start.isNaN) && (
              <p
                id="react-lazylog-export-nan-error"
                className={`${exportLabelError}`}>
                Index must be a number{' '}
              </p>
            )}
            <input
              autoComplete="off"
              type="text"
              name="Export index start"
              value={index.start === -1 ? '' : index.start}
              placeholder="Start Index"
              onChange={this.handleStartIndexChange}
              className={`react-lazylog-export-start-idx ${exportInput} ${rightPad} ${
                error.start.isNaN ? exportInputError : ''
              }`}
            />
            <input
              autoComplete="off"
              type="text"
              name="Export index end"
              placeholder="End Index"
              value={index.end === -1 ? '' : index.end}
              onChange={this.handleEndIndexChange}
              className={`react-lazylog-export-start-idx ${exportInput} ${
                error.end.isNaN ? exportInputError : ''
              }`}
            />
            <button
              onClick={this.handleClose}
              className={`react-lazylog-export-cancel ${exportInput} ${actionButton} ${rightPad}`}>
              Cancel
            </button>
            <button
              onClick={this.handleExport}
              disabled={errorsExist}
              className={`react-lazylog-export-submit ${exportInput} ${actionButton} ${
                errorsExist ? submitDisabled : ''
              }`}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
