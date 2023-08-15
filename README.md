# DDR-Table-Fetch

網址：https://table-fetch.vercel.app/

## 前言

本身是一名遊戲玩家，但在官方更新資訊時，網路上的攻略 Wiki 不一定能即時更新資訊，所以寫了一個網站，除了能透過爬蟲抓取 Wiki 上的資料外，也能讓自己以管理員的身分進行 CRUD。

## 使用技術

爬蟲：Python
<br>
前端：React + Typescript
<br>
後端：串聯 supabase API + Typescript

<br>
前端使用到的 library 
<ul>
  <li>react-query: 資料的快取，節省 API 的呼叫 </li>
  <li>react-table: 呈現表格</li>
  <li>styled-components: 撰寫自定義元件</li>
  <li>react-hook-form: 驗證表單資料</li>
  <li>react-hot-toast: 顯示 Toast 訊息</li>
</ul>

## 功能

管理員身分：

<ul>
  <li>可以對歌曲清單進行 CRUD</li>
  <li>瀏覽歌曲清單</li>
  <li>在本機時可以透過 python 爬蟲，將資料庫內的資料與 wiki 同步</li>
</ul>

非管理員身分：僅能瀏覽歌曲清單

<ul>
  <li>僅能瀏覽歌曲清單</li>
</ul>

<br>
能以等級或名稱進行資料的篩選、用分頁的方式減少資料量傳輸
<br>

測試用管理員
<br>
帳號: test@test.com
<br>
密碼: 12345678
