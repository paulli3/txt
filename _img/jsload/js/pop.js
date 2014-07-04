function pop_pop1(obj,param,title)
{
	_OPT.pop.pop1(obj,param,title);
}


_OPT.extend('pop',function(){
	return {
		hasInit : {},
		
		pop1 : function(obj,param,title)
		{
			if (this.hasInit['pop1'] == undefined)
			{
				_OPT.load.appendcss("http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css");
				var css = "div.pop1 .ui-dialog-title{padding:0;background:0;}div.pop1 .ui-dialog-bg{display:none;}div.ui-widget-overlay{display:none;}";
				css += "div.pop1 .ui-dialog-titlebar-close span.ui-icon-closethick{display:block;}";
				css += "div.pop1 .ui-dialog-titlebar-close{background:none} div.pop1 .ui-state-hover{padding:0;margin:0;top:30%}";
				_OPT.load.evalcss(css);
			}
			param['dialogClass'] = 'pop1';
			param['modal']=false;//  是否在最前端
			dialog(obj,title,param);
		}
	}
}());