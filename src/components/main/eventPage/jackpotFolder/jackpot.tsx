// import React from "react";
// import MainLayout from "../../../layout";
// import "./jackpot.css";
// import Swipe from "../../swiperFolder/swiper";
// import { Link } from "react-router-dom";
// import MultipleItems from "../../carousel/footerCarousel/carousel";

// function Jackpot() {
//   return (
//     <MainLayout>
//       <section>
//         <div className="jackpot-container">
//           <div className="jackpot-label">
//             <Link to="/event">
//               <span style={{ color: "#adb6c3" }}>&lt; Retomar</span>
//             </Link>{" "}
//             <span>
//               <div className="header">
//                 <img className="titleWing" src="withdrawImages/titleWing.png" />
//                 <label className="headerTitle">Agent Management</label>
//                 <img className="titleWing" src="withdrawImages/titleWing.png" />
//               </div>
//             </span>
//             <span></span>
//           </div>
//           <div className="jackpot-body">
//             <div className="jackpot-header">
//               Telegram: <span>https://t.me/BULLSSLOT_Oficial</span>
//             </div>
//             A BULLSSLOT distribuirá ganhos misteriosos para todos os jogadores
//             da BULLSSLOT de tempos em tempos, não há limite e nenhum limite
//             superior na quantidade de ganhos, desde que você tenha registrado
//             uma conta na BULLSSLOT, desde que tenha feito login na BULLSSLOT,
//             mesmo que você não tenha depositado um jogo em nossa empresa, você
//             pode receber um bônus surpresa que distribuímos aleatoriamente para
//             você! Bônus de mistério inesperado O bônus misterioso não precisa
//             ser solicitado e é transferido diretamente para a conta bancária ou
//             saldo da conta vinculado pelo membro Participe de apostas a partir
//             de R$1 todos os dias, maior a chance de conseguir o presente
//             misterioso~ ❤Para os membros que obtiveram o bônus misterioso,
//             depositaremos os ganhos na conta de membro ou na conta bancária
//             vinculada, através das "informações pessoais" ou notificação por
//             telefone no centro de membros, a distribuição de bônus é puramente
//             aleatória e espero que os membros possam prestar mais atenção para
//             apoiar o BULLSSLOT, desejo que você se torne o próximo sortudo!X
//           </div>
//           <div className="jackpot-footer">
//             II. Regras de Atividade: 1. Não é necessário completar rollover para
//             solicitar o saque do bônus; 2. Os ganhos misteriosos não precisam
//             ser aplicados, distribuídos aleatoriamente, e todos têm
//             oportunidades iguais; 3. A BULLSSLOT reserva-se o direito de
//             alterar, parar ou cancelar esta promoção a qualquer mome
//           </div>
//           <div className="" style={{ marginBottom: "20px 0 100px 0" }}>
//             <MultipleItems />
//           </div>
//         </div>
//       </section>
//     </MainLayout>
//   );
// }

// export default Jackpot;
import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout";
import "../discountPage/discount.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function Jackpot() {
  const [text, setText] = useState<any>([]);

  const fetchData = async () => {
    const url = "/activityPage.do";
    try {
      const response = await axios.get(url);
      const firstobject = response.data.activity[1]
      setText(firstobject);
     
    } catch (error) {
     
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <section>
   
          <div className="discount-container">
    
              <>
                <div className="discount-header">
                  <Link to="/event">
                    <span style={{ color: "#adb6c3" }}>&lt; Retomar</span>
                  </Link>
                  <div className="header">
                    <img
                      className="titleWing"
                      src="withdrawImages/titleWing.png"
                    />
                    <label className="headerTitle">{text.title}</label>
                    <img
                      className="titleWing"
                      src="withdrawImages/titleWing.png"
                    />
                  </div>
                  <span></span>
                </div>
                <div className="discount-label" style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <span>{text.language}</span>
                  <span>{text.language}</span>
                </div>
                <div className="discount-body">
                  <div className="body-label label-head">
                    <span dangerouslySetInnerHTML={{__html: text.content}}></span>
         
                  </div>
                  <div className="body-label label2">
                    <span dangerouslySetInnerHTML={{__html: text.content}}></span>
                  </div>     
                </div>
              </>

          </div>
     
      </section>
    </MainLayout>
  );
}

export default Jackpot;

