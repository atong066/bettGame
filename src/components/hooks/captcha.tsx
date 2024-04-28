
export default function window (window:any) {
    "use strict";
    if (typeof window === 'undefined') {
        throw new Error('Geetest requires browser environment');
    }
    console.log('captcha');

};