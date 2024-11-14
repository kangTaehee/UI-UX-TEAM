function multiplefileupload(param) {
    this.option = {
        formname: "#form1",
        enctype: "multipart/form-data",
        dataType: "json",
        fileFieldName: "#files",
        maxfilelength: 7,
        mode: "img",
        fileBuffer: [],// 실제 전송되는 파일 배열
        target: "[name='files[]']",//selector
    }
    this.option = {
        ...this.option,
        ...param
    }
    console.log(this.option)
}

const util = {
    option: {
        formname: "#form1",
        enctype: "multipart/form-data",
        dataType: "json",
        fileFieldName: "#files",
        maxfilelength: 7,
        mode: "img",
        fileBuffer: [],// 실제 전송되는 파일 배열
        target: "[name='files[]']",//selector
    },
    setup: function (d) {
        this.option = {
            ...this.option,
            ...d
        }
        console.log(this.option)
        return this
    },
    init: function () {
        const target = document.querySelector(this.option.target);
        document.querySelector(this.option.fileFieldName).addEventListener('change', () => {
            Array.prototype.push.apply(this.option.fileBuffer, target.files);
            util.inhtml();
        });
    },
    imgcheck: function (fileEx) {
        console.log(this)
        fileExList = ["jpg", "png", "gif", "bmp", "tif"]
        if (fileExList.indexOf(fileEx) > 0) {
            return true
        }
        return false
    },
    inhtml: function () {
        var html = '';
        let _this = this
        this.option.fileBuffer.forEach((file, index, thisArray) => {
            const fileName = file.name;
            const fileEx = fileName.slice(fileName.indexOf(".") + 1).toLowerCase();
            if (!util.imgcheck(fileEx)) {
                alert("파일은 (jpg, png, gif, bmp, wmv, mp4, avi) 형식만 등록 가능합니다.");
                _this.option.fileBuffer.splice(index, 1);
            } else {
                html += `<li class="file ui-state-default" data-i="${index}">
								<input type="text" class="angle" value="0" name="">
								<div class="imgarea">
									<img alt src="${URL.createObjectURL(file)}">
								</div>
								<span class="filename">${fileName}</span>
								<div class="ctrl">
									<button type="button" class="b-default left90  btn btn-default">90˚ <i class="fa fa-rotate-left" aria-hidden="true"></i></button>
									<button type="button" class="b-default btn btn-default fileMoveUp"><i class="fa fa-angle-up"></i></button>
									<button type="button" class="b-default right90 btn btn-default">90˚ <i class="fa fa-rotate-right" aria-hidden="true"></i></button>
									<button type="button" class="b-default btn btn-default fileMoveDown"><i class="fa fa-angle-down"></i></button>
								</div>
								<button type="button" class="currentdel">삭제</button>
							</li>`
                debugger
                $('.fileList').html(html);
            }
        });
    }
}

$('.fileList').on('click', '.fileMoveUp', function (event) {
    var bc = $('.fileMoveUp').index(this)
    console.log(bc + '=버튼인덱스')
    moveUp(bc)
});
$('.fileList').on('click', '.fileMoveDown', function (event) {
    var bc = $('.fileMoveDown').index(this)
    console.log(bc + '=버튼인덱스')
    moveDown(bc)
});
function moveDown(currentindex) {
    // uploadSetup.fileBuffer.splice(fileIndex,1);
    var movedata = uploadSetup.fileBuffer[currentindex]
    var newContents = uploadSetup.fileBuffer;
    var newPos = currentindex + 1;
    // if (newPos >= uploadSetup.fileBuffer.length) newPos = uploadSetup.fileBuffer.length;
    console.log(newPos)
    newContents.splice(currentindex, 1);
    console.log(newContents)
    newContents.splice(newPos, 0, movedata);
    console.log(newContents)
    // return newContents;
    inhtml();
};
function moveUp(currentindex) {
    var movedata = uploadSetup.fileBuffer[currentindex]
    var newContents = uploadSetup.fileBuffer;
    var newPos = currentindex - 1;
    if (newPos == -1) { newPos = 0 }
    newContents.splice(currentindex, 1);
    newContents.splice(newPos, 0, movedata);
    inhtml();
};
$(document).on('click', '.currentdel', function () {
    const fileIndex = $(this).parent().index();
    console.log(fileIndex)
    uploadSetup.fileBuffer.splice(fileIndex, 1);
    $(this).parents('li').remove();
    console.log(uploadSetup.fileBuffer)
    // $('.fileList>div:eq('+fileIndex+')').remove();
});
function imageRotaion(_this, deg) {
    angle = parseInt(_this.parents('li').find('.angle').val())
    console.log(angle, typeof angle)
    angle = (angle + deg) % 360;
    _this.parent().prevAll('.imgarea').find('img').css('transform', 'rotate(' + angle + 'deg)');
    // $('#blah')[0].className = "rotate" + angle;
    _this.parents('li').find('.angle').val(angle)
    if (Math.abs(angle) == 90 || Math.abs(angle) == 270) {
        _this.parent().prev('.imgarea').find('img')
            .css({
                'max-width': _this.parent().prev('.imgarea').height(),
                'max-height': _this.parent().prev('.imgarea').width()
            });
    } else {
        _this.parent().prevAll('.imgarea').find('img')
            .css({
                'max-width': 'auto',
                'max-height': 'auto'
            });
    }
}
$('.imageupload-rotate')
    .on('click', '.left90', function (event) {
        imageRotaion($(this), -90)
    })
    .on('click', '.right90', function (event) {
        imageRotaion($(this), 90)
    })
function fileadd(argument) {
    if (filelength > uploadSetup.maxfilelength) {
        filelength -= 1;
        alert(`최대${uploadSetup.maxfilelength}장까지 등록가능합니다.`)
        return false;
    }
    return true;
}
function readURL(input) {//URL.createObjectURL 로 대체함 
    if (input[0].files && input[0].files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e)
            input.parent().find('img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input[0].files[0]);
    }
}
function function_name(argument) {
    var newfiles = new Array()
    newfiles = []
    console.log(uploadSetup.fileBuffer)
    $(".fileList li").each(function (index, el) {
        console.log(index)
        var x = $(this).data().i
        newfiles[index] = uploadSetup.fileBuffer[x]
        $(this).data().i = index
    });
    uploadSetup.fileBuffer = newfiles
    console.log(uploadSetup.fileBuffer)
}
$(function () {
    $(".fileList").sortable({
        deactivate: function (event, ui) {
            console.log('deactivate')
            function_name()
        }
    });
    $(".fileList").disableSelection();
});


// 

$('#form1').ajaxForm({
    contentType: false,
    processData: false,
    enctype: "multipart/form-data",
    dataType: "POST",
    dataType: 'json',
    beforeSubmit: function (data, form, option) {
        var fileSize = uploadSetup.fileBuffer.length;
        if (fileSize > 0) {
            for (var i = 0; i < fileSize; i++) {
                var obj = {
                    name: "files[]",
                    value: uploadSetup.fileBuffer[i],
                    type: "file"
                };
                console.log(obj);
                data.push = obj;
            }
        }
        console.log('beforeSubmit');
        console.log(uploadSetup.fileBuffer);
        console.log(data);
        console.log(form);
        console.log(option);
    },
    success: function (returnData) {
        console.log("returnData : " + returnData);
        func(returnData);
    },
    error: function (x, e) {
        console.log("[AF]ajax status : " + x.status);
        console.log(e);
    }
});
// JavaScript code
// const form = document.querySelector('#myForm');
// const formData = new FormData(form);

// fetch('/submit', {
//     method: 'POST',
//     body: formData,
// })
//     .then((response) => response.json())
//     .then((data) => {
//         // Do something with the response data.
//     });