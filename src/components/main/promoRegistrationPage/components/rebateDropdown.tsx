import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useTranslation } from "react-i18next";
import FormController from "../../common/components/formController";

function RebateDropdown(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const hanldeFormData = props.onChange
    const MenuProps = props.MenuProps
    const rebates = props.rebates
    return (
        <>
            <FormController width={"25ch"}>
                <InputLabel id="demo-select-small-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name={props.name}
                    label={props.label}
                    onChange={hanldeFormData}
                    MenuProps={{
                        sx: {
                            "&& .Mui-selected": {
                                backgroundColor: "#68707b !important"
                            }
                        }
                    }}
                    defaultValue={props.default}
                    inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    background: colorP.backGorund,
                                    color: colorP.text,
                                    "& em": {
                                        fontSize: ".16rem",
                                        color: "#68707b !important",
                                    },
                                    " .MuiButtonBase-root": {
                                        fontSize: ".16rem",
                                        color: "#68707b !important",
                                    }
                                }
                            }
                        }
                    }}
                >
                    {
                        rebates ? rebates.map((value: any, index: any) =>
                            <MenuItem key={index} value={value.value}>{value.label}</MenuItem>
                        ) : <MenuItem value={0}>{t("ts358", { ns: ["ts"] })}</MenuItem>

                    }
                </Select>
            </FormController>
        </>
    )
}
export default RebateDropdown;