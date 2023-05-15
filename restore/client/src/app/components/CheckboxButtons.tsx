import { useState } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <Form.Group controlId='formSortSelect'>
      {items.map((item, index) => {
        return (
          <Form.Check
            key={index}
            type='checkbox'
            value={item}
            label={item}
            checked={checkedItems.indexOf(item) !== -1}
            onClick={() => handleChecked(item)}
          />
        );
      })}
    </Form.Group>
  );
}
