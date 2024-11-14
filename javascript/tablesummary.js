//table summary 자동완성 ver 1.4
//by designerhee@gamil.com
//html5 형식 조건 추가 20141117
//html5 서머리 제외시킬 조건 추가 대상테이블 noSummary class 추가 20150807
/*
20150602
버그수정 rowSpan값이 16일때 무한루프 발생  
rowSpan 에대한 for문이 k로 설정되어잇어 상위 for문의 기본값과 중첩 발생으로 인한 무한루프
*/
jQuery(function(){
    $('table:not([summary], .noSummary):has(caption)').each(function(index){
            var summaryText='';//내용 초기화
            var thLength = $(this).find('th').length;
            for (var i=0;i<$(this).find('th').length;i++) {
                if(jQuery(this).find('th').eq(i).attr('colspan')>1){
                }
            }

            //테이블 셀 좌표설정

        var thpoint= new Array();

        //셀 좌표 초기값 설정
        $(this).find('tr').each(function (tri) {
            thpoint[tri]= new Array();
            var preColstart = 0;
            $(this).find('>').each(function(thi){

                if (this.nodeName=="TH"){
                    if($(this).attr('colspan')>1){
                        var temp2 = parseInt($(this).attr('colspan'))
                        var temp = preColstart + temp2 - 1;
                        /*
                        startcol = 시작 좌표 x
                        endcol = 종료 좌표 x
                        thpoint = <tr> 행
                        colhead = <th> colspan속성 유무
                        rows = <tr> 행 0부터 시작
                        txts = <th> 텍스트
                        Sinset = 서머리 텍스트에 반영 유무
                        */
                        thpoint[tri][thi]={startcol:preColstart,endcol:temp,colhead:true,rows:tri,txts:$(this).text(),Sinset:false}
                        preColstart = temp+1;
                    }else if($(this).attr('rowspan')>1){
                        thpoint[tri][thi]={startcol:preColstart,endcol:preColstart,colhead:'rowSpan',rows:tri,txts:$(this).text(),Sinset:false,rowspan:$(this).attr('rowspan')}
                        preColstart+=1;
                    }else{
                        thpoint[tri][thi]={startcol:preColstart,endcol:preColstart,colhead:false,rows:tri,txts:$(this).text(),Sinset:false}
                        preColstart+=1;
                    }
                }else{
                    thpoint[tri][thi]={startcol:0,endcol:0,colhead:0,rows:0,txts:0,Sinset:true}
                }//if nodeName end
            });
        });
        // 초기 좌표설정 끝

        // rowspan이 2이상인경우에 2번째 행부터 좌표 재설정
        var vs = thpoint.length
        // console.log(thpoint,vs);
        //return false;
        for(var i=0;i<vs;i++){
            // console.log(vs,i)
            for(var k=0;k<thpoint[i].length;k++){
                // console.log(k,'<',thpoint[i].length)
                if (thpoint[i][k].colhead=='rowSpan') {
                    for (var n = i; ++n < i+thpoint[i][k].rowspan;) { //로우스판 이 걸리 이후 행에 대한 좌표값에서 배열 밀기
                        // console.log(n,thpoint[n])
                        if (thpoint[n]=='undefined') {
                            var tempArr = thpoint[n].splice(0,thpoint[i][k].startcol);
                            thpoint[n].unshift({startcol:0,endcol:0,colhead:0,rows:0,txts:0,Sinset:true})
                            for (var kk = -1; ++kk < tempArr.length;) {
                                thpoint[n].unshift(tempArr[kk])
                            };
                        };
                    }
                }
            }
        }

        //colhead의 자식이 있는지 체크하여 th의 자식 수 구하기
        vs = thpoint.length;
        for(var i=0; i<thpoint.length; i++){//배열길이만큼 루프 = tr행만큼
            for(var k=0;k<thpoint[i].length;k++){//tr의 자식들 길이 만큼 루프
                if(thpoint[i][k].colhead && thpoint[i][k].Sinset==false){//colspan 2 이상인 경우
                    thpoint[i][k].child=0; //colhead의 자식 갯수 초기화
                    for(var a=1; a<thpoint.length; a++) { //
                        for (var b = 0; b <thpoint[a].length; b++) {
                            // console.log(thpoint,i,k,'ik');console.log(thpoint,a,b,'ab');
                            // console.log(thpoint[i][k].startcol,thpoint[i][k].endcol,a,b,thpoint)

                            if (i<a && b>=thpoint[i][k].startcol && b<=thpoint[i][k].endcol) {
                                if (thpoint[a][b].Sinset==false ) {
                                    thpoint[i][k].child+=1;//colhead에 해당하는 자식 좌표 갯수 반영
                                }

                            }
                        }
                        // for (var b = thpoint[i][k].startcol; b <=thpoint[i][k].endcol; b++) {
                        //     console.log(thpoint,i,k,'ik')
                        //     console.log(thpoint,a,b,'ab')
                        //     if (thpoint[a][b].Sinset==false ) {
                        //         thpoint[i][k].child+=1;//colhead에 해당하는 자식 좌표 갯수 반영
                        //     }
                        // }
                    }
                }
            }
        }

        //summary 내용 생성.
        var vs = thpoint.length
        for(var i=0;i<vs;i++){
            for(var k=0;k<thpoint[i].length;k++){
                if(thpoint[i][k].colhead && thpoint[i][k].Sinset==false ){//colspan 2 이상인 경우
                    var lastchildCHK = thpoint[i][k].child;
                    var tempCHK = 0
                    summaryText += thpoint[i][k].txts;
                    if (thpoint[i][k].child) {
                         summaryText+='(';
                    };
                    for(var a=1;a<vs;a++) {
                        for (var b = 0; b <thpoint[a].length; b++) {
                        //for (var b = thpoint[i][k].startcol; b <=thpoint[i][k].endcol; b++) {
                            //colhead의 시작 좌표부터 종료 좌표까지 루프
                            if (i<a && b>=thpoint[i][k].startcol && b<=thpoint[i][k].endcol) {
                                if (thpoint[a][b].Sinset==false ) { //colhead에 해당하는 텍스트 서머리에 추가
                                    tempCHK+=1;
                                    if (tempCHK<lastchildCHK) {
                                        summaryText += thpoint[a][b].txts + ', ';
                                        thpoint[a][b].Sinset=true;
                                    }else{
                                        summaryText += thpoint[a][b].txts;
                                        thpoint[a][b].Sinset=true;
                                    };
                                }
                            }
                        }
                    }
                    if (i==thpoint[i].length) {
                        summaryText +=  ')';//마지막 인경우
                    } else if(thpoint[i][k].child){
                        summaryText +=  '), ';//자식이 잇는 경우
                    }else{
                        summaryText+=', ';//colhead가 자식이 없을경우
                    };

                }else if(thpoint[i][k].Sinset==false){
                    if (i==vs) {

                    } else{
                        summaryText += thpoint[i][k].txts + ', ';
                    };
                }
            }
        }
        summaryText = summaryText.substring(0,summaryText.length-2);
        summaryText+=' 정보를 포함하는 표';
        var doctype = document.documentElement.previousSibling;//
        if (doctype.publicId == '') {//html5형식의 docType인지 확인
            var captionSummary = '<strong>' + $(this).find('caption').text() + '</strong>' + '<details><summary>설명</summary> <p>' + summaryText + '';
            $(this).find('caption').html(captionSummary);
        }else{
            $(this).attr('summary',summaryText);
        }
    });
});