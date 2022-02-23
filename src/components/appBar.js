import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { FormCat } from '../components/form';
import Modal from '@mui/material/Modal';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'rgb(203, 203, 203)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};


export default function ButtonAppBar() {

    const [open, setOpen] = useState(false);
    const toggleFormCreate = () => setOpen(!open);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Add cats" >
                        <IconButton onClick={toggleFormCreate}>
                            <AddBoxIcon color="disabled" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Modal
                open={open}
                onClose={toggleFormCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormCat toggleFormCreate={toggleFormCreate} />
                </Box>
            </Modal>
        </Box>
    );
}