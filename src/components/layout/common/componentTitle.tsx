import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./componentTitle.scss";

export default function ComponentTitle(props: any) {
  return (
    <div className="container">
      {props.turnBack && (
        <>
          <ArrowBackIosIcon className="navArrow" />
          <div className="turnBack">{props.turnBack}</div>
        </>
      )}
      <div className="content">
        <img src="vipImages/titleWing.png" alt="left" className="titleWing" />
        <label className="vipHeaderTitle">{props.title}</label>
        <img src="vipImages/titleWing.png" alt="right" className="titleWing" />
      </div>
    </div>
  );
}
