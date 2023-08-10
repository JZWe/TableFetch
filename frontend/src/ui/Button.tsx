import styled, { css, RuleSet } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

type StyledRecord<T extends string> = Record<T, RuleSet<object>>;

type SizesKey = 'small' | 'medium' | 'large';
type SizesRecord = StyledRecord<SizesKey>;

type VariationsKey = 'primary' | 'secondary' | 'danger';
type VariationsRecord = StyledRecord<VariationsKey>;

const sizes: SizesRecord = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations: VariationsRecord = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

type StyledButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: SizesKey;
  variation?: VariationsKey;
};

// ref: https://stackoverflow.com/questions/47077210/using-styled-components-with-props-and-typescript
const Button = styled.button<StyledButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${({ size }) => sizes?.[size as SizesKey] ?? sizes['medium']}
  ${({ variation }) =>
    variations?.[variation as VariationsKey] ?? variations['primary']}
`;

export default Button;
