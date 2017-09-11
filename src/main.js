'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
var calc = require('./app/calculate.js');


app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

    // bootChronium
    mainWindow = new BrowserWindow({width: 250, height: 310});
    mainWindow.setResizable(false);
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');
    // mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

const {ipcMain} = require('electron');


// IPC通信のレンダラープロセスからのリクエストに対してレスポンスを返す。
ipcMain.on('push-num-button', (event, arg) => {
    console.log(arg);
    if (arg.operand === 'ac' || arg.operand === 'reverse' ){
        //ACや +/- が押された場合
        arg.result = calc[arg.operand]();
    }else{
        if ( arg.operand === 'append'  ){
            // 数字が押された場合
            if ( !calc.is_append){
                calc.is_append = true;
                calc.sum = 0;
            }
            arg.result = calc.append(arg.input);
        }else if (arg.input == '.') {
            // 小数点が押された場合
            arg.result = calc.point();
        }else{
            // 数字以外が押された場合
            // (AllClear や +/- 以外)
            if ( Number(calc.sum) != 0
                 && Number(calc.reserve) != 0
                 && calc.operand != 'reverse'  ){
                //計算を実行
                calc[calc.operand](calc.sum);
            }

            arg.result = calc.sum;      //電卓のディスプレイに表示
            calc.operand = arg.operand; //演算子を保存
            calc.reserve = calc.sum;    //これまでの計算結果を保持
            if (calc.operand != 'equal' ){
                calc.reset();
            }

        }
    }
    console.log(calc);
    event.returnValue = arg;
});
