/**
 * 
 * @param {promise传递的是一个函数，在new的阶段就会立即执行} executor 
 * new 出来的实例有自己的默认状态，因此需要定义状态
 */
function Promise(executor) {
    let self = this;
    self.status = 'pending' // 默认状态
    function resolve(value) {
        self.status = 'resolved'; // 修改状态
    }
    function reject(value) {
        self.status = 'rejected'
    }
    executor(resolve, reject);
}

/**
 * 成功执行函数 onFullfilled
 * 失败执行函数 onRejected
 */
Promise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    if (self.status === 'resolved') {
        onFullfilled()
    } else if (self.status === 'rejected') {
        onRejected();
    }
}