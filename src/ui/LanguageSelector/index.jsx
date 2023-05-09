import React, { useState, useEffect } from 'react';
import Autocomplete from './AutocompleteStyled';
import TextField from '@mui/material/TextField';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const LanguageSelector = ({ id, label, size, languageHandler }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e2); // demo
            // const availableLanguages = await sleep(1e3); // demo
            if (active) {
                setOptions([...availableLanguages]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (
        <Autocomplete
            id={id}
            // sx={{ width: 150 }}
            size="small"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(eve, newValue) => {
                languageHandler(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            autoHighlight
            options={options}
            loading={loading}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
};

const availableLanguages = [
    { label: 'English', code: 'en-US' },
    { label: 'Spanish', code: 'es-US' },
    { label: 'Italian', code: 'it-IT' },
    { label: 'French', code: 'fr-FR' },
    { label: 'Chinese', code: 'zh-CN' },
    { label: 'Arabic', code: 'ar-AE' },
];

export default LanguageSelector;
