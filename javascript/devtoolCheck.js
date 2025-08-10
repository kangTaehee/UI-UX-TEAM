/**
 * 개발자 도구가 열려있는지 감지하는 함수
 * @returns {boolean} 개발자 도구가 열려있으면 true, 아니면 false
 */
function isDevToolsOpen() {
  const threshold = 160; // 개발자 도구의 최소 높이 또는 너비 임계값 (픽셀)

  // 개발자 도구 창이 열렸을 때, 윈도우 크기 변화 감지
  // 윈도우 크기 변화가 감지되지 않으면, 더 복잡한 방법으로 감지
  if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
    return true;
  }

  // 더 정교한 방법 (디버거 사용)
  // 이 방법은 개발자 도구의 '디버거' 탭이 활성화되어 있어야 동작합니다.
  let isOpened = false;
  const devtools = /./;
  devtools.toString = function() {
    isOpened = true;
  };
  console.log('%c', devtools);
  return isOpened;
}

// 사용 예시
console.log('개발자 도구 열림 여부:', isDevToolsOpen());
