import React, { useState } from "react";
import ContentSetting from "@/styles/class_styles/ContentSetting.module.css";
import Header from "@/components/header";
import ClassClassifacion from "@/components/class_file/class-classification";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassSidebar from "@/components/class_file/class-sidebar";
import ClassFilter from "@/components/class_file/class-filter";
import ClassCard from "@/components/class_file/class-card-web";
import ClassCardMobileGrid from "@/components/class_file/class-card-mobile-grid";
import ClassCardMobileList from "@/components/class_file/class-card-mobile-list";
import CardStyle from "@/styles/class_styles/CardStyle.module.css";
import Footer from "@/components/footer";

const ClassList = () => {
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

  const [displayGrid, setDisplayGrid] = useState(true); //選擇控制grid
  const [activeButton, setActiveButton] = useState("grid"); // 選擇哪一個是被選擇的狀態

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
        <ClassClassifacion />
        <div className={ContentSetting.DisplaySetting}>
          <div style={{ height: "100%" }} className={ContentSetting.MobileNone}>
            <ClassSidebar />
          </div>

          <div className={CardStyle.SearchResultContainer}>
            <ClassFilter
              onShowGrid={showGrid}
              onShowList={showList}
              activeButton={activeButton}
            />
            <div className={CardStyle.WebCardContainer}>
              <div style={cardWidth}>
                <ClassCard />
                <ClassCard />
                <ClassCard />
                <ClassCard />
                <ClassCard />
                <ClassCard />
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
            <img
              src="/images/paginationList.png"
              className={CardStyle.paginationListMargin}
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
