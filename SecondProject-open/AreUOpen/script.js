var map = new naver.maps.Map('map', { //37.6034, 127.04169
    center: new naver.maps.LatLng(37.6034, 127.04169), //지도 시작 지점
    zoom: 17
});
var markers = new Array(); // 마커 정보를 담는 배열
var infoWindows = new Array(); // 정보창을 담는 배열
var positions = new Array();  // 지역을 담는 배열 ( 지역명/위도경도 )

positions.push(
    //{ "title": '제나키친', foodtype: "한식" , closeD: "Sat", openH:"11", openM:"00", closeH:"20", closeM:"00", breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"30", latlng: new naver.maps.LatLng(37.6034, 127.04169) },
    { "title":"조아버거",  foodtype: "햄버거", closeD: "Sun", openH:"11", openM:"00", closeH:"20", closeM:"00", break:false, latlng: new naver.maps.LatLng(37.6039015, 127.0408758) },
    { "title": '송송식탁', foodtype: "한식",  closeD: "Sun", openH:"11", openM:"00", closeH:"21", closeM:"00", break:true, breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"00", latlng: new naver.maps.LatLng(37.6038977, 127.0427576) },
    { "title": '스시빈',  foodtype: "초밥/롤",closeD: "Sun", openH:"11", openM:"30", closeH:"22", closeM:"00", break:true, breakOH:"15", breakOM:"00", breakCH:"17", breakCM:"00", latlng: new naver.maps.LatLng(37.60385, 127.0433) },
    { "title": '백소정',   foodtype: "일식당",closeD:"null", openH:"11", openM:"00", break:true, breakOH:"15", breakOM:"00",  breakCH:"17", breakCM:"00" ,closeH:"21", closeM:"00" , latlng: new naver.maps.LatLng(37.6028850, 127.0412987)},
    { "title":"서브웨이",  foodtype: "샌드위치", closeD:"null", openH:"08", openM:"00", break:false ,closeH:"22", closeM:"00" ,latlng: new naver.maps.LatLng(37.60384, 127.04272) },
    { "title":"밥은화",  foodtype: "한식", closeD:"Sun", openH:"11", openM:"30", break:false, closeH:"20", closeM:"30" ,latlng: new naver.maps.LatLng(37.605748, 127.044525) },
    { "title":"연이네 과자점",  foodtype: "카페, 디저트", closeD:"Sat", openH:"11", openM:"00", break:false, closeH:"20", closeM:"00" ,latlng: new naver.maps.LatLng(37.603879, 127.041563) }
//    { "title": '핏짜피자',  foodtype: "피자",closeD: "null", openH:"11", openM:"00", breakOH:"15", breakOM:"30", breakCH:"17", breakCM:"00" ,closeH:"21", closeM:"30" , latlng: new naver.maps.LatLng(37.6037559, 127.0420138) },
//    { "title": '샐러디',   foodtype: "샐러드", closeD:"null", openH:"08", openM:"30", openH2:"10", openM2:"0", breakOH:"null", breakOM:"null", breakCH:"null" ,breakCM:"null" ,closeH:"21", closeM:"00", closeH2:"2", closeM:"00" , latlng: new naver.maps.LatLng(37.6041401,127.0428911) }
);
	
for (var i = 0; i < positions.length; i++) {
    // 지역을 담은 배열의 길이만큼 for문으로 마커와 정보창을 채워주자 !

    var marker = new naver.maps.Marker({
        map: map,
        title: positions[i].title, // 지역구 이름 
        position: positions[i].latlng // 지역구의 위도 경도 넣기 
    });
    
    /* 정보창 */
    var infoWindow = new naver.maps.InfoWindow({
        content: 
    '   <div style="width:200px;text-align:center;padding:10px;">'
    +'      <strong>' + positions[i].title + '</strong><br/>'
    +'      <b>'+positions[i].foodtype+'<b>'+ '<br>' 
    +       positions[i].openH + ':'+ positions[i].openM + '~'+positions[i].closeH +":" +positions[i].closeM
    +'  </div>'
    }); // 클릭했을 때 띄워줄 정보 HTML 작성
        
    markers.push(marker); // 생성한 마커를 배열에 담는다.
    infoWindows.push(infoWindow); // 생성한 정보창을 배열에 담는다.
}	
	
function getClickHandler(seq) {
		
    return function(e) {  // 마커를 클릭하는 부분
        var marker = markers[seq], // 클릭한 마커의 시퀀스로 찾는다.
        infoWindow = infoWindows[seq]; // 클릭한 마커의 시퀀스로 찾는다
        
        if (infoWindow.getMap()) {
            infoWindow.close();
            showMarkers();
        } else {
            infoWindow.open(map, marker); // 표출
            for(var i=0; i<markers.length;i++){ //클릭한 마커 제외 다 없애기
                if(seq != i) {
                    markers[i].setMap(null);
                }
            }

        }
        
    }
}

for (var i=0; i<markers.length; i++) {
    naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i)); // 클릭한 마커 핸들러
}
// for (var i=0; i<markers.length; i++) {
//     // console.log(markers[i] , getClickHandler(i));
//     naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i){
//      여기에 함수 기능을 쓰고 싶은데 조건문을 써야해서 여기에 못 씀 그래서 위아래 합쳐서 기능 구현함
//     }); // 클릭한 마커 핸들러
// }
// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
    setMarkers(map)    
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
    setMarkers(null);    
}

//오픈한 가게만 보이게 하기
function ChangeValue(){
   var day = document.getElementById('day');
   var hour = document.getElementById('hour');
   var min = document.getElementById('min');
   var selectedD = day.options[day.selectedIndex].value;
   var selectedH = parseInt(hour.options[hour.selectedIndex].value);
   var selectedM = parseInt(min.options[min.selectedIndex].value);
   for(var i=0;i<positions.length;i++) {
        var openH = parseInt(positions[i].openH);
        var openM = parseInt(positions[i].openM);
        var closeH = parseInt(positions[i].closeH);
        var closeM = parseInt(positions[i].closeM);
        var breakOH = parseInt(positions[i].breakOH);
        var breakOM = parseInt(positions[i].breakOM);
        var breakCH = parseInt(positions[i].breakCH);
        var breakCM = parseInt(positions[i].breakCM);
        if (selectedD == positions[i].closeD) {
            //휴무일이랑 같으면
            markers[i].setMap(null); //안보이게
        } 
        //휴무일 아닌 애들
        else if( selectedH < openH) { 
            //오픈시간보다 작으면
            markers[i].setMap(null); //안보이게
        } else if( selectedH == openH && selectedM < openM ) { 
            //오픈시간보다 같은데 오픈 분보다 작으면
            markers[i].setMap(null); //안보이게
        } else if( selectedH > breakOH && selectedH < breakCH) {
            //브레이크 시작보다 크고 브레이크 끝보다 작으면
            markers[i].setMap(null);
        } else if( selectedH == breakOH && selectedM >= breakOM) {
            //브레이크 시작이랑 같은데 분이 크면
            markers[i].setMap(null);
        } else if( selectedH == breakCH && selectedM < breakCM) {
            //브레이크 끝이랑 같은데 분이 작으면
            markers[i].setMap(null);
        } else if( selectedH > closeH) {
            //끝나는 시간보다 크면
            markers[i].setMap(null);  //안보이게
        } else if( selectedH == closeH && selectedM >= closeM) {
            //끝나는 시간보다 작거나 같은데 끝나는 분보다 같거나 크면
            markers[i].setMap(null);  //안보이게
        } else{ //다 아니면 보이게
            markers[i].setMap(map);
        }
   }
}

