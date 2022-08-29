const json = require('./data.json');

const monthNamesThai = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const monthNamesEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const events = [];

const fileName = 'fileName';
const createFile = false;

let vacation = 0
let work = 0
let decision = 0

json.map((data) => {
  data.date.map((date) => {
    if (date.plus - date.minus <= 0) {
      const year = data.month.split(' ')[1] - 543;
      const monthIndex = monthNamesThai.findIndex((e) => e == data.month.split(' ')[0]);
      const day = date.day;

      const event = {
        title: 'ZEN - Vacation 🏝',
        description: `${date.plus - date.minus} = ${date.plus} - ${date.minus}`,
        start: [year, monthIndex + 1, parseInt(day)],
        duration: { hours: 24 },
      };

      vacation = vacation += 1;
      events.push(event);
    } else if (date.plus - date.minus > 0 && date.plus > 10) {
      const year = data.month.split(' ')[1] - 543;
      const monthIndex = monthNamesThai.findIndex((e) => e == data.month.split(' ')[0]);
      const day = date.day;

      const event = {
        title: 'ZEN - WORKING 💻',
        description: `${date.plus - date.minus} = ${date.plus} - ${date.minus}`,
        start: [year, monthIndex + 1, parseInt(day)],
        duration: { hours: 24 },
      };

      work = work += 1;
      // events.push(event);
    } else {
      const year = data.month.split(' ')[1] - 543;
      const monthIndex = monthNamesThai.findIndex((e) => e == data.month.split(' ')[0]);
      const day = date.day;

      const event = {
        title: 'ZEN - Decision 🍀',
        description: `${date.plus - date.minus} = ${date.plus} - ${date.minus}`,
        start: [year, monthIndex + 1, parseInt(day)],
        duration: { hours: 24 },
      };

      decision = decision += 1;
      // events.push(event);
    }
  });
});

console.log(`ZEN - Vacation 🏝 => ${vacation} days`);
console.log(`ZEN - WORKING 💻 => ${work} days`);
console.log(`ZEN - Decision 🍀 => ${decision} days`);

if (createFile) {
  const ics = require('ics');
  const { writeFileSync } = require('fs');
  
  try {
    const ical = ics.createEvents(events).value;
    writeFileSync(`${__dirname}/${fileName}.ics`, ical);
  } catch (error) {
    throw error;
  }
}
