<%@ page import="org.json.JSONObject, java.nio.file.*, java.io.*" %>
<%
    String manifestPath = application.getRealPath("/reactapp/build/asset-manifest.json");
    String mainJs = "";
    String mainCss = "";

    try {
        String content = new String(Files.readAllBytes(Paths.get(manifestPath)));
        JSONObject manifest = new JSONObject(content);

        mainJs = manifest.getJSONObject("files").getString("main.js");
        mainCss = manifest.getJSONObject("files").optString("main.css", "");
    } catch (Exception e) {
        e.printStackTrace();
    }
%>

<!-- React CSS (옵션) -->
<% if (!mainCss.isEmpty()) { %>
	<script>
		var link = document.createElement("link");
		link.rel = "stylesheet"; // 스타일시트로 설정
		link.href = "/reactapp/build/<%= mainCss %>"; // 링크할 CSS 파일의 경로
		document.head.appendChild(link);
	</script>
<% } %>

<!-- React JS -->
<script src="/reactapp/build/<%= mainJs %>"></script>
