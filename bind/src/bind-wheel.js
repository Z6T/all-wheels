/**
 * 简易版bind实现
 */

Function.prototype.bind = function (context) {

    /*
    * 以防调用bind的不是方法
    */
    if (typeof this !== 'function') {
        throw new Error('不是函数你调用毛啊？')
    }
    let args = [...arguments].slice(1);
    let self = this;
    let Bound = function () {
        console.log(args.concat([...arguments]));
        self.apply(context, args.concat([...arguments]))
    }
    // 这一步的目的是为了解决如果func是构造函数，那就不能继承其原型的问题

    /**
     *  如果只写这个，就会产生一个问题：我们直接修改 Bound.prototype 的时候，也会直接修改函数的 prototype
    //  Bound.prototype = self.prototype;
    */
    function NOP() { } // 空对象
    NOP.prototype = selef.prototype;
    Bound.prototype = new NOP
    return Bound;
}
function func(a, b) {
    console.log(a, b);
}

func.prototype.aa = 8888;
// func('a', 'b', 'c')
// func.bind({ a: 666 })('a', 'b', 'c') //在后边用
// func.bind({ a: 666 }, 'a')('b', 'c') // 在前边有
let newFun = func.bind({ a: 66 });
console.log((new newFun()));
console.log((new newFun()).aa);

