var request = require('request');
var _ = require('underscore');

var code = process.argv.slice(2)[0];
var type = process.argv.slice(2)[1] || 'year';

//http://stockpage.10jqka.com.cn/basic/000829/benefit.txt
function uri(code) {
    return 'http://stockpage.10jqka.com.cn/basic/' + code + '/benefit.txt'
}
if (code) {
    request({
        method: "GET",
        uri: uri(code)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body) // Show the HTML for the Google homepage.
            var a = data.title.indexOf('营业收入')
            var b = data.title.indexOf('营业成本')
            var aData = data[type][a];  //营业收入
            var bData = data[type][b];  //营业成本
            // 计算每年的毛利率
            var c = aData.map(function (item, i) {
                return ((parseFloat(item) - parseFloat(bData[i])) / parseFloat(item) * 100).toFixed(2);
            });
            console.log(c.map(function (item, i) {
                var d = {};
                d[data[type][0][i]] = item + '%';
                return d;
            }));
        }
    });
}

