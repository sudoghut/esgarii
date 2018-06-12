var filter = ["DataSource","Version","system","license","uri","sys_id of alternate"];
var unlockButtonFilter = ["spellings","present_location","historical_context","part of","preceded by"];
var needLookupCodes = [""];
window.wholeJson = "";

function callCAPI(mode){
    if (mode=="lookup") {
    	inputBox = "#lookupInput";
    }
    if (mode=="main") {
    	inputBox = "#mainInput";
    }
	jQuery.ajax({
	            url:"php/callCAPI.php",
	            type:"POST",
	            dataType:"JSON",
	            async:false,
	            data:{"chgisid":$(inputBox).val().trim()},
	          }).success(function(jsonData){
	            var reg = new RegExp("\r\n|\r|\n", "g"); 
	            jsonData= jsonData.replace(reg, "");
	            var obj = $.parseJSON(jsonData);
				wholeJson = obj;
	            if (mode=="lookup") {
		            $("#lookup").html("");
		            $("#lookup").append("<div id='json' class='json lookup L1'></div>");            	
	            }
	            else if (mode=="main") {
		            $("#main").html("");
		            $("#main").append("<div id='json' class='json main L1'></div>");  
	            }

	            //--leve1--begins
	            $.each(obj,function(index,value){
	              var typeIt = typeof value;
	              var level = 1;
	              if (typeIt=="string") {
	                parseString(index, value, level, mode);// 1 refers to level
	              };
	              if (typeIt=="object") {
	                if (Object.keys(value).length) {
	                  //--level2--begins
	                  creatObjTitle(index, value, level, mode);
	                  $.each(value,function(index2,value2){
	                    level = 2;
	                    var typeIt = typeof value2;
	                    if (typeIt=="string") {
	                      parseString(index2, value2, 2, mode);// 1 refers to level
	                    };
	                    if (typeIt=="object") {
	                      if (Object.keys(value2).length) {
	                           //--level3--begins
	                              creatObjTitle(index2, value2, level, mode);
	                              $.each(value2,function(index3,value3){
	                                level = 3;
	                                var typeIt = typeof value3;
	                                if (typeIt=="string") {
	                                  parseString(index3, value3, 3, mode);// 1 refers to level
	                                };
	                                if (typeIt=="object") {
	                                  if (Object.keys(value3).length) {
	                                   //--level4--begins
	                                      creatObjTitle(index3, value3, level, mode);
	                                      $.each(value3,function(index4,value4){
	                                        level = 4;
	                                        var typeIt = typeof value4;
	                                        if (typeIt=="string") {
	                                          parseString(index4, value4, 4, mode);// 1 refers to level
	                                        };
	                                        if (typeIt=="object") {
	                                          if (Object.keys(value4).length) {
	                                            //--level5--begins
		                                          creatObjTitle(index4, value4, level, mode);
			                                          $.each(value4,function(index5,value5){
			                                            level = 5;
			                                            var typeIt = typeof value5;
			                                            if (typeIt=="string") {
			                                              parseString(index5, value5, 5, mode);// 1 refers to level
			                                            };
			                                            if (typeIt=="object") {
			                                              if (Object.keys(value5).length) {
			                                              	//--level6--begins
					                                          creatObjTitle(index5, value5, level, mode);
						                                          $.each(value5,function(index6,value6){
						                                            level = 6;
						                                            var typeIt = typeof value6;
						                                            if (typeIt=="string") {
						                                              parseString(index6, value6, 6, mode);// 1 refers to level
						                                            };
						                                            if (typeIt=="object") {
						                                              if (Object.keys(value6).length) {
						                                              	//--level7--begins
								                                          creatObjTitle(index6, value6, level, mode);
									                                          $.each(value6,function(index7,value7){
									                                            level = 7;
									                                            var typeIt = typeof value7;
									                                            if (typeIt=="string") {
									                                              parseString(index7, value7, 7, mode);// 1 refers to level
									                                            };
									                                            if (typeIt=="object") {
									                                              if (Object.keys(value7).length) {
									                                              	//--level8--begins
											                                          creatObjTitle(index7, value7, level, mode);
												                                          $.each(value7,function(index8,value8){
												                                            level = 8;
												                                            var typeIt = typeof value8;
												                                            if (typeIt=="string") {
												                                              parseString(index8, value8, 8, mode);// 1 refers to level
												                                            };
												                                            if (typeIt=="object") {
												                                              if (Object.keys(value8).length) {
												                                                   
												                                              }
												                                            };
												                                          })
												                                          //--level8--ends
									                                              }
									                                            };
									                                          })
									                                          //--level7--ends
						                                              }
						                                            };
						                                          }) 
						                                    //--level6--ends
			                                              }
			                                            };
			                                          }) 
	                                            //--level5-ends
	                                          }
	                                        };
	                                      })                 
	                                   //--level4-ends                             
	                                  }
	                                };
	                              })                 
	                           //--level3-ends
	                      }
	                    };
	                  })
	                  //--leve2--ends      
	                }
	              };
	            })
	            //--leve1--ends                
	          }).error(function(jsonData){
	            console.log(jsonData);
	          }); 
	}



function creatObjTitle(index, value, level, mode){
	if (filter.indexOf(index)==-1) {
	var data = index;
	var html = constructHtml("creatObjTitle", level, data, mode);
	if (mode=="lookup") {
		var selector = ".json.lookup.L"+level;
	}
	else if (mode=="main") {
		var selector = ".json.main.L"+level;
	}
	$(selector).last().after(html);
	var html = constructHtml("creatGroup", level+1, data, mode);
	if (mode=="lookup") {
		var selector = ".json.lookup.L"+level;
	}
	else if (mode=="main") {
		var selector = ".json.main.L"+level;
	}
	$(selector).last().append(html);
	};  
}

function parseString(index, value, level, mode){
	var data= [index, value];
	if (filter.indexOf(index)==-1) {
		var html = constructHtml("", level, data, mode);
		if (mode=="lookup") {
			var selector = ".json.lookup.L"+level;
		}
		if (mode=="main") {
			var selector = ".json.main.L"+level;
		}
		//$(selector).last().append(html);
	};  
	$(selector).last().after(html);
}

function constructHtml(attr, level, data, mode){
	if (attr=="creatObjTitle") {
		if (mode=="lookup") {
			if (data=="Package" || data=="PersonAuthority") {
				var html = "<div class='json lookup L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+":"+"</div>";
			}else{
				if (unlockButtonFilter.indexOf(data)==-1) {
					var html = "<div class='json lookup L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+"<button type='button' class='btn btn-primary' style='height:25px;margin-left:20px;line-height: 0px' onclick='add()'>Add</button>"+":"+"</div>";
				}else{
					var html = "<div class='json lookup L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+":"+"</div>";
				}
			}
		}
		if (mode=="main") {
			if (level<=5) {
				var html = "<div class='json main L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+":"+"</div>";
			}else{
				//var html = "<div class='json main L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+"<button type='button' class='btn btn-danger  operationButtonsDelInMain' style='height:25px;margin-left:20px;line-height: 0px'>Del</button><button type='button' class='btn btn-info  operationButtonsCommentInMain' style='height:25px;margin-left:5px;line-height: 0px'>Comment</button>"+":"+"</div>";
				var html = "<div class='json main L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+":"+"</div>";
			}
		}
	}else if(attr=="creatGroup"){
		if (mode=="lookup") {
			var html = "<div class='json group lookup L"+level+"'></div>";
		}
		else if (mode=="main") {
			if (unlockButtonFilter.indexOf(data)==-1) {
				var html = "<div class='json group main L"+level+"'>"+"<button type='button' class='btn btn-primary operationButtonsUnlockInMain' onclick='clickUnlock(this)' style='height:25px;margin-left:20px;line-height: 0px'>Unlock</button><button type='button' class='btn btn-primary operationButtonsUnlockInMain' onclick='save()' style='height:25px;margin-left:20px;line-height: 0px'>Save</button></div>";
			}else{
				var html = "<div class='json group main L"+level+"'>"+"</div>";
			}
		}
	}else{
		if (mode=="lookup") {
			var html = "<div class='json lookup L"+level+"'><span class='label label-default'>"+level+" "+data[0]+"</span>:<span class='content'>"+data[1]+"</span></div>";
		}
		else if (mode=="main") {
			var html = "<div class='json main L"+level+"'>"+"<span class='label label-default'>"+level+" "+data[0]+"</span>:<span class='content'>"+data[1]+"</span>"+"</div>";
		}
	
	}
	return html;
}


var clickUnlock = function(e){
	$(e).html("Unlocked");
	$(e).attr("class","btn btn-default operationButtonsUnlockInMain");
	//$(e).prev("span").attr("contenteditable","true");
	//$(e).parent().children("span").attr("contenteditable","true");
	isCodeTitle = $(".btn.btn-default.operationButtonsUnlockInMain").parent().parent().children("span").text().split(" ")[1];
	if(isCodeTitle.length<=1){
		isCodeTitle = $(".btn.btn-default.operationButtonsUnlockInMain").parent().parent().parent().children("span").text().split(" ")[1];
	}
	console.log(isCodeTitle);
	if(needLookupCodes.indexOf(isCodeTitle)!=-1){
	}else{
		$(e).parent().parent().children("div").children(".content").attr("contenteditable","true");	
		$(".btn.btn-primary.operationButtonsUnlockInMain").prop('disabled', true);
		$(".btn.btn-default.operationButtonsUnlockInMain~button").prop('disabled', false);
	}
}

var outputTest = function outputTest(typeIt,value){
	console.log(typeIt);
	console.log(value);
	if (typeIt=="object") {
		console.log(Object.keys(value).length);
	};
	console.log("______________________");
}

var save = function(){
	$("span").attr("contenteditable","false");
	$(".btn.btn-primary.operationButtonsUnlockInMain").prop('disabled', false);
	$(".btn.btn-default.operationButtonsUnlockInMain").html("Unlock");
	$(".btn.btn-default.operationButtonsUnlockInMain").attr("class","btn btn-primary operationButtonsUnlockInMain");
}

var add = function(){
	if($('#main').html().indexOf('span')>=0){
		console.log('hi');
	}else{
		alert("Please load the data at the right part first");
	}
}

//next:
//save function
//delete function