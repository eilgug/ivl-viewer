import React from 'react';
import { DropdownMenuProps, Option } from '@/types';
import { Dropdown as ReactDropdown } from 'react-bootstrap';

const Dropdown: React.FC<{ dropDownMenuProps: DropdownMenuProps, selectedOption: Option | null, handleSelect: (option: Option) => void }> = ({ dropDownMenuProps, selectedOption, handleSelect }) => {

  return (
    <ReactDropdown>
      <div className='d-grid gap-2'>
        <ReactDropdown.Toggle className='truncate-text' variant="light" id="dropdown-basic">
          {selectedOption ? selectedOption.label : dropDownMenuProps.defaultLabel}
        </ReactDropdown.Toggle>
      </div>
      <DropdownMenu options={dropDownMenuProps.options} handleSelect={handleSelect} />
    </ReactDropdown>
  );
}

const DropdownMenu: React.FC<{ options: Option[], handleSelect: (option: Option) => void }> = ({ options, handleSelect }) => {
  if (options.length) {
    return (
      <ReactDropdown.Menu className='dropdown-menu-full-size'>
        {options.map((option: Option) => (
          <ReactDropdown.Item className='truncate-text' key={option.id} onClick={() => handleSelect(option)}>
            {option.label}
          </ReactDropdown.Item>
        ))}
      </ReactDropdown.Menu>
    );
  }
}

export default Dropdown;
