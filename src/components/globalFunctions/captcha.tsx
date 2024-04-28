import React from 'react';

function GeetestCaptcha(props:any){
  
  // (window as any)["initGeetest4"](props.captchaconfig,function (captchaObj:any) {
  //   (window as any)["gt"] = captchaObj;
  //   captchaObj.onReady(function () {
  //     captchaObj.showCaptcha(); //显示验证码
  //   }).onSuccess(function () {
  //     doLogin(captchaObj.getValidate());
  //   }).onError(function () {
  //     //your code
  //     console.log("geeteset captcha vertify error = ");
  //     captchaObj.reset();
  //   });

  // })

    return (
      <div className="captcha"></div> 
        );
 
}
///asdasdsa

export default GeetestCaptcha;