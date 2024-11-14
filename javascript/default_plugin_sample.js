// default plugin sample


var Coordinator = (function CoordinatorClosure() {

    function Coordinator() {
        this.cStore = {};
        this.abc = 'zzz'
    };

    Coordinator.prototype = {
        on: function (evtName, callback, scope) {
            var cStore = this.cStore;

            if (!cStore[evtName]) {
                cStore[evtName] = [];
            }
            cStore[evtName].push((function (data) {
                return callback.call(scope, data);
            }));
        },
        emit: function (evtName, data) {
            var cStore = this.cStore;
            if (cStore[evtName]) {
                var len = cStore[evtName].length;
                for (var i = 0; i < len; i++) {
                    var callback = cStore[evtName][i];
                    callback(data);
                }
            }
        }
    };

    return Coordinator;
})();

var _n = new Coordinator()
// _n.abc
console.log("🚀 ~ file: Untitled-2:38 ~ _n.abc:", _n.abc)
