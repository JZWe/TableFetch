import { SelectHTMLAttributes } from 'react';
import styled from 'styled-components';

type StyledSelectProps = {
  type?: 'white' | string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type OptionValue = string | number;
type OptionLabel = string;

export type Option = {
  value: OptionValue;
  label: OptionLabel;
};

type Options = Option[];

function Select({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  hasAll,
  ...props
}: {
  id: string;
  label: string;
  options: Options;
  value: OptionValue;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  hasAll?: boolean;
}) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label htmlFor={id}>{label}</label>
        <StyledSelect id={id} value={value} onChange={onChange} {...props}>
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {hasAll && <option value="all">All</option>}
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </div>
    </>
  );
}

export default Select;
