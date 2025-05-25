import mongoose from 'mongoose';
import { DB_URL, NODE_ENV } from '../config/env.js'; //要記得後面要加.js 
import process from 'node:process';


if(!DB_URL){
    throw new Error('請定義好跟mongodb有關的環境變數=> .env.<development/production.local>');
}

// 判斷連線成功或失敗
const connectTODataBase = async () =>{
    try{
        await mongoose.connect(DB_URL);
        console.log(`connected to database ${NODE_ENV} mode.`);
    }catch(error){
        console.error('error connecting to database',error);
        process.exit(1);
    }
}

export default connectTODataBase



// Node 通常在沒有更多非同步操作等待時，會以 0 狀態碼（Exit Code 0）正常結束。
// 但在其他情況下，Node 會根據不同的錯誤或系統狀況，
// 回傳不同的退出碼。以下是常見的 Node.js 退出碼及其說明：

// 0
// 正常結束：沒有更多非同步操作等待時，Node.js 會以 0 狀態碼退出。

// 1
// 未捕獲的致命異常：有未捕獲的例外，且沒有被 domain 或 'uncaughtException' 事件處理器攔截。

// 2
// 未使用：由 Bash 保留給內建誤用。

// 3
// 內部 JavaScript 解析錯誤：Node.js 啟動過程中的內部 JS 原始碼發生了解析錯誤，極為罕見，通常只會在 Node.js 本身開發時出現。

// 4
// 內部 JavaScript 求值失敗：Node.js 啟動過程中的內部 JS 原始碼在評估時未能返回函數值，極為罕見。

// 5
// 致命錯誤：V8 引擎中發生不可恢復的致命錯誤，通常會在標準錯誤輸出印出 FATAL ERROR 前綴訊息。

// 6
// 內部異常處理器不是函數：未捕獲異常，但內部致命異常處理器被設為非函數，無法被呼叫。

// 7
// 內部異常處理器執行時失敗：未捕獲異常，且內部致命異常處理器本身在處理時又拋出錯誤。

// 8
// 未使用：舊版 Node.js 有時用於表示未捕獲異常。

// 9
// 無效參數：指定了未知選項，或需要值的選項未給值。

// 10
// 內部 JavaScript 執行時失敗：Node.js 啟動過程中的內部 JS 原始碼在呼叫啟動函數時拋出錯誤，極為罕見。

// 11
// 無效的除錯參數：--debug 或 --debug-brk 選項設置時，選擇了無效的連接埠號。

// 12
// 無效的除錯參數：--inspect 或 --inspect-brk 選項設置時，選擇的連接埠號無效或不可用。

// 13
// 未完成的頂層 await：在頂層代碼中使用了 await，但對應的 Promise 從未解決。

// >128
// 信號退出：若 Node 收到如 SIGKILL、SIGHUP 等致命訊號，退出碼為 128 加上訊號碼。例如 SIGKILL 的值為 9，則退出碼為 137（128+9）。這是標準的 Unix 慣例
