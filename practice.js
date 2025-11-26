// // Write a function (any language you prefer) that returns true if a str is a palindrome, but don’t use any built-in reverse functions.

// function isPalindrome(str) {
//   str = str.trim();
//   let isPalindrome;
//   for (let i = 0; i < str.length / 2; i++) {
//     if (str[i] == str[str.length - i - 1]) {
//       isPalindrome = true;
//     } else isPalindrome = false;
//   }
//   console.log(str);
//   return isPalindrome;
// }

// console.log(isPalindrome(''));

// Write a simple function that prints the first N Fibonacci numbers without recursion and without built-ins that generate sequences.
// function fibonacci(n) {
//   let a = 0;
//   let b = 1;
//   const series = [];
//   const seriesNext = [0, 1];

//   if (n == 1) {
//     series.push(a);
//     return series;
//   }

//   if (n == 2) {
//     series.push(a, b);
//     return series;
//   }

//   for (let i = 2; i < n; i++) {
//     const next = a + b;
//     a = b;
//     b = next;
//     seriesNext.push(next);
//   }
//   return seriesNext;
// }
// console.log(fibo acci(6));

// Suppose you have a list of numbers. Write logic to find the second largest number without using sorting.
function findSecondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const currentNum = arr[i];
    if (currentNum > first) {
      second = first;
      first = currentNum;
    } else if (currentNum > second && currentNum < first) {
      second = currentNum;
    }
  }
  console.log(first);
  return second;
}

console.log(findSecondLargest([44, 10, 56, 89, 100, 66, 97]));
