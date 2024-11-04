
    //片段 shuffle Fisher-Yates演算法。 
	//從array的最後一個元素開始，和他前方隨機一個位置的元素交換位置。
	function fnShuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			//陣列對調簡寫
			let tmp = array[i];
			array[i] = array[j];
			array[j] = tmp;
		}
	}

	$(function(){
		//答案陣列
		let arrAns = [

			{ "id": 1, "txt1":"ETstar", "txt2":"", "txt3":"", "bg":"#dbf6ff" },
			{ "id": 2, "txt1":"電商直", "txt2":"播教母","txt3":"", "bg":"#dbf6ff" },
			{ "id": 3, "txt1":"條通", "txt2":"女王", "txt3":"", "bg":"#dbf6ff" },
			{ "id": 4, "txt1":"手機攝影","txt2":"魔法師","txt3":"", "bg":"#dbf6ff"},
			{ "id": 5, "txt1":"呂捷","txt2":"","txt3":"", "bg":"#dbf6ff" },
			{ "id": 6, "txt1":"AI職場", "txt2": "競爭力","txt3":"", "bg":"#dbf6ff"},
			{ "id": 7, "txt1":"小編AI", "txt2": "實戰","txt3":"", "bg":"#dbf6ff" },
			{ "id": 8, "txt1":"鋼鐵", "txt2": "小廚娘","txt3":"", "bg":"#dbf6ff" },
			{ "id": 9, "txt1":"優雅", "txt2": "料理","txt3":"", "bg":"#dbf6ff" },
			{ "id": 10, "txt1":"大女孩", "txt2": "彩妝","txt3":"", "bg":"#dbf6ff" },
			{ "id": 11, "txt1":"音樂", "txt2": "創作","txt3":"", "bg":"#dbf6ff" },
			{ "id": 12, "txt1":"東森", "txt2": "自然美","txt3":"", "bg":"#ffdadb" },
			{ "id": 13, "txt1":"東森", "txt2": "寵物","txt3":"", "bg":"#ffdadb" },
			{ "id": 14, "txt1":"草莓網","txt2":"","txt3":"", "bg":"#ffdadb" },
			{ "id": 15, "txt1":"東森", "txt2": "廣場","txt3":"", "bg":"#ffdadb" },
			{ "id": 16, "txt1":"RECAL","txt2":" CLUB","txt3":" & SPA", "bg":"#fffbb7"},
			{ "id": 17, "txt1":"點8號","txt2":"","txt3":"", "bg":"#fffbb7" },
			{ "id": 18, "txt1":"北車K區", "txt2": "地下街","txt3":"", "bg":"#fffbb7" },
			{ "id": 19, "txt1":"東森", "txt2": "直播台","txt3":"", "bg":"#fffbb7" },
			{ "id": 20, "txt1":"Channel 5","txt2":"","txt3":"", "bg":"#fffbb7" },
			{ "id": 21, "txt1":"東森", "txt2": "民調雲","txt3":"", "bg":"#fffbb7" },
			{ "id": 22, "txt1":"MOOD","txt2":"","txt3":"", "bg":"#fffbb7" },
			{ "id": 23, "txt1":"新聞雲", "txt2": "APP","txt3":"", "bg":"#fffbb7" },
			{ "id": 24, "txt1":"牛津", "txt2": "6連霸","txt3":"", "bg":"#fffbb7" },
			{ "id": 25, "txt1":"分眾", "txt2": "廣告","txt3":"", "bg":"#fffbb7" }

		];

		//cell html
		let sHtml = ``;
		arrAns.forEach((item, idx)=>{
			sHtml += `<div class="cell cell_${idx}" 
							style="background-color:${item.bg}";
							data-bg="${item.bg}">
								<strong>${item.id}</strong> 
								<span>${item.txt1}</span>
								<span>${item.txt2}</span>
								<span>${item.txt3}</span>
						</div>`
		});

		
		//寫結構
		$(".gallery").html(sHtml);

		//rwd cell 寬
		$(window).on("resize", function(){
			let tmpSz = $(".gallery").innerWidth() / 5 |0;
			$(".gallery").attr({ style:`--sz:${tmpSz}px`})
		}).trigger("resize");


		//按鈕亂數產生
		$(".btn_random").on("click", function() {
			// cell
			let $cell = $(".gallery .cell");
		    // cell重新洗牌
		    fnShuffle($cell);
		    // 清空gallery並重新附加亂序的cell
		    $(".gallery").empty().append($cell);
		}).trigger("click"); //初始trigger

		//遊戲規則
		$(".btn_go").on("click", function(){
					$(".dialog").hide();
		});

		//送出 submit
		$(".btn_submit").on("click", function () {
			
			// 跳出談話視窗
			var bBtnCheck = confirm("是否送出？");
			if (bBtnCheck) {
				let tmpPickedArr = [];

				$(".gallery .cell").each(function () {
					tmpPickedArr.push({
						id: $(this).find("strong").text(),
						txt1: $(this).find("span").eq(0).text(),
						txt2: $(this).find("span").eq(1).text(),
						txt3: $(this).find("span").eq(2).text(),
						bg: $(this).data("bg"),
					});
				});

				// 送資料庫
				fnSubmit(JSON.stringify(tmpPickedArr));
			}

		});

	});


