(function(){
	getData();
	var num = 1;
	var oLi = $('li');
	var flag = false;
	function getData() {
		if(!flag){
			flag = true;
			$.ajax({
				type: 'get',
				url: 'http://localhost/waterLayout/src/js/getPics.php?cPage' + num,
				success: addDom,
				beforeSend: function() {
					$('.loading').show();
				},
				error: function() {
					console.log('error');
				}
			})
			num ++;
		}
	}

	function addDom(data) {
		$('.loading').hide();
		var dataList = JSON.parse(data);
		console.log(dataList);
		if(dataList.length > 0) {
			dataList.forEach(function(ele, index) {
				var oDiv = $('<div class="item"></div>');
				var oImgBox = $('<div class="imgBox"></div>');
				var oImg = new Image();
				var oP = $('<p></p>');
				oP.text(ele.title);
				oImg.src = ele.preview;	
				oImg.onload = function () {
					oImgBox.append(oImg);
					oDiv.append(oImgBox).append(oP);
					var index = getMinList(oLi);
					$(oLi[index]).append(oDiv);
				}
			})
		}
		flag = false;
	}

	function getMinList(dom) {
		//假设最小的高度li是第一个
		var minHeight = parseInt($(dom[0]).css('height'));
			index = 0;

		for(var i = 1; i < dom.length; i ++){
			var height = parseInt($(dom[i]).css('height'));
			if(minHeight > height) {
				minHeight = height;
				index = i;
			} 
		}
		return index;
	}

	$(window).scroll(function() {
		var clientHeight = $(window).height();
		var scrollHeight = $(this).scrollTop();
		var minLiHeight = parseInt($(oLi[getMinList(oLi)]).css('height'));

		if(scrollHeight + clientHeight > minLiHeight) {
			getData();
		}
	})

})()