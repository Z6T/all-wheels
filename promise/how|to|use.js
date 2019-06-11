/**
 * how to use promise
 */

let p = new Promise((resolve, reject) => {
    console.log('promise start');
    resolve('data-success')
})

p.then((v) => {
    console.log(v);
}, (v) => {
    console.log(v);
});

console.log('end');

/**
 * 运行结果
 * promise start
    end
    data-success
 */