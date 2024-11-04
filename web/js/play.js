	function fnRandom(argMin, argMax){
		return Math.round(argMin + Math.random()*(argMax - argMin));
	};

	$(function(){
		let arrAns = $(".user_pick").data("user-pick")

		//cell html
		let sHtml = ``;
		arrAns.forEach((item, idx)=>{
			sHtml += `<div class="cell cell_${idx}" 
							data-id="${item.id}"
							style="background-color:${item.bg}";
							data-bg="${item.bg}
							">
								<strong>${item.id}</strong> 
								<span>${item.txt1}</span>
								<span>${item.txt2}</span>
								<span>${item.txt3}</span>
						</div>`
		});

		//寫結構
		$(".gallery").html(sHtml);

		//已選擇號碼 燈箱
		$("button.btn_pick").click(function () {
			$(".light_box, .overlap").show();
		});
		$(".btn_close , .overlap").click(function () {
			$(".light_box , .overlap").hide();
		});

		
		//滑鼠特效的實體
		let bobble_1  = new mojs.Burst({
			left: 0, //分子中心
			top: 0,
			radius:	{30 : 100},
			count:6,
			children : {
				fill:"#ffe019",
				radius:	15,
				duration: 1000,
			},
		});

		//點格子
		$(".gallery .cell").click(function(e){
			
			$(this).toggleClass("active");

			let cell = $(this);
			let cellChange = cell.data("change");
			let cellTxt1 = cell.data("txt1");
			let cellTxt2 = cell.data("txt2");
			let cellTxt3 = cell.data("txt3");
			
			//檢測連線
			fnCheckWin();

			//檢核
			fnCheckList();

			//高亮音
			//fnSound("undefined_coin04.mp3"); 

			//滑鼠特效
			bobble_1.tune({
				left: e.clientX, //分子中心
				top: e.clientY,
			}).replay();
			
		});
		
		//播音效
		function fnSound(argUrl){
			let $sound = $(`<audio src="sound/${argUrl}" playsinline></audio>`);
			$sound.appendTo("body");
			$sound[0].play();

			setTimeout(() => {
				$sound.remove();
			}, 3000);
		}

		//rwd cell 寬
		$(window).on("resize", function(){
			let tmpSz = $(".gallery").innerWidth() / 5 |0;
			$(".gallery").attr({ style:`--sz:${tmpSz}px`})
		}).trigger("resize");
	
		//遊戲規則
		$(".btn_go").on("click", function(){
			$(".dialog").hide();
		});
	
		//數字檢核
		function fnCheckList(){

			let tmpArr = [];

			//取cell data-id 成陣列
			$(".gallery .cell.active").each(function(){
				tmpArr.push($(this).data("id"));
			});

			//由小到大
			tmpArr.sort((a, b) => a - b);

			let sHtml = ``;
			tmpArr.forEach(item =>{
				sHtml += `<li>${item}</li>`
			});

			$(".ansList").html(sHtml);

		}

		//已連線 watch
		let lineTotalOld = 0;

		//檢測連線
		function fnCheckWin() {
			//行數
			let lineRow = 0;
			let lineCol = 0;
			let lineCross = 0;
			let lineTotalNew = 0;
			
			const $cellGroup = $(".gallery .cell");

			// 檢查 水平列
			for (let i = 0; i < 5; i++) {
				const $cellRow = $cellGroup.slice(i * 5, (i + 1) * 5);
				//$cellRow.css({ border: `5px solid hsl(${fnRandom(0, 360)}deg, 50%, 50%)` });
				if ($cellRow.filter(".active").length === 5) { 
					lineRow++;
				}
			}

			//檢查 垂直欄
			for (let i = 0; i < 5; i++) {
				const $cellCol = $cellGroup.filter((idx, el) => (idx % 5) === i);
				//$cellCol.css({ border: `5px solid hsl(${fnRandom(0, 360)}deg, 50%, 50%)` });
				if ($cellCol.filter(".active").length === 5) {
					lineCol++;
				}
			}

			//檢查 左上到右下 對角線
			const $cellCrossLeftTop = $cellGroup.filter(`:nth-child(6n+1)`);
			//$cellCrossLeftTop.css({ border: `5px solid hsl(${fnRandom(0, 360)}deg, 50%, 50%)` });
			if ($cellCrossLeftTop.filter(".active").length === 5) { 
				lineCross++;
			}

			// 檢查右上到左下對角線
			const $cellCrossRightTop = $cellGroup.filter(function(index) {
				const row = Math.floor(index / 5); // 行数
				const col = index % 5; // 列数
				return (row + col === 4);
			});

			//$cellCrossRightTop.css({ border: `5px solid hsl(${fnRandom(0, 360)}deg, 50%, 50%)`});
			if ($cellCrossRightTop.filter(".active").length === 5) { 
				lineCross++;
			}

			//加總
			lineTotalNew = lineRow + lineCol + lineCross;

			//console.log(`列数：${lineRow}, 欄数：${lineCol}, 对角：${lineCross}, 總數：${lineTotalNew}`);

			//得分
			$(".score span").html(lineTotalNew);

			//連線增加 watch lineTotalOld
			if(lineTotalNew > lineTotalOld){
				//高亮音
				fnSound("undefined_crrect_answer3.mp3");

				$(`<div class="addOne" style="left:${fnRandom(20, 80)}%">+1</div>`).appendTo("body").delay(8000).queue(function(){$(this).remove()});
				lineTotalOld = lineTotalNew;
			}
			
		}


	});