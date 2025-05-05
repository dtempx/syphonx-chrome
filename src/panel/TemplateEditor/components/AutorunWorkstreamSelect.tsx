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

interface Workstream {
    workstream_id: string;
    workstream_name: string;
}

interface Props {
    workstreams: Workstream[];
    onChange: (workstream: Workstream) => void
}

export default ({ workstreams, onChange }: Props) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const { target: { value } } = event;
        const workstream = workstreams.find(item => item.workstream_id === value)!;
        setWorkstream(workstream);
        onChange(workstream);
    };

    const [workstream, setWorkstream] = React.useState<Workstream>(workstreams[0]);

    return (
        <div>
            <FormControl sx={{ m: 1, width: '440px' }}>
                <InputLabel id="workstream-label">Workstream</InputLabel>
                <Select
                    labelId="workstream-label"
                    id="workstream-id"
                    value={workstream.workstream_id}
                    onChange={handleChange}
                    input={<OutlinedInput label="Workstream" />}
                    MenuProps={MenuProps}
                >
                    {workstreams.map((workstream) => (
                        <MenuItem
                            key={workstream.workstream_id}
                            value={workstream.workstream_id}
                        >
                            {workstream.workstream_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}