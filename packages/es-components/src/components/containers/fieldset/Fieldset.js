import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import viaTheme from 'es-components-via-theme';
import classnames from 'classnames';

const Legend = styled.legend`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.colors.gray6};
  color: ${props => props.theme.colors.black};
  display: block;
  font-size: 27px;
  line-height: ${props => props.theme.sizes.baseLineHeight};
  margin: 0 0 25px 0;
  padding: 0;
  width: 100%;
`;

function renderLegend(content, legendClasses) {
  return content ? (
    <Legend className={classnames('es-fieldset__legend', legendClasses)}>
      {content}
    </Legend>
  ) : null;
}

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

function Fieldset({
  legendClasses,
  legendContent,
  children,
  extraContent,
  theme
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledFieldset className="es-fieldset">
        {renderLegend(legendContent, legendClasses)}
        {extraContent}
        {children}
      </StyledFieldset>
    </ThemeProvider>
  );
}

Fieldset.propTypes = {
  /** Determine whether or not to add a legend and what content to display  */
  legendContent: PropTypes.node,
  /** Additional classes to be applied to the legend element */
  legendClasses: PropTypes.string,
  children: PropTypes.node,
  /** Extra content that can be rendered after the Legend but before the radio buttons, allows
   * content to be put in that will not affect the accessability of the Legend/input relationship.
   */
  extraContent: PropTypes.node,
  /**
   * Theme object used by the ThemeProvider,
   * automatically passed by any parent component using a ThemeProvider
   */
  theme: PropTypes.object
};

Fieldset.defaultProps = {
  theme: viaTheme
};

export default withTheme(Fieldset);
