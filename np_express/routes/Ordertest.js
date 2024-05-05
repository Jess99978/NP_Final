import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Orders } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 列表頁
// my-products?brand_ids=1,2&name_like=pixel&price_gte=10000&price_lte=15000&sort=price&order=asc&page=1&perpage=2
router.get('/', async function (req, res) {
  const {
    order_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  console.log(order_ids)

  // 測試用
  // console.log(
  //   page,
  //   perpage,
  //   name_like,
  //   brand_ids,
  //   sort,
  //   order,
  //   price_gte,
  //   price_lte
  // )
  // 處理如果沒找到資料
  // 建立資料庫搜尋條件(where從句用)，每個條件用陣列存放，串接時用join(' AND ')
  const conditions = []

  // 品牌，brand_ids 使用 `brand_id IN (1,2,3)`
  conditions[1] = order_ids ? `Order_ ID (${order_ids})` : ''

  // 去除空字串
  const conditionsValues = conditions.filter((v) => v)

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
      : ''

  // 分頁用
  // page預設為1，perpage預設為3
  // const perpageNow = Number(perpage) || 3
  // const pageNow = Number(page) || 1
  // const limit = perpageNow
  // page=1 offset=0; page=2 offset= perpage * 1; ...
  // const offset = (pageNow - 1) * perpageNow

  // 最終組合的sql語法
  // const sqlOrders = `SELECT * FROM orders `
  //抓到全部的關聯
  // const sqlOrders = `SELECT *
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_ID
  // JOIN product_image ON order_item.Product_ID = product_image.F_product_id;`
  //只有圖片跟ID
  // const sqlOrders = `SELECT orders.order_id, MAX(image_url) AS image_url
  // FROM orders
  // LEFT JOIN order_item ON orders.Order_ID = order_item.Order_ID
  // LEFT JOIN product_image ON order_item.Product_ID = product_image.F_product_id
  // GROUP BY orders.order_id;`
  // 包含總價的
  // const sqlOrders = `SELECT *, sum(Quantity*price)
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_ID
  // Join product on order_item.product_id = product.ID
  // group by orders.Order_ID`
  //剩下orderid跟總價
  // const sqlOrders = `SELECT orders.Order_ID, sum(Quantity*price)
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_ID
  // Join product on order_item.product_id = product.ID
  // group by orders.Order_ID`

  //這是包含圖片的跟一大堆的還有總價重新命名的
  const sqlOrders = `SELECT 
  orders.order_id, 
  user_id, 
  order_date, 
  name, 
  status, 
  shipping_address, 
  price, 
  quantity, 
  C_price, 
  C_quantity, 
  O_coupon_ID, 
  C_name,
  Discount_amount,
  IFNULL(sum(C_quantity * C_price), 0) AS additional_total, 
  discription, 
  coupon_ID AS orders_Class_id, 
  MAX(image_url) AS image_url, 
  sum(Quantity * price) + IFNULL(sum(C_quantity * C_price), 0) AS total 
FROM 
  orders 
LEFT JOIN 
  order_commodity_item ON orders.Order_ID = order_commodity_item.Order_ID 
LEFT JOIN 
  coupons ON orders.O_coupon_ID = coupons.Coupon_ID
LEFT JOIN 
  product ON order_commodity_item.product_id = product.ID 
LEFT JOIN 
  product_image ON order_commodity_item.Product_ID = product_image.F_product_id 
LEFT JOIN 
  order_class_item ON orders.Order_ID = order_class_item.Order_ID 
LEFT JOIN 
  class ON order_class_item.Class_id = class.Class_ID 

GROUP BY 
  orders.order_id 
ORDER BY 
  order_id ASC;`

  // 最終組合的sql語法(計數用)
  const sqlCount = `SELECT COUNT(*) AS count FROM orders ${where}`

  // 顯示sql語法
  console.log(sqlOrders)
  console.log(sqlCount)

  const [rows, fields] = await db.query(sqlOrders)

  console.log(rows)

  const [rows2] = await db.query(sqlCount)

  // 回傳總筆數
  const total = rows2[0].count

  // 計算頁數
  // const pageCount = Math.ceil(total / Number(perpage)) || 0
  //抓狀態

  return res.json({
    status: 'success',
    data: {
      total,
      orders: rows,
    },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:status', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  const ordersStatus = req.params.status

  // const sqlOrders = `SELECT orders.order_id, member_id, order_date, name, status, shipping_address, quantity, discription, MAX(image_url) AS image_url,  sum(Quantity*price) AS total
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_ID
  // Join product on order_item.product_id = product.ID
  // JOIN product_image ON order_item.Product_ID = product_image.F_product_id
  // WHERE orders.Status = "${ordersStatus}"
  // GROUP BY orders.order_id
  // order by orders.order_id;`
  // const sqlOrders = `SELECT orders.order_id,user_id, order_date, name, status, shipping_address, quantity, discription, MAX(image_url) AS image_url,  sum(Quantity*price) AS total
  // FROM orders
  // JOIN order_commodity_item on orders.Order_ID = order_commodity_item.Order_ID
  // Join product on order_commodity_item.product_id = product.ID

  // JOIN product_image ON order_commodity_item.Product_ID = product_image.F_product_id
  // WHERE orders.status = "${ordersStatus}"
  // GROUP BY orders.order_id;`

  const sqlOrders = `SELECT 
  orders.order_id, 
  user_id, 
  order_date, 
  name, 
  status, 
  shipping_address, 
  price, 
  quantity, 
  C_price, 
  C_quantity, 
  O_coupon_ID, 
  C_name,
  Discount_amount,
  IFNULL(sum(C_quantity * C_price)/2, 0) AS additional_total, 
  discription, 
  coupon_ID AS orders_Class_id, 
  MAX(image_url) AS image_url, 
  sum(Quantity * price) + IFNULL(sum(C_quantity * C_price)/2, 0) AS total 
FROM 
  orders 
LEFT JOIN 
  order_commodity_item ON orders.Order_ID = order_commodity_item.Order_ID 
LEFT JOIN 
  coupons ON orders.O_coupon_ID = coupons.Coupon_ID
LEFT JOIN 
  product ON order_commodity_item.product_id = product.ID 
LEFT JOIN 
  product_image ON order_commodity_item.Product_ID = product_image.F_product_id 
LEFT JOIN 
  order_class_item ON orders.Order_ID = order_class_item.Order_ID 
LEFT JOIN 
  class ON order_class_item.Class_id = class.Class_ID 
  WHERE orders.status = "${ordersStatus}"
GROUP BY 
  orders.order_id 
ORDER BY 
  order_id ASC;`

  // WHERE Status= '${ordersStatus}'
  const [rows, fields] = await db.query(sqlOrders)

  return res.json({
    status: 'success',
    data: {
      orders: rows,
    },
  })
  //return res.json({ status: 'success', data: { status } })
})

export default router
