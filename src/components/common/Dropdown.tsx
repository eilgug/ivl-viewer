import React from 'react';
import { DropdownMenuProps, Option } from '@/types';
import { Dropdown as ReactDropdown } from 'react-bootstrap';

const Dropdown: React.FC<{ dropDownMenuProps: DropdownMenuProps, selectedOption: Option | null, handleSelect: Function }> = ({ dropDownMenuProps, selectedOption, handleSelect }) => {

  return (
    <ReactDropdown>

      <div className='d-grid gap-2'>
        <ReactDropdown.Toggle className='truncate-button' variant="light" id="dropdown-basic">
          {selectedOption ? selectedOption.label : dropDownMenuProps.defaultLabel}
        </ReactDropdown.Toggle>
      </div>
      <DropdownMenu options={dropDownMenuProps.options} handleSelect={handleSelect} />
    </ReactDropdown>

  );
}

const DropdownMenu: React.FC<{ options: Option[], handleSelect: Function }> = ({ options, handleSelect }) => {
  if (options.length) {
    return (
      <ReactDropdown.Menu className='dropdown-menu-full-size'>
        {options.map((option: Option) => (
          <ReactDropdown.Item key={option.id} onClick={() => handleSelect(option)}>
            {option.label}
          </ReactDropdown.Item>
        ))}
      </ReactDropdown.Menu>
    );
  }
}

export default Dropdown;
