// import React from "react";
import styles3 from "../../styles/member-styles/shopStyle3.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useRouter } from 'next/router'

const HistoryOrderDetail = () => {
  // 物件狀態的初始值，通常需要把每個屬性的初始值寫出
  // !!注意!! 初次render(渲染)會使用初始值
  // !!注意!! 在應用程式執行過程中，務必要保持狀態維持同樣的資料類型
  const [orderDetail, setOrderDetail] = useState([]
    // Order_ID: 0,
    //     Member_ID: 0,
    //     Order_date: '',
    //     Status: '',
    //     Shipping_address: '',
    //     Order_Item_ID: 0,
    //     Product_ID: 0,
    //     Quantity: 0,
    //     id: 0,
    //     category_id: 0,
    //     name: '',
    //     description: '',
    //     price: 0,
    //     stock_quantity: 0,
    //     F_coupon_id: 0,
    //     upload_date: '',
    //     valid: 0
)

    // 宣告出router物件，在其中可以得到兩個有用值
  // router.query，是一個物件，其中有動態路由的參數值pid
  // router.isReady，是一個布林值，代表本頁面元件已完成水合作用，可以得到pid值
  const router = useRouter()

  // 與伺服器要求獲取資料的async函式
  const getOrderDetail = async (order_id) => {
    const url = `http://localhost:3005/api/history-order-detail/${order_id}`
    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data.data.orders)

      // 為了要確保資料是物件，所以檢查後再設定
      if (typeof data === 'object' && data !== null) {
        // 設定到狀態中
        setOrderDetail(data.data.orders)
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }
// 樣式2: 頁面初次渲染之後伺服器要求資料
  // 需要監聽router.isReady，當它為true時，才能得到pid
  useEffect(() => {
    console.log('isReady', router.isReady, 'query', router.query)
    // 確保能得從router.query到pid後，再向伺服器要求對應資料
    if (router.isReady) {
      getOrderDetail(router.query.order_id)
    }
    // eslint-disable-next-line
  }, [router.isReady])
  // eslint會作多餘的檢查，不需要加router.query在相依陣列中

  
  return (
    <>
      <Header />
      {/*  */}
      <div className={`${styles3.desktop}  ${styles3.container2}  container `}>
       
        {/* 課程欄位 */}
        <section
          className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold `}
          style={{ color: "#50bf8b" }}
        >
          購物明細
        </section>
        <section className={`${styles3.ProductBorder} ${styles3.section}`}>
          <div className={`${styles3.topBar} row py-3`}>
            <div className={`${styles3.fc} col text-center`}>商品明細</div>
            <div className={`${styles3.fc} col text-center`}>優惠價</div>
            <div className={`${styles3.fc} col text-center`}>數量</div>
            <div className={`${styles3.fc} col text-center`}>小計</div>
           
          </div>
          {orderDetail.map((v, i) => {
            return(
          <div className="row py-2">
            <div className={`${styles3.fb} col text-center pt-2`}>{v.name}</div>
            <div className={`${styles3.fb} col text-center pt-2`}>{v.price}</div>
            <div className={`${styles3.fb} col text-center pt-2`}>{v.Quantity}</div>
            <div className={`${styles3.fb} col text-center pt-2`}>{v.price * v.Quantity}</div>
            
          </div>
            )
       }
      )}
        
         
          {/* <div className="row py-2">
            <div className={`${styles3.fb} col text-center pt-2`}>肉桂捲</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$200</div>
            <div className={`${styles3.fb} col text-center pt-2`}>2</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$400</div>
            
          </div> */}
        </section>
        {/* 商品欄位 */}
        <section className={`${styles3.section} ${styles3.ProductBorder} mt-4`}>
          <div className={`${styles3.topBar} row`}>
            <div
              className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold pt-2`}
            >
              付款方式與運送方式
            </div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>配送方式</div>
            <div className={`${styles3.fb} pt-2 col-2`}>宅配</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>付款方式</div>
            <div className={`${styles3.fb} pt-2 col-2`}>刷卡</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>收件者</div>
            <div className={`${styles3.fb} pt-2 col-2`}>王美華</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>Email</div>
            <div className={`${styles3.fb} pt-2 col-2`}>lsacas34@gmail.com</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>取貨地址</div>
            <div className="col-4 fb pt-2">台北市XXXXXXXXXXXX</div>
          </div>
          
        </section>
        {/* 折價券、付款 */}
        <div
          className={`${styles3.pay2} d-flex justify-content-center py-4`}
          style={{ width: "100%" }}
        >
          <a
            href=""
            className={`${styles3.keepbuy} ${styles3.a} d-flex justify-content-center align-items-center mt-1`}
            type="submit"
            style={{}}
          >
            <h3 className="fw-bold pt-1">返回上一頁</h3>
          </a>
         
        </div>
        {/* </form> */}
        {/* </div> */}
      </div>
      {/* 手機size */}
      <div className={`${styles3.mobile}  ${styles3.container2} container`}>
        {/*  */}

       
        {/* 課程欄位 */}
        <section
          className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
          style={{ width: 345, marginTop: 100 }}
        >
          <div className={`${styles3.topBar} row`}>
            <div className={`${styles3.fc} col`}>購物明細</div>
          </div>
          <div className="row py-2 mt-1">
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
           
            <div className="row mt-4">
              
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 mt-1"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
           
            <div className="row mt-4">
              
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 mt-1"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
            
            <div className="row mt-4">
              
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>折價券折抵</div>
            <div
              className={`${styles3.fb} col text-center text-warning fw-bold`}
            >
              0 元
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>運費</div>
            <div
              className={`${styles3.fb} col text-center text-warning fw-bold`}
            >
              0 元
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>訂單總價</div>
            <div
              className={`${styles3.fb} col text-center text-success fw-bold`}
            >
              3600 元
            </div>
          </div>
        </section>
        {/* 商品欄位 */}
        <section
          className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
          style={{ width: 345 }}
        >
          <div className={`${styles3.topBar} row`}>
            <div className={`${styles3.fc} col`}>收件資訊</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} col mt-1`}>配送方式</div>
            <div className={`${styles3.fb} col mt-1`}>宅配</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>付款方式</div>
            <div className={`${styles3.fb} col mt-1`}>刷卡</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>收件者</div>
            <div className={`${styles3.fb} col mt-1`}>王美華</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>Email</div>
            <div className={`${styles3.fb} col mt-1`}>lucas34@gmail.com</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>取貨地址</div>
            <div className={`${styles3.fb} col mt-1`}>台北市xxxxxxxxx</div>
          </div>
         
        </section>
        {/* 折價券、付款 */}
        <div
          className={`${styles3.pay2} d-flex justify-content-center py-4`}
          style={{ width: "100%" }}
        >
          <div
            className={`${styles3.pay2} d-flex justify-content-center py-4`}
            style={{ width: "100%" }}
          >
            <a
              href=""
              className={`${styles3.keepbuy} d-flex justify-content-center align-items-center mt-1`}
              type="submit"
              style={{}}
            >
              <h3 className={`${styles3.h3} fw-bold pt-1`}>返回上頁</h3>
            </a>
           
          </div>
          {/* </form> */}
          {/* </div> */}
        </div>
      </div>
      {/*  */}

      <Footer />
    </>
  );
};
export default HistoryOrderDetail;
