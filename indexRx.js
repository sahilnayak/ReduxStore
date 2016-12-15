
var Rx = require('rxjs/Rx');

const simple$ = Rx.Observable(observer => {
    console.log('Generating Observable');
    setTimeout(()=>{
        observer.next('An item!');
        setTimeout(()=>{
            observer.next('Another item!');
            observer.complete();
        }, 1000);
    }, 1000);

});

console.log('I work');