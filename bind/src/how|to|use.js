/**
 * bind的用法---how to use
 */
let obj = {
    name: "一个"
}

// rest 模式---ES6，会将一部分参数转化为数组
function func(a, ...args) {
    console.log(this, args)
    console.log('args is ', a, b, c);
}

func('a', 'b', 'c')
func.bind({ a: 666 })('a', 'b', 'c') //在后边用
func.bind({ a: 666 }, 'a')('b', 'c') // 在前边有
