/**
 * 简易版bind实现
 */

Function.prototype.bind = function (context) {
    let args = [...arguments].slice(1);
    let self = this;
    return function () {
        console.log(args.concat([...arguments]));
        self.apply(context, args.concat([...arguments]))
    }
}
function func(a, b) {
    console.log(a, b);
}
func('a', 'b', 'c')
func.bind({ a: 666 })('a', 'b', 'c') //在后边用
func.bind({ a: 666 }, 'a')('b', 'c') // 在前边有
