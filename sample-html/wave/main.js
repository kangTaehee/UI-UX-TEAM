window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {window.setTimeout(callback , 1000/60);};
})();
window.cancelAnimFrame = (function(){
	return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(id) {window.clearTimeout(id);};
})();
var wave = {
	particleStats : 'pause',
	particleCanvas : null,
	init : function(){
		this.particleCanvas = new this.particle();
		this.play();
		setTimeout(function(){
			// wave.pause();
		} , 1000);
		/*
		document.body.addEventListener('click' , function(){
			if(wave.particleStats == 'pause'){
				wave.play();
			}else{
				wave.pause();
			};
		});
		*/
	},
	play : function(){
		if(wave.particleStats == 'pause') {
			wave.particleCanvas.play();
			wave.particleStats = 'play';
		}
	},
	pause : function(){
		if(wave.particleStats == 'play') {
			wave.particleCanvas.pause();
			alert('z')
			wave.particleStats = 'pause';
		}
	},
	particle : function(){
		var _this = this;
		var animationFrame = null;
		var animationFrameStats = false;
		this.lineTotal = 20;
		this.lineData = [];
		//this.lineBackgroundColor = [ '28,62,142' , '17,35,93' , '19,43,113' , '52,119,190' , '0,0,0' ];
		this.lineBackgroundColor = [ '91,207,233' , '52,147,217' , '25,81,191' ,'46,124,207' ,'17,55,130'];
		this.dotBackgroundColor = [ '0,228,255' , '0,210,255' , '0,144,255' ,'0,124,255' ,'0,86,255'];		
		//this.lineBackgroundColor = [ '12,52,121' ,'4,26,72' ,'12,45,86' ,'25,80,121' ,'36,95,121' ];
		//this.dotBackgroundColor = [ '14,136,250' ,'14,164,250' ,'52,224,255' ,'136,237,255' ,'110,255,216' ];
		//this.dotBackgroundColor = [ '255,255,255' , '255,255,255' , '255,255,255' ,'255,255,255' ,'255,255,255'];
		this.parent = $('.wave-particle');
		this.canvas = document.getElementById('wave');
		this.ctx = this.canvas.getContext('2d');
		this.stageArea = { width : 0 , height : 0}
		this.init = function(){
			this.resize();
			for(var i = 0; i < this.lineTotal; i++){
				this.lineData[i] = new this.line(this , i);
			};
			this.render();
		};
		this.line = function(_parent , _index){
			var _this = this;
			this.parent = _parent;
			var randomNumber = Math.floor(this.parent.randomNumber(0,4));
			this.option = {};
			this.option.index = _index;
			this.option.radius = 0;
			this.option.speed = 0;
			this.option.bounce = 0;
			this.option.fpsStart = 0;
			this.option.startY = 0;
			this.option.endY =  0;
			this.option.backgroundColor = this.parent.lineBackgroundColor[randomNumber];
			this.option.dotColor = this.parent.dotBackgroundColor[randomNumber];
			this.option.itemTotal = 0;
			this.option.itemData = [];
			this.option.lineStartY = (this.parent.stageArea.height * 0.45) + ( (this.option.radius * 6 ) * (this.parent.lineTotal - 1)) + 100;
			this.init = function(){
				this.dataSet();
				for(var i = 0; i < this.option.itemTotal; i++){
					this.option.itemData[i] = new this.parent.item(this.parent , this , i);
				};
			};
			this.update = function(){
				//console.log(this.option.itemTotal);
				for(var i = 0; i < this.option.itemTotal; i++){
					this.option.itemData[i].update();
				};				
			};			
			this.dataSet = function(){		
				this.option.radius = 3.8;
				this.option.speed = 9;
				this.option.bounce = this.option.radius * 0.015;
				this.option.fpsStart = 0;
				this.option.startY = (this.parent.stageArea.height * 0.25) + ( (this.option.radius * 4 ) * _index) ;
				this.option.endY =  (this.parent.stageArea.height * 1) + ( (this.option.radius * 4 ) * _index) ;
				this.option.backgroundColor = this.parent.lineBackgroundColor[randomNumber];
				this.option.dotColor = this.parent.dotBackgroundColor[randomNumber];
				this.option.itemTotal = 2;
				this.option.lineStartY = (this.parent.stageArea.height * 0.25) + ( (this.option.radius * 4 ) * (this.parent.lineTotal - 1)) + 170;
			};
			this.reset = function(){		
				this.dataSet();		
				this.update();
			};
			this.init();
		};
		this.render = function(){
			// 라인
			if(animationFrameStats){				
				var grd = this.ctx.createLinearGradient(0, 0, 0 , this.stageArea.height);
				grd.addColorStop(0, "rgba(57,20,120,0.05)");
				grd.addColorStop(0.5, "rgba(0,12,39,0.05)");
				grd.addColorStop(1, "rgba(57,20,120,0.05)");
				this.ctx.fillStyle = grd;
				//this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
				this.ctx.fillRect(0 , 0 , this.stageArea.width , this.stageArea.height);				
				for(var i = 0; i < this.lineData.length; i++){
					this.lineData[i].update();
				};					
					console.log("🚀 ~ this.lineData:", this.lineData)
				for(var j = 0; j < 10; j++){
					var dy = ( j * 15) + this.lineData[0].option.lineStartY;
					this.ctx.beginPath();
					this.ctx.moveTo(0 , dy);
					this.ctx.bezierCurveTo( this.stageArea.width * 0.23 , dy -550 , this.stageArea.width * 0.29 , dy + 500 , this.stageArea.width * 0.55 , dy + 100);
					this.ctx.moveTo(this.stageArea.width * 0.55 , dy + 100);
					this.ctx.bezierCurveTo( this.stageArea.width * 0.8 , dy - 250 , this.stageArea.width * 1 , dy + 800 , this.stageArea.width * 1 , dy + 100);
					// this.ctx.bezierCurveTo( this.stageArea.width * 0.8 , dy -200 , this.stageArea.width * 1 , dy + 500 , this.stageArea.width * 1.2 , dy);
					this.ctx.lineWidth = 1;
					this.ctx.strokeStyle = 'rgba(41,43,93,1)';
					this.ctx.stroke();
					this.ctx.closePath();
				};
				animationFrame = window.requestAnimFrame(function(){
					_this.render();
					//console.log('render');
				});
			}
		};
		this.play = function(){
			//	console.log('---- particle play --- ');
			animationFrame = window.requestAnimFrame(function(){
				_this.render();
				//console.log(parent);
			});	
			animationFrameStats = true;
		};
		this.pause = function(){
			//	console.log('---- particle stop --- ');
			if(animationFrame) window.cancelAnimFrame(animationFrame);
			animationFrameStats = false;
		};
		this.resize = function(){
			this.stageArea.width = this.parent.width();
			this.stageArea.height = this.parent.height();
			this.canvas.width = this.stageArea.width;
			this.canvas.height = this.stageArea.height;
		};
		this.item = function(_parents , _parent , _index){
			var _this = this;		
			this.option = {
				parents : _parents,
				parent : _parent,
				index : _index,
				stats : 'move',
				first : true,
				oldx : 0,
				oldy : 0,
				x : 0,
				y : 0,
				dx1 : 0,
				dy1 : 0,
				dx2 : 0,
				dy2 : 0,
				centerY : 0,
				startY : 0,
				radius :0,
				bounce : 0,
				speed : 0,
				alpha : 1 ,
				step : 0 ,
				dubbleSpeed : 1 ,
				delay : 0 ,
				repeat : 0 ,
				fps : 0,
				fpsStep : (1 / 60) ,
				radians : 0,
				velocity : 0.05,
				borderColor : '',
				backgroundColor : '',
				dotColor : ''
			}
			this.init = function(){
				this.randomStartPosition();				
				var startTotal = (this.option.dx2 / ( this.option.radius + this.option.speed)) * 2;
				for(var i = 0; i < startTotal;i++){
					this.update();
				};
				// debugger
				//console.log(this.option.index);
			};
			this.draw = function(lastPos){
				this.option.parents.ctx.beginPath();
				this.option.parents.ctx.arc(this.option.x , this.option.y , this.option.radius , 0 , 2 * Math.PI , true);				
				this.option.parents.ctx.fillStyle = this.option.dotColor;
				this.option.parents.ctx.fill();						
				this.option.parents.ctx.closePath();
				this.option.parents.ctx.beginPath();
				this.option.parents.ctx.arc( lastPos.x , lastPos.y , this.option.radius , 0 , 2 * Math.PI , true);				
				this.option.parents.ctx.fillStyle = this.option.backgroundColor;
				this.option.parents.ctx.fill();						
				this.option.parents.ctx.closePath();
				//console.log(this.option.backgroundColor);
			};
			this.update = function(){
				var lastPos = {x : this.option.x , y : this.option.y}
				this.option.oldx += this.option.speed;
				this.option.radians += this.option.velocity;							
				if(this.option.oldx >= this.option.delay){						
					this.option.x += this.option.speed;
					this.option.y = (this.option.dy1 + Math.sin(this.option.fps) * ((this.option.dx2 - this.option.x) * this.option.bounce) * 1) + (this.option.fps * 26);
					//this.option.y = (this.option.dy1 + (Math.sin(this.option.fps) * 90) * -1) + (this.option.fps * 26);
					if(this.option.x >=  this.option.dx2){
						this.randomStartPosition();				
						lastPos = {x : this.option.x , y : this.option.y}
					};
					this.option.fps += this.option.velocity;
					this.draw(lastPos);
				};
			};
			this.randomStartPosition = function(){
				this.option.stats = 'move';
				this.option.velocity = 0.05;
				this.option.dubbleSpeed = 2;
				this.option.radius = this.option.parent.option.radius;
				this.option.bounce = this.option.parent.option.bounce;
				this.option.bounceAngel = this.option.parent.option.bounceAngel;
				this.option.borderColor = 'rgba(' + this.option.parent.option.backgroundColor + ' , 1)';
				this.option.borderWidth = 0;
				this.option.backgroundColor = 'rgba(' + this.option.parent.option.backgroundColor + ' , 1)';
				this.option.dotColor = 'rgba( ' + this.option.parent.option.dotColor + ' , ' +  1 + ')';
				this.option.oldx = 0;
				this.option.oldy = 0;
				this.option.centerY = this.option.parent.option.centerY;
				this.option.dx1 = (this.option.parents.stageArea.width * 0.25 ) * -1;
				this.option.dy1 = this.option.parent.option.startY;
				this.option.dx2 = this.option.parents.stageArea.width + ( this.option.parents.stageArea.width * 0.25 )
				this.option.dy2 = this.option.parent.option.endY;
				this.option.x = this.option.dx1;
				this.option.y = this.option.parent.option.startY;
				this.option.fps = this.option.parent.option.fpsStart;				
				this.option.startY = this.option.parent.option.fpsStart;				
				this.option.speed = this.option.parent.option.speed;
				this.option.step = (Math.abs(this.option.dx1) + this.option.dx2) / this.option.parent.option.itemTotal;
				this.option.delay = (this.option.repeat >= 1) ? 0 : this.option.index * this.option.step + Math.floor(this.option.parents.randomNumber(0, this.option.step));
				//this.option.delay = (this.option.repeat >= 1) ? 0 : this.option.parent.option.index * 200;
				//this.option.delay = (this.option.repeat >= 1) ? 0 : this.option.index * 500;
				//this.option.delay = (this.option.repeat >= 1) ? 0 : Math.floor(this.option.parents.randomNumber(0,500));				
				this.option.repeat += 1;				
			};
			this.randomEndPosition = function(){
				this.option.backgroundColor = 'rgba(' + this.option.parent.option.backgroundColor + ' , 1)';
			};
			this.reset = function(){
				this.randomStartPosition();				
				var startTotal = (this.option.dx2 / ( this.option.radius + this.option.speed)) * 2;
				for(var i = 0; i < startTotal;i++){
					this.update();
				};
			};
			this.init();
		};
		this.randomNumber = function(min , max){
			var value = Math.random() * (min - max) + max;
			return value;
		};
		window.addEventListener('resize' , this.resize.bind(this));
		this.init();
	}
};
