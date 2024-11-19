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



####  rateInDfc(Parameters)

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

####  npv(Parameters)

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



####  irr(Parameters)

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


####  pmtInloan(Parameters)

Get the payment per period in loan

**Examples**
```js
import { pmtInloan } from 'calculate-js';
pmtInloan({
	principal: 3000000,
	rate: 5,
	periodPerYear: 12,
	years: 30,
	isEqualPayment: true,
	decimal: 2
})
// return: 16104.65
```
#### Parameters

| Name    | Description  | Type    | Attributes | Default |
| :------ | :----------- | :------ | :--------- | :------ |
| initCf  | The initial cash flow | Number  | ||
| cfList      | Cash flow list    | Array\<Number\> |   ||
| decimal | Reserved decimal places for results  | Number  | \<optional\>        | 4  ||

#### Returns
Type:  Array\<Number\>

## Test

To run the tests using Node.js from the root directory:

```bash
npm run test
```
