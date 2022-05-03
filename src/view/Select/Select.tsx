import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { default as MuiSelect, SelectChangeEvent } from '@mui/material/Select';

export interface SelectOption {
    label: string;
    value: string;
}

interface Props {
    label: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    defaultValue?: string;
}

export default function Select({ label, options, onChange, defaultValue }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="select-label">{label}</InputLabel>
            <MuiSelect
                style={{ minWidth: 100 }}
                labelId="select-label"
                value={defaultValue}
                label={label}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={`item-${option.value}`} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
}
