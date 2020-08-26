import React from 'react';

class withError extends React.Component {
    state = {
        error:null
    }
    static getDerivedStateFromError(error) {
        return { error: true };
      }
    render() {
        if(this.state.error) {
            return <h2>Opps! Something went wrong.</h2>
        }
        return this.props.children
        
    }
}

export default withError;