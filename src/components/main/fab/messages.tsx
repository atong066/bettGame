import { Badge } from "@mui/material";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useEffect, useState } from "react";
import { useGlobalVariables } from "../../globalFunctions/store";

export default function MessagesCount() {
    const chatRoom = useGlobalVariables(state => state.userConfig);
    const userInfo = useGlobalVariables(state => state.userDetails);

    const bgColor = ChangeColorPallte();

    const [num, setNum] = useState(0);

    function randomNumberInRange(min: any, max: any) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setTimeout(() => {
        setNum(randomNumberInRange(1, 99))
    }, 60000)
    useEffect(()=>{
        setNum(randomNumberInRange(1, 99))
    }, [])

    return (
        <>
            <Badge
                badgeContent={
                    chatRoom?.unReadChatMessageCount
                        ? parseInt(chatRoom?.unReadChatMessageCount) + num
                        : "0"
                }
                sx={{
                    ".MuiBadge-badge": {
                        backgroundColor: bgColor.forGround,
                        color: bgColor.text2,
                        fontSize: ".13rem",
                        display: userInfo?.isLogin == false ? "none" : "",
                    },
                }}
            >
                <img style={{ width: ".7rem" }} src="/fabImages/chat_1041916.png" alt="Turn" />
            </Badge>
        </>
    )
}