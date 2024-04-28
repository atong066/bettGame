import Select from 'react-select'
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';
export function StatusPicker(props:any){
    const { t, i18n } = useTranslation(["home", "main"]);
    const statuses=[
        {value:"",label:"Select All"},
        {value:"2",label:"In Progress"},
        {value:"3",label:"Successful"},
        {value:"4",label:"Failed"},
        {value:"5",label:"Invalid"},
    ]
        return(
        <>
            <Select placeholder="Select date..." options={statuses} onChange={props.onChange} />
        </>
    )
}