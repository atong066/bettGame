import { useEffect, useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from '@mui/material';
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import axios from "axios";
import { useGetGamebalance } from "../../hooks/getUserInfoHook";
import Loader from "../../backdropLoader/backdrop-loader";

export default function CoreWalletMap(props: any) {
    const colorP = ChangeColorPallte()
    const [reload, setReload] = useState(false);

    const getGamebalance = useGetGamebalance()
    const money = getGamebalance?.data

    const handleReload = (platform: any) => {
        getGamebalance.mutate({ platform: platform })
        setReload(true);
        setTimeout(function () {
            setReload(false);
        }, 2000)
    }

    useEffect(() => {
        getGamebalance.mutate({ platform: props.getBalance })
    }, [])

    return (
        <>
            <Loader setLoader={reload} />
            <div className="contentBox" style={{ backgroundColor: colorP.backGorund }}>
                <div className="headBox">
                    {/* <img src="/coreWalletImages/gameImage.png" className="gameImage" /> */}
                    <label className="headTitle" style={{ color: colorP.text4 }}>{props.value.name}</label>
                </div>
                <hr className="lineDiv" style={{ borderColor: colorP.fourth }} />
                <div className="contentBody">
                    <div className="labelBox"><label className="contented">{getGamebalance.isLoading == false && money ? money?.money : "-"}</label></div>
                    <div className="iconBox"><IconButton onClick={() => handleReload(props.getBalance)} disabled={reload}><img src="/navbarImages/shuaxin.png" className={reload ? 'refreshIcon active' : 'refreshIcon'} /></IconButton></div>
                </div>
            </div>
        </>
    )
}