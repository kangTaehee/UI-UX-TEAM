Slick = (function () {
    var instanceUid = 0;
    function Slick(element, settings) {
        var _ = this
    }
    return Slick;
}());
var Slick = window.Slick || {};
console.log("🚀 ~ file: objectsample.js:9 ~ Slick:", Slick)


util = {
    defaultoption: {
        formname: "#form1",
        enctype: "multipart/form-data",
        dataType: "json",
        fileFieldName: "#files",
        maxfilelength: 7,
        mode: "img",
        fileBuffer: [],// 실제 전송되는 파일 배열
        target: "[name='files[]']",//selector
    },
    setup: function (d) {
        this.option = {
            ...util.defaultoption,
            ...d
        }
        return this
    }
}
a = new util.setup({ mode: 'abc' })
b = new util.setup({ mode: 'eee' })
