import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useThemeStyles } from '@client/helperComponents/withThemeStyles/withThemeStyles';
import Flex from '@client/atomicComponents/atoms/flex/Flex';
import styles from './RichText.scss';

class RichText extends React.PureComponent {
  fixNewLines() {}
  render() {
    const theme = useThemeStyles();
    const { text, className } = this.props;
    const withNewLines = text.replace(/\n/gi, '  \n'); // Markdown needs two spaces before new line char to work

    return (
      <Flex justifyCenter className={theme.mgt48}>
        <div className={theme.contentContainerNarrow}>
          <ReactMarkdown
            className={classNames(styles.markdown, theme.body2, className)}
          >
            {withNewLines}
          </ReactMarkdown>
        </div>
      </Flex>
    );
  }
}

RichText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default React.memo(RichText);
