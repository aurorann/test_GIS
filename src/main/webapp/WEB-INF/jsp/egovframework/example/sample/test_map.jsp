<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
  /**
  * @Class Name : egovSampleList.jsp
  * @Description : Sample List 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 실행환경 개발팀
  * since 2009.02.01
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>test</title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/sample.css'/>"/>
    <script type="text/javaScript" language="javascript" defer="defer"></script>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	
	<!-- openlayers -->
	<script src="https://cdn.jsdelivr.net/npm/ol@v7.5.0/dist/ol.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.5.0/ol.css"/>
	
	<style>
	 .vMap { 
	 	height: 700px; 
	 	width: 100%; 
	 } 
	 .__float-tbl{
		border: 1px solid #2a5dc5;
		border-radius: 5px;
		background-color: #2a5dc5;
		font-size: 15px;
		color: white;
		text-align: center;
		position: absolute;
		top: 30px;
		left: -50px;
		width:130px;
	}
	 </style>
</head>

<link rel="icon" href="data:;base64,iVBORw0KGgo=">

<body>
	<!--html안에 Map이 보여질 div 요소를 생성해주고 id 설정 -->
	<div id="vMap" class="vMap"></div>
	
	<!--지도 위에 팝업이 나타날 부분 -->
	<div id="popup">
		<div id="popup-content"></div>
	</div>
	<script src="./js/map.js"></script>
</body>
</html>
