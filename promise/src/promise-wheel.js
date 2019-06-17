/**
 * 
 * @param {promise传递的是一个函数，在new的阶段就会立即执行} executor 
 * new 出来的实例有自己的默认状态，因此需要定义状态
 */
function Zpromise(executor) {
    let self = this;
    self.status = 'pending' // 默认状态
    self.onResolvedCallbacks = []; // 所有成功的回调，---第一个参数
    self.onRejectedCallbacks = []; // 所有失败的回调 --- 第二个参数
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'; // 修改状态
            self.value = value;
            self.onResolvedCallbacks.forEach(fn => {
                fn()
            });
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'; // 修改状态
            self.reason = reason;
            self.onRejectedCallbacks.forEach(fn => {
                fn()
            });
        }
    }
    executor(resolve, reject);
}

/**
 * 成功执行函数 onFullfilled
 * 失败执行函数 onRejected
 * 
 */
Zpromise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    return new Zpromise((resolve, reject) => {
        if (self.status === 'pending') { // 在还是pending的时候就收集所有的成功失败回调--订阅
            self.onResolvedCallbacks.push(function () {
                onFullfilled(self.value)
            })
            self.onRejectedCallbacks.push(function () {
                onRejected(self.reason)
            })
        }
        if (self.status === 'resolved') {
            onFullfilled()
        } else if (self.status === 'rejected') {
            onRejected();
        }
    })
}

export default Zpromise;