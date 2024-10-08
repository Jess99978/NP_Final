import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Sidebar.module.css";
import Link from "next/link";
// accordion的icon
import { IoChevronDown } from "react-icons/io5";

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");
  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  const [userData, setUserData] = useState({
    id: 0,
    User_name: "",
    Account: "",
    Email: "",
    Phone: "",
    Address: "",
    Gender: "",
    date_of_birth: "",
    User_image: null,
  });

  // 串接上後端並把token傳進headers用來解碼
  // !!! 從localStorage取出token後，帶入headers來解碼，若要用postman測試記得Authorization也要選Bearer Token並放入加密的token
  const getUser = async () => {
    const url = "http://localhost:3005/api/member-profile/check";
    const tokenforheaders = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${LStoken}`,
      },
    };
    try {
      const res = await fetch(url, tokenforheaders);
      const data = await res.json();
      setUserData(data.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  // 初次渲染時取得LS裡的token
  useEffect(() => {
    getTokenInLS();
  }, []);

  // 得到token後執行getUser()去後端解碼token並根據得到的user資料查詢資料庫並將資料設定給userData
  useEffect(() => {
    getUser();
  }, [LStoken]);

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menuTop}>
          <div className={`rounded-circle overflow-hidden ${styles.userimage}`}>
            <img
              src={
                userData && userData.User_image
                  ? userData.User_image.startsWith("https://")
                    ? userData.User_image // 是https://開頭的圖片
                    : `http://localhost:3005/avatar/${userData.User_image}` // 不是https://開頭的圖片
                  : ``
              }
              alt=""
            />
          </div>
          <div className={styles.menuTitle}>
            <div className={styles.accountleft}>帳號</div>
            <div className={styles.nameleft}>{userData.Account}</div>
          </div>
        </div>
        <div className={styles.menu1}>
          <div className={styles.menu2}>
            {/* // !!! 測試改成accordion */}
            <div
              onClick={handleToggle}
              className={`position-relative ${
                isToggled ? styles["active"] : ""
              } ${styles["accordion"]}`}
              style={{ cursor: "pointer" }}
            >
              <IoChevronDown
                className={`position-absolute end-0 ${styles["chevronDown"]}`}
              />
              <div className={styles["accordion-header"]}>我的帳戶</div>
              <div
                className={` flex-column gap-2 ${styles["accordion-content"]}`}
              >
                <div className={` ${styles.myAccount}`}>
                  {" "}
                  <Link href="/member" alt="">
                    會員資料
                  </Link>
                </div>
                <div className={styles.resetPassword}>
                  {" "}
                  <Link href="/member/password-reset" alt="">
                    修改密碼
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className={` ${styles.myAccount}`}>
              {" "}
              <Link href="/member" alt="">
                我的帳戶
              </Link>
            </div> */}
            {/* <div className={styles.lefta}>
              {" "}
              <Link href="/member/password-reset" alt="">
                修改密碼
              </Link>
            </div> */}
            <div className={styles.lefta}>
              <Link href="/member/member-buy" alt="">
                購買清單
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/member-coupon" alt="">
                優惠券
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/member-level" alt="">
                會員等級
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/favor" alt="">
                願望清單
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
