import { useState, useEffect, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import _ from 'lodash';

export interface SearchInputProps {
    onChange: (value: string) => void;
    onClear: () => void;
    debounceTime?: number;
    placeholder?: string;
    containerClassName?: string;
    defaultValue?: string;
}

export default function SearchInput({
    onChange,
    onClear,
    debounceTime = 0,
    placeholder = 'search',
    defaultValue = '',
}: SearchInputProps): JSX.Element {
    const [searchValue, setSearchValue] = useState(defaultValue);

    useEffect(() => {
        if (!defaultValue) return;

        setSearchValue(defaultValue);
    }, [defaultValue]);

    const handleAction = _.debounce((value) => {
        onChange(value);
    }, debounceTime);

    const debounceAction = useCallback((value: string) => handleAction(value), [handleAction]);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.currentTarget.value;

        debounceAction(value);
        setSearchValue(value);
    };

    return (
        <TextField
            placeholder={placeholder}
            onChange={handleOnChange}
            value={searchValue}
            InputProps={{
                endAdornment: (
                    <ClearIcon
                        onClick={() => {
                            onClear();
                            setSearchValue('');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                ),
            }}
        />
    );
}
