var userEntry = "";
var listArr = [];
var nodeList = [];
var deleteCount = 0;
var completed = false; 

var editClick = false;
var editIndex;
$(document).ready(function(){
	
	getLocalStorage();
	displayList();
	$("#add-new").click(function(){
		var height = $(".wrapper").height();
		console.log("wrapper height ", height);
		console.log(userEntry);
		if(editClick === true){
			console.log(editIndex);
			listArr[editIndex][0] = $("#user-entry").val();
			console.log(listArr);
			setupLocalStorage();
			editClick = false;
		}else{
			userEntry = $("#user-entry").val();
			console.log(userEntry);
			if(userEntry.length === 0)
				$("#validation").html("Enter something in the input box!!!");
			else{
				listArr.push([userEntry, completed]);
				console.log("inside click event", listArr);
				setupLocalStorage(listArr);
			}	
		}
		displayList();	
		$("#user-entry").val("");
		$("#user-entry").focus();
	});
	
	$("#user-entry").keypress(function(){
		if($("#validation").html() != ""){
			$("#validation").html("");
		}
	});
	
	$("#display-content").on("click", ".delete-btn", function(){
		var clicked = "#" + $(this).attr("id");
		var parentElement = "#" + $(this).parent().attr("id");
		var h2Val = $(parentElement + " h2").html();
		
		for(var i = 0; i < listArr.length; i++){
			if(listArr[i][0] === h2Val){
				console.log("index of h2 value ", i);
				listArr.splice(i, 1);
				console.log("list array after removing item ", listArr);
				setupLocalStorage();
				displayList();
			}
		}
	});
	
	$("#display-content").on("click", ".checked-btn", function(){
		var clicked = "#" + $(this).attr("id");
		var parentElement = "#" + $(this).parent().attr("id");
		
		var h2Val = $(parentElement + " h2").html();	
		var index;
		for(var i = 0; i < listArr.length; i++){
			if(listArr[i][0] === h2Val){
				if(listArr[i][1] === true){
					listArr[i][1] = false;
				}else
					listArr[i][1] = true;
			}
		}
		setupLocalStorage();
		displayList();
		 
	});
	
	$("#display-content").on("click", ".edit-btn", function(){
		editClick = true;
		console.log("edit click val ", editClick);
		var clicked = "#" + $(this).attr("id");
		var parentElement = "#" + $(this).parent().attr("id");
		
		var h2Val = $(parentElement + " h2").html();
		$("#user-entry").val(h2Val);
		userEntry = $("#user-entry").val();
		for(var i = 0; i < listArr.length; i++){
			if(listArr[i][0] === userEntry){
				editIndex = i;
			}
		}
		$("#user-entry").focus();
	});
});

var displayList = function(){
	
	$("#display-content").html("");
	for(var i = 0; i < listArr.length; i++){
		$("#display-content").append("<div><h2>" + listArr[i][0] + "</h2></div>");
		$("#display-content div").addClass("list-box");
	}
	
	$(".list-box").append("<img src='images/icons8-checked-48.png' class='checked-btn' alt='check mark'>");
	$(".list-box").append("<img src='images/edit.png' class='checked-btn' alt='edit'>");
	$(".list-box").append("<img src='images/trash.png' class='delete-btn' alt='delete'>");
	
	var divList = document.querySelectorAll(".list-box");
	for(var i = 0; i < divList.length; i++){
		$(divList[i]).attr("id", "list-box-" + i);
	}
	
	var nodeList = document.querySelectorAll(".delete-btn");
	for(var i = 0; i < nodeList.length; i++){
		$(nodeList[i]).attr("id", "trash-" + i );
	}
	
	var h2List = document.querySelectorAll("h2");
	for(var i =0; i < listArr.length; i++){
		if(listArr[i][1] === true){
			$(h2List[i]).css("text-decoration", "line-through");
		}
	}
};

var getLocalStorage = function(){
	var getStorage = localStorage.getItem("list");
	if(getStorage === "undefined" || getStorage === null){
		listArr = [];
	}else{
		listArr = JSON.parse(getStorage);
		console.log("displayed array is ", listArr);	
	}
};

var setupLocalStorage = function(){
	localStorage.setItem("list", JSON.stringify(listArr));
};