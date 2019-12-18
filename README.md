# gplayscraper

google play scraper

## install on windows

1. 安裝 node 版本管理套件 nvm
2. 安裝 node 執行環境 `nvm install 12.14.0`
3. 切換到安裝的 node 版本 `nvm use 12.14.0`
4. 下載爬蟲原始碼
5. 安裝 pm2 套件 install pm2 run `npm i pm2 -g`
6. 安裝 pm2 windows開機自動運行套件 run `npm i pm2-windows-startup -g`
7. 設定讓 pm2 重開機時會自動運行 run `pm2-startup install`
8. 切換目錄到爬蟲資料夾 `C:\GTW_Inetpub\GTW_ThirdParty\gplayscraper`
9. 安裝相依套件 run `npm i`
10. 註冊gplay服務 run `pm2 start index.js --name gplay --node-args="-r esm"`
11. 儲存目前所有服務 run `pm2 save`

## usage

- 重啟gplay服務：`pm2 restart gplay`
- 停止gplay服務：`pm2 stop gplay`
- 啟動gplay服務：`pm2 start gplay`

- 註冊gplay服務：`pm2 start index.js --name gplay --node-args="-r esm"`
- 刪除gplay服務：`pm2 delete gplay`
- 刪除全部服務：`pm2 kill`

- 查看gplay服務內容：`pm2 show gplay`
- 查看所有服務列表：`pm2 ls`
- 查看Dashboard：`pm2 dash`
