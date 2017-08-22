// function funky(o){
//   o = null
// }
//
// var x = [];
// funky(x);
// console.log(x); // what is x? answer: []
//---------------------------------------------

// function swap(a, b) {
//   var temp = a;
//   a = b;
//   b = temp;
// }
//
// var x = 1, y = 2;
// swap(x, y);
// console.log(x); // what is x? 1
//----------------------------------------------

// Write three binary functions, add, sub, and mul, that take two numbers and return their sum, difference, and product.
// add(3, 4) --> 7
// sub(3, 4) --> -1
// mul(3, 4) --> 12

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

//----------------------------------------------------


// Write a function identityf that takes an argument and returns a function that returns that argument.
// var three = identityf(3);
// three() --> 3

function identityf(x) {
  return function() {
    return x;
  };
}
var three = identityf(3)
console.log(three);
//********************************* ADDS FROM TWO INVOCATIONS **************************

// Write a function addf that adds from two invocations
// addf(3)(4) --> 7

function addf(first) {
  return function(second) {
    return first + second
  }
}
// var result = addf(3)(4)
// console.log(result);

//********************** BINARY FUNCTION / TWO INVOCATIONS **********************

// Write a function liftf that takes a binary function , and makes it callable with two invocations
// var addf = liftf(add);
// addf(3)(4) --> 7

function liftf(binary) {
  return function(first) {
    return function(second) {
      return binary(first, second);
    };
  };
}

//****************************** CURRYING FUNCTION ******************************
// Write a function curry that takes in a binary function & returns a function that can take a second argument.


function curry(binary, first) {
  return function(second) {
    return binary(first, second);
  };
}
// var add3 = curry(add, 3);
// add3(4) --> 7

//*********************** 3 WAYS TO CREATE A FUNCTION *************************************

// Without writing any new functions, show three ways to create the inc function.
// var inc = ___;
// inc(5) --> 6
// inc(inc(5)) --> 7
var inc = addf(1);
 inc = liftf(add)(1);
 inc = curry(add, 1);

//*************************** TWICE FUNCTION / DOUBLE **********************************

// Write a function TWICE that takes a binary function & returns a unary function that passes its argument to the binary function twice.

function twice(binary) {
  return function(a) {
    return binary(a, a)
  }
}
//add(11, 11) // 22
var doubl = twice(add);
doubl(11) // 22

var square = twice(mul)
console.log(square(11)); //121

//**************************** REVERSE FUNCTION *********************************

// Write a function that reverse the arguments of a binary function.

function reverse(binary) {
  return function(first, second) {
    return binary(second, first)
  }
}

var bus = reverse(sub)
console.log(bus(3, 2)); // -1

// function reverse(func) {
//   return function(...args) {
//     return func(...args.reverse())
//   }
// }

//**************** UNARY FUNCTION/ SQUARE EXAMPLE **************************************

// Write a function composeu that takes two unary functions & returns a unary function that calls them both.

function composeu(doubl, square) {
  return function(a) {
    return square(doubl(a));
  }
}

console.log(composeu(doubl, square)(5)); // 100

// ***************************** 2 BINARY FUNCTION ****************************************

// Write a function composeb that takes two binary functions & returns a function that call them both.
function composeb(add, mul) {
  return function(a, b, c) {
    return mul(add(a, b), c);
  };
}

console.log(composeb(add, mul)(2,3,7)); // 35

//***************************** LIMITED TIME CALLED ************************************

// Write a limit function that allows a binary function to be called a limited numbers of times.

function limit(binary, count) {
  return function(a, b) {
    if (count >= 1) {
      count -= 1;
      return binary(a, b);
    }
    return undefined;
  }
}

var add_ltd = limit(add, 1);
console.log(add_ltd(3, 4)); // 7
console.log(add_ltd(3, 5)); // undefined



// Challenge 4
//**************************** GENERATE INCREMENT VALUES *******************************************

// Write a from function that produces a generator that will produce a series of values
function from(start) {
  return function() {
    var next = start;
    start += 1;
    return next;
  };
}

var index = from(0);
console.log(index()); // 0
console.log(index()); // 1
console.log(index()); // 2

//***************** TAKES GENERATE FUNCTION AND CREATES END VALUE ****************

// Write a to function that takes a generator and an end value, and returns a generator that will produce numbers up to that limit.

function to(gen, end) {
  return function() {
    var value = gen();
    if (value < end) {
      return value;
    }
    return undefined;
  }
}

var index = to(from(1), 3);
console.log(index()); // 1
console.log(index()); //2
console.log(index()); // undefined

//*************************** 2 GENERATE ARGUMENT ******************************

// Write a fromTo function that produces a generator that will produce values in a range.

function fromTo(start, end) {
  return to(from(start), end);
}

var index = fromTo(0, 3);
console.log(index()); //0
console.log(index()); //1
console.log(index()); //2
console.log(index()); //undefined

//********************** ARRAY | GENERATOR ARGUMENT ****************************

// Write an element function that takes an array and a generator and returns a generator that will produce elements from the array.
function element(array, gen) {
  return function() {
    var index = gen();
    if (index !== undefined) {
      return array[index];
    }
  }
}

var ele = element(['a','b','c','d'], fromTo(1, 3));
console.log(ele()); // 'b'
console.log(ele()); // 'c'
console.log(ele()); // undefined

//******************************************************************************

// Modify the element function so that the generator argument is optional. If a generator is not provided, then each of the elements of the array will be produced.
function element(array, gen) {
  if (gen === undefined) {
    gen = fromTo(0, array.length);
  }
  return function() {
    var index = gen();
    if (index !== undefined) {
      return array[index];
    }
  };
}

var ele = element(['a','b','c','d'])
console.log(ele) // 'a';
console.log(ele) // 'b';
console.log(ele) // 'c';
console.log(ele) // 'd';
console.log(ele) // undefined;

//****************************************************************************
