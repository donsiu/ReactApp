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
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
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

//Reflect API // Meta Programming
//https://hk.saowen.com/a/7225417ec91a496acc732e47387349a4de73218c689151804a6e23d20cfd02f6
//construct 
class Person{
    constructor(name){
      this.name = name;
    }
  }
  
  function TopObj(){
    this.age = 27;
  }
  
  // 3rd parameter can overwrite args passing in constructor
  let person = Reflect.construct(Person, ['Max'], TopObj);
  // let person = new Person('Max'); 
  // console.log(person.__proto__ == TopObj.prototype); //<== Ugly
  console.log(Reflect.getPrototypeOf(person) == Person.prototype); // Much nicer

  // accessing properties with Reflect
  class Person{
    constructor(name, age){
      this._name = name;
      this.age = age; 
    }
    
    get name(){
      return this._name;
    }
    
    set name(value){
      this._name = value;
    }
  }
  
  let mum = {
    _name : 'Mum'
  }
  
  let person = new Person('max', 27);
  Reflect.set(person, 'name', 'Anna', mum);
  console.log(mum);
  console.log(Reflect.get(person,'name', mum));
  
  //apply
  class Person{
    constructor(){
    }
  }
  
  let person = new Person();
  Person.prototype.age = 27;
  
  let proto = {
     age : 30,
     greet(){
       alert('hello')
     }
  }
              
  Reflect.setPrototypeOf(person, proto);
  Reflect.apply(person.greet, null, []); // alert hello
  Reflect.deleteProperty(target, 'foo');

//Proxy API
//Summary
// 代理和反射
// 　　調用new Proxy()可創建代替其他目標(target)對象的代理，它虛擬化了目標，所以二者看起來功能一致
// 　　代理可以攔截JS引擎內部目標的底層對象操作，這些底層操作被攔截後會觸發響應特定操作的陷阱函數
// 　　反射API以Reflect對象的形式出現，對象中方法的默認特性與相同的底層操作一致，而代理可以覆寫這些操作，
//     每個代理陷阱對應一個命名和參數都相同的Reflect方法。下表總結了代理陷阱的特性

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
