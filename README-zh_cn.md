# calculate-js

一个由JavaScript编写的常用计算器，包括与金融、统计等相关的计算。


## 引入

The library is the single JavaScript file decimal.js or ES module decimal.mjs.

**cdn**

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/calculate-js/1.0.0/lib/calculate.min.js"></script>
```

**node**

```bash
$ npm install calculate-js --save
# or
$ yarn add calculate-js
# or
$ pnpm add calculate-js
# or
$ bun add calculate-js
```


## 使用

按需调用

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

全局

```js
calculatejs.fvInDfc({
	n: 20,
	pv: 0,
	pmt: 1000,
	rate: 8
});
```

## 特性

1. 方法
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
- [bankersRounding](#bankersroundingnumber-decimal)

2. 提供一个 ts 类型申明文件：lib/index.d.ts

## API

### fvInDfc(Parameters)

在现金流折现模型下计算年金的未来价值

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | 总期数  | Number  | ||
| pv      | 现值    | Number  |   ||
| pmt     | 每期支付金额   | Number  |   ||
| rate    | 每期利率；如果真实利率为8%, 则输入8 | Number  | ||
| decimal | 小数保留位数  | Number  | 可选       | 4  ||
| isEnd   | 先付年金或后付年金; 如果为true, 则为后付年金   | Boolean | 可选    | true |

###  返回值
Type:  Number


### pvInDfc(Parameters)

在现金流折现模型下计算年金的现值

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | 总期数  | Number  | ||
| fv      | 未来价值    | Number  |   ||
| pmt     | 每期支付金额   | Number  |   ||
| rate    | 每期利率；如果真实利率为8%, 则输入8 | Number  | ||
| decimal | 小数保留位数  | Number  | 可选       | 4  ||
| isEnd   | 先付年金或后付年金; 如果为true, 则为后付年金   | Boolean | 可选    | true |

###  返回值
Type:  Number



### pmtInDfc(Parameters)
在现金流折现模型下计算年金每期支付金额

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | 总期数  | Number  | ||
| fv      | 未来价值    | Number  |   ||
| pv      | 现值   | Number  |   ||
| rate    | 每期利率；如果真实利率为8%, 则输入8 | Number  | ||
| decimal | 小数保留位数  | Number  | 可选       | 4  ||
| isEnd   | 先付年金或后付年金; 如果为true, 则为后付年金   | Boolean | 可选    | true |


###  返回值
Type:  Number


###  rateInDfc(Parameters)
在现金流折现模型下计算年金的每期利率；如果真实利率为8%, 则输入8

**示例**
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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| n       | 总期数  | Number  | ||
| fv      | 未来价值    | Number  |   ||
| pv      | 现值   | Number  |   ||
| pmt     | 每期支付金额   | Number  |   ||
| decimal | 小数保留位数  | Number  | 可选       | 4  ||
| isEnd   | 先付年金或后付年金; 如果为true, 则为后付年金   | Boolean | 可选    | true |


###  返回值
Type:  Number


###  npv(Parameters)
在现金流折现模型下计算净现值

**示例**
```js
import { npv } from 'calculate-js';
npv({
	initCf: -1000,
	cfList: [500, 500, 500],
	rate: 336.506
});
// return: 8
```
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
|initCf   | 初始现金流  | Number  | ||
| cfList  | 剩余每期现金流列表    | Array\<Number\>  |   ||
| rate    | 每期利率；如果真实利率为8%, 则输入8| Number  | ||
| decimal | 小数保留位数  | Number  | 选填       | 4  ||


###  返回值
Type:  Number


###  irr(Parameters)
在现金流折现模式下计算内部收益率，可能有多个计算结果，会返回所有可能的值

**示例**
```js
import { irr } from 'calculate-js';
irr({
	initCf: -1000,
	cfList: [500, 500, 500],
});
// return: [23.3752]
```
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
|initCf   | 初始现金流  | Number  | ||
|cfList  | 剩余每期现金流列表    | Array\<Number\>  |   ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||


###  返回值
Type:  Array\<Number\>


###  pmtInloan(Parameters)
计算贷款中的每期支付金额

**示例**
如果你申请了一笔3000,000元贷款，还款期限为30年，年利率为5%，每月还款，等额本息，你每月还款金额为16104.65元。

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
### 参数
| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | 贷款本金 | Number  | ||
| rate      | 每期还款利率    | Number|   ||
| periods | 总期数 | Number  |        |   ||
|isEqualPayment|是否为等额本息贷款，true-等额本息，false-等额本金 |Boolean|选填 |true|
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

**说明**

等额本息：每期还款金额一样
等额本金：每期还款本金一样

###  返回值
Type:  Number


###  repaymentScheduleInLoan(Parameters)

计算还款计划列表

**示例**

如果你申请了一笔30,000元贷款，还款期限为4个月，年化利率为5%，每月还款，等额本息，下面为你的还款计划：

```js
import { repaymentScheduleInLoan } from 'calculate-js';
repaymentScheduleInLoan({
	principal: 30000,
	rate: 5/12,
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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | 贷款本金 | Number  | ||
| rate      | 每期还款利率    | Number|   ||
| periods | 总期数 | Number  |        |   ||
|isEqualPayment|是否为等额本息贷款，true-等额本息，false-等额本金 |Boolean|选填 |true|
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Array\<Object\>

| 参数名    | 描述  | 类型    |
| :------ | :----------- | :------ |
| currentPeriod| 当前期数 | Number|
|repayment|该期还款金额|Number|
|principal|该期还款本金|Number|
|interest| 该期还款利息|Number|


###  principalInLoan(Parameters)

计算某期的还款本金

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | 贷款本金 | Number  | ||
| rate      | 每期还款利率    | Number|   ||
| periods | 总期数 | Number  |        |   ||
| currentPeriod| 当期期数 | Number|||
|isEqualPayment|是否为等额本息贷款，true-等额本息，false-等额本金 |Boolean|选填 |true|
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number


###  interestInLoan(Parameters)

计算某期的还款利息

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | 贷款本金 | Number  | ||
| rate      | 每期还款利率    | Number|   ||
| periods | 总期数 | Number  |        |   ||
| currentPeriod| 当期期数 | Number|||
|isEqualPayment|是否为等额本息贷款，true-等额本息，false-等额本金 |Boolean|选填 |true|
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number




### totalInterestInLoan(Parameters)

计算贷款总利息

**示例**

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
### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| principal | 贷款本金 | Number  | ||
| rate      | 每期还款利率    | Number|   ||
| periods | 总期数 | Number  |        |   ||
|isEqualPayment|是否为等额本息贷款，true-等额本息，false-等额本金 |Boolean|选填 |true|
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number



###  mean(data, [decimal])

计算一组数据的平均数

**示例**

```js
import { mean } from 'calculate-js';
mean(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return:  5.5
```
### 参数
| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||


###  返回值
Type:  Number


###  variance(data, [decimal])

计算一组数据的方差

**示例**

```js
import { variance } from 'calculate-js';
variance(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 8.25
```

### 参数

### 参数
| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||



###  返回值
Type:  Number


###  stdDeviation(data, [decimal])

计算一组数据的标准差
**示例**

```js
import { stdDeviation } from 'calculate-js';
stdDeviation(
  [1,2,3,4,5,6,7,8,9,10],
  2
); 
// return: 2.87
```

### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||


###  返回值
Type:  Number


###  varianceOfSample(data, [decimal])

计算一组数据的样本方差

**示例**

```js
import { varianceOfSample } from 'calculate-js';
varianceOfSample(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 9.17
```

### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number


###  stdDeviationOfSample(data, [decimal])

计算一组数据的样本标准差

**示例**

```js
import { stdDeviationOfSample } from 'calculate-js';
stdDeviationOfSample(
	[1,2,3,4,5,6,7,8,9,10],
	2
); 
// return: 3.03
```

### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number



###  semiDeviation(data, target, [decimal])

计算一组数据的下行/半标准差

**示例**

```js
import { semiDeviation } from 'calculate-js';
semiDeviation(
	[1,2,3,4,5,6,7,8,9,10],
	3,
	2
); 
// return: 4.01
```

### 参数

| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| data | 一组数据 | Number  | ||
|target|目标|Number|||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number


###  stdNormalDistributionValue(zScore)

在标准正态分布表中查询z分数对应的概率

**示例**

```js
import { stdNormalDistributionValue } from 'calculate-js';
stdNormalDistributionValue(1.24); //  0.89251
stdNormalDistributionValue(-1.24); //  0.10749
stdNormalDistributionValue(0);// 0.5
```

### 参数
| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| zScore | z分数| Number  | ||

###  返回值
Type:  Number


###  bankersRounding(number, decimal)

银行家输入法
**rules**
如何用银行家舍入法对数字进行四舍五舍五入，当要四舍五进的数字（四舍五位数字）后面跟着1、2、3和4时，将数字向下四舍五取；当后面跟着6、7、8和9时，将数字四舍五入。但是，对于后跟5的数字，舍入方向根据5后的数字确定：

当5后面有数字时，入。
当5后面没有数字时：
如果它是5之前的奇数，舍掉。
如果它是5之前的偶数，舍掉。

**查看更多 👉🏻 [banker's rounding](https://docs.alipayplus.com/alipayplus/alipayplus/reconcile_mpp/bank_rounding?role=MPP&product=Payment1&version=1.5.5)**

**示例**

```js
import { bankersRounding } from 'calculate-js';
calculatejs.bankersRounding(5.234, 2); // 5.23
calculatejs.bankersRounding(5.235, 2); //  5.24
calculatejs.bankersRounding(5.245, 2); //  5.24
calculatejs.bankersRounding(5.2352, 2); // 5.24

```

### 参数
| 参数名    | 描述  | 类型    | 属性 | 默认值 |
| :------ | :----------- | :------ | :--------- | :------ |
| number | 需要被处理的数据 | Number  | ||
|decimal | 小数保留位数  | Number  | 可选       | 4  ||

###  返回值
Type:  Number

