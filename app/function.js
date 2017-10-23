'use strict';
var $ = require('jquery');
const {ipcRenderer} = require('electron')

//electron によりhtmlが描画されてから実行
$(document).ready(function(){
  $("button").on('click',function(){

    var num = $(this).html();
    var result = $('#result').val();
    var operand = $(this).attr('class').split(' ')[0];
    operand = operand === 'num' ? 'append' : operand;
    pushNumButton(num , result,operand);
  });

});

function pushNumButton(input , result ,operand ) {
  // json形式でリクエストを送信
  var data = { input: input , result: result , operand: operand};
  var response = ipcRenderer.sendSync('push-num-button', data);
  // レスポンス結果を元にディスプレイを変更。
  $('#result').val(response.result);
}

