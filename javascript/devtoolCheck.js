<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<body>
	<script>
		// DevToolsWatcher: DevTools 열림/닫힘 감지 + 콜백 실행
		// - 절대 임계 + 베이스라인 변화량을 병행해 오탐을 줄임
		// - resize 디바운스 + 주기 샘플링
		const DevToolsWatcher = (() => {
			const ABS_THRESHOLD = 150;   // 절대 픽셀 임계치
			const DELTA_FACTOR = 0.6;    // 베이스라인 대비 증가 허용 비율
			const DEBOUNCE_MS = 80;     // resize 디바운스
			const TICK_MS = 1000;   // 주기 샘플링(1초)

			let baseline = null;         // { wGap, hGap }
			let open = false;
			let started = false;
			let resizeTimer = null;
			let intervalId = null;

			const openListeners = new Set();
			const closeListeners = new Set();
			const changeListeners = new Set();

			const measure = () => {
				// 일부 환경(모바일/팝업 등)에서 outer가 0인 경우 방어
				const ow = window.outerWidth || 0;
				const oh = window.outerHeight || 0;
				const iw = window.innerWidth;
				const ih = window.innerHeight;
				const wGap = Math.max(0, ow - iw);
				const hGap = Math.max(0, oh - ih);
				return { ow, oh, iw, ih, wGap, hGap };
			};

			const decide = (m) => {
				if (!baseline) baseline = { wGap: m.wGap, hGap: m.hGap };
				const absOpen = (m.wGap > ABS_THRESHOLD) || (m.hGap > ABS_THRESHOLD);
				const deltaOpen =
					(m.wGap - baseline.wGap) > ABS_THRESHOLD * DELTA_FACTOR ||
					(m.hGap - baseline.hGap) > ABS_THRESHOLD * DELTA_FACTOR;
				return absOpen || deltaOpen;
			};

			const update = () => {
				const m = measure();
				const next = decide(m);
				if (next !== open) {
					open = next;
					changeListeners.forEach(fn => fn(open, m));
					(open ? openListeners : closeListeners).forEach(fn => fn(m));
				}
				return open;
			};

			const onOpen = (fn) => { openListeners.add(fn); return () => openListeners.delete(fn); };
			const onClose = (fn) => { closeListeners.add(fn); return () => closeListeners.delete(fn); };
			const onChange = (fn) => { changeListeners.add(fn); return () => changeListeners.delete(fn); };

			const start = () => {
				if (started) return;
				started = true;
				// 초기 평가
				update();

				// resize + 디바운스
				window.addEventListener('resize', onResize, { passive: true });
				// 탭 복귀 시 재평가
				document.addEventListener('visibilitychange', onVisible, { passive: true });
				// 주기 샘플링
				intervalId = setInterval(update, TICK_MS);
			};

			const stop = () => {
				if (!started) return;
				started = false;
				window.removeEventListener('resize', onResize);
				document.removeEventListener('visibilitychange', onVisible);
				clearInterval(intervalId);
				clearTimeout(resizeTimer);
				intervalId = null;
				resizeTimer = null;
			};

			const onResize = () => {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(update, DEBOUNCE_MS);
			};
			const onVisible = () => { if (!document.hidden) setTimeout(update, 0); };

			const isOpen = () => open;

			return { start, stop, isOpen, onOpen, onClose, onChange };
		})();</script>
	<script>
		DevToolsWatcher.onOpen(() => {
			document.body.style.filter = 'blur(4px)';
			// 안내 배너 노출 등
			console.warn('개발자 도구가 감지되어 화면을 보호 중입니다.');
		});
		DevToolsWatcher.onClose(() => {
			document.body.style.filter = '';
		});
		DevToolsWatcher.start();
	</script>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veritatis nam harum sunt totam non illum necessitatibus quidem error quo ipsa officia, aliquam dignissimos recusandae iure a facere alias repudiandae!
</body>

</html>