import { DropdownMenuProps, Option } from '@/types';
import React from 'react';
import { Dropdown as ReactDropdown } from 'react-bootstrap';

const Dropdown: React.FC<{ dropDownMenuProps: DropdownMenuProps, selectedOption: Option | null, handleSelect: Function }> = ({ dropDownMenuProps, selectedOption, handleSelect }) => {

  return (
    <ReactDropdown>

      <div className='d-grid gap-2'>
        <ReactDropdown.Toggle className='truncate-button' variant="light" id="dropdown-basic">
          {selectedOption ? selectedOption.label : dropDownMenuProps.defaultLabel}
        </ReactDropdown.Toggle>
      </div>

        <ReactDropdown.Menu className='dropdown-menu-full-size'>
          {dropDownMenuProps.options.map((option: Option) => (
            <ReactDropdown.Item key={option.id} onClick={() => handleSelect(option)}>
              {option.label}
            </ReactDropdown.Item>
          ))}
        </ReactDropdown.Menu>
    </ReactDropdown>

  );
};

export default Dropdown;
