//ES6
//let var const
const hello = () => {
}

//Spread operator
function test(){
    let numbers = [19,12,14];
    console.log(Math.max(...numbers));
}

//Rest operator
function hello(...add){
    console.log(add);// print 10,12,13;
}
console.log(hello(10,12,13));

//Template literals
let name = 'BB';
let description = `
    hello , I am ${name}
`;
console.log(description); 
// print 
// `
//    hello, I am BB
// `

//Destructing Array
let numbers = [1,2,3];

// same as below
let a = numbers[0];
let b = numbers[1];

let [a = "default",...b, c, d] = numbers;

console.log(d);// undefined
console.log(b);// [2,3]
console.log(a) // 1

//Symbols <- just like boolean string// It stands for unique Id
let symbol = Symbol(`debug`);
let symbol1 = Symbol(`debug`);
console.log(symbol === symbol1) // return false, coz they have different Id;

let symbol3 = Symbol.for('age');
let symbol4 = Symbol.for('age');
console.log(symbol3 === symbol4) // return true, coz they have same and point to the same object

let obj = {
    name : "hellop",
    [symbol] : 12
}

console.log(obj[symbol]);

//well known Symbol 
class Person{
}

Person.prototype[Symbol.toStringTag] = 'Person';

let person = new Person();
console.log(person); //[object Person] { ... }

//Iterators 
let nums = [1,2,3];
nums[Symbol.iterator] = function(){
  let nextValue = 10;
  return {
    next: function(){
      nextValue++;
      return {
        done: nextValue > 15 ? true: false,
        value : nextValue
      };
    }
  };
}

for(let item of nums){
  console.log(item);
}

//customize Iterators
let person = {
    name : 'Max',
    hobbies : ['Sports', 'Cooking'],
    [Symbol.iterator]: function(){
      let i = 0;
      let hobbies = this.hobbies;
      return{
        next : function(){
          let value = hobbies[i];
          i++;
          return {
            done : i > hobbies.length ? true: false,
            value : value
          };
        }
    };
  }
}
  
for(let hobby of person){
    console.log(hobby);
}

//Generators

// The yield keyword pauses generator function execution and the value of the expression following
// the yield keyword is returned to the generator's caller. It can be thought of as a generator-based version of the return keyword.
// asterisk
function *gen(end){
    for(let i = 0; i < end; i++){
      try{
      yield i;
      }catch(e){
      }
    }
  }
  
  let it = gen(2);
  
  console.log(it.next());
  console.log(it.return('an error occured'));
  console.log(it.next());
  console.log(it.next());

//Promises
let promise = new Promise(function(resolve, reject){
    setTimeout(function(){ 
        resolve('Done!');
    }, 1500);
});

promise.then(function(value){
    console.log(value);
}, function(error){
    console.log(error);
});

//chaining promises
function waitASecond(s){
    return new Promise(function(resolve, reject){
        if(s > 2){
            reject('rejected');
        }
        else{
            setTimeout(function(){
                s++;
                resolve(s);
            }, 1000);
        }
    })  
}

waitASecond(1)
    .then(waitASecond)
    .then(function(seconds){
    console.log(seconds);
    })
    .catch(function(error){
    console.log(error);
})

//promise ALL
//check all promise (wait for the last one to finish) to resolve, otherwise return rejected
Promise.all(waitASecond(),waitASecond()
.then((success)=>{console.log(success)})
.catch((error)=>{console.log(error)}));

//Proimise RACE
//check either one is resolved (wait for the first one to finish)

//Map & Sets

let ace = {
    name : 'ace of spades'
}
let king = {
    name : 'king of spades'
}
let deck = new Map();
deck.set('1', ace);
desk.set('2', king);

//weakMap can only have JS object as key 
//hold weak references 
let wm = new WeakMap()

console.log(deck.get(`1`).name); // "ace of spades"
console.log(...deck.keys()); // 1 2

//http 

export class Http{
    static fetch(url){
        return new Promise((resolve , reject) => {
            const HTTP = new XMLHttpRequest();
            HTTP.open('POST', url);
            HTTP.onreadystatechange = function(){
                if(HTTP.readyState == XMLHttpRequest.DONE && HTTP.status == 200){
                    const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                    resolve(RESPONSE_DATA);
                }else if(HTTP.readyState == XMLHttpRequest.DONE){
                    reject('error');
                }
            };
            HTTP.send();
        });
    }
}
