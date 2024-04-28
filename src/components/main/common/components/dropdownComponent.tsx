import Select from 'react-select'
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { t } from 'i18next';
import { pointStatus } from '../selectOtions';
import SelectMui from "@mui/material/Select";
import { ChangeColorPallte, UserUSerConfig } from '../../../globalFunctions/globalContext';
import axios from 'axios';
import { useGetChangeReportType } from '../../../hooks/getUserInfoHook';
import { useSelectTypes } from '../../../globalFunctions/store';

export function DatePicker(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "1", label: t("ts027", { ns: ["ts"] }) },
        { value: "2", label: t("ts028", { ns: ["ts"] }) },
        { value: "3", label: t("ts029", { ns: ["ts"] }) },
        { value: "4", label: t("ts030", { ns: ["ts"] }) },
        { value: "5", label: t("ts031", { ns: ["ts"] }) },
        { value: "6", label: t("ts032", { ns: ["ts"] }) },
        { value: "7", label: t("ts033", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.forGround : colorP.forGround,
                        background: "transparent",
                        width: "14rem",
                        height: "2.5rem",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                    }),
                    menu: base => ({
                        ...base,
                        background: colorP.fourth,
                        color: colorP.text,
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: colorP.forGround,
                        primary50: colorP.backGorund,
                    },
                })}
                placeholder={props.defaultValue ? props.defaultValue : t("ts027", { ns: ["ts"] })} options={dates} onChange={props.onChange} />
        </>
    )
}

export function DatePickerV2(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "1", label: t("ts027", { ns: ["ts"] }) },
        { value: "2", label: t("ts028", { ns: ["ts"] }) },
        { value: "3", label: t("ts029", { ns: ["ts"] }) },
        { value: "4", label: t("ts030", { ns: ["ts"] }) },
        { value: "5", label: t("ts031", { ns: ["ts"] }) },
        { value: "6", label: t("ts032", { ns: ["ts"] }) },
        { value: "7", label: t("ts033", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                placeholder={props.defaultValue ? props.defaultValue : t("ts027", { ns: ["ts"] })} options={dates} onChange={props.onChange} />
        </>
    )
}

export function NomeDatePicker(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "5", label: t("ts031", { ns: ["ts"] }) },
        { value: "7", label: t("ts033", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                placeholder={t("ts031", { ns: ["ts"] })} options={dates} onChange={props.onChange} />
        </>
    )
}

export function RecordStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "", label: t("ts724", { ns: ["ts"] }) },
        { value: "1", label: t("ts792", { ns: ["ts"] }) },
        { value: "2", label: t("ts793", { ns: ["ts"] }) },
        { value: "3", label: t("ts794", { ns: ["ts"] }) },
        { value: "4", label: t("ts795", { ns: ["ts"] }) },
        { value: "5", label: t("ts796", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: colorP.forGround,
                        primary50: colorP.backGorund,
                    },
                })}

                placeholder={t("ts037", { ns: ["ts"] })} options={dates} onChange={props.onChange} />
        </>
    )
}

export function BonusRecordStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "", label: t("ts036", { ns: ["ts"] }) },
        { value: "44", label: t("ts859", { ns: ["ts"] }) },
        { value: "46", label: t("ts860", { ns: ["ts"] }) },
        { value: "27", label: t("ts878", { ns: ["ts"] }) },
        { value: "17", label: t("ts879", { ns: ["ts"] }) },
        { value: "35", label: t("ts880", { ns: ["ts"] }) },
        { value: "45", label: t("ts881", { ns: ["ts"] }) },
        { value: "38", label: t("ts882", { ns: ["ts"] }) },
        { value: "37", label: t("ts883", { ns: ["ts"] }) },
        { value: "20", label: t("ts884", { ns: ["ts"] }) },
        { value: "36", label: t("ts885", { ns: ["ts"] }) },
        { value: "10", label: t("ts886", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2.6rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                placeholder={t("ts059", { ns: ["ts"] })} options={dates} onChange={props.onChange} />
        </>
    )
}

export function StatusPicker(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const statuses = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "1", label: t("ts038", { ns: "ts" }) },
        { value: "2", label: t("ts039", { ns: "ts" }) },
        { value: "3", label: t("ts040", { ns: "ts" }) },
        { value: "4", label: t("ts041", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                placeholder={props.defaultValue ? props.defaultValue : t("ts037", { ns: ["ts"] })} options={statuses} onChange={props.onChange} />
        </>
    )
}

export function SuggestionStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const suggestStatus = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "1", label: t("ts557", { ns: "ts" }) },
        { value: "2", label: t("ts558", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                placeholder={props.defaultValue ? props.defaultValue : t("ts027", { ns: ["ts"] })} options={suggestStatus} onChange={props.onChange} />
        </>
    )
}

export function Stats(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const stats = [
        { id: 0, value: " ", label: t("ts036", { ns: ["ts"] }) },
        { id: 1, value: "1", label: t("ts741", { ns: ["ts"] }) },
        { id: 2, value: "2", label: t("ts742", { ns: ["ts"] }) },
        { id: 3, value: "3", label: t("ts743", { ns: ["ts"] }) },
        { id: 4, value: "4", label: t("ts744", { ns: ["ts"] }) },
        { id: 5, value: "5", label: t("ts745", { ns: ["ts"] }) },
        { id: 6, value: "6", label: t("ts746", { ns: ["ts"] }) },
        { id: 7, value: "7", label: t("ts747", { ns: ["ts"] }) },
        { id: 10, value: "10", label: t("ts748", { ns: ["ts"] }) },
        { id: 11, value: "11", label: t("ts749", { ns: ["ts"] }) },
        { id: 12, value: "12", label: t("ts750", { ns: ["ts"] }) },
        { id: 13, value: "13", label: t("ts751", { ns: ["ts"] }) },
        { id: 14, value: "14", label: t("ts752", { ns: ["ts"] }) },
        { id: 15, value: "15", label: t("ts753", { ns: ["ts"] }) },
        { id: 16, value: "16", label: t("ts754", { ns: ["ts"] }) },
        { id: 17, value: "17", label: t("ts755", { ns: ["ts"] }) },
        { id: 18, value: "18", label: t("ts756", { ns: ["ts"] }) },
        { id: 19, value: "19", label: t("ts757", { ns: ["ts"] }) },
        { id: 20, value: "20", label: t("ts758", { ns: ["ts"] }) },
        { id: 21, value: "21", label: t("ts759", { ns: ["ts"] }) },
        { id: 22, value: "22", label: t("ts760", { ns: ["ts"] }) },
        { id: 23, value: "23", label: t("ts761", { ns: ["ts"] }) },
        { id: 24, value: "24", label: t("ts762", { ns: ["ts"] }) },
        { id: 25, value: "28", label: t("ts859", { ns: ["ts"] }) },
    ]

    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                placeholder={t("ts054", { ns: "ts" })} options={stats} onChange={props.onChange} />
        </>
    )
}

export function Statuses(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const statuses = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "1", label: t("ts038", { ns: "ts" }) },
        { value: "2", label: t("ts039", { ns: "ts" }) },
        { value: "3", label: t("ts040", { ns: "ts" }) },
        { value: "4", label: t("ts041", { ns: "ts" }) },
    ]

    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                placeholder={t("ts037", { ns: "ts" })} options={statuses} onChange={props.onChange} />
        </>
    )
}

export function TransferStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const transferStatus = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "1", label: t("ts040", { ns: "ts" }) },
        { value: "2", label: t("ts417", { ns: "ts" }) },
        { value: "3", label: t("ts488", { ns: "ts" }) },
    ]

    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts092", { ns: "ts" })} options={transferStatus} />
        </>
    )
}

export function TransferType(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const transferType = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "1", label: t("ts447", { ns: "ts" }) },
        { value: "2", label: t("ts448", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts090", { ns: "ts" })} options={transferType} />
        </>
    )
}

export function SelectPlatforms(props: any) {
    const gameList = UserUSerConfig()
    const [games, setGames] = useState<any[]>([])
    useEffect(() => {
        games.map((value: any, index: any) => {

        })
    }, [])
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const platforms = [
        {
            "name": "AG ranhura",
            "label": "XIN",
            "value": 1
        },
        {
            "name": "BBIN",
            "label": "BBIN",
            "value": 2
        },
        {
            "name": "MG",
            "label": "MG",
            "value": 3
        },
        {
            "name": "BG",
            "label": "BG",
            "value": 20
        },
        {
            "name": "CQ9",
            "label": "CQ9",
            "value": 24
        },
        {
            "name": "PT",
            "label": "PT",
            "value": 6
        },
        {
            "name": "PG",
            "label": "PG",
            "value": 60
        },
        {
            "name": "EVO",
            "label": "EVO",
            "value": 70
        },
        {
            "name": "PP",
            "label": "PP",
            "value": 90
        },
        {
            "name": "FG",
            "label": "FG",
            "value": 100
        },
        {
            "name": "JL",
            "label": "JL",
            "value": 110
        },
        {
            "name": "JDB",
            "label": "JDB",
            "value": 120
        },
        {
            "name": "TADA",
            "label": "TADA",
            "value": 130
        },
        {
            "name": "BS",
            "label": "BS",
            "value": 140
        },
        {
            "name": "ES",
            "label": "ES",
            "value": 160
        },
        {
            "name": "VDD",
            "label": "VDD",
            "value": 182
        },
        {
            "name": "AVIA Esportes eletrônicos",
            "label": "AVIA",
            "value": 40
        },
        {
            "name": "BG",
            "label": "BG",
            "value": 20
        },
        {
            "name": "CQ9",
            "label": "CQ9",
            "value": 24
        },
        {
            "name": "BBIN",
            "label": "BBIN",
            "value": 2
        },
        {
            "name": "Cassino ao vivo AG",
            "label": "AGIN",
            "value": 1
        },
        {
            "name": "BBIN",
            "label": "BBIN",
            "value": 2
        },
        {
            "name": "MG",
            "label": "MG",
            "value": 3
        },
        {
            "name": "BG",
            "label": "BG",
            "value": 20
        },
        {
            "name": "DG",
            "label": "DG",
            "value": 21
        },
        {
            "name": "EVOLUTION",
            "label": "EVOLUTION",
            "value": 80
        },
        {
            "name": "PP",
            "label": "PP",
            "value": 90
        },
        {
            "name": "AWC",
            "label": "AWC",
            "value": 170
        },
        {
            "name": "YG Lottery",
            "label": "YG",
            "value": 71
        },
        {
            "name": "IYG Lottery",
            "label": "IYG",
            "value": 181
        },

        {
            "name": "AG Esportes",
            "label": "SBTA",
            "value": 1
        },
        {
            "name": "Sabah Esportes",
            "label": "TYSB",
            "value": 38
        },
        {
            "name": "PP",
            "label": "PP",
            "value": 90
        },
        {
            "name": "FB",
            "label": "FB",
            "value": 150
        }
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts091", { ns: "ts" })} options={platforms} />
        </>
    )
}

export function UserType(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const userType = [
        { value: "", label: t("ts036", { ns: "ts" }) },
        { value: "120", label: t("ts274", { ns: "ts" }) },
        { value: "130", label: t("ts273", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts254", { ns: "ts" })} options={userType} />
        </>
    )
}
export function UserLevel(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const [level, setLevel] = useState(0)
    const colorP = ChangeColorPallte()
    async function getLevel() {
        try {
            const response = await axios.get('/userCenter/agentManage/levelInfo.do', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            setLevel(response.data.lowestLevel)
        } catch (error) {

        }
    }
    var userLevel = [
        { value: "", label: t("ts036", { ns: "ts" }) },
    ]
    for (let i = 1; i <= level; i++) {
        userLevel.push({ value: i.toString(), label: t("ts344", { ns: "ts" }) + " " + i })
    }
    useEffect(() => {
        getLevel()
    }, [])
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                onChange={props.onChange} placeholder={t("ts372", { ns: "ts" })} options={userLevel} />
        </>
    )
}

export function DatesPicker(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "10", label: t("ts027", { ns: "ts" }) },
        { value: "11", label: t("ts028", { ns: "ts" }) },
        { value: "12", label: t("ts574", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts053", { ns: "ts" })} options={dates} />
        </>
    )
}

export function DatesPickers(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const dates = [
        { value: "1", label: t("ts027", { ns: ["ts"] }) },
        { value: "2", label: t("ts028", { ns: ["ts"] }) },
        { value: "5", label: t("ts031", { ns: ["ts"] }) },
        { value: "6", label: t("ts032", { ns: ["ts"] }) },
        // { value: "7", label: t("ts033", { ns: ["ts"] }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={props.defaultValue ? props.defaultValue : t("ts053", { ns: "ts" })} options={dates} />
        </>
    )
}

export function PointStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const pointStats = [
        { id: 1, value: "0", label: t("ts055", { ns: "ts" }) },
        { id: 2, value: "3", label: t("ts440", { ns: "ts" }) },
        { id: 3, value: "4", label: t("ts437", { ns: "ts" }) },
        { id: 4, value: "5", label: t("ts441", { ns: "ts" }) },
        { id: 5, value: "2", label: t("ts442", { ns: "ts" }) },
        { id: 6, value: "1", label: t("ts443", { ns: "ts" }) },
        { id: 7, value: "6", label: t("ts444", { ns: "ts" }) },
        { id: 8, value: "8", label: t("ts445", { ns: "ts" }) },
        { id: 9, value: "12", label: t("ts438", { ns: "ts" }) },
        { id: 10, value: "7", label: t("ts446", { ns: "ts" }) }
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                onChange={props.onChange} placeholder={t("ts092", { ns: "ts" })} options={pointStats} />
        </>
    )
}

export function HistoryPicker(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const tabs = [
        { id: 1, value: "1", label: t("ts005", { ns: "ts" }) },
        { id: 2, value: "2", label: t("ts006", { ns: "ts" }) },
        { id: 3, value: "3", label: t("ts007", { ns: "ts" }) },
        { id: 4, value: "4", label: t("ts008", { ns: "ts" }) },
        { id: 5, value: "5", label: t("ts009", { ns: "ts" }) },
        { id: 6, value: "6", label: t("ts010", { ns: "ts" }) },
        { id: 7, value: "7", label: t("ts011", { ns: "ts" }) },
        { id: 8, value: "8", label: t("ts012", { ns: "ts" }) },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: colorP.forGround,
                        primary50: colorP.backGorund,
                    },
                })}

                onChange={props.onChange} placeholder={t("ts005", { ns: ["ts"] })} options={tabs} />
        </>
    )
}

export function CommissionStatus(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const commissionStatus = [
        { label: t("ts055", { ns: "ts" }), value: "" },
        { label: t("ts121", { ns: "ts" }), value: "1" },
        { label: t("ts120", { ns: "ts" }), value: "2" },
        { label: t("ts423", { ns: "ts" }), value: "3" },
        { label: t("ts425", { ns: "ts" }), value: "4" },
        { label: t("ts424", { ns: "ts" }), value: "5" },
        { label: t("ts422", { ns: "ts" }), value: "6" },
        { label: t("ts426", { ns: "ts" }), value: "7" },
    ]
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}
                onChange={props.onChange} placeholder={t("ts037", { ns: ["ts"] })} options={commissionStatus} />
        </>
    )
}

export function ChangeReportTypes(props: any) {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = ChangeColorPallte()
    const selectTypes = useSelectTypes(state => state.accountChangeReport)
    const type = selectTypes?.incomeType
    const changeReportTypes = [
        { label: t("ts036", { ns: ["ts"] }), value: "" },
    ]
    for (var i = 0; i < type?.length; i++) {
        changeReportTypes.push({ label: type[i].name, value: type[i].type })
    }
    return (
        <>
            <Select
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? colorP.fourth : colorP.fourth,
                        background: "transparent",
                        width: "2rem",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        height: ".5rem",
                        borderRadius: "37px",
                        boxShadow: colorP.forGround + " !important",
                        ":active": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                            color: "#adb6c4",
                        },
                        ":hover": {
                            borderColor: colorP.forGround + " !important",
                        },
                        ":focus": {
                            borderColor: colorP.forGround + " !important",
                            boxShadow: colorP.forGround + " !important",
                        },
                        " svg": {
                            color: colorP.fourth
                        },
                        cursor: "pointer",
                    }),
                    option: (styles) => ({
                        ...styles,
                        cursor: "pointer",
                        color: "#adb6c4",
                    }),
                    menu: base => ({
                        ...base,
                        background: "#1C1E23",
                        fontSize: ".18rem",
                        color: "#adb6c4",
                        zIndex: 2
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    color: "#adb6c4",
                    colors: {
                        ...theme.colors,
                        primary25: "transparent",
                        primary: "#252a33",
                        primary50: "#252a33",
                        neutral0: "#F0C059",
                    },
                })}

                onChange={props.onChange} placeholder={t("ts054", { ns: ["ts"] })} options={changeReportTypes} />
        </>
    )
}
//