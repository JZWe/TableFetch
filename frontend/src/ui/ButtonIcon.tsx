import styled, { css, RuleSet } from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

type StyledRecord<T extends string> = Record<T, RuleSet<object>>;

type VariationsKey = 'primary' | 'secondary' | 'danger';
type VariationsRecord = StyledRecord<VariationsKey>;

const variations: VariationsRecord = {
  primary: css`
    color: var(--color-brand-600);
  `,
  secondary: css`
    color: var(--color-grey-600);
  `,
  danger: css`
    color: var(--color-red-700);
  `,
};

type StyledButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variation?: VariationsKey;
};

const ButtonIcon = styled.button<StyledButtonIconProps>`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    ${({ variation }) =>
      variations[variation as VariationsKey] ?? variations['primary']}
  }
`;

export default ButtonIcon;
