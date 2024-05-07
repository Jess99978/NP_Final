import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberBuyCard from "./MemberBuyCard";
import styles from "./MemberBuymain.module.css";

import CatBuy from "./CatBuy";



const MemberBuyMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleCommentClick = () => {
  //   // 这里可以定义当评论按钮被点击时执行的逻辑 
  //   console.log("评论按钮被点击了");
  // };
  
  return (
    <>
      <div
        className={` ${styles.container1} ${styles.main}  d-flex flex-column justify-content-center align-items-center`}
      >
        {/* 下面是側邊攔 */}

        {/* 這邊是主內容那塊 */}
        <div
          className={`${styles.BuyBox} d-flex flex-column justify-content-center align-items-cente`}
        >
          {/* 主內容的標題 */}
          <div className={styles.title}>
            <div className={styles.titleNow}>購買清單</div>
            <div className={styles.title2}>我的帳戶</div>
          </div>
          {/* 主內容的標題 */}
          {/* 分類欄 */}
          <div
            className={`d-flex flex-column justify-content-center align-items-cente`}
          >
           <CatBuy setActiveCategory={setActiveCategory} activeCategory={activeCategory} />
            {/* 分類欄下面的搜尋框 */}
            <div className={styles.searchContainer}>
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" className={styles.searchButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#747E85"
                    strokelinecap="round"
                    strokelinejoin="round"
                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* BuyCard  */}
          <MemberBuyCard activeCategory={activeCategory} searchTerm={searchTerm} />
          {/* <div className={styles.buyCard}>
            <div className={styles.buyCardContent}>
              <div className={styles.bccolumn}>
                <div className={styles.bcimg} />
              </div>
              <div className={styles.bccolumn2}>
                <div className={styles.buyItem}>
                  <div className={styles.buyItemMain}>
                    <div className={styles.biContent}>新鮮 蔬菜 </div>
                    <div className={styles.biNumber}>商品規格數量..... </div>
                    <div className={styles.biState}>狀態 : 待收貨</div>
                  </div>
                  <div className={styles.biMb}>
                    <div className={styles.biMoney}>訂單金額: $200</div>
                    <a href className={`${styles.buyCardBtn} btn`}>
                      查看詳情
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buyCard}>
            <div className={styles.buyCardContent}>
              <div className={styles.bccolumn}>
                <div className={styles.bcimg} />
              </div>
              <div className={styles.bccolumn2}>
                <div className={styles.buyItem}>
                  <div className={styles.buyItemMain}>
                    <div className={styles.biContent}>新鮮 蔬菜 </div>
                    <div className={styles.biNumber}>商品規格數量..... </div>
                    <div className={styles.biState}>狀態 : 待收貨</div>
                  </div>
                  <div className={styles.biMb}>
                    <div className={styles.biMoney}>訂單金額: $200</div>
                    <a href className={`${styles.buyCardBtn} btn`}>
                      查看詳情
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default MemberBuyMain;
