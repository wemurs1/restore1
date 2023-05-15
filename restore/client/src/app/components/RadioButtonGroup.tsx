import { useState } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  const [sortOptionSelected, setSortOptionSelected] = useState(selectedValue);

  return (
    <Form.Group controlId='formSortSelect'>
      {options.map(({ value, label }, index) => {
        return (
          <Form.Check
            key={index}
            type='radio'
            value={value}
            label={label}
            onChange={(event: any) => {
              setSortOptionSelected(event.target.value);
              onChange(event);
            }}
            checked={sortOptionSelected === value}
          />
        );
      })}
    </Form.Group>
  );
}
