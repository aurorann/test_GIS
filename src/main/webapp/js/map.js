var container = document.getElementById('popup'); //팝업이 담길 컨테이너 요소
var content1 = document.getElementById('popup-content'); //팝업 내용 요소
var map; //맵 변수 선언 : 지도 객체
var mapLayer; //맵 레이어 선언 : 지도 그림(타일) 설정
var mapOverlay; //맵 오버레이 선언 : 지도 위에 팝업 옵션을 사용할 때
var mapView; //맵 뷰 선언 : 보여지는 지도 부분 설정
var hover=null; //마우스 이벤트에 사용될 변수

function init(){
	mapLayer = new ol.layer.Tile({ //타일 생성
			title : 'Map', //이름
			visible : true, //보여짐 여부
			type : 'base', //지도 종류(일반) ---(야간(midnight), 위성(satellite) 등)
			source : new ol.source.OSM({ //vworld api 사용
				//url : 'http://api.vworld.kr/req/wmts/1.0.0/B691947D-6535-3428-9B57-3BACF91EF604/Base/{z}/{y}/{x}.png'
			})
	      });

	mapOverlay = new ol.Overlay(({ element: container })); //Overlay 생성, 요소는 컨테이너

	mapView =  new ol.View({ //뷰 생성
			projection : 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계) 
			center : new ol.geom.Point([ 126.878709, 37.482922 ]) //처음 중앙에 보여질 경도, 위도 
					.transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
					.getCoordinates(), //포인트의 좌표를 리턴함
			zoom : 16 //초기지도 zoom의 정도값
	     });

	map = new ol.Map({ //맵 생성	
			target : 'vMap', //html 요소 id 값
			layers : [mapLayer], //레이어
			overlays: [mapOverlay], //오버레이
			view : mapView //뷰
		 });
	
	map.on('pointermove', function(evt) { //마우스 올렸을 때
		var coordinate = evt.coordinate; //마우스가 올려진 좌표값
		
		//마커가 있는 곳에 마우스가 올려지면 커서의 스타일을 pointer로 설정
		map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer': '';
		
		//마우스를 다른 곳으로 옮길 때를 위해 스위치역할
		if(hover != null) {
			hover = null;
		}
		
		//마우스가 올려진 곳의 마커를 가져와 hover에 저장
		map.forEachFeatureAtPixel(evt.pixel, function(f) {
					hover = f;
					return true;
				});
		
		//마커가 있을 경우
		if(hover){
			var content =
					"<div class='__float-tbl'>"
					+ "이곳은 '"
                    + hover.get('name') //이름 값 뽑기
					+ "' 입니다"
					+ "</div>";
			
			//popup-content 부분에 content를 넣어줌
			content1.innerHTML = content;
			
			//오버레이의 좌표를 정해줌
			mapOverlay.setPosition(coordinate);
		}else{
			content1.innerHTML = '';
		}
	});
	
	map.on('singleclick', function(evt){ //클릭 했을 때
		var ff = map.hasFeatureAtPixel(evt.pixel); //클릭한 pixel에 마커가 있으면 true, 없으면 false
 		
 		if(ff == true){ //있으면 openPopup() 실행
 			openPopup();
 		}
	});
	
}

function openPopup(){ //팝업창 오픈
	window.open('http://www.apeak.co.kr/', '팝업창', 'left=200,top=200,width=600,height=600,scrollbars=yes,resizable=yes');
}

function addMarker(lon, lat, name){ //경도 위도 이름값(마커들을 구분하기위해)
	// 마커 feature 설정
    var feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])), //경도 위도에 포인트 설정
        name: name
    });

    // 마커 스타일 설정
    var markerStyle = new ol.style.Style({
        image: new ol.style.Icon({ //마커 이미지
        	opacity: 1, //투명도 1=100% 
        	scale: 1.2, //크기 1=100%
            src: 'http://map.vworld.kr/images/ol3/marker_blue.png'
        }),
        zindex: 10
    });

    // 마커 레이어에 들어갈 소스 생성
    var markerSource = new ol.source.Vector({
        features: [feature] //feature의 집합
    });

    // 마커 레이어 생성
    var markerLayer = new ol.layer.Vector({
        source: markerSource, //마커 feacture들
        style: markerStyle //마커 스타일
    });
    
    // 지도에 마커가 그려진 레이어 추가
    map.addLayer(markerLayer);
    
}

$(document).ready(function() {
	init();
	console.log('aa');
	addMarker(126.878709, 37.482922, 'apeak');

});
