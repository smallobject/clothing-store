import React from 'react';
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error-boundary.styles';

class ErrorBoundray extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/DWO5Hzg.png' />
          <ErrorImageText>Sorry this page is broken :(..</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundray;
