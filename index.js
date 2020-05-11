$(function(){      //入口函数  
  //顶部注册按钮
	$(".login").mouseenter(function(){
		$(this).css("background","rgba(114,200,213,0.4)");
		$(this).siblings().css("background","none");
	})
	$(".top_register").mouseenter(function(){
		$(this).css("background","rgba(114,200,213,0.4)");
		$(this).siblings().css("background","none");
	})
	$(".login").click(function(){
		$(this).css("background","rgba(114,200,213,0.4)");
		$(this).siblings().css("background","none");
		$("form,.pswBack,.random").css("display","none")
		$(".login_box").css("display","block")
	})
	$(".top_register").click(() => {
		$("form,.pswBack,.random").css("display","block")
		$(".login_box").css("display","none")
	})
	
	//登录界面密码出现与隐藏
	$(".pswBack").click(function(){
		if($(".password").attr("type")=="password"){
			 $(".password").attr("type","text");
			 $(".pswBack img").attr("src","picture/pswexpose.svg");
			}else{
			$(".password").attr("type","password");
			$(".pswBack img").attr("src","picture/pswhidden.svg");
			}
	})
	//登录界面生成随机验证码
	 var random;
	 $(".random").click(function(){
		 random = Math.random().toString().slice(3,7);
		 $(this).text(random);
	 })
	 $(".random").mousedown(function(){
		 $(this).addClass("random_two");
	 })
	 $(".random").mouseup(function(){
	 		 $(this).removeClass("random_two");
	 })
	 
	 //注册界面生成随机验证码
	 $(".login_random").click(function(){
	 		 random = Math.random().toString().slice(3,7);
			 $(this).css("letterSpacing","10px")
	 		 $(this).text(random);
	 })
	 $(".login_random").mousedown(function(){
	 		 $(this).addClass("random_two");
	 })
	 $(".login_random").mouseup(function(){
	 		 $(this).removeClass("random_two");
	 })
	 
	//input框选中特效
	$(".box input").focus(function(){
		$(this).addClass("input_z");
	})
	$(".box input").blur(function(){
		$(this).removeClass("input_z");
	})
	
	// 登录验证
	$(".register").click(function(){
		check();
	})
	// 登录界面用户名验证函数
	function check(){
		var user = $(".input_first").val();
		var password = $(".input_second").val();
		var randompas = $(".input_third").val();
		if(user == ''){
			alert("请输入用户名")
		}else if(password == ''){
			alert("请输入密码")
		}else if(randompas == ''){
			alert("请输入正确的验证码")
	  }else if(randompas != random){
			alert("验证码错误")
		}else if($(".checkbox").get(0).checked == false){
			alert("请勾选《用户管理条例》")
		}else{ 
			$.ajax({
				type:"post",
				url:"http://192.168.1.105:8080/Epidemic/adminLogin.jsp",
				data:"adminLoginName="+ user +"&" + "adminLoginPassword=" + $.md5(password),
				success:function(msg){
					var str = msg.replace(/\s+/g, "");
					//示例 "name=cuimingxing,id=01111,code=0005"
					if(str.length>6){		
						var arr = str.split(",")
						var item = null, Name = null;Value = null;
						var args = [];
						for(var items of arr){
							item = items.split("=")
							  Name = item[0];
							  Value = item[1];
								args[Name] = Value;
							}
						if(args['code'] == '0005'){
							window.location.href = "./main.html?adminName="
							+args['name']+"&adminId="+args['id']+"&adminPhoto="+args['headPortrait'];
						}	
					 }else{
					 	alert("对不起，您的用户名或密码有误")
				   }
				},
				error:function(xhr){ 
					console.log(xhr.status)
				}
			})
		}		
				/////if结束
	}
	
	// 注册界面用户验证
	$(".confirm_register").click(() => {
		loginCheck()
	})
	function loginCheck(){
		var loginUser = $(".login_input1").val()
		var loginPassword1 = $(".login_input2").val()
		var loginPassword2 = $(".login_input3").val()
		var loginRandom = $(".login_input4").val()
		if(loginUser == ''){
			alert("请填写最大长度为10的用户名")
		}else if(loginPassword1 == ''){
			alert("请填写最大长度为10的密码")
		}else if(loginPassword2 == ''){
			alert("请再次填写您的密码")
		}else if(loginPassword1 != loginPassword2){
			alert("抱歉，您两次填写的密码不一致")
		}else if(loginRandom == ''){
			alert("对不起请填写验证码")
		}else if(loginRandom != random){
			alert("对不起您输入的验证码有误")
		}else if($(".login_checkbox").get(0).checked == false){
			alert("请勾选《用户须知条例》")
		}else{
			$.ajax({
				type:'post',
				url:'http://192.168.1.105:8080/Epidemic/register.jsp',
				data:{
					adminName:loginUser,
					adminPsd:$.md5(loginPassword2)
				},
				success(msg){
					var backdata = msg.replace(/\s+/g, "");
					if(backdata == 'a'){
						$(".back_login").css("display","inline-block")
						alert("恭喜您注册成功啦~")	
					}else if(backdata == 'f'){
						alert("对不起您的用户名已经有人注册过啦~")
					}else{
						alert("对不起,注册失败,请稍后再试")
					}
				},
				error(xhr){
					console.log(xhr.status)
				}
			})
		}		
	}
	
	 //注册成功后返回登录页面
	 $(".back_login").click(() => {
		 $(".login_box").css("display","none")
		 $("form,.pswBack,.random").css("display","block")
	 })
});
