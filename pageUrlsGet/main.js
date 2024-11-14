// npm install puppeteer axios cheerio

const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');

const START_URL = 'https://unpl.co.kr/portal/main/main.do'; // 크롤링 시작할 URL
const LOGIN_URL = 'https://unpl.co.kr/portal/main/main.do'; // 로그인 페이지 URL
const TARGET_DOMAIN = 'unpl.co.kr'; // 크롤링 대상 도메인
const MAX_DEPTH = 2; // 링크 순회 깊이
const MAX_DUPLICATE_COUNT = 3; // 중복 수집 허용 횟수
const MAX_CONCURRENT_CAPTURES = 5; // 캡처 병렬 처리 수

let visitedLinks = new Map(); // 링크와 중복 횟수를 기록하는 맵
let capturedLinks = []; // 캡처된 링크 목록

async function login(page) {
    await page.goto(LOGIN_URL);
    await page.type('#username', 'your-username'); // 로그인 폼 입력
    await page.type('#password', 'your-password'); // 로그인 폼 입력
    await page.click('button[type="submit"]'); // 로그인 버튼 클릭
    await page.waitForNavigation(); // 로그인 후 페이지가 로드될 때까지 대기
}

async function crawlLinks(page, currentUrl, depth) {
    if (depth > MAX_DEPTH) return;

    try {
        await page.goto(currentUrl);
        const content = await page.content();
        const $ = cheerio.load(content);
        const links = $('a[href]')
            .map((i, el) => $(el).attr('href'))
            .get();

        for (let link of links) {
            const resolvedLink = new URL(link, currentUrl).href;

            // 외부 도메인 필터링
            if (!resolvedLink.includes(TARGET_DOMAIN)) continue;

            const linkObj = url.parse(resolvedLink, true); // 쿼리 파라미터 분석
            const baseLink = `${linkObj.protocol}//${linkObj.host}${linkObj.pathname}`;
            const queryParams = JSON.stringify(linkObj.query);

            const linkKey = `${baseLink}?${queryParams}`;
            let count = visitedLinks.get(linkKey) || 0;

            if (count >= MAX_DUPLICATE_COUNT) continue;

            visitedLinks.set(linkKey, count + 1);
            capturedLinks.push(resolvedLink)
            await crawlLinks(page, resolvedLink, depth + 1);
        }
    } catch (err) {
        console.error(`Error while crawling ${currentUrl}:`, err);
    }
}

async function capturePages(browser) {
    const pages = await Promise.all(
        capturedLinks.splice(0, MAX_CONCURRENT_CAPTURES).map(async (link) => {
            const page = await browser.newPage();
            await page.goto(link, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: `captures/${encodeURIComponent(link)}.png` });
            return page;
        })
    );
    await Promise.all(pages.map(page => page.close()));
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // 로그인 처리
    // await login(page);

    // 링크 크롤링 시작
    await crawlLinks(page, START_URL, 0);
    // 수집된 링크들에 대해 캡처 진행
    // capturedLinks = Array.from(visitedLinks.keys());
    console.log(capturedLinks)
    while (capturedLinks.length > 0) {
        await capturePages(browser);
    }

    await browser.close();
})();
