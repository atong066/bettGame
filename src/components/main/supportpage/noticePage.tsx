import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DraftsIcon from '@mui/icons-material/Drafts';
export default function NoticePage() {
    return (
        <>
            <div className="noticeContainerSupport">
                <div className="noticeBox">
                    <div className="iconBox">
                        <EmailIcon className="noticeIcon"></EmailIcon>
                    </div>
                    <div className="noticeBoxContent">
                        <div className="noticeTitleBox"><label className="noticeContent">Manutenção do sistema</label></div>
                        <div className="noticeTitleBox"><label className="noticeDate">30/01/2024 11:00:00</label></div>
                    </div>
                    <div className="arrowBox">
                        <div className="arrowTitle"><label>Lidos</label></div>
                        <ArrowForwardIosIcon className="arrowIcon"></ArrowForwardIosIcon>
                    </div>
                </div>
                <div className="noticeBox">
                    <div className="iconBox">
                        <DraftsIcon className="noticeIcon noticeIconRead"></DraftsIcon>
                    </div>
                    <div className="noticeBoxContent">
                        <div className="noticeTitleBox"><label className="noticeContent noticeContentRead">Manutenção do sistema</label></div>
                        <div className="noticeTitleBox"><label className="noticeDate">30/01/2024 11:00:00</label></div>
                    </div>
                    <div className="arrowBox">
                        <div className="arrowTitle"><label>Lidos</label></div>
                        <ArrowForwardIosIcon className="arrowIcon"></ArrowForwardIosIcon>
                    </div>
                </div>
            </div>
        </>
    )
}