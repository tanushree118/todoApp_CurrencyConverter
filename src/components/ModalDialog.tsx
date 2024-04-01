import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { ModalDialogProps } from "../interfaces";

let style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "32%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 4,
};

export default function ModalDialog({ isOpen, closeModal, currencyList, createNewCard}: ModalDialogProps) {
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");

    const handleClose = () => {
        setSourceCurrency("");
        setTargetCurrency("");
        closeModal();
    }
    const showCurrencyList = () => {
        return currencyList.map((item: string, index: number) => (
            <MenuItem key={`${item}_${index}`} value={item} className="dropdown-menu">{item}</MenuItem>
        ));
    }

    const handleSourceChange = (event: any) => {
        setSourceCurrency(event.target.value);
    }

    const handleTargetChange = (event: any) => {
        setTargetCurrency(event.target.value);
    }

    const submitData = () => {
        createNewCard(sourceCurrency, targetCurrency);
        setSourceCurrency("");
        setTargetCurrency("");
    }

    const isDisabled = sourceCurrency === "" || targetCurrency === "";
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box>{"Add currencies"}</Box>
                <Box>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="source-currency-label">{"Source"}</InputLabel>
                        <Select
                            labelId="source-currency-label"
                            id="source-label"
                            value={sourceCurrency}
                            label="Source"
                            onChange={(event) => handleSourceChange(event)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: '200px', 
                                        overflowY: 'auto',
                                    }
                                },
                                MenuListProps: {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }
                                }
                            }}
                        >
                            {showCurrencyList()}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="target-currency-label">{"Target"}</InputLabel>
                        <Select
                            labelId="target-currency-label"
                            id="target-label"
                            value={targetCurrency}
                            label="Target"
                            onChange={(event) => handleTargetChange(event)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: '200px', 
                                        overflowY: 'auto',
                                    }
                                },
                                MenuListProps: {
                                    style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }
                                }
                            }}
                        >
                            {showCurrencyList()}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx ={{display: "flex", justifyContent: "end"}}>
                    <Button onClick={handleClose}>{"Cancel"}</Button>
                    <Button onClick={submitData} disabled={isDisabled}>{"Okay"}</Button>
                </Box>
            </Box>
        </Modal>
    );
}