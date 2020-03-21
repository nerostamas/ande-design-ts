import React from 'react';
import axios from 'axios';
import { message } from 'antd';

interface IState {
  hasError: boolean;
  error: any;
}

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

class ErrorBoundary extends React.Component<{}, IState> {
  requestInterceptor: any = undefined;
  responseInterceptor: any = undefined;
  state = {
    error: undefined,
    hasError: false
  };

  componentDidMount() {
    window.addEventListener(
      'unhandledrejection',
      this._unhandledRejectionEventHandler
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this._unhandledRejectionEventHandler
    );
  }

  private _unhandledRejectionEventHandler = (
    event: PromiseRejectionEvent | CustomEvent
  ) => {
    let _shouldHandleError;
    let _response;

    if (
      typeof PromiseRejectionEvent !== 'undefined' &&
      event instanceof PromiseRejectionEvent
    ) {
      _shouldHandleError = event.reason && event.reason.response;
      _response = event.reason ? event.reason.response : undefined;
    } else if (event instanceof CustomEvent) {
      _shouldHandleError =
        event.detail && event.detail.reason && event.detail.reason.response;
      _response =
        event.detail && event.detail.reason
          ? event.detail.reason.response
          : undefined;
    }

    if (_shouldHandleError) {
      this.handlePromiseResponseError(_response);
      return;
    }
  };

  handlePromiseResponseError = response => {
    if (response.status === 500) {
      message.error('500: Server error');
      return;
    }

    this.processExpectedServerError(response.data);
  };

  processExpectedServerError = (errorData: any) => {
    if (errorData && errorData.message) {
      message.error(errorData.message);
    }
  };

  render() {
    const { error } = this.state;
    console.log('err', error);
    console.log(this.props);
    if (error && error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        if (window.location.pathname.includes('/login')) {
          this.setState({ error: undefined });
        } else {
          message.error('401: Permission deny');
          window.location.href = '/login';
        }
      } else if (status >= 500) {
        if (window.location.pathname.includes('/login')) {
          message.error('500: Server connection error');
          console.log(status);
          this.setState({ error: undefined });
        }
      } else if (data && data.message) {
        const { error } = this.state;
        if (error) {
          message.error(data.message);
        }
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
