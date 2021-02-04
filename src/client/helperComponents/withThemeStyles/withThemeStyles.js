import React from 'react';
import globalStyle from '@client/shared/styles/theme.scss';

class RenderGlobalStyles extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { render } = this.prop;
    console.log('render: ', render);

    return render ? render(globalStyle) : null;
  }
}

function withThemeStyles(Component) {
  return class extends React.PureComponent {
    renderComponentWithGlobalStyles = (globalStyles) => {
      return <Component {...this.props} globalStyles={globalStyles} />;
    };

    render() {
      return (
        <RenderGlobalStyles render={this.renderComponentWithGlobalStyles} />
      );
    }
  };
}

function useThemeStyles() {
  return globalStyle;
}

export { RenderGlobalStyles, withThemeStyles, useThemeStyles };
