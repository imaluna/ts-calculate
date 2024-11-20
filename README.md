# calculate-js

calculate-js is a commonly used calculator written by JavaScript, including calculations related to finance, statistics, etc.

[![npm version](https://img.shields.io/npm/v/calculate-js.svg)](https://www.npmjs.com/package/calculate-js)
[![npm downloads](https://img.shields.io/npm/dw/calculate-js)](https://www.npmjs.com/package/calculate-js)
[![CDNJS](https://img.shields.io/cdnjs/v/calculate-js.svg)](https://cdnjs.com/libraries/calculate-js)

## Load

The library is the single JavaScript file decimal.js or ES module decimal.mjs.

**Browser:**

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/calculate-js/1.0.0/lib/index.umd.js"></script>
```

**node:**

```bash
$ npm install calculate-js --save
# or
$ yarn add calculate-js
# or
$ pnpm add calculate-js
# or
$ bun add calculate-js
```

### How to use

```js
import { fvInDfc } from 'calculate-js';
fvInDfc({
	n: 20,
	pv: 0,
	pmt: 1000,
	rate: 8
});
// return: -45761.9643
```

## Features

1.
2. Includes a TypeScript declaration file: lib/index.d.ts

## API

- [fvInDfc](#fvindfcparameters)
- [pvInDfc](#pvindfcparameters)
- [rateInDfc](#rateindfcparameters)
- [pmtInDfc](#pmtindfcparameters)
- [npvInDfc](#npvindfcparameters)
- [irrInDfc](#irrindfcparameters)
- [pmtInloan](#pmtinloanparameters)
- [repaymentScheduleInLoan](#repaymentscheduleinloanparameters)
- [principalInLoan](#principalinloanparameters)
- [interestInLoan](#interestinloanparameters)
- [totalInterestInLoan](#totalinterestinloanparameters)
- [mean](#meandata-decimal)
- [variance](#variancedata-decimal)
- [stdDeviation](#stddeviationdata-decimal)
- [varianceOfSample](#varianceofsampledata-decimal)
- [stdDeviationOfSample](#stddeviationofsampledata-decimal)
- [semiDeviation](#semideviationdata-decimal)
- [semiDeviation](#stdnormaldistributionvaluezscore)

### fvInDfc(Parameters)

Get the future value of annuity in discounted cash flow model

**Examples**

```js
import { fvInDfc } from 'calculate-js';
fvInDfc({
	n: 20,
	pv: 0,
	pmt: 1000,
	rate: 8
});
// return: -45761.9643
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | Total Number of payment periods  | Number  | ||
| pv      | The present value    | Number  |   ||
| pmt     | Payment per period   | Number  |   ||
| rate    | The interest rate per period；If the real interest rate is 8%, the return is 8 | Number  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||
| isEnd   | Prepaid Annuity or Ordinary Annuity;If true, it's Ordinary Annuity   | Boolean | \<optional\>      | true |

#### Returns
Type:  Number



### pvInDfc(Parameters)
Get the present value of annuity in discounted cash flow model

**Examples**

```js
import { pvInDfc } from 'calculate-js';
pvInDfc({
	n: 20,
	fv: 50000,
	pmt: 1000,
	rate: 8
});
// return: -15465.56
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | Total Number of payment periods  | Number  | ||
| fv      | The future value    | Number  |   ||
| pmt     | Payment per period   | Number  |   ||
| rate    | The interest rate per period；If the real interest rate is 8%, the return is 8 | Number  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||
| isEnd   | Prepaid Annuity or Ordinary Annuity;If true, it's Ordinary Annuity   | Boolean | \<optional\>      | true |

#### Returns
Type:  Number





### pmtInDfc(Parameters)
Get the payment of annuity in discounted cash flow model

**Examples**

```js
import { pmtInDfc } from 'calculate-js';
pmtInDfc({
	n: 20,
	fv: 50000,
	pv:  -15465.56
	rate: 8
});
// return: 1000
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | Total Number of payment periods  | Number  | ||
| fv      | The future value    | Number  |   ||
| pv     | The present value     | Number  |   ||
| rate    | The interest rate per period；If the real interest rate is 8%, the return is 8 | Number  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||
| isEnd   | Prepaid Annuity or Ordinary Annuity;If true, it's Ordinary Annuity   | Boolean | \<optional\>      | true |

#### Returns
Type:  Number


###  rateInDfc(Parameters)

Get the interest rate per period in discounted cash flow model.If the return is 8, the real interest rate is 8%.

**Examples**
```js
import { rateInDfc } from 'calculate-js';
rateInDfc({
	n: 20,
	fv: 50000,
	pv: -15465.56,
	pmt: 1000
});
// return: 8
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | Total Number of payment periods  | Number  | ||
| fv      | The future value    | Number  |   ||
| pv     | The present value    | Number  |   ||
| pmt     | Payment per period   | Number  |   ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||
| isEnd   | Prepaid Annuity or Ordinary Annuity;If true, it's Ordinary Annuity   | Boolean | \<optional\>      | true |

#### Returns
Type:  Number

###  npv(Parameters)

Get the Net Present Value in discounted cash flow model.

**Examples**
```js
import { npv } from 'calculate-js';
npv({
	initCf: -1000,
	cfList: [500, 500, 500],
	rate: 336.506
});
// return: 8
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| initCf  | The initial cash flow | Number  | ||
| cfList      | Cash flow list    | Array\<Number\> |   ||
| rate |  The interest rate per period | Number  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number



###  irr(Parameters)

Get the Net Present Value in discounted cash flow model. It'll return an array of all posible values

**Examples**
```js
import { irr } from 'calculate-js';
irr({
	initCf: -1000,
	cfList: [500, 500, 500],
});
// return: [23.3752]
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| initCf  | The initial cash flow | Number  | ||
| cfList      | Cash flow list    | Array\<Number\> |   ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Array\<Number\>


###  pmtInloan(Parameters)

Get the payment per period of the loan.

**Examples**

If you secure a loan of \$3,000,000 with a 30-year term, a monthly repayment schedule, an annual interest rate of 5%, and a repayment method of equal repayment, you will be required to make a monthly repayment of \$16,104.65.

```js
import { pmtInloan } from 'calculate-js';
pmtInloan({
	principal: 3000000,
	rate: 5/12,
	periods: 30 * 12,
	isEqualPayment: true,
	decimal: 2
})
// return: 16104.65
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | The Principle of the loan | Number  | ||
| rate      | The interst rate of every period;    | Number|   ||
| periods | Number of loan terms  | Number  |        |   ||
|isEqualPayment|The repayment method;If true, it's Fixed Repayment Loan; If false, it's Equal Principal Payment Loan|Boolean|\<optional\> |true|
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||
#### Returns
Type:  Number


###  repaymentScheduleInLoan(Parameters)

Get the repayment schedule in the loan

**Examples**

If you secure a loan of \$3,000,000 with a 30-year term, a monthly repayment schedule, an annual interest rate of 5%, and a repayment method of equal repayment,return the repayment schedule list

```js
import { repaymentScheduleInLoan } from 'calculate-js';
repaymentScheduleInLoan({
	principal: 30000,
	rate: 0.6,
	periods: 4,
	isEqualPayment: true,
	decimal: 2
});
// return: 
/** [
 {"currentPeriod":1,"principal":7432.84,"interest":180,"repayment":7612.84},
 {"currentPeriod":2,"principal":7477.44,"interest":135.4,"repayment":7612.84},
 {"currentPeriod":3,"principal":7522.3,"interest":90.54,"repayment":7612.84},
 {"currentPeriod":4,"principal":7567.44,"interest":45.4,"repayment":7612.84}]
 **/
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | The Principle of the loan | Number  | ||
| rate      | The interst rate of every period;    | Number|   ||
| periods | Number of loan terms  | Number  |        |   ||
|isEqualPayment|The repayment method;If true, it's Fixed Repayment Loan; If false, it's Equal Principal Payment Loan|Boolean|\<optional\> |true|
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Array\<Object\>
| Name    | Description  | Type    | 
| :------ | :----------- | :------ |
| currentPeriod| The current period of the loan | Number|
|repayment|The Repayment amount for the current period of the loan|Number|
|principal|The Principal for the current period of the loan|Number|
|interest| The Interest for the current period of the loan|Number|


###  principalInLoan(Parameters)

Get the Princial for the current period of the loan

**Examples**

```js
import { principalInLoan } from 'calculate-js';
principalInLoan({
	principal: 30000,
	rate: 0.6,
	periods: 4,
	currentPeriod: 2,
	isEqualPayment: true,
	decimal: 2
}); 
// return:  7477.44
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | The Principle of the loan | Number  | ||
| rate      | The interst rate of every period;    | Number|   ||
| periods | Number of loan terms  | Number  |        |   ||
| currentPeriod| The current period of the loan | Number|||
|isEqualPayment|The repayment method;If true, it's Fixed Repayment Loan; If false, it's Equal Principal Payment Loan|Boolean|\<optional\> |true|
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number


###  interestInLoan(Parameters)

Get the Interest for the current period of the loan

**Examples**

```js
import { interestInLoan } from 'calculate-js';
interestInLoan({
	principal: 30000,
	rate: 0.6,
	periods: 4,
	currentPeriod: 2,
	isEqualPayment: true,
	decimal: 2
}); 
// return:  135.4
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | The Principle of the loan | Number  | ||
| rate      | The interst rate of every period;    | Number|   ||
| periods | Number of loan terms  | Number  |        |   ||
| currentPeriod| The current period of the loan | Number|||
|isEqualPayment|The repayment method;If true, it's Fixed Repayment Loan; If false, it's Equal Principal Payment Loan|Boolean|\<optional\> |true|
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number




### totalInterestInLoan(Parameters)

Get the total interest amount of the loan

**Examples**

```js
import { totalInterestInLoan } from 'calculate-js';
totalInterestInLoan({
	principal: 30000,
	rate: 0.6,
	periods: 4,
	isEqualPayment: true,
	decimal: 2
}); 
// return:  451.36
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | The Principle of the loan | Number  | ||
| rate      | The interst rate of every period;    | Number|   ||
| periods | Number of loan terms  | Number  |        |   ||
|isEqualPayment|The repayment method;If true, it's Fixed Repayment Loan; If false, it's Equal Principal Payment Loan|Boolean|\<optional\> |true|
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number



###  mean(data, [decimal])

Get the mean of a list of number

**Examples**

```js
import { mean } from 'calculate-js';
mean(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return:  5.5
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number


###  variance(data, [decimal])

Get the variance of a list of number

**Examples**

```js
import { variance } from 'calculate-js';
variance(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 8.25
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number


###  stdDeviation(data, [decimal])

Get the standard deviation of population

**Examples**

```js
import { stdDeviation } from 'calculate-js';
stdDeviation(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 2.87
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number



###  varianceOfSample(data, [decimal])

Get the variance of sample

**Examples**

```js
import { varianceOfSample } from 'calculate-js';
varianceOfSample(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 9.17
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number


###  stdDeviationOfSample(data, [decimal])

Get the standard deviation of sample

**Examples**

```js
import { stdDeviationOfSample } from 'calculate-js';
stdDeviationOfSample(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 3.03
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number



###  semiDeviation(data, target, [decimal])

Get the target/down deviation of sample

**Examples**

```js
import { semiDeviation } from 'calculate-js';
semiDeviation(
	[1,2,3,4,5,6,7,8,9,10],
	3,
	2
); 
// return: 4.01
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| data | A list of number | Array\<Number\>  | ||
|target|The target for the list|Number|||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Number


###  stdNormalDistributionValue(zScore)

Get the standard normal distribution value by z-score

**Examples**

```js
import { stdNormalDistributionValue } from 'calculate-js';
stdNormalDistributionValue(1.24); //  0.89251
stdNormalDistributionValue(-1.24); //  0.10749
stdNormalDistributionValue(0);// 0.5
```

#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| zScore | z-score| Number  | ||

#### Returns
Type:  Number


## Test

To run the tests using Node.js from the root directory:

```bash
npm run test
```
