import styled, { css } from 'styled-components';
import { commonAnimation } from '../shared/shared';

export type Status =
  | 'info'
  | 'success'
  | 'danger'
  | 'primary'
  | 'warning'
  | 'basic';
export type Shape = 'rect' | 'sround' | 'round';
export type Size = 'sm' | 'md' | 'lg';
export type BtnType = 'filled' | 'outline' | 'ghost';

export interface ButtonTypes {
  btnType?: BtnType;
  size?: Size;
  shape?: Shape;
  status?: Status;
}

const ButtonStyle = css<ButtonTypes>`
  ${({ theme, btnType, shape, size, status }) => css`
    text-align: center;
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    ${commonAnimation('0.15')};
    cursor: ${theme.buttonCursor};
    font-family: ${theme.buttonTextFontFamily};
    font-weight: ${theme.buttonTextFontWeight};
    outline: 0;

    ${size &&
    css`
      font-size: ${theme[`button${size}TextFontSize`]};
      line-height: ${theme[`button${size}TextLineHeight`]};
    `}

    ${shape &&
    css`
      border-radius: ${theme[`button${shape}BorderRadius`]};
    `}

    border-style: solid;
    border-width: ${theme[`button${btnType}BorderWidth`]};
    padding: ${theme[`button${size}Padding`]};
    background-color: ${theme[`button${btnType}${status}BackgroundColor`]};
    border-color: ${theme[`button${btnType}${status}BorderColor`]};
    color: ${theme[`button${btnType}${status}TextColor`]};

    &:focus,
    &.focus {
      background-color: ${theme[
        `button${btnType}${status}FocusBackgroundColor`
      ]};
      border-color: ${theme[`button${btnType}${status}FocusBorderColor`]};
    }
    &:hover,
    &.hover {
      background-color: ${theme[
        `button${btnType}${status}HoverBackgroundColor`
      ]};
      border-color: ${theme[`button${btnType}${status}HoverBorderColor`]};
    }
    &:active,
    &.active,
    &:active:focus {
      background-color: ${theme[
        `button${btnType}${status}ActiveBackgroundColor`
      ]};
      border-color: ${theme[`button${btnType}${status}ActiveBorderColor`]};
    }

    &:disabled,
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: ${theme[
        `button${btnType}${status}DisabledBackgroundColor`
      ]};
      border-color: ${theme[`button${btnType}${status}DisabledBorderColor`]};
      color: ${theme[`button${btnType}${status}DisabledTextColor`]};
    }
  `}
`;

export const Button = styled.button<ButtonTypes>`
  ${ButtonStyle}
`;
export const ButtonLink = styled.a<ButtonTypes>`
  ${ButtonStyle}
`;

const defaultProps: ButtonTypes = {
  size: 'md',
  status: 'primary',
  btnType: 'filled',
  shape: 'rect',
};

Button.defaultProps = defaultProps;
ButtonLink.defaultProps = defaultProps;
