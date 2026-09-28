---
weight: 48
title: Logic
layout: redirect
---

This category contains the following blocks:

<table>
<colgroup>
<col style="width: 30%; text-align: start;">
<col style="width: 70%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Block Name</th>
<th scope="col">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#and">AND</a></td>
<td><span>Performs a logical 'and' on the inputs.</span>
</td>
</tr>
<tr>
<td><a href="#not">NOT</a></td>
<td><span>Performs a logical 'not' on the input.</span>
</td>
</tr>
<tr>
<td><a href="#or">OR</a></td>
<td><span>Performs a logical 'or' on the inputs.</span>
</td>
</tr>
</tbody>
</table>

### AND

`apama.analyticskit.blocks.core.And`

<p>Performs a logical 'and' on the inputs.</p>
<p>If all the connected inputs are <tt>true</tt>, then the output is <tt>true</tt>, else <tt>false</tt>. If any of the inputs is of type <tt>pulse</tt>, then the output is a <tt>pulse</tt>. Any combination of <tt>pulse</tt> and <tt>boolean</tt> inputs is valid. The block functions even if some inputs are not connected.</p>


#### Input Port Details {#and-inputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Value 1</th>
<td><span>First input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 2</th>
<td><span>Second input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 3</th>
<td><span>Third input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 4</th>
<td><span>Fourth input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 5</th>
<td><span>Fifth input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#and-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">AND</th>
<td><span>The logical 'and' of the inputs.</span>
</td>
<td><span>pulseOrBoolean(value1, value2, value3, value4, value5)</span>
</td>
</tr>
</tbody>
</table>


### NOT

`apama.analyticskit.blocks.core.Not`

<p>Performs a logical 'not' on the input.</p>
<p>If the connected input is <tt>true</tt>, the output is <tt>false</tt>. If the connected input is <tt>false</tt>, the output is <tt>true</tt>.</p>


#### Input Port Details {#not-inputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Value</th>
<td><span>Input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#not-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">NOT</th>
<td><span>The logical 'not' of the input.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>


### OR

`apama.analyticskit.blocks.core.Or`

<p>Performs a logical 'or' on the inputs.</p>
<p>If any of the connected inputs is <tt>true</tt>, the output is <tt>true</tt>, else <tt>false</tt>. If all the inputs are of type <tt>pulse</tt>, the output is a <tt>pulse</tt>. Inputs must be of the same type. The block functions even if some inputs are not connected.</p>


#### Input Port Details {#or-inputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Value 1</th>
<td><span>First input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 2</th>
<td><span>Second input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 3</th>
<td><span>Third input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 4</th>
<td><span>Fourth input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
<tr>
<th scope="row">Value 5</th>
<td><span>Fifth input value to the block.</span>
</td>
<td><span>boolean</span>
</td>
</tr>
</tbody>
</table>

#### Output Port Details {#or-outputs}

<table>
<colgroup>
<col style="width: 15%; text-align: start;">
<col style="width: 60%; text-align: start;">
<col style="width: 25%; text-align: start;">
</colgroup>
<thead>
<tr>
<th scope="col">Name</th>
<th scope="col">Description</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">OR</th>
<td><span>The logical 'or' of the inputs.</span>
</td>
<td><span>sameAsAll(value1, value2, value3, value4, value5)</span>
</td>
</tr>
</tbody>
</table>

