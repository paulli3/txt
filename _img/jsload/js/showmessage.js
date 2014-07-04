function showmessage_showTip(ctrlobj) {
	if(!ctrlobj.id) {
		ctrlobj.id = 'tip_' + Math.random();
	}
	menuid = ctrlobj.id + '_menu';
	if(!$("#"+menuid).get(0)) {
		var div = document.createElement('div');
		div.id = ctrlobj.id + '_menu';
		div.className = 'tip tip_4';
		div.style.display = 'none';
		div.innerHTML = '<div class="tip_horn"></div><div class="tip_c">' + ctrlobj.getAttribute('tip') + '</div>';
		$('#append_parent').append(div);
	}
	$("#"+ctrlobj.id).mouseout(function(){hideMenu('', 'prompt'); });
	showMenu({'mtype':'prompt','ctrlid':ctrlobj.id,'pos':'12!','duration':2,'zindex':JSMENU['zIndex']['prompt']});
}

function showmessage_showPrompt(ctrlid, evt, msg, timeout, classname) {
	var menuid = ctrlid ? ctrlid + '_pmenu' : 'ntcwin';
	var duration = timeout ? 0 : 3;
	$("#".menuid).remove();
	var div = document.createElement('div');
	div.id = menuid;
	div.className = !classname ? (ctrlid ? 'tip tip_js' : 'ntcwin') : classname;
	div.style.display = 'none';
	$('body').append(div);
	if(ctrlid) {
		msg = '<div id="' + ctrlid + '_prompt"><div class="tip_horn"></div><div class="tip_c">' + msg + '</div>';
	} else {
		msg = '<table cellspacing="0" cellpadding="0" class="popupcredit"><tr><td class="pc_l">&nbsp;</td><td class="pc_c"><div class="pc_inner">' + msg +
			'</td><td class="pc_r">&nbsp;</td></tr></table>';
	}
	div.innerHTML = msg;
	if(ctrlid) {
		if(!timeout) {
			evt = 'click';
		}
		if($(ctrlid)) {
			if($(ctrlid).evt !== false) {
				var prompting = function() {
					showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,'menuid':menuid,'pos':'210'});
				};
				if(evt == 'click') {
					$(ctrlid).onclick = prompting;
				} else {
					$(ctrlid).onmouseover = prompting;
				}
			}
			showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,fade:1,'menuid':menuid,'pos':'210','duration':duration,'timeout':timeout,'zindex':JSMENU['zIndex']['prompt']});
			$("#"+ctrlid).get(0).unselectable = false;
		}
	} else {
		//console.log(menuid);
		showMenu({'mtype':'prompt','pos':'00','menuid':menuid,'duration':duration,'timeout':timeout,'zindex':JSMENU['zIndex']['prompt']});
		//$("#"+ctrlid).get(0).style.top = (parseInt($("#"+ctrlid).get(0).style.top) - 100) + 'px';
	}
}