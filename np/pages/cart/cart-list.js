// import React from "react";
import styles2 from "./shopStyle2.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

const ShopCart2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("所有分類");
  const dropdownRef = useRef(null);

  let hasMargin = true;
  let isMobile = false;

  const menuItems = [
    { id: 1, name: "所有分類", href: "#", className: styles.selectionLink },
    { id: 2, name: "商品列表", href: "#", className: styles.selectionLink },
    { id: 3, name: "食譜精選", href: "#", className: styles.selectionLink },
    { id: 4, name: "精選課程", href: "#", className: styles.selectionLink },
    { id: 5, name: "講師陣容", href: "#", className: styles.selectionLink },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (name) => {
    setSelectedText(name);
    setIsOpen(false); // 关闭下拉菜单
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  const [inputPackageName, setInputPackage] = useState("");
  const [inputPackageNumber, setInputPackageNumber] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  // 信用卡勾選
  const payOptions = ["line pay", "credit card"];
  const [selectedPayment, setSelectedPayment] = useState("linePay");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  // 這邊設定localstorage inputName
  useEffect(() => {
    const inputNameData = window.localStorage.getItem("inputName1");
    if (inputNameData) {
      setInputName(JSON.parse(inputNameData));
    }
  }, []);
  //setItem
  useEffect(() => {
    if (inputName) {
      window.localStorage.setItem("inputName1", JSON.stringify(inputName));
    }
  }, [inputName]);

  //localstorage  inputEmail 電子信箱
  useEffect(() => {
    const inputEmailData = window.localStorage.getItem("inputEmail1");
    if (inputEmailData) {
      setInputEmail(JSON.parse(inputEmailData));
    }
  }, []);

  useEffect(() => {
    if (inputEmail) {
      window.localStorage.setItem("inputEmail1", JSON.stringify(inputEmail));
    }
  }, [inputEmail]);

  // localstorage  inputNumber 電話
  useEffect(() => {
    const inputNumberData = window.localStorage.getItem("inputNumber1");
    if (inputEmailData) {
      setInputEmail(JSON.parse(inputEmailData));
    }
  }, []);

  useEffect(() => {
    if (inputEmail) {
      window.localStorage.setItem("inputEmail1", JSON.stringify(inputEmail));
    }
  }, [inputEmail]);

  return (
    <>
      <Header />
      {/*  */}
      <div className={`${styles2.frame} container`}>
        <form action="" method="POST">
          <nav className={` ${styles2.nav}`}>
            <div className={`${styles2.cir} ${styles2.circle1}`}>
              {/* <span>1</span> */}
              {/* <span>購物車</span> */}
            </div>
            <div className={`${styles2.line} ${styles2.line1}`} />
            <div className={`${styles2.cir} ${styles2.circle2}`}>
              {/* <span>2</span> */}
              {/* <span>填寫資料</span> */}
            </div>
            <div className={`${styles2.line}`} />
            <div className={`${styles2.cir} ${styles2.circle3}`} />
          </nav>

          {/* 價格提示欄位 */}
          <div className={styles2.prompt}>
            <h4 className={`${styles2.h4} `}>
              訂單總計 : <span style={{ color: "#f0b559" }}>NT$2000 </span>
            </h4>
            <h5 className={styles2.h5}>
              購物車:(2件)
              <img
                src="/images/arrow-down.png"
                alt=""
                style={{ width: 12, marginLeft: 15 }}
              />
            </h5>
          </div>
          {/* 表單部分 */}
          <div className={`${styles2.mgt1} row mt-4`}>
            <div className="col-sm-6">
              <aside
                className={`${styles2.left} ${styles2["form-container"]} m-2`}
                style={{ minWidth: "100%" }}
              >
                <div className={styles2.myH4}>顧客資訊</div>
                <div className="mb-3">
                  <label htmlFor="name" className={`${styles2.label} mt-3`}>
                    姓名:
                  </label>
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    id="formGroupExampleInput"
                    placeholder=""
                    value={inputName}
                    onChange={(event) => {
                      setInputName(event.target.value);
                    }}
                  />
                </div>
                {inputName}
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`${styles2.label} form-label`}
                  >
                    電子信箱
                  </label>
                  <input
                    type="email"
                    className={`${styles2.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={inputEmail}
                    onChange={(event) => {
                      setInputEmail(event.target.value);
                    }}
                  />
                </div>
                {inputEmail}
                {/* 套bs5套件 */}
                {/* <label htmlFor="phone" className={`${styles2.label}`}>
                  電話號碼:
                </label>
                <div className="input-group mb-3" style={{}}>
                  <div
                    className={`${styles2.button} ${styles2.input} btn btn-outline-secondary dropdown-toggle py-1`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "40%" }}
                  >
                    TW +886
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Separated link
                      </a>
                    </li>
                  </ul>
                  <input
                    type="text"
                    className="form-control py-1"
                    aria-label="Text input with dropdown button"
                  />
                </div> */}
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`${styles2.label} form-label`}
                  >
                    電話號碼
                  </label>
                  <input
                    type="number"
                    className={`${styles2.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={inputNumber}
                    onChange={(event) => {
                      setInputNumber(event.target.value);
                    }}
                  />
                  {inputNumber}
                </div>

                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個號碼</h5>
                </div>
                {/* 第二段 */}

                <div className={styles2.myH4} style={{ marginTop: "30px" }}>
                  訂單備註
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                    defaultValue={""}
                  />
                </div>
              </aside>
            </div>
            {/* 右邊刷信用卡 */}
            <div className="col-sm-6">
              <aside
                className={`${styles2.right} ${styles2["form-container"]} m-2`}
                style={{ minWidth: "100%" }}
              >
                {/* 第三段 */}
                <div
                  className={`${styles2.backage} d-flex justify-content-between mt-1`}
                >
                  <h5 style={{ fontSize: 24, color: "#4D785D" }}>
                    送貨資料
                    <span style={{ fontSize: 18 }}>
                      {" "}
                      (以選擇的送貨方式:宅配到府)
                    </span>
                  </h5>
                  <span className="pt-2" style={{ fontSize: 14 }}>
                    運費:NT$0
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className={`${styles2.label} mt-4`}>
                    收件人名稱:
                  </label>
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    id="formGroupExampleInput"
                    placeholder=""
                    value={inputPackageName}
                    onChange={(event) => setInputPackage(event.target.value)}
                  />
                  {inputPackageName}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`${styles2.label} form-label`}
                  >
                    電話號碼
                  </label>
                  <input
                    type="number"
                    className={`${styles2.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={inputPackageNumber}
                    onChange={(event) => {
                      setInputPackageNumber(event.target.value);
                    }}
                  />
                  {inputPackageNumber}
                </div>

                <div className="form-group form-check">
                  {/* <input type="radio" id="rememberPhone" name="rememberPhone" value="rememberPhone">
               儲存這個號碼 */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個號碼</h5>
                </div>
                {/* 第四段 */}

                <div className={styles2.myH4} style={{ marginTop: "30px" }}>
                  送貨地址
                </div>
                <div className="row py-1"></div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    // className=""
                    id="formGroupExampleInput"
                    placeholder="地址"
                    value={inputAddress}
                    onChange={(event) => {
                      setInputAddress(event.target.value);
                    }}
                  />
                  {inputAddress}
                </div>
                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個送貨地址</h5>
                </div>
                <div
                  className="form-group form-check pb-3 mb-0"
                  // style={{ borderBottom: "1px solid #4D785D" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>設定為預設地址</h5>
                </div>

                <div className={styles2.myH4} style={{ marginTop: "30px" }}>
                  付款方式
                </div>
                <div
                  className={`${styles2["line-pay"]} d-flex align-items-center mt-3`}
                >
                  {payOptions.map((v, i) => {
                    return (
                      <Fragment key={i}>
                        {/* <div className="form-check mt-2 ms-3"> */}
                        <input
                          className="form-check-input ms-3"
                          type="radio"
                          id="flexCheckDefault"
                          value={v}
                          name="linepay"
                          checked={v === selectedPayment}
                          onChange={handlePaymentChange}
                        />
                        <label
                          className={`${styles2.label} form-check-label ms-2 mt-2 `}
                          htmlFor={`flexCheck${i}`}
                        >
                          {v}
                        </label>
                        {/* </div> */}
                      </Fragment>
                    );
                  })}
                </div>
                {/* 刷卡 */}
                {/* <label
                  htmlFor="name"
                  className={`${styles2.label} mt-1`}
                  style={{ opacity: 0 }}
                >
                  透明
                </label> */}
                {/* <div className={`${styles2["credit-card"]}`}>
                   <div
                    className={`${styles2["line-pay"]} d-flex align-items-center`}
                    >
                    <div className="form-check mt-2 ms-3">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="creditCard"
                        value="creditCard"
                        checked={selectedPayment === "creditCard"}
                        // onChange={handlePaymentChange}
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                      <label
                        className={`${styles2.label} form-check-label ms-3`}
                        htmlFor="flexCheckDefault"
                      >
                        信用卡
                      </label>
                    </div>
                  </div> 
                  
                   <div
                    className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                  >
                    {" "}
                    <h5>以選擇的付款資訊</h5>
                  </div>
                  <input
                    type="number"
                    className={`${styles2["line-pay"]} ps-2`}
                    placeholder="卡號"
                    style={{ width: "100%" }}
                  /> 
                   </div> 
                </div> */}
                {/* <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                /> 
                {/* </div> */}
                {/* <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                /> */}
                {/* <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                /> */}
                {/* <div className="form-group form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>同意記住信用卡資訊</h5>
                </div> */}
                {/* <h5 className="ps-4 mt-4">本金流服務................</h5> */}
              </aside>
            </div>
          </div>
          {/* 最下面 */}
          <article
            className={`${styles2.article} d-flex justify-content align-items-center flex-column mt-4 mb-4`}
            style={{ maxWidth: 1440 }}
          >
            <div
              className={`${styles2.pay2} d-flex justify-content-center pb-4`}
              style={{ width: "100%" }}
            >
              <a
                href=""
                className={`${styles2.keepbuy} d-flex justify-content-center align-items-center mt-1 fs-3`}
                type="submit"
              >
                <h3 className={`${styles2.h3} fw-bold pt-1`}>繼續購物</h3>
              </a>
              <button
                className={` ${styles2.butt1} ms-4 mt-1`}
                type="submit"
                style={{
                  backgroundColor: "#78cea6",
                  color: "#ffffff",
                  border: "1px solid #78cea6",
                }}
              >
                <h3 className={`${styles2.h3} fw-bold pt-1`}>前往結帳</h3>
              </button>
            </div>
          </article>
        </form>
      </div>
      {/*  */}
      <Footer />
    </>
  );
};
export default ShopCart2;
