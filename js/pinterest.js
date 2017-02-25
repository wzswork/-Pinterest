var pinterest = {
	// 容器
	container: document.getElementById("container"),
	// 图片地址
	imgUrls: {},
	// 图片index
	imgIndex: 0,
	// 列数
	col: [],
	// 
	scrollTop : 0,
	// 默认参数
	default: {
		maxW: 300, //每列最大宽度
		minW: 200,  //每列最小宽度
		height: 300, //图片高度
		interval: 30, //每列间隔
	},
	//初始化
	init: function(){
		var _page = this;
		_page.imgIndex = 0;
		_page.container.innerHTML = '';
		_page.divide();
		_page.create();
		_page.scrollListen();
		_page.resize();
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
			// _page.col[i].style.margin = "0 "+_page.default.interval+"px";
			_page.appendImg(_page.col[i], i);
			_page.container.appendChild(_page.col[i]);
		}
		for (var start = 0; start < _page.col.length; start++) {
			var eleColumn = _page.col[start];
			if (eleColumn) {
				if (eleColumn.offsetTop + eleColumn.clientHeight < this.scrollTop + (window.innerHeight || document.documentElement.clientHeight)) {
					_page.checkColumn();
				}
			}		
		}
	},
	//添加图片
	appendImg: function(dom){
		var _page = this;
		var imgBox = document.createElement("div");
		if(_page.imgIndex > 160){
			return;
		}
		imgBox.className = "imgBox";
		imgBox.innerHTML = '<img width='+(_page.default.width - 38)+' src = '+_page.imgUrls[_page.imgIndex]+'><p>'+_page.imgIndex+'<p>';
		_page.imgIndex++;
		dom.appendChild(imgBox);
	},
	// 监测滚动状态
	scrollListen: function(){
		var _page = this;
		window.onscroll = function(){
			_page.scrollTop = _page.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(Math.abs(scrollTop - _page.scrollTop) > 100){
				_page.scrollTop = scrollTop;
				_page.checkColumn();
			}
		}
	},
	// 检测哪一列需要添加
	checkColumn: function(){
		var _page = this;
		for (var start = 0; start < _page.col.length; start++) {
			var eleColumn = _page.col[start];
			if (eleColumn) {
				if (eleColumn.offsetTop + eleColumn.clientHeight < this.scrollTop + (window.innerHeight || document.documentElement.clientHeight)) {
					_page.appendImg(eleColumn);
				}
			}		
		}
		
	},
	// 根据浏览器大小分列数
	divide: function(){
		var _page = this;
		var opts = _page.default;
		var width = document.documentElement.clientWidth || document.body.clientWidth;
		var column = 1, columnW = 0;
		while(!(width / column <= 300 && width / column >= 200)){
			column++
		}
		columnW = width / column;
		opts.column = Math.floor(column);
		opts.width = Math.floor(columnW);
	},
	// 监测浏览器大小变化
	resize: function(){
		var _page = this;
		window.onresize = function(){
			_page.init();
		}
	}

}
pinterest.init();