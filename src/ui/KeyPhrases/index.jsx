import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '../IconButton';
import ColorizeIcon from '@mui/icons-material/Colorize';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const KeyPhrasesNucleus = ({
    keyPhrases,
    hasTextTranslated,
    keyPhrasesButtonHandler,
    className,
}) => {
    const [open, setOpen] = useState(false);
    return (
        <aside className={className}>
            {open && (
                <Stack
                    sx={{ justifyContent: 'end' }}
                    spacing={{ xs: 0.5 }}
                    direction="row"
                    useFlexGap
                    flexWrap="wrap">
                    {keyPhrases?.length > 0 &&
                        keyPhrases.map(({ Text, BeginOffset }) => {
                            return (
                                <Chip
                                    key={BeginOffset}
                                    label={Text}
                                    size="small"
                                    variant="outlined"
                                />
                            );
                        })}
                </Stack>
            )}
            {hasTextTranslated && (
                <IconButton
                    onClick={() => {
                        setOpen(!open);
                        keyPhrasesButtonHandler();
                    }}
                    size="small"
                    aria-label="Show key phrases">
                    <ColorizeIcon />
                </IconButton>
            )}
        </aside>
    );
};

const KeyPhrases = styled(KeyPhrasesNucleus)`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-flow: column;
    align-items: end;
`;

export default KeyPhrases;
