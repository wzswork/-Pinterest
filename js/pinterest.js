var pinterest = {
	// 容器
	container: document.getElementById("container"),
	// 图片地址
	imgUrls: {},
	// 图片index
	imgIndex: 0,
	// 列数
	col: [],
	// 默认参数
	default: {
		maxW: 300, //每列最大宽度
		minW: 200,  //每列最小宽度
		height: 300, //图片高度
		interval: 30, //m每列间隔
	},
	//初始化
	init: function(){
		var _page = this;
		_page.container.innerHTML = '';
		_page.divide();
		_page.create();
	},
	// 添加初始图片
	create: function(){
		var _page = this;
		for (var i = 0; i < 161; i++){
			var index = "";
			if(i<10){
				index = '00'+i;
			}else if(i >= 10 && i < 100){
				index = '0'+ i;
			}else if(i >= 100){
				index = i;
			}
			_page.imgUrls[i] = "http://cued.xunlei.com/demos/publ/img/P_"+index+".jpg";
		}
		for(i=0; i<_page.default.column; i++){
			_page.col[i] = document.createElement("div");
			_page.appendImg(_page.col[i], i);
			_page.container.appendChild(_page.col[i]);
		}
		_page.checkColumn();
	},
	//在添加图片
	appendImg: function(dom){
		var _page = this;
		var imgBox = document.createElement("div");
		if(_page.imgIndex > 160){
			return;
		}
		imgBox.className = "imgBox";
		imgBox.innerHTML = '<img width='+(_page.default.width - 32)+' src = '+_page.imgUrls[_page.imgIndex]+'><p>'+_page.imgIndex+'<p>';
		_page.imgIndex++;
		dom.appendChild(imgBox);
	},
	// 监测滚动状态
	scrollListen: function(){

	},
	// 检测哪一列需要添加
	checkColumn: function(){
		var _page = this;
		var scrollH = document.body.scrollHeight;
		var flag = 0;
		while(flag != _page.col.length){
			for(var i = 0; i < _page.col.length; i++){
				console.log(_page.col[i].lastChild.getBoundingClientRect().bottom);
		    	console.log(document.body.scrollHeight);
				if(_page.col[i].lastChild.getBoundingClientRect().bottom < document.body.scrollHeight){
					_page.appendImg(_page.col[i])
				}else{
					flag++
				}
			}
			flag = (flag == _page.col.length) ? flag : 0;
		}
		

	},
	// 根据浏览器大小分列数
	divide: function(){
		var _page = this;
		var opts = _page.default;
		var width = document.body.clientWidth;
		var column = 1, columnW = 0;
		while(!(width / column <= 300 && width / column >= 200)){
			column++
		}
		columnW = width / column;
		opts.column = column;
		opts.width = columnW;
	},
	// 监测浏览器大小变化
	resize: function(){

	}

}
pinterest.init();