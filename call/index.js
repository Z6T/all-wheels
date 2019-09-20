Function.prototype.call2 = function(context) {
    // body
    context = context || window;
    const {fn} = context;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    context.fn = fn;
    return result
}




function run() {
    console.log('param', this.a)
}
run.call2({a:1})