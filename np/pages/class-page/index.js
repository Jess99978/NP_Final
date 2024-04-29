import React, { useState, useEffect } from "react";
// 讀取鉤子
import { useLoader } from "@/hooks/use-loader";
import ContentSetting from "@/styles/class_styles/ContentSetting.module.css";
import Header from "@/components/Header";
import ClassClassifacion from "@/components/class_file/ClassClassification";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassSidebar from "@/components/class_file/ClassSidebar";
import ClassFilter from "@/components/class_file/ClassFilter";
import ClassCard from "@/components/class_file/ClassCardWeb";
import ClassCardMobileGrid from "@/components/class_file/ClassCardMobileGrid";
import ClassCardMobileList from "@/components/class_file/ClassCardMobileList";
import CardStyle from "@/styles/class_styles/CardStyle.module.css";
import Pagination from "@/components/pagination";
import Footer from "@/components/Footer";

const ClassList = () => {
  // 先導入讀取鉤子
  const { setLoading } = useLoader();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  const subContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardWidth = {
    width: "990px",
    gap: "25px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifySelf: "center",
    alignContent: "center",
  };

  // 目前橘子不用走的，用飛奔的，想他慢、想多看看他，再來這邊解註解
  // useEffect(() => {
  //   setLoading(true); // 開始加載畫面

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // 延遲2秒以模擬

  //   return () => {
  //     setLoading(false); // 移除加載狀態
  //   };
  // }, []);

  const [displayGrid, setDisplayGrid] = useState(true); //選擇控制grid
  const [activeButton, setActiveButton] = useState("grid"); // 選擇哪一個是被選擇的狀態
  const [page, setPage] = useState(1); //預設分頁1
  const [perpage, setPerpage] = useState(6); //預設顯示6筆
  //  最後得到的資料
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  //食譜資料庫data
  const [classesData, setClassesData] = useState([]);
  // 用於儲存排序
  const [sortBy, setSortBy] = useState("");
  // 用於選擇分類
  const [categoryId, setCategoryId] = useState(null);

  //串上後端取得資料
  const getClasses = async (params = {}) => {
    // !!!params必須是物件!!! 再利用.toString()轉成網址的get參數(網址參數?後面的部分)
    const searchParams = new URLSearchParams(params);
    const url = `http://localhost:3005/api/classes/?${searchParams.toString()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.classesRawSql)) {
        setClassesData(data.data.classesRawSql);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }

      if (data.status === "success") {
        setTotal(data.data.total);
        setPageCount(Math.ceil(data.data.total / perpage)); // 計算總頁數
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  // 初次渲染時取得食譜列表資料
  useEffect(() => {
    getClasses();
  }, []);

  // 當資料有變動時，更新頁碼
  useEffect(() => {
    setPageCount(Math.ceil(total / perpage));
  }, [total, perpage]);

  useEffect(() => {
    const params = {
      page, //頁數
      perpage, //每頁各幾個
      sortBy, //排序
      categoryId,
    };
    getClasses(params);
    if (page > pageCount) {
      setPage(Math.max(1, pageCount)); // 確保頁數不小於1
    }
  }, [page, perpage, sortBy, categoryId]);

  useEffect(() => {
    const checkPageRange = () => {
      if (page > pageCount) {
        setPage(Math.max(1, pageCount));
      }
    };

    checkPageRange();
  }, [pageCount, page]);

  // 從子組件接收排序條件
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // 充新獲得資料
  };

  const handleCategoryChange = async (categoryId) => {
    setCategoryId(categoryId);
    // 這裡直接調用 getClasses，傳遞新的 categoryId
    setPage(1);
    const newParams = { page: 1, perpage, sortBy, categoryId };
    const data = await getClasses(newParams); // 假设这是调用API的函数
    setClassesData(data.data.classesRawSql);
    setTotal(data.total);
    setPageCount(Math.ceil(data.total / perpage));
  };

  // 切換到Grid模式
  const showGrid = () => {
    setDisplayGrid(true);
    setActiveButton("grid");
  };

  // 切換到List模式
  const showList = () => {
    setDisplayGrid(false);
    setActiveButton("list");
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Breadcrumbs />
      <div style={subContainerStyle}>
        <ClassClassifacion categoryChange={handleCategoryChange} />
        <div className={ContentSetting.DisplaySetting}>
          <div style={{ height: "100%" }} className={ContentSetting.MobileNone}>
            <ClassSidebar />
          </div>

          <div className={CardStyle.SearchResultContainer}>
            <ClassFilter
              onShowGrid={showGrid}
              onShowList={showList}
              activeButton={activeButton}
              perpage={perpage}
              setPerpage={setPerpage}
              onSortChange={handleSortChange}
            />
            <div className={CardStyle.WebCardContainer}>
              <div style={cardWidth}>
                <ClassCard classesData={classesData} />
              </div>
            </div>
            {displayGrid ? (
              <div className={CardStyle.MobileCardContainer}>
                <ClassCardMobileList />
                <ClassCardMobileList />
                <ClassCardMobileList />
                <ClassCardMobileList />
                <ClassCardMobileList />
                <ClassCardMobileList />
              </div>
            ) : (
              <div className={CardStyle.MobileCardContainer}>
                <div className={CardStyle.GridCardSet}>
                  <ClassCardMobileGrid />
                  <ClassCardMobileGrid />
                </div>
                <div className={CardStyle.GridCardSet}>
                  <ClassCardMobileGrid />
                  <ClassCardMobileGrid />
                </div>
                <div className={CardStyle.GridCardSet}>
                  <ClassCardMobileGrid />
                  <ClassCardMobileGrid />
                </div>
              </div>
            )}
            <Pagination
              count={pageCount}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
            <img
              src="/images/pages-m.png"
              className={CardStyle.paginationListMarginMobile}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClassList;
