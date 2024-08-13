import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          state: {
            login: "Login",
            sign: "Sign Up",
          },
          text: {
            username: "Username",
            email: "Email",
            password: "Password",
            continue: "Continue",
            already: "Already have an account?",
            loginbtn: "Login Here",
            question: "New member?",
            register: "Register Here",
            term: "By continuing, i agree to the terms of use & privacy policy.",
            broker: "Trade with a trusted global broker",
            commission: "Enjoy $0 commissions when you trade with US shares",
            bonus: "$30 Trading Bonus and Deposit Bonus up to $10,500",
          },
        },
      },
      th: {
        translation: {
          state: {
            login: "เข้าสู่ระบบ",
            sign: "สมัครสมาชิก",
          },
          text: {
            username: "ชื่อบัญชี",
            email: "อีเมล",
            password: "รหัสผ่าน",
            continue: "ดำเนินการต่อ",
            already: "มีบัญชีอยู่แล้วใช่หรือไม่?",
            loginbtn: "เข้าสู่ระบบที่นี่",
            question: "สมาชิกใหม่?",
            register: "ลงทะเบียนที่นี่",
            term: "ด้วยการดำเนินการต่อ ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว",
            broker: "เทรดกับโบรกเกอร์ระดับโลกที่ได้รับความไว้วางใจ",
            commission: "ซื้อขายหุ้น US แบบไม่มีค่าคอมมิชชั่น",
            bonus: "โบนัสซื้อขาย $30 และโบนัสเงินฝากสูงถึง $10,500",
          },
        },
      },
    },
  });

export default i18n;
