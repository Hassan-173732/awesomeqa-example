import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import filterStyle from './filterSwitch.module.css';

interface FilterSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

const FilterSwitch: React.FC<FilterSwitchProps> = ({ checked, onChange, label }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={label}
            className={filterStyle.filter}
        />
    );
};

export default FilterSwitch;
