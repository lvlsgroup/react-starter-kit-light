import React, { useContext } from 'react';

export const AppFrameContext = React.createContext();

export function useAppFrame() {
  return useContext(AppFrameContext);
}

export const AppFrameConsumer = AppFrameContext.Consumer;

class AppFrameProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...props.data,
      loadPage: this.loadPage,
      setKey: this.setKey,
    };
  }

  loadPage = (callBack) => {
    return callBack.then((res) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          [res.key]: res.payload,
        };
      });
    });
  };

  setKey = (key, value) => {
    this.setState(() => {
      return { [key]: value };
    });
  };

  render() {
    return (
      <AppFrameContext.Provider value={this.state}>
        {this.props.children}
      </AppFrameContext.Provider>
    );
  }
}

export default AppFrameProvider;
