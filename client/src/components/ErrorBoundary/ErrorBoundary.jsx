import React from 'react';

// Error Boundary must be a class component, per the react docs
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('ERROR BOUNDARY caught an error in the:', this.props.component, 'component. \n', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in &gt; {this.props.component}</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;