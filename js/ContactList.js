$(document).ready(function(){
			$.getJSON("json/team.json", function(data) {
				$.each(data, function() {
					$.each(this, function(key, value) {
                        localStorage.setItem(value.title,JSON.stringify(value))
						$("#team").append(
                            
                            "<h1>" + value.title + "</h1>" +
                            "<h3>" + value.full_name + "</h3>" +
                           
                             "<p>" + value.address + "</p>"+
                            "<p>" + value.phone_Number + "</p>"
						);
					});
				}); 
			});
			$("#add_name").focus();
		});

var list_Array = [];
$("#errormsg").hide();
$("#update_Contact").hide();



function add_Contact_Info(){

    var html = "";
    var Localdata = JSON.parse(localStorage.getItem("teachers_List"));
  
    Localdata.sort(function(r, s){

        var r=r.name.toLowerCase();
        var s=s.name.toLowerCase()

        if (r < s) 
            return -1 
        if (r > s)
            return 1
        return 0 

    });
    
 
    for(var i=0; i<Localdata.length; i++){

        html += "<p><strong>"+Localdata[i].name+"</strong></p> <p>Contact Number: <strong>"+Localdata[i].number+"</strong></p> <p>Address: <strong>"+Localdata[i].address+"</strong></p> <button id='deletebtn' onclick='delete_Contact_Info("+i+")'>Delete Contact</button> <button id='updatebtn' onclick='update_Contact_Info("+i+")'>Update Your Information</button>";
    }

    $(".details").html(html);    

}
function delete_Contact_Info(i){

    list_Array.splice(i, 1);
    localStorage.setItem("teachers_List", JSON.stringify(list_Array));
    add_Contact_Info();
	$("#add_name").focus();
     
}
function update_Contact_Info(i){
    sessionStorage.setItem("id",i);
    $("#addbtn").hide();
    $("#update_Contact").show();
    $("#add_name").val(list_Array[i].name);
    $("#add_phone").val(list_Array[i].number);
    $("#add_address").val(list_Array[i].address);
	$("#add_name").focus();
}




$(function(){

    
    session_Storage();

    $("#addbtn").click(function(){      
        
        var ContactName = $("#add_name").val().trim();
        var ContactNumber = $("#add_phone").val().trim();
        var Address = $("#add_address").val().trim();

        function PhoneNumberCheck(input){

           
            var phoneNumber = /^\d{10}$/;
            if(input.match(phoneNumber)){
                return true;
            }else{
                return false;
            }
        }

        var result = PhoneNumberCheck(ContactNumber);
        
       
        if(!isNaN(ContactNumber) && ContactNumber!="" && ContactName!="" && result && Address!=""){

            var ContactDetails = {
                name: ContactName,
                number: ContactNumber,
                address: Address
            };
    
            list_Array.push(ContactDetails);
            
            list_Array.sort(function(p, q){

                var p=p.name.toLowerCase();
                var q=q.name.toLowerCase()
                if (p < q) 
                    return -1;
                if (p > q)
                    return 1;
                return 0; 
            });
            
            localStorage.setItem("teachers_List", JSON.stringify(list_Array));
    
            add_Contact_Info();
            $("input").val("");  
            $("#errormsg").html("Contact has been added successfully.");
            $("#errormsg").css("background-color","#530c0a");
            $("#errormsg").css("color","#fff");
            $("#errormsg").show();
            $("#errormsg").fadeOut(8000); 
             $("#add_name").focus();     
        }else{
            
			if(ContactName == ""){
				$("#errormsg").html("Enter a name");
				$("#add_name").focus();
			}
            else if(ContactNumber == ""){
				$("#errormsg").html("Enter the phone number");
				$("#add_phone").focus();
			}
			else if(result == false){
				$("#errormsg").html("Invalid Phone Number");
				$("#add_phone").focus();
			}
			else if(Address == ""){
				$("#errormsg").html("Enter the address");
				$("#add_address").focus();
			}
            $("#errormsg").css("background-color","#530c0a");
            $("#errormsg").css("color","#fff");
            $("#errormsg").show();
            $("#errormsg").fadeOut(8000);   

        }


           
        
    });

    $("#update_Contact").click(function(){

        var id = sessionStorage.getItem("id");

        var ContactName = $("#add_name").val().trim();
        var ContactNumber = $("#add_phone").val().trim();
        var Address = $("#add_address").val().trim();

        function PhoneNumberCheck(input){

           
            var phoneNumber = /^\d{10}$/;
            if(input.match(phoneNumber)){
                return true;
            }else{
                return false;
            }
        }

        var result = PhoneNumberCheck(ContactNumber);
        
       
        if(!isNaN(ContactNumber) && ContactNumber!="" && ContactName!="" && result && Address!=""){

            list_Array.splice(id, 1);


            var ContactDetails = {
                name: ContactName,
                number: ContactNumber,
                address: Address
            };
    
            list_Array.push(ContactDetails);


            list_Array.sort(function(p, q){

                var p=p.name.toLowerCase();
                var q=q.name.toLowerCase()
                if (p < q) 
                    return -1;
                if (p > q)
                    return 1;
                return 0; 
            });
       
            localStorage.setItem("teachers_List", JSON.stringify(list_Array));
    
            add_Contact_Info();
            $("#update_Contact").hide();   
            $("#addbtn").show();
            $("input").val("");
            $("#errormsg").html("Contact has been updated successfully.");
            $("#errormsg").css("background-color","#530c0a");
            $("#errormsg").css("color","#fff");
            $("#errormsg").show();
            $("#errormsg").fadeOut(8000); 
             $("#add_name").focus();      
        }else{
            
            if(ContactName == ""){
				$("#errormsg").html("Enter a name");
				$("#add_name").focus();
			}
            else if(ContactNumber == ""){
				$("#errormsg").html("Enter the phone number");
				$("#add_phone").focus();
			}
			else if(result == false){
				$("#errormsg").html("Invalid Phone Number");
				$("#add_phone").focus();
			}
			else if(Address == ""){
				$("#errormsg").html("Enter the address");
				$("#add_address").focus();
			}
            $("#errormsg").css("background-color","#530c0a");
            $("#errormsg").css("color","#fff");
            $("#errormsg").show();
            $("#errormsg").fadeOut(8000);   
            $("#update_Contact").show();   
            $("#addbtn").hide();

        }        
        
    });

  
});

function session_Storage(){

    if(localStorage.getItem("teachers_List") != null){
        
        var html = "";
        var localdata = JSON.parse(localStorage.getItem("teachers_List"));

        localdata.sort(function(p, q){

            var p=p.name.toLowerCase();
            var q=q.name.toLowerCase()
            if (p < q) 
                return -1;
            if (p > q)
                return 1;
            return 0; 
        });
        
      
        for(var i=0; i<localdata.length; i++){

            list_Array[i] = localdata[i];

            html += "<p><strong>"+localdata[i].name+"</strong></p> <p>Contact Number: <strong>"+localdata[i].number+"</strong></p> <p>Address: <strong>"+localdata[i].address+"</strong></p> <button id='deletebtn' onclick='delete_Contact_Info("+i+")'>Delete Contact</button> <button id='updatebtn' onclick='update_Contact_Info("+i+")'>Update Your Information</button>";
        }
        $(".details").html(html);    
    }else{
        $(".details").html(""); 
    }
}
