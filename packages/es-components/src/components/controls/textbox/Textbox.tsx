import React, { useCallback, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import getStyledProp, { ESThemeProps } from '../../util/getStyledProp';
import Icon, { iconBaseStyles, IconBaseProps } from '../../base/icons/Icon';
import InputBase, {
  useValidationStyleProps,
  validationStateHighlightStyles,
  validationStateInputStyles,
  validationStateSetupStyles,
  noInset,
  basicTextboxStyles,
  propTypes as basePropTypes,
  defaultProps as baseDefaultProps,
  ValidationStyleProps
} from './InputBase';
import { IconName, iconNames } from 'es-components-shared-types';

type GetComputedStyleFunc = typeof window.getComputedStyle;
type ComputedStyleParams = Parameters<GetComputedStyleFunc>;
type ComputedStyleReturn = ReturnType<GetComputedStyleFunc>;
type IconElement = HTMLElement;

const computeStyle = (...args: ComputedStyleParams) => {
  try {
    return window.getComputedStyle(...args);
  } catch (err) {
    if ((err as Error)?.message?.match(/Not Implemented/i)) {
      return {} as ComputedStyleReturn;
    }
    throw err;
  }
};

type IconStyleProps = ValidationStyleProps & IconBaseProps;

const getIconStyles = (icon: IconElement) => {
  const computedStyle = computeStyle(icon);
  const beforeStyle = computeStyle(icon, ':before');
  return css<IconStyleProps>`
    ${props => css`
      ${iconBaseStyles}

      // computed styles
      content: ${beforeStyle.content};
      font-family: ${computedStyle.fontFamily};
      font-size: ${computedStyle.fontSize};

      // themed addon styles
      background-color: ${getStyledProp('backgroundColor', 'addOn', props)};
      color: ${getStyledProp('textColor', 'addOn', props)};

      // base addon styles
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
      margin: 0;
      outline: 0;
      padding: 0.333em 0.6111em;
    `}
  `;
};

export type TextboxAdditionProps = {
  hasPrepend?: boolean;
  hasAppend?: boolean;
};

export type InputWrapperProps = IconStyleProps &
  TextboxAdditionProps & {
    prependIcon?: Maybe<IconElement>;
    appendIcon?: Maybe<IconElement>;
  };

const InputWrapper = styled.div<InputWrapperProps>`
  ${validationStateSetupStyles}
  ${validationStateInputStyles}
  display: flex;

  padding: 0 !important;

  &:focus-within {
    ${validationStateHighlightStyles}
  }

  ${({ hasPrepend, prependIcon }) =>
    hasPrepend &&
    prependIcon &&
    css`
      &&:before {
        ${getIconStyles(prependIcon)}
      }
    `}

  ${({ hasAppend, appendIcon }) =>
    hasAppend &&
    appendIcon &&
    css`
      &&:after {
        ${getIconStyles(appendIcon)}
      }
    `}
`;

export const TextboxBase = styled(InputBase)<TextboxAdditionProps>`
  ${basicTextboxStyles}
  width: 100%;

  && {
    border: none !important;
    margin: 0 !important;
    height: ${props =>
      getStyledProp('inputStyles.inputHeight', props as ESThemeProps) ||
      '2.2em'};
  }

  ${({ hasPrepend }) =>
    hasPrepend &&
    css`
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    `}

  ${({ hasAppend }) =>
    hasAppend &&
    css`
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    `}

  &&:focus {
    box-shadow: ${noInset};
  }
`;

const Hidden = (props: JSXElementProps<'div'>) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      visibility: 'hidden',
      overflow: 'visible',
      width: 0,
      height: 0,
      left: -5000
    }}
    {...props}
  />
);

export interface TextboxProps extends JSXElementProps<'input'> {
  flat?: boolean;
  prependIconName?: IconName;
  appendIconName?: IconName;
}

const Textbox = React.forwardRef<Maybe<HTMLInputElement>, TextboxProps>(
  function Textbox(props, ref) {
    const {
      prependIconName,
      appendIconName,
      type = 'text',
      flat,
      className,
      style,
      ...additionalTextProps
    } = props;
    const validationProps = useValidationStyleProps({ flat });

    const [inputRef, setInputRef] = useState<Maybe<HTMLInputElement>>();

    const [prependIcon, setPrependIcon] = useState<Maybe<HTMLElement>>();
    const [appendIcon, setAppendIcon] = useState<Maybe<HTMLElement>>();

    useImperativeHandle(ref, () => inputRef || undefined, [inputRef]);

    const hasPrepend = !!prependIconName;
    const hasAppend = !!appendIconName;
    const prependProps = { hasPrepend, hasAppend };
    const sharedProps = { ...validationProps, ...prependProps };

    const focusInput = useCallback(() => inputRef?.focus(), [inputRef]);

    return (
      <InputWrapper
        className={className}
        as="div"
        onClick={focusInput}
        style={style}
        {...{
          ...sharedProps,
          prependIcon,
          appendIcon
        }}
      >
        {hasPrepend || hasAppend ? (
          <Hidden>
            <Icon ref={setPrependIcon} name={prependIconName} size={18} />
            <Icon ref={setAppendIcon} name={appendIconName} size={18} />
          </Hidden>
        ) : (
          <></>
        )}
        <TextboxBase
          ref={setInputRef}
          type={type}
          className={className}
          {...additionalTextProps}
          {...sharedProps}
        />
      </InputWrapper>
    );
  }
);

const inputTypes = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week'
];

type InputTypeAttribute = JSXElementProps<'input'>['type'];

export const propTypes = {
  ...basePropTypes,
  /** Content to prepend input box with */
  prependIconName: PropTypes.oneOf<IconName>(iconNames),
  /** Content to append to input box */
  appendIconName: PropTypes.oneOf<IconName>(iconNames),
  /** The type attribute for the textbox input */
  type: PropTypes.oneOf<InputTypeAttribute>(inputTypes),
  /** Whether the textbox is the flat style or not */
  flat: PropTypes.bool
};

export const defaultProps = {
  ...baseDefaultProps,
  prependIconName: undefined,
  appendIconName: undefined,
  type: 'text',
  flat: undefined
};

Textbox.propTypes = propTypes;
Textbox.defaultProps = defaultProps;

export default Textbox;
