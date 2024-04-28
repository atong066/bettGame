
import MainLayout from "../../layout";
import CachedIcon from '@mui/icons-material/Cached';
import './coreWallet.css'
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { InputLabel, Select, MenuItem, TextField } from "@mui/material";

function CoreWalletFishing(){
    return(
        <>
            <MainLayout>
                <section className="coreWalletSectionContainer">
                    <div className="coreWallet">
                        <img className='titleWing' src="coreWalletImages/titleWing.png" />
                        <label className='coreWalletTitle'>Core Wallet</label>
                        <img className='titleWing' src="coreWalletImages/titleWing.png" />
                    </div>
                    <div className="balanceBanner">
                        <div className="balanceTextBox">
                            <div className="balanceTexts">
                                <div className="balanceText">Saldo total da conta</div>
                                <div className="balanceContent">0,00</div>
                                <CachedIcon className="refreshIcon"></CachedIcon>
                            </div>
                        </div>
                        <div className="transferInputContainer">
                            <Stack spacing={1} direction={"row"}>
                                <FormControl sx={{ minWidth: 250 }} size="small">
                                    <InputLabel id="demo-select-small-label">Amount of system balance</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        name="fishing"
                                        label="Amount of system balance"
                                        // onChange={}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 250 }} size="small">
                                    <InputLabel id="demo-select-small-label">Choose Platform</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        name="fishing"
                                        label="Choose Platform"
                                        // onChange={}
                                    >
                                        <MenuItem value={1}>BBIN</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField fullWidth size="small" label="Enter amount of money" />
                            </Stack> 
                        </div>
                        <div className="buttonContainer">
                            <Button variant='contained' className="transferButton">Transfer</Button>
                        </div>
                    </div>
                    <div className="mainContentContainer">
                        <div className="sideButtonsContainer">
                            <Stack spacing={2} direction="column">
                                <Link to="/core-wallet-card"><Button variant='contained' className="sideButtons">Card</Button></Link>
                                <Link to="/core-wallet-arcade"><Button variant='contained' className="sideButtons">Arcade</Button></Link>
                                <Link to="/core-wallet-fishing"><Button variant='contained' className="sideButtons active">Fishing</Button></Link>
                                <Link to="/core-wallet-blockchain"><Button variant='contained' className="sideButtons">Blockchain</Button></Link>
                                <Link to="/core-wallet-esport"><Button variant='contained' className="sideButtons">E-sport</Button></Link>
                            </Stack>
                        </div>
                        <div className="rightContentConatainer">
                            <div className="contentScroll">
                                <div className="contentBody">
                                    <div className="contentBox">
                                        <div className="headBox">
                                            <img src="/coreWalletImages/gameImage.png" className="gameImage" />
                                            <label className="headTitle">Yesbingo</label>
                                        </div>
                                        <hr className="lineDiv" />
                                        <div className="contentBody">
                                            <label className="content">0,00</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default CoreWalletFishing