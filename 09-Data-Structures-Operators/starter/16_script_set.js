'use strict';

//Sets

const orderSet = new Set(['Pasta','Pizza','Pizza','Risotto','Pizza']);
console.log(orderSet);

//String as Characters
console.log(new Set('Ball'));

//Size
console.log(orderSet.size);

console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
console.log(orderSet);
console.log(orderSet[0]);

//Retrieve value from set
for (const order of orderSet) console.log(order);

//Clear value
orderSet.clear();
console.log(orderSet);

const staff = ['Waiter','Chef','Waiter','Manager','Chef','Waiter'];
const staffUnique = new Set(staff);
const staffUniqueArray = [...new Set(staff)];
console.log(staffUnique);
console.log(staffUniqueArray);

//Size of set
console.log(staffUnique.size);

console.log(new Set('Bally').size);