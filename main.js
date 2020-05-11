$(function(){
	// 获取登录进来的管理员信息
	  //处理获取的信息
				 var loc = location.search;
				// var loc = "?adminName=cuimingxing&adminId=01111"
				var info = loc.substring(1); 
			  var arr = info.split("&");
				var item = null;Name = null;Value = null;
				var args = [];
				for(var items of arr){
					item = items.split("=")
					Name = item[0];
					Value = item[1];
					args[Name] = Value;	
				}
	      $(".leftAdminName").text(args['adminName'])
				if(args['adminId'] == '01111'){
					$(".adminId").text("高级权限")
				}else if(args['adminId'] == '01112'){
					$(".adminId").text("中级权限")
				}else if(args['adminId'] == '01113'){
					$(".adminId").text("初级权限")
				}
				$(".photo img").attr("src",args['adminPhoto'])
				$(".self_photo").attr("src",args['adminPhoto'])
	
	// 头部设置按钮动效
	$(".set_img").mouseenter(function(){
		$(".set").stop();
		$(".set").fadeIn();
	})
	$(window).click(function(){
		$(".set").stop();
		$(".set").fadeOut();
	})

	//点击设置里的退出登录按钮
	$(".logout").click(function(){
		location.replace('index.html')
	})
	
	// 生成时间
	  var t = null;
	  t = setTimeout(timer,1000);
	  function timer(){
		 var date = new Date();
		 			var year = date.getFullYear();
		 			var month = date.getMonth()+1;
		 			var day = date.getDate();
		 			var hours = date.getHours();
		 			var minutes = date.getMinutes();
		 			var seconds = date.getSeconds();
		 $(".year").html(year+'-'+month+'-'+day);
		 $(".hours").html(hours+':'+minutes+':'+seconds);
	   t = setTimeout(timer,1000);	
	 }	

	 // 侧栏按钮点击动效
	 $(".side_bar li").click(function(){
		 $(this).addClass("color");
		 $(this).siblings().removeClass("color")
	 })
	 $(".analysis").click(function(){
		 $("body").scrollTop(0) + $("html").scrollTop(0);
	 })
	 $(".userControl").click(function(){
		$("body").scrollTop(821) + $("html").scrollTop(821);
	 })
	 $(".userMes").click(function(){
	 		$("body").scrollTop(1680) + $("html").scrollTop(1680);
	 })
	 $(".admitControl").click(function(){
	 		$("body").scrollTop(2670) + $("html").scrollTop(2670);
	 })
	 $(".contactUS").click(function(){
	 		$("body").scrollTop(3260) + $("html").scrollTop(3260);
	 })
	 
	 // 滚动条高度发生变化,左侧导航栏也要发生相应改变
	 $(window).scroll(function(){
		 if(($("body").scrollTop() + $("html").scrollTop())<500){
      $(".analysis").addClass("color");
      $(".analysis").siblings().removeClass("color"); 
		 }else if(($("body").scrollTop() + $("html").scrollTop())>=500 && ($("body").scrollTop() + $("html").scrollTop())<1500){
			 $(".userControl").addClass("color");
			 $(".userControl").siblings().removeClass("color");
		 }else if(($("body").scrollTop() + $("html").scrollTop())>=1500 && ($("body").scrollTop() + $("html").scrollTop())<2300){
			 $(".userMes").addClass("color");
			 $(".userMes").siblings().removeClass("color");
		 }else if(($("body").scrollTop() + $("html").scrollTop())>=2300 && ($("body").scrollTop() + $("html").scrollTop())<2680){
			 $(".admitControl").addClass("color");
			 $(".admitControl").siblings().removeClass("color");
		 }else{
			 $(".contactUS").addClass("color");
			 $(".contactUS").siblings().removeClass("color");
		 }
		  // console.log($("body").scrollTop() + $("html").scrollTop())
	 })
	 
	 
	 //**用户信息部分////////////////////////////////////
	 // 表格动效
	 // 构造一个空的tr函数,即生成一行用户数据节点函数
	 function creatEle(value){
	 		 var tr = $(`<tr>
	 						<td class="number"></td>
							<td class="Name">`+ value.realName +`</td>
	 						<td class="Sex">`+ value.sex +`</td>
	 						<td class="Age">`+ value.age +`</td>
	 						<td class="Profession">`+ value.profession +`</td>
	 						<td class="Identity">`+ value.identity +`</td>
	 						<td class="Phone">`+ value.phone +`</td>
	 						<td class="Adress">`+ value.address +`</td>
	 						<td class="Code">`+ value.code +`</td>
							<td class="edit">编辑</td>
	 						<td class="remove">移除</td>
							<td class="userId" style="display: none;">`+ value.id+`</td>
	 					</tr>`)
	 					return tr;
	 };
	 
	 function creatEle02(){
	 		 var tr = $(`<tr>
							<td class="number"></td>
	 						<td class="Name"></td>
	 						<td class="Sex"></td>
	 						<td class="Age"></td>
	 						<td class="Profession"></td>
	 						<td class="Identity"></td>
	 						<td class="Phone"></td>
	 						<td class="Adress"></td>
	 						<td class="Code"></td>
							<td class="edit">编辑</td>
	 						<td class="remove">移除</td>
							<td style="display: none;"></td>
	 					</tr>`)
	 					return tr;
	 }; 

	//**构造获取某一页（整页）数据函数
	getUserList(1)
	 function getUserList(page){
		$.ajax({
			type:'post',
			url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
			data:'userList=true&page=' + page,
		  success(msg){
				var userList = JSON.parse(msg)
				$.each(userList,function(key,value){
					var $userList = creatEle(value)
					$(".table_box tbody").append($userList)
					getNumber(page)
				})
			}, 
			error(xhr){
				console.log(xhr)
			}
		})
	 };
	
	//**获取总页数
	 getAllPage()
	  var totalPage
	 function getAllPage(){
	 		 $.ajax({
	 			 type:'post',
	 			 url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
	 			 data:'totalPage=true',
	 			 success(msg){
				  totalPage = msg
					$(".table_box .totalPage").text(totalPage)
	 			 },
	 			 error(xhr){
	 				 console.log(xhr.status)
	 			 }
	 		 })
	 };

	//** 用户管理列表的页数,点击页数获取这一页用户数据
	   var curPage1 = 1;  var page;
		 $(".table_box .pageRight").click(function(){
				curPage1 += 1;
		 		if(curPage1>=totalPage){
		 			curPage1 = totalPage
		 		}
		 $(".table_box .currentPage").html(curPage1);
		 var page = $(".table_box .currentPage").html()
		  $("tbody tr").remove()
	    getUserList(page)	 
		});
		 $(".table_box .pageLeft").click(function(){ 
				curPage1 -= 1;
				if(curPage1<=1){
					curPage1 = 1
				}
	  $(".table_box .currentPage").html(curPage1);
		$("tbody tr").remove()
		var page = $(".table_box .currentPage").html()
		getUserList(page)
	});
	 
	 //**添加用户
	 if(args['adminId'] == '01111' || args['adminId'] == '01112'){
		 $(".addUser").click(function(){
			 // 页数立马跳到最后一页
			 $(".table_box .currentPage").html(totalPage)
			 // 当前页数的内容全部清空
			  $("tbody tr").remove()
				// 获取最后一页的用户信息
				getUserList(totalPage)
				// 如果最后一页用户数大于12则清空最下方一条
				if($(".table_box tbody tr").length>=12){
					$(".table_box tbody tr:last-child").remove
				}
				// 创新一条新的空tr,用于填写数据
				 var tr = creatEle02();
				 // 将填写好的tr添加到节点上
		 		 $(".table_box tbody").append(tr)
		 		 $(".table_box tbody tr:last-child").prop("contentEditable","true") 
		 		 $(".table_box tbody tr:last-child").addClass("on_edit")
		 		 $(".table_box tbody tr:last-child").blur(function(){
					 // tr失去焦点则发送请求给后台存储数据
		 			 $(this).removeClass("on_edit")
		 			 $(this).prop("contentEditable","false")
					$.ajax({
							type:'post',
							url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
							data:{
							 addUserInfo:true,
							 realName:$(this).children(".Name").text(),
							 sex:$(this).children(".Sex").text(),
							 age:$(this).children(".Age").text(),
							 profession:$(this).children(".Profession").text(),
							 identity:$(this).children(".Identity").text(),
							 phone:$(this).children(".Phone").text(),
							 address:$(this).children(".Adress").text(),
							 code:$(this).children(".Code").text()
						 },
						 success(){
						 },
						 error(xhr){
							 console.log(xhr)
						 }
					 }) 
		 		 })
		 		 getNumber(page)
		 })
	 }; 
	
	 // **移除按钮
	 if(args['adminId'] == '01111' || args['adminId'] == '01112'){
		$("body").delegate(".remove","click",function(){
				 getNumber($(".table_box .currentPage").html())
				 $(this).parents("tr").remove();
				 $.ajax({
					 type:'post',
					 url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
					 data:{
						 removeUser:true,
						 removeUserId:$(this).parents("tr").children(".userId").text()
					 },
	          error(xhr){
						console.log(xhr.status)
						}
				 })
		}) 
 };
	
	 // **编辑按钮
	 if(args['adminId'] == '01111' || args['adminId'] == '01112'){
		 $("body").delegate(".edit","click",function(){
		 			 $(this).parents("tr").prop("contentEditable","true");
		 			 $(this).parents("tr").addClass("on_edit")
		 			 $(this).parents("tr").blur(function(){
		 			 	 $(this).removeClass("on_edit")
		 			 	 $(this).prop("contentEditable","false")	
					$.ajax({
							type:'post',
							url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
							data:{
							 changeUserInfo:true,
							 realName:$(this).children(".Name").text(),
							 sex:$(this).children(".Sex").text(),
							 age:$(this).children(".Age").text(),
							 profession:$(this).children(".Profession").text(),
							 identity:$(this).children(".Identity").text(),
							 phone:$(this).children(".Phone").text(),
							 address:$(this).children(".Adress").text(),
							 code:$(this).children(".Code").text(),
							 id:$(this).children(".userId").text()
						 },
						 success(){
						 },
						 error(xhr){
							 console.log(xhr)
						 }
					 }) 		 			
	     }) 
     })
 };
 
  // 构造生成编号函数
			 function getNumber(page){
				$.each($("tr"),function(index,value){
				$(this).children(".number").html(index + (page-1) * 12)
				}) 
			 };


  ///**用户健康信息查询部分//////////////////////////
	 $(".userHearSearch").click(() => {
		 if($(".msgSearch").val() == ''){
			 alert("请输入被搜索用户姓名")
		 }else{
			 $.ajax({
			 			 type:'post',
			 			 url:'http://192.168.1.105:8080/Epidemic/queryUsers.jsp',
			 			 data:'realName=' + $(".msgSearch").val(),
			 			 success(msg){
							 var userHearObj = JSON.parse(msg)
							 $(".infoBox img").attr("src",userHearObj[0].headPortrait)
							 $(".userName").html(userHearObj[0].realName)
							 $(".userSex").html(userHearObj[0].sex)
							 $(".userAge").html(userHearObj[0].age)
							 $(".message1").html(userHearObj[0].message1)
							 $(".message2").html(userHearObj[0].message2)
							 $(".message3").html(userHearObj[0].message3)
							 $(".message4").html(userHearObj[0].message4)
							 $(".message5").html(userHearObj[0].message5)
							 $(".message6").html(userHearObj[0].message6)
							 $(".message7").html(userHearObj[0].message7)
							 $(".message8").html(userHearObj[0].message8)
			 			 },
			 			 error(xhr){
			 				 console.log(xhr.status)
			 			 }
			 })
		 } 
	});

   //**管理员信息部分//////////////////////////////
   //**获取管理员列表总页数
	 getAdminPage()
	 var totalAdminPage
	 function getAdminPage(){
		 $.ajax({
			 type:'post',
			 url:'http://192.168.1.105:8080/Epidemic/page.jsp',
			 data:{
				 adminAllPage:true
			 },
			 success(msg){
			 totalAdminPage = msg.replace(/\s+/g, "")
				 $(".limitsBox .totalPage").html(totalAdminPage)
			 },
			 error(xhr){
				 console.log(xhr.status)
			 }
		 })
	 };     
  
   //构造创建管理员信息函数
   function createAdmin(obj){
   	var adminObj = $(`<div class="adminInfo">
   			<div class="adminPhoto"><img src="`+ obj.headPortrait +`"/></div>
   			<span class="_name">姓名:</span><span class="adminName" name="`+ obj.adminName +`">`+ obj.name +`</span>
   			<span class="_time">有效时间：长期有效</span>
   			<span class="_quanxian">你的最高权限为：</span>
   			<input type="text" list="option" class="_input" value=`+ obj.id +` disabled="disabled"/>
   			<datalist id="option">
   				<option>初级</option>
   				<option>中级</option>
   				<option>高级</option>
   			</datalist>
   			<button class="adminChange">修改</button>
   			<button class="adminConfirm">确认</button>
   			<button class="adminDelete">删除</button>
   		</div>`)
   		return adminObj;
   }

  //**上来就获取管理员权限部分第一页管理员信息
  getAllAdminInfo(1)
  function getAllAdminInfo(adminInfoPage){
    $.ajax({
    	type:'post',
    	url:'http://192.168.1.105:8080/Epidemic/adminMessage.jsp',
    	data:{
  			adminPage:adminInfoPage
  		},
    	success(msg){
    		var adminObj = JSON.parse(msg)
    		$.each(adminObj,function(key,value){
    			if(value.id == '01111'){
    				value.id = '高级'
    			}else if(value.id == '01112'){
    				value.id = '中级'
    			}else{
    				value.id = '初级'
    			}
    			var $adminInfo = createAdmin(value);
    			$(".limitsBox").append($adminInfo);
    		})
    	},
    	errer(xhr){
    		console.log(xhr.status)
    	}
    })	
  };
  
	 // **点击某页，就获取那一页管理员的信息
	 var curPage2 = 1;
	 		 $(".limitsBox .pageRight").click(function(){
	 				curPage2 += 1;
	 		 		if(curPage2 >= totalAdminPage){
	 		 			curPage2 = totalAdminPage
	 		 		}
        $(this).parents(".limitsBox").children(".adminInfo").remove()
	 		 $(".limitsBox .currentPage").html(curPage2);	 
			 var adminCurPage = $(".limitsBox .currentPage").html()	
			 getAllAdminInfo(adminCurPage)
	 		});
	 		 $(".limitsBox .pageLeft").click(function(){ 
	 				curPage2 -= 1;
	 				if(curPage2<=1){
	 					curPage2 = 1
	 				}
		$(this).parents(".limitsBox").children(".adminInfo").remove()
	  $(".limitsBox .currentPage").html(curPage2);
		 var adminCurPage = $(".limitsBox .currentPage").html()
		 getAllAdminInfo(adminCurPage)
	 });
		 		 		 
		 // 管理员权限管理（本地限制）
		if(args['adminId'] == '01111'){
			$("body").delegate(".adminChange","click",function(){
				 $(this).prevAll("._input").removeAttr("disabled");
			})
			$("body").delegate(".adminConfirm","click",function(){
				 $(this).prevAll("._input").attr("disabled","disabled");
			})
			$("body").delegate(".adminDelete","click",function(){
				 $(this).parents(".adminInfo").remove();
			})
		};
			
		// **修改权限 
		$("body").delegate(".adminConfirm","click",function(){
			$.ajax({
				type:'post',
				url:'http://192.168.1.105:8080/Epidemic/adminPower.jsp',
				data:{
					adminName:$(this).prevAll(".adminName").attr("name"),
					adminLimits:$(this).prevAll("._input").val(),
				},
				success(msg){
				},
				error(xhr){
					console.log(xhr)
				}
		  })
		});
		
	//**删除管理员
		$("body").delegate(".adminDelete","click",function(){
			$.ajax({
				type:'post',
				url:'http://192.168.1.105:8080/Epidemic/adminMessage.jsp',
				data:{
					deleteAdminInfo:true,
					adminUserName:$(this).prevAll(".adminName").attr("name")
				},
				success(msg){
				},
				error(xhr){
					console.log(xhr.status)
				}
			})
		});
		
		//****获取用户总数，绿码总数，黄码总数，红码总数
		var userCodeTotal
		$.ajax({
			type:'post',
			url:'http://192.168.1.105:8080/Epidemic/viewUser.jsp',
			data:{
				getUserCodeTotal:true,
			},
			success(msg){
				userCodeTotal = JSON.parse(msg)
				$(".user_total span").html(userCodeTotal.total)
				$(".green_total span").html(userCodeTotal.green)
				$(".yellow_total span").html(userCodeTotal.yellow)
				$(".red_total span").html(userCodeTotal.red)
				$(".user_list i").html(userCodeTotal.total)
			},
			error(xhr){
				console.log(xhr)
			}
		})
		
});

