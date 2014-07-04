/**
 * 实现php的parse_str 函数的功能
 * @param query_string
 */
function tool_parse_str(query_string,cb)
{
	query_string = query_string.substring(query_string.indexOf('?')+1);
	
	var arr = query_string.split("&");
	var ret = {};
	_OPT.forEach(arr,function(k,v)
	{
		var tmp = v.split("=");
		ret[tmp[0]]=tmp[1];
	})
	
	cb(ret);
}
/**
 * 实现PHP的http_bulid_query功能
 * @param arrObj
 */
function tool_http_bulid_query(arrObj,cb)
{
	if (typeof arrObj != "object")return;
	var fh = '';
	var query = '';
	for(var i in arrObj)
	{
		query += fh + i +"=" +arrObj[i];
	}
	cb(query);
}
/**
 * 获取某个对象的偏移位置
 * @param o
 * @returns {___anonymous804_817}
 */
function tool_getPosition(o,cb)
{
    var t = o.offsetTop;
    var l = o.offsetLeft;
    while(o = o.offsetParent)
    {
        t += o.offsetTop;
        l += o.offsetLeft;
    }
    var pos = {top:t,left:l};
    cb(pos);
}