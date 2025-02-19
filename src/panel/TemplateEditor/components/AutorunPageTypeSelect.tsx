import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface Props {
    pageTypes: string[];
    onChange: (pageType: string) => void
}


export default ({ pageTypes, onChange }: Props) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const { target: { value } } = event;
        const pageType: string = pageTypes.find(item => item === value)!;
        setPageType(pageType);
        onChange(pageType);
    };

    const [pageType, setPageType] = React.useState<string>('product');

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="pageType-label">Page Type</InputLabel>
                <Select
                    labelId="pageType-label"
                    id="pageType-id"
                    value={pageType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Page Types" />}
                    MenuProps={MenuProps}
                >
                    {pageTypes.map((pageType) => (
                        <MenuItem
                            key={pageType}
                            value={pageType}
                        >
                            {pageType}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}