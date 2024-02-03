## Question 1 - Algorithm
There is a large pile of socks that must be paired by color. Given an array of integers
representing the color of each sock, determine how many pairs of socks with matching colors
there are.
### Example
There is one pair of color and one of color. There are three odd socks left, one of each color.
The number of pairs is .

### Function Description
Complete the sockMerchant function in the editor below.
sockMerchant has the following parameter(s):
* int n: the number of socks in the pile
* int ar[n]: the colors of each sock

#### Returns
* int: the number of pairs

#### Input Format
The first line contains an integer , the number of socks represented in.
The second line contains space-separated integers, the colors of the socks in the pile.

#### Constraints
* 1 <= n <= 100
* 1 <= ar[i] <= 100 where 0 <= i < n
* Sample Input - sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20])
n = 9
ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]
* Sample Output
3

## Question 1 - Solution
```
function sockMerchant(arrCount: number, arr: number[]): number {

    const colorDictionary: { [key: number]: number } = {}; 

    for (let x = 0; x < arrCount; x++) {
        colorDictionary[arr[i]] = (colorDictionary[arr[i]] || 0) + 1;
    }

    let colorPairCount = 0;
    for (const count of Object.values(colorDictionary)) {
        colorPairCount += Math.floor(count / 2);
    }

    return colorPairCount;
}

```

## Explaination
So, here I used a map to get the occurance rate of each of the items in the given array, then in the second loop, I check the values of the map to know how many pairs occured in them.
