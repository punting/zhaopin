(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);
$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if(last.row != 5){ now.row = last.row+1; now.col = 1; pageMove(towards.up);}
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
})

$(document).swipeLeft(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
})

$(document).swipeRight(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
})

function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		 nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw){
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

//旋转
  (function (){
	var degree = 0;
	var t = setInterval(function(){
		degree = degree + 10 ;
		$("img.musics").css("transform","rotate("+degree+"deg)");
	},50);
	var t2=setInterval(function (){
			creatSmallImg();
	},2000);
	$("img.musics").click(function(){
        var $music = $("audio.red_alert")[0];
		if($music.paused){
			$music.play();
			t = setInterval(function (){
				degree = degree + 10 ;
				$("img.musics").css("transform","rotate("+degree+"deg)");
			},50);
			t2=setInterval(function (){
			   creatSmallImg();
	       },1500);
		}else{
			$music.pause();
			clearInterval(t);
			clearInterval(t2);
		}
	})
	function creatSmallImg(){
		var img = new Image();
		img.src="img/music_note_small.png";
		img.className="small_note";
		$("div.first_child").append(img);
		sport(img);
	}
	function sport(node){
		var node = $(node),
		speedX = Math.ceil(Math.random()*3),
		speedY = Math.ceil(Math.random()*4),
		rotation = Math.random()*30;
		var t3 = setInterval(function(){
			var T = parseInt(node.css("top")),
			    L = parseInt(node.css("left"));
		        rotation += 20;
				//isClearT3&&clearInterval(t3);
				if(T<=0){
					node.remove();
					clearInterval(t3);
				}else{
					node.css({left:L-speedX+'px',top:T-speedY+'px',transform:'rotate('+rotation+'deg)'});
				} 
		},200);
	}
	})();
})();