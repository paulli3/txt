
function zoom_zoom(obj, zimg, nocover, pn, showexif)
{
	var css = '.zoominner{padding:5px 10px 10px;background:#FFF;text-align:left;}.zoominner p{padding:8px 0;}.zoominner p a{float:left;margin-left:10px;width:17px;height:17px;background:url('+IMGDIR+'zoom/imgzoom_tb.gif) no-repeat 0 0;line-height:100px;overflow:hidden;}.zoominner p a.imgadjust{background-position:-40px 0;}.zoominner p a.imgclose:hover{background-position:-80px -39px;}.zoominner p a.imgclose{background-position:-80px 0;}.zoominner .y{float:right}.zoominner p a.imgadjust:hover{background-position:-40px -39px;}.zoominner p a:hover{background-position:0 -39px;}';
	_OPT.load.evalcss(css);
	_zoom(obj, zimg, nocover, pn, showexif);
}

zoomstatus=1;
function _zoom(obj, zimg, nocover, pn, showexif) {
	
	zimg = !zimg ? obj.src : zimg;
	showexif = !parseInt(showexif) ? 0 : showexif;
	if(!zoomstatus) {
		window.open(zimg, '', '');
		return;
	}
	
	if(!obj.id) obj.id = 'img_' + Math.random();
	var faid = !obj.getAttribute('aid') ? 0 : obj.getAttribute('aid');
	var menuid = 'imgzoom';
	var menu = $("#"+menuid).get(0);
	var zoomid = menuid + '_zoom';
	var imgtitle = !nocover && obj.title ? '<div class="imgzoom_title">' + htmlspecialchars(obj.title) + '</div>' +
		(showexif ? '<div id="' + zoomid + '_exif" class="imgzoom_exif" onmouseover="this.className=\'imgzoom_exif imgzoom_exif_hover\'" onmouseout="this.className=\'imgzoom_exif\'"></div>' : '')
		: '';
	var cover = !nocover ? 1 : 0;
	var pn = !pn ? 0 : 1;
	var maxh = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight) - 70;
	var loadCheck = function (obj) {
		if(obj.complete) {
			var imgw = loading.width;
			var imgh = loading.height;
			var r = imgw / imgh;
			var w = document.body.clientWidth * 0.95;
			w = imgw > w ? w : imgw;
			var h = w / r;
			if(w < 100 & h < 100) {
				$("#"+menuid + '_waiting').hide();
				hideMenu();
				return;
			}
			if(h > maxh) {
				h = maxh;
				w = h * r;
			}
			if($("#"+menuid).get(0)) {
				$("#"+menuid).get(0).removeAttribute('top_');$("#"+menuid).get(0).removeAttribute('left_');
				clearTimeout($("#"+menuid).get(0).getAttribute('timer'));
			}
			showimage(zimg, w, h, imgw, imgh);
			if(showexif && faid) {
				var x = new Ajax();
				x.get('forum.php?mod=ajax&action=exif&aid=' + faid + '&inajax=1', function(s, x) {
					if(s) {
						$("#"+zoomid + '_exif').style.display = '';
						$("#"+zoomid + '_exif').innerHTML = s;
					} else {
						$("#"+zoomid + '_exif').style.display = 'none';
					}
				});
			}
		} else {
			setTimeout(function () { loadCheck(loading); }, 100);
		}
	};
	var showloading = function (zimg, pn) {
		if(!pn) {
			if(!$("#"+menuid + '_waiting').get(0)) {
				waiting = document.createElement('img');
				waiting.id = menuid + '_waiting';
				waiting.src = IMGDIR + '/loading.gif';
				waiting.style.opacity = '0.8';
				waiting.style.filter = 'alpha(opacity=80)';
				waiting.style.position = 'absolute';
				waiting.style.zIndex = '100000';
				$("#"+'append_parent').append(waiting);
			}
		}
		$("#"+menuid + '_waiting').get(0).style.display = '';
		$("#"+menuid + '_waiting').get(0).style.left = (document.body.clientWidth - 42) / 2 + 'px';
		$("#"+menuid + '_waiting').get(0).style.top = ((document.documentElement.clientHeight - 42) / 2 + Math.max(document.documentElement.scrollTop, document.body.scrollTop)) + 'px';
		loading = new Image();
		setTimeout(function () { loadCheck(loading); }, 100);
		if(!pn) {
			$("#"+menuid + '_zoomlayer').get(0).style.display = 'none';
		}
		loading.src = zimg;
	};
	var adjustpn = function(h) {
		h = h < 90 ? 90 : h;
		if($("#"+'zimg_prev')) {
			$("#"+'zimg_prev').height(h);
		}
		if($("#"+'zimg_next')) {
			$("#"+'zimg_next').height(h);
		}
	};
	var showimage = function (zimg, w, h, imgw, imgh) {
		$("#"+menuid + '_waiting').get(0).style.display = 'none';
		$("#"+menuid + '_zoomlayer').get(0).style.display = '';
		$("#"+menuid + '_img').get(0).style.width = 'auto';
		$("#"+menuid + '_img').get(0).style.height = 'auto';
		$("#"+menuid).get(0).style.width = (w < 300 ? 320 : w + 20) + 'px';
		mheight = h + 63;
		menu.style.height = mheight + 'px';
		$("#"+menuid + '_zoomlayer').get(0).style.height = (mheight < 120 ? 120 : mheight) + 'px';
		$("#"+menuid + '_img').get(0).innerHTML = '<img id="' + zoomid + '" src="' + zimg + '" width="' + w + '" height="' + h + '" w="' + imgw + '" h="' + imgh + '" />' + imgtitle;
		if($("#"+menuid + '_imglink').get(0)) {
			$("#"+menuid + '_imglink').get(0).href = zimg;
		}
		setMenuPosition('', menuid, '00');
		adjustpn(h);
	};
	var adjustTimer = 0;
	var adjustTimerCount = 0;
	var wheelDelta = 0;
	var clientX = 0;
	var clientY = 0;
	var adjust = function(e, a) {
		if(BROWSER.ie && BROWSER.ie<7) {
		} else {
			if(adjustTimerCount) {
				adjustTimer = (function(){
					return setTimeout(function () {
						adjustTimerCount++;
						adjust(e);
					}, 20);
					})();
					$("#"+menuid).get(0).setAttribute('timer', adjustTimer);
				if(adjustTimerCount > 17) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane();
				}
			} else if(!a) {
				adjustTimerCount = 1;
				if(adjustTimer) {
					clearTimeout(adjustTimer);
					adjust(e, a);
				} else {
					adjust(e, a);
				}
				doane();
			}
		}
		var ele = $("#"+zoomid).get(0);
		if(!ele) {
			return;
		}
		var imgw = ele.getAttribute('w');
		var imgh = ele.getAttribute('h');

		if(!a) {
			e = e || window.event;
			try {
				if(e.altKey || e.shiftKey || e.ctrlKey) return;
			} catch (e) {
				e = {'wheelDelta':wheelDelta, 'clientX':clientX, 'clientY':clientY};
			}
			var step = 0;
			if(e.wheelDelta <= 0 || e.detail > 0) {
				if(ele.width - 1 <= 200 || ele.height - 1 <= 200) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane(e);return;
				}
				step = parseInt(imgw/ele.width)-4;
			} else {
				if(ele.width + 1 >= imgw*40) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane(e);return;
				}
				step = 4-parseInt(imgw/ele.width) || 2;
			}
			if(BROWSER.ie && BROWSER.ie<7) { step *= 5;}
			wheelDelta = e.wheelDelta;
			clientX = e.clientX;
			clientY = e.clientY;
			var ratio = 0;
			if(imgw > imgh) {
				ratio = step/ele.height;
				ele.height += step;
				ele.width = imgw*(ele.height/imgh);
			} else if(imgw < imgh) {
				ratio = step/ele.width;
				ele.width += step;
				ele.height = imgh*(ele.width/imgw);
			}
			if(BROWSER.ie && BROWSER.ie<7) {
				setMenuPosition('', menuid, '00');
			} else {
				var menutop = parseFloat(menu.getAttribute('top_') || menu.style.top);
				var menuleft = parseFloat(menu.getAttribute('left_') || menu.style.left);
				var imgY = clientY - menutop - 39;
				var imgX = clientX - menuleft - 10;
				var newTop = (menutop - imgY*ratio) + 'px';
				var newLeft = (menuleft - imgX*ratio) + 'px';
				menu.style.top = newTop;
				menu.style.left = newLeft;
				menu.setAttribute('top_', newTop);
				menu.setAttribute('left_', newLeft);
			}
		} else {
			ele.width = imgw;
			ele.height = imgh;
		}
		menu.style.width = (parseInt(ele.width < 300 ? 300 : parseInt(ele.width)) + 20) + 'px';
		var mheight = (parseInt(ele.height) + 50);
		menu.style.height = mheight + 'px';
		$("#"+menuid + '_zoomlayer').get(0).style.height = (mheight < 120 ? 120 : mheight) + 'px';
		adjustpn(ele.height);
		doane(e);
	};
	
	if(!menu && !pn) {
		menu = document.createElement('div');
		menu.id = menuid;
		
		if(cover) {
			menu.innerHTML = '<div class="zoominner" id="' + menuid + '_zoomlayer" style="display:none"><p><span class="y"><a id="' + menuid + '_imglink" class="imglink" target="_blank" title="在新窗口打开">在新窗口打开</a><a id="' + menuid + '_adjust" href="javascipt:;" class="imgadjust" title="实际大小">实际大小</a>' +
				'<a href="javascript:;" onclick="hideMenu()" class="imgclose" title="关闭">关闭</a></span>鼠标滚轮缩放图片</p>' +
				'<div class="zimg_p" id="' + menuid + '_picpage"></div><div class="hm" id="' + menuid + '_img"></div></div>';
		} else {
			menu.innerHTML = '<div class="popupmenu_popup" id="' + menuid + '_zoomlayer" style="width:auto"><span class="right y"><a href="javascript:;" onclick="hideMenu()" class="flbc" style="width:20px;margin:0 0 2px 0">关闭</a></span>鼠标滚轮缩放图片<div class="zimg_p" id="' + menuid + '_picpage"></div><div class="hm" id="' + menuid + '_img"></div></div>';
		}
		if(BROWSER.ie || BROWSER.chrome){
			menu.onmousewheel = adjust;
		} else {
			menu.addEventListener('DOMMouseScroll', adjust, false);
		}
		$("#"+'append_parent').append(menu);
		if($("#"+menuid + '_adjust')) {
			$("#"+menuid + '_adjust').onclick = function(e) {adjust(e, 1)};
		}
	}
	showloading(zimg, pn);
	picpage = '';
	$("#"+menuid + '_picpage').innerHTML = '';
	if(typeof zoomgroup == 'object' && zoomgroup[obj.id] && typeof aimgcount == 'object' && aimgcount[zoomgroup[obj.id]]) {
		authorimgs = aimgcount[zoomgroup[obj.id]];
		var aid = obj.id.substr(5), authorlength = authorimgs.length, authorcurrent = '';
		if(authorlength > 1) {
			for(i = 0; i < authorlength;i++) {
				if(aid == authorimgs[i]) {
					authorcurrent = i;
				}
			}
			if(authorcurrent !== '') {
				paid = authorcurrent > 0 ? authorimgs[authorcurrent - 1] : authorimgs[authorlength - 1];
				picpage += ' <div id="zimg_prev" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'0 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'0 -100px\';" onclick="_zoom_page(\'' + paid + '\', ' + (showexif ? 1 : 0) + ')" class="zimg_prev"><strong>上一张</strong></div> ';
				paid = authorcurrent < authorlength - 1 ? authorimgs[authorcurrent + 1] : authorimgs[0];
				picpage += ' <div id="zimg_next" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'100% 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'100% -100px\';" onclick="_zoom_page(\'' + paid + '\', ' + (showexif ? 1 : 0) + ')" class="zimg_next"><strong>下一张</strong></div> ';
			}
			if(picpage) {
				$("#"+menuid + '_picpage').innerHTML = picpage;
			}
		}
	}
	showMenu({'ctrlid':obj.id,'menuid':menuid,'duration':3,'pos':'00','cover':cover,'drag':menuid,'maxh':''});
}

//function _zoom_page(paid, showexif) {
//	var imagesrc = $("#"+'aimg_' + paid).getAttribute('zoomfile') ? $("#"+'aimg_' + paid).getAttribute('zoomfile') : $("#"+'aimg_' + paid).getAttribute('file');
//	zoom($("#"+'aimg_' + paid), imagesrc, 0, 1, showexif ? 1 : 0);
//}