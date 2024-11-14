const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const xlsx = require('xlsx');

// 폴더 경로와 CSS 셀렉터 설정
// const folderPath = path.join(__dirname, 'C:\work\kogl2024\src\main\webapp\static\guide\kogl'); // 'a' 폴더의 경로
const folderPath = path.join('C:\\work\\kogl2024\\src\\main\\webapp\\static\\guide\\kogl'); // 'a' 폴더의 경로
const targetSelector = '#content > h3'; // 찾을 CSS 셀렉터

// 결과를 저장할 배열
const results = [];
// 재귀적으로 폴더 내부의 모든 파일을 탐색하는 함수
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // 폴더라면 재귀적으로 탐색
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            // 파일이라면 배열에 추가
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles.filter(file => file.endsWith('.html'));
}

// 모든 파일 가져오기
const allFiles = getAllFiles(folderPath);
console.log(allFiles)

// 각 파일에 대해 셀렉터 사용 횟수 검사
allFiles.forEach(file => {
    // const filePath = path.join(folderPath, file);
    const htmlContent = fs.readFileSync(file, 'utf-8');

    // Cheerio를 사용해 HTML 파싱
    const $ = cheerio.load(htmlContent);

    // 셀렉터의 사용 횟수 계산
    const selectorCount = $(targetSelector).length;

    // 사용된 경우 결과에 추가
    if (selectorCount > 0) {
        results.push({
            selector: targetSelector,
            count: selectorCount,
            file: file
        });
    }
});

// 결과를 CSV 또는 Excel 파일로 저장
saveResultsToExcel(results);

function saveResultsToExcel(data) {
    // 데이터 형식 변환
    const formattedData = data.reduce((acc, item) => {
        const existing = acc.find(entry => entry.selector === item.selector);
        if (existing) {
            existing.count += item.count;
            existing.files.push(item.file);
        } else {
            acc.push({
                selector: item.selector,
                count: item.count,
                files: [item.file]
            });
        }
        return acc;
    }, []);

    // Excel 시트에 저장할 형식으로 변환
    const sheetData = [['셀렉터', '사용횟수', '사용된파일']];
    formattedData.forEach(item => {
        sheetData.push([item.selector, item.count, item.files.join(', ')]);
    });

    // 엑셀 파일 생성
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Results');

    // 파일 저장
    const outputFilePath = path.join(__dirname, 'selector_usage.xlsx');
    xlsx.writeFile(workbook, outputFilePath);

    console.log('Results saved to selector_usage.xlsx');
}
