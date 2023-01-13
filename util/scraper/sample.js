import scrape from 'website-scraper'; // only as ESM, no CommonJS
const options = {
  urls: ['http://loan.jtchinae-bank.co.kr/popup/pop_identify_comfirm.do?archivesSeq=pop_identify_comfirm4'],
  directory: 'jtchinae-bank'
};

// with async/await
const result = await scrape(options);

// with promise
scrape(options).then((result) => {});