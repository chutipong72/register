import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData: { success?: boolean; token?: string; errors?: string } =
      {};

    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData && responseData.success) {
      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
      }
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Sign Up Function Executed", formData);
    let responseData: { success?: boolean; token?: string; errors?: string } =
      {};

    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData && responseData.success) {
      if (responseData.token) {
        localStorage.setItem("auth-token", responseData.token);
      }
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (state === "Login") {
      login();
    } else {
      signup();
    }
  };

  return (
    <div className="app-container">
      <div className="left-side">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="slide-content">
              <h2>{t("text.broker").toLocaleUpperCase()}</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <h2>{t("text.commission").toLocaleUpperCase()}</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <h2>{t("text.bonus").toLocaleUpperCase()}</h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="right-side">
        <div className="align">
          <select className="custom-select" onChange={onClickLanguageChange}>
            <option value="en">English</option>
            <option value="th">ภาษาไทย</option>
          </select>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="container">
            <h1 className="title">{t(`state.${state.toLowerCase()}`)}</h1>
            <div className="input-container">
              {state === "Sign" && (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  className="input-form"
                  type="text"
                  placeholder={t("text.username")}
                />
              )}
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                className="input-form"
                type="email"
                placeholder={t("text.email")}
              />
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                className="input-form"
                type="password"
                placeholder={t("text.password")}
              />
            </div>
            <button type="submit">{t("text.continue")}</button>

            {state === "Sign" ? (
              <p className="question">
                {t("text.already")}{" "}
                <span
                  onClick={() => {
                    setState("Login");
                  }}
                  className="login-change"
                >
                  {t("text.loginbtn")}
                </span>
              </p>
            ) : (
              <p className="question">
                {t("text.question")}{" "}
                <span
                  onClick={() => {
                    setState("Sign");
                  }}
                  className="login-change"
                >
                  {t("text.register")}
                </span>
              </p>
            )}
            {state === "Sign" && (
              <div className="checkbox">
                <input type="checkbox" name="" id="" required />
                <p>{t("text.term")}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
