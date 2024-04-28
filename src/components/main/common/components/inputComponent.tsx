import { useTranslation } from 'react-i18next';
import './inputComponent.css'
import { ChangeColorPallte } from '../../../globalFunctions/globalContext';
import { Box } from '@mui/material';
export function SearchInput(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = ChangeColorPallte()
    const handleKeyDown = (e: any) => {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
    }
    return (
        <Box
            sx={{
                ".searchInputContainer": {
                    borderColor: color.fourth,
                    height: ".5rem"
                },
                ".searchInputContainer:has(input[type='number']:focus)": {
                    borderColor: color.forGround,
                }
            }}
        >
            <div className='searchInputContainer'>
                <input value={props.value} onChange={props.onChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyDown} type={props.type} ref={props.inputRef} placeholder={props.placeHolder ? props.placeHolder : t("ts042", { ns: "ts" })} />
                <button onClick={props.onClick} className='searchIcon'><img src="/images/searchIcon.png" alt="" /></button>
            </div>
        </Box>
    )
}