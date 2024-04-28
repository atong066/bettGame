import { ChangeColorPallte } from '../../globalFunctions/globalContext';
import './cars.css'
function CardsExpo(props: any) {
    const colorP = ChangeColorPallte()
    return (
        <>
            <div className="overCard" style={{ borderColor: colorP.fourth }}>
                {props.children}
            </div>
        </>
    )
}
export default CardsExpo;