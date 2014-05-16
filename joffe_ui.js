// JavaScript Document
/*Mobvsta ui jquery版 v0.01 内测版本*/
/*joffe*/
var joffe_ui = function(){
this.setting={
	button:{
		ok:"OK",
		close:"Close",
		cancel:"Cancel"
	},
	title:{
		alert:"Message",
		confirm:"Asking",
		open:"Window"
	}
}
this.alert=function(msg,title,cls){ //美化的alert
	_this=this;
	var id='alert';
	title=title||this.setting.title.alert; 
	if(cls == null || typeof cls == 'undefined' || cls == '')cls = 'alert';
	_this.box(id,title,msg,cls);
	obj=$('#'+id);
	$(".joffe_container .joffe_box .joffe_footer").append('<a href="javascript:void(0);" class="btn ok" title="'+this.setting.button.ok+'">'+this.setting.button.ok+'</a>');
	$(".joffe_box .joffe_footer a.btn.ok").bind('click',function(){_this.close(id);return true;});
	
}

this.confirm=function(msg, title,fnYes, fnNo, cls){
	_this=this;
	var id="confirm";
	this.box(id,title,msg,cls);
	obj=$('#'+id);
	$(".joffe_container .joffe_box .joffe_footer").append('<a href="javascript:void(0);" class="btn ok" title="'+this.setting.button.ok+'">'+this.setting.button.ok+'</a><a href="javascript:void(0);" class="btn exit" title="'+this.setting.button.cancel+'">'+this.setting.button.cancel+'</a>');
	$(".joffe_box .joffe_footer a.ok").bind('click',function(){_this.close(id,fnYes); return true;});
	$(".joffe_box .joffe_footer a.exit").bind('click',function(){_this.close(id,fnYes);return false;});
	
}

this.box=function(id,title,msg,cls,callback){//提供浮动对话框的支持
	_this=this;
	var obj = $("#"+id);
	var _h = '<div class="joffe_container"><div class="joffe_box"><div class="joffe_header"><h3>'+title+'</h3><a href="#" class="close" title="'+this.setting.button.close+' ESC">'+this.setting.button.close+'</a></div><div class="msg"><div class="logo"></div>' + msg + '</div><div class="joffe_footer"></div></div></div><div class="shade"></div>';
	if(obj.size()===0){
		$('body').append("<div id='"+id+"'></div>");	
		obj=$("#"+id);
	}
	obj.html(_h).addClass('joffe_ui').addClass(cls).css('display','block');
	_this.mengceng();//创建蒙层
	$("a.close").bind('click',function(){_this.close(id,callback);return false});
	_this.keepcent(".joffe_container .joffe_box")
	$(window).bind('resize',function(){
		_this.keepcent(".joffe_container .joffe_box")
	});
	
	$(document).bind('keydown',function(e){
		//alert(event.keyCode);
		if(event.keyCode==27){_this.close(id,callback);return false}
	})
}
this.win={//窗口信息相关集合
	height:function(){return $(window).height(); },
	width:function(){return $(window).width()},
	scrollWidth:function(){return $(window).scrollLeft()},
	scrollheight:function(){return $(window).scrollTop()},
	doc:{
		height:function(){return $(document.body).outerHeight(true)},
		width:function(){return $(document.document).$(document.body).outerWidth(true)}
	}
}

this.mengceng=function(){//该蒙层不可关闭
if(_this == null || typeof _this == 'undefined' || _this == ''){var _this=this;}
if($('.joffe_ui').size()==0){$('body').append('<div id="joffe_ui" class="joffe_ui"><div class="shade"></div></div>');}
_mengH=(_this.win.doc.height()>_this.win.height())?_this.win.doc.height():_this.win.height();
$(".joffe_ui").css({'display':'block','height':_mengH+'px'});
}
this.close=function(id,callback){
	obj=$('#'+id);
	try{callback()}catch(e){};
	obj.fadeOut();
	obj.remove();
}

//令对象居中
this.keepcent=function(div){
	var _boxtop=(_this.win.height()-$(div).height())/2;
	var _boxleft=(_this.win.width()-$(div).width())/2;
	$(div).css({'top':_boxtop+"px" , 'left':_boxleft+"px" });
}

this.open=function(url,width,height,title,close_Masklayer,no_scrolling,no_resize,fnclose){
	//fnclose 是点击关闭按钮时候调用的方法 is_Masklayer 是否关闭启蒙层
	//部分网站做了防止iframe载入的设置.所以不是所有页面都可以用,目前还未有解决方法可以屏蔽子页面独占页面
	_this=this;
	width=width?width:400;
	height=height?height:300;
	title = title||this.setting.title.open;
	if(no_scrolling){
		_h ='<iframe id="_joffe_iu_open_iframe"  scrolling="no" src=""></iframe>';
	}else{
		_h='<iframe id="_joffe_iu_open_iframe" src="" ></iframe>';
	}
	
	if(no_resize){
		f_height=parseInt(height)+48;
	}else{
		f_height=parseInt(height)+78;
	}
	f_width =parseInt(width)+20;
	//alert(f_height);
	size={'width':width+"px",'height':height+"px"}
	_this.box("window",title,'',fnclose);
	$(".joffe_container .joffe_box .joffe_footer").remove();
	$(".joffe_container .joffe_box").css({'width':f_width+"px",'height':f_height+"px"});
	$(".joffe_container .joffe_box .msg").html(_h).css(size);	
	$("#_joffe_iu_open_iframe").css(size).attr( 'src' ,url );
	if(!no_resize){
		$(".joffe_box").append("<div class='resizeBt'></div>");
		_this.resizeDiv(".joffe_container .joffe_box .resizeBt",".joffe_container .joffe_box,#_joffe_iu_open_iframe,.joffe_box .msg");
	}
	_this.keepcent(".joffe_container .joffe_box")
	_this.moveDiv('.joffe_container .joffe_box .joffe_header ',".joffe_container .joffe_box");

	
}

this.moveDiv=function(action_div,move_div){
//令浮动的div可以移动操作 action div 是触发对象,move_div改变对象(一般为最外面的框就行),
	var mouseX,mouseY,mouseX1,mouseY1,divX,divY,mouseClick=false;
	var obj_act=$(action_div); var obj_move=$(move_div);
	obj_act.css('cursor','move');//鼠标
	obj_act.bind('mousedown',function(e){
		mouseX=parseInt(e.pageX);//鼠标初始位置
        mouseY=parseInt(e.pageY);
		divX=parseInt(obj_move.css("left"));
		divY=parseInt(obj_move.css("top"));	
		mouseClick=true;	
		//alert(divX);
	});
	$(document).bind('mousemove',function(e){
		mouseX1=e.pageX;
		mouseY1=e.pageY;
		// $("#spShowPageXY").html('原来鼠标:'+mouseX+":"+mouseY+"目前鼠标:"+mouseX1+":"+mouseY1+"原来DIV"+divX+':'+divY);
		if(mouseClick){
				obj_move.css("left",divX+mouseX1-mouseX).css('top',divY+mouseY1-mouseY);
		}
	});
	
	$(document).bind('mouseup',function(e){mouseClick=false});
	//obj_act.bind('mouseleave',function(e){mouseClick=false});

}

this.resizeDiv=function(action_div,resize_divs){//resize 会影响多个div的size,自己在弄包装集合的时候进行帅选
	var height=[],width=[],mouseClick=false,mouseX,mouseY;
	var obj_act=$(action_div);var obj_resize=$(resize_divs);
	
	obj_act.bind('mousedown',function(e){
		mouseX=parseInt(e.pageX);//鼠标初始位置
        mouseY=parseInt(e.pageY);
		obj_resize.each(function(i){
			height[i]=$(obj_resize[i]).height();
			width[i]=$(obj_resize[i]).width();
		});
		mouseClick=true;	
	});
	
	$(document).bind('mousemove',function(e){
		mouseX1=e.pageX;
		mouseY1=e.pageY;
		// $("#spShowPageXY").html('原来鼠标:'+mouseX+":"+mouseY+"目前鼠标:"+mouseX1+":"+mouseY1+"原来DIV"+divX+':'+divY);
		if(mouseClick){
			obj_resize.each(function(i){
				$(obj_resize[i]).css("height",height[i]+mouseY1-mouseY).css("width",width[i]+mouseX1-mouseX);
			});
		}
	});
	$(document).bind('mouseup',function(e){mouseClick=false});
	//obj_act.bind('mouseleave',function(e){mouseClick=false});
}



}