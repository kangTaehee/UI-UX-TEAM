import scrape from 'website-scraper'; // only as ESM, no CommonJS
const options = {
  urls: ['https://festival419.org/default/01/01.php?topmenu=1&left=1'],
  urlFilter: (url) => url.startsWith('https://festival419.org'), // Filter links to other websites 필터가 없으면 외부 사이트 링크도 가져옴
  directory: './dist/festival419',//저장소 위치
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' }
  ],
  recursive: true, //링크 대상 수집 default false
  maxDepth: 9, // 사이트 깊이 리소스 기준
  maxRecursiveDepth: 3,//maximum depth for hyperlinks html 기준
  filenameGenerator: 'bySiteStructure',//저장타입(주소명 | 폴더구조) byType (default) | bySiteStructure
  subdirectories: [
    { directory: 'img', extensions: ['.jpg', '.png', '.svg'] },
    { directory: 'js', extensions: ['.js'] },
    { directory: 'css', extensions: ['.css'] }
  ],
  defaultFilename: 'mmmmindex.html'
};

// const options = {
//   urls: ['http://unpl.co.kr'],
//   urlFilter: (url) => url.startsWith('http://unpl.co.kr'), // Filter links to other websites
//   recursive: true,
//   maxRecursiveDepth: 10,
//   filenameGenerator: 'bySiteStructure',
//   directory: '/path/to/save'
// }

// with async/await
const result = await scrape(options);
