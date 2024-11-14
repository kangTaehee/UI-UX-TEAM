# souce

```javascript
// canvas line create
/**
* Animates bezier-curve
* 
* @param ctx       The canvas context to draw to
* @param x0        The x-coord of the start point 시작점
* @param y0        The y-coord of the start point 시작점
* @param x1        The x-coord of the control point 곡선점
* @param y1        The y-coord of the control point 곡선점
* @param x2        The x-coord of the end point 종료점
* @param y2        The y-coord of the end point 종료점
* @param duration  The duration in milliseconds
*/
var timeline=[];
var stepani = null;
function animatePathDrawing(ctx, x0, y0, x1, y1, x2, y2, duration) {
	var start = null;
	// console.log(stepani)
	if(stepani  != null){
		// console.log(stepani)
		// cancelAnimationFrame(stepani);
	}
	stepani = function animatePathDrawingStep(timestamp) {
		if (start === null)
			start = timestamp;
		var delta = timestamp - start,
		progress = Math.min(delta / duration, 1);
		// console.log(delta,timestamp,'progress:',progress)
		// console.log(progress)
		// Clear canvas
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		// console.log(x0, 0, x2, ctx.canvas.height)
		// Draw curve
		drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, 0, progress);
		//console.log(timeline.length)
		if (progress < 1 && playStatus) {
			window.requestAnimationFrame(stepani);
		}
		if(!playStatus){
			// cancelAnimationFrame(stepani);
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}
		// console.log(delta)
	};
	window.requestAnimationFrame(stepani);
}
/**
* Draws a splitted bezier-curve
* 
* @param ctx       The canvas context to draw to
* @param x0        The x-coord of the start point
* @param y0        The y-coord of the start point
* @param x1        The x-coord of the control point
* @param y1        The y-coord of the control point
* @param x2        The x-coord of the end point
* @param y2        The y-coord of the end point
* @param t0        The start ratio of the splitted bezier from 0.0 to 1.0
* @param t1        The start ratio of the splitted bezier from 0.0 to 1.0
*/
function drawBezierSplit(ctx, x0, y0, x1, y1, x2, y2, t0, t1) {
	// console.log(t0, t1)
	ctx.beginPath();

	timeline.forEach(function(el) {
		// ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if(el.i == 'moveTo')
		ctx.moveTo(el.x[0],el.x[1])
		if(el.i == 'quadraticCurveTo')
		ctx.quadraticCurveTo(el.x[0],el.x[1],el.x[2],el.x[3])
	});
	
	if (0.0 == t0 && t1 == 1.0) {
		ctx.moveTo(x0, y0);
		ctx.quadraticCurveTo(x1, y1, x2, y2);
		timeline.push({i:'moveTo',x:[x0,y0]})
		timeline.push({i:'quadraticCurveTo',x:[x1, y1, x2, y2]})
		// console.log(timeline[1])
		var midx = ((704 - x2) / 2) + x2;
		var midy = ((84 - 84) / 2) + 84;
		animatePathDrawing(ctx, x2, 84, midx, midy, 704, 84, 375);
	} else if (t0 != t1) {
		
		var t00 = t0 * t0,
			t01 = 1.0 - t0,
			t02 = t01 * t01,
			t03 = 2.0 * t0 * t01;
		var nx0 = t02 * x0 + t03 * x1 + t00 * x2, 
			ny0 = t02 * y0 + t03 * y1 + t00 * y2;
		t00 = t1 * t1;
		t01 = 1.0 - t1;
		t02 = t01 * t01;
		t03 = 2.0 * t1 * t01;
		var nx2 = t02 * x0 + t03 * x1 + t00 * x2,
			ny2 = t02 * y0 + t03 * y1 + t00 * y2;
		var nx1 = lerp(lerp(x0, x1, t0), lerp(x1, x2, t0), t1),
			ny1 = lerp(lerp(y0, y1, t0), lerp(y1, y2, t0), t1);
		ctx.moveTo(nx0, ny0);
		// console.log(nx1, ny1, nx2, ny2)
		ctx.quadraticCurveTo(nx1, ny1, nx2, ny2);
	}
	// ctx.clearRect(x0, y0, x2, ctx.canvas.height);
	ctx.lineWidth = 1.5;
	ctx.stroke();
	ctx.closePath();
}
/**
* Linearly interpolates between two numbers
*/
function lerp(v0, v1, t) {
	return (1.0 - t) * v0 + t * v1;
}
var docCanvas = document.getElementById('canvas');
var ctx = docCanvas.getContext('2d');



// 지사소개 지도
var maptimeline = 500;
var ani1, ani2
$('.js-mapsinfomaion area')
.on('click',function (e) {
	e.preventDefault();
	lists.find('>dl').removeClass('active')
	var datatype = $(this).data().type
	var lx = 704; // 종료점 x
	var ly = 200-116; // 종료점 y
	var _left = $(this).attr('coords').split(',')[0]
	var _top = $(this).attr('coords').split(',')[3]
	if(datatype=='l'){
		_left = $(this).attr('coords').split(',')[2]
	}
	var _txt = $(this).attr('alt')
	var _x1 = _left*1 + 2
	var _x2 = _top*1 - 26
	var fx = (((lx - _x1) / 2) + _x1) // 종료지점 x & 2차 시작지점
	var y1 = (fx - _x1) / 2 + _x1   //- 80
	var y2 = (ly - _x2) / 2 + _x2 //- 80
	timeline=[]
	playStatus = false;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	clearInterval(ani1)
	clearInterval(ani2)
	ani1 = setTimeout(function()  {
		playStatus = true
		animatePathDrawing(ctx, _x1, _x2, y1, y2, fx, ly, 375);
	}, 500);

	if($(this).data().type=='l'){
		$('.mapsinfomaion-pin').addClass('l')
		_left -= 77
	}else{
		$('.mapsinfomaion-pin').removeClass('l')
	}
	$('.mapsinfomaion-pin')
		.css({
			'left':_left+'px',
			'top':_top+'px'
		})
		.addClass('active')
		.find('.s span').text(_txt)

	lists.find('button')
	.each(function () {
		if($(this).text() == _txt){
			_this = $(this)
			ani2 = setTimeout(function() {
				_this.parent().parent().addClass('show').show().delay(500).addClass('active');
				var _img = $(_this).parent().next().find('img');
				if(_img.data('load') != true){
					_img.attr('src',_img.data().src)
					_img.data('load',true)
				}
			}, 750+200);
		}
	});

});

$('button.pos-close').on('click', function () {
	infopos = $(this).parents('dl')
	infopos.removeClass('active')
	setTimeout(function() {
		infopos.removeClass('show')
	}, 500);
	mapreset();
});
function mapreset() {
	timeline=[];
	playStatus = false;
	clearInterval(ani1)
	clearInterval(ani2)
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	$('.mapsinfomaion-pin').removeClass('active')
}
```
