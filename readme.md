## ![NutriPolls](/forMarkdownImg/Nutripolls%20簡報.png "NutriPolls")

---

## 您好，我們是NutriPolls，希望為您帶來天然健康的全方位服務平台

##### 此專案以React、Next.js建構前端網站，後端的部分以Express構建路由及相關的API，並以MySQL建構所需的資料庫。

##### 以下是本專案所有開發工具及使用的套件。

##

## ![NutriPolls tools](/forMarkdownImg/npm%20item.png "NutriPolls tools")

---

##### 欲在本機啟動本專案，請依照以下步驟（套件或 .env 已就緒時，可略過對應步驟）

##### 1. 啟動資料庫：本專案資料庫建構於 Xampp，請先開啟 Xampp Control Panel，並運行 Apache 及 MySQL

## ![Xampp](/forMarkdownImg/xampp.png "Xampp")

##### 2. 設定後端環境變數：請在[後端資料夾](/np_express/)創立 .env 檔，並將[後端設定文件](/np_express/env.txt)中的內容複製貼上到該檔

##### 3. 啟動後端（http://localhost:3005）：請在終端機開啟[後端資料夾](/np_express/)，依序輸入

        1.  npm i         //安裝所需套件（已安裝過可略）
        2.  npm run seed  //建置資料庫數據（首次或資料庫為空時才需要）
        3.  npm run dev   //運行後端

##### 4. 啟動前端（http://localhost:3000）：請另開終端機並開啟[前端資料夾](/np/)，依序輸入

        1.  npm i         //安裝所需套件（已安裝過可略）
        2.  npm run dev   //運行前端

##### 5. 請在瀏覽器輸入 [http://localhost:3000/](http://localhost:3000/)，進入網站。

##### ※ 補充：登入／登出功能需另行啟動 Redis（localhost:6379）；若未啟動，商品、課程、食譜、首頁等瀏覽功能仍可正常使用。

##

### 本專題所使用資源皆僅供專題展示所用，無任何商業意圖
