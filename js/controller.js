var filter = ["DataSource","Version","system","license","uri","sys_id of alternate","sys_id"];
var unlockButtonFilter = ["spellings","present_location","historical_context","part of","preceded by"];
var needLookupCodes = [""];
window.wholeJson = "";
window.pathTitle = [];
window.subJson = {};
window.json_revision = [];

var save_json = function(){
	jQuery.ajax({
	            url:"php/save_json.php",
	            type:"POST",
	            async:false,
	            data:{"wholeJson":wholeJson},
	          }).success(function(data){
							console.log(data);
							if(data=="done"){
								alert("saved");
							}else{
								alert("error1");
							}
							console.log(data);
             
	          }).error(function(jsonData){
							alert("error2");
	            console.log(jsonData);
	          }); 
	}

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
							console.log(jsonData);
							$("#add_element").attr("disabled",false);
	            var reg = new RegExp("\r\n|\r|\n", "g"); 
	            jsonData= jsonData.replace(reg, "");
	            var obj = $.parseJSON(jsonData);
				
	if (mode=="lookup") {
		$("#lookup").html("");
		$("#lookup").append("<div id='json' class='json lookup L1'></div>");            	
	}
	else if (mode=="main") {
		wholeJson = obj;
		$("#main").html("");
		$("#main").append("<div id='json' class='json main L1'></div>"); 
	}
				showJson(obj, mode);
             
	          }).error(function(jsonData){
	            console.log(jsonData);
	          }); 
	}

function showJson(obj, mode){
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
					var html = "<div class='json lookup L"+level+"'><span class='label label-default'>"+level+" "+data+"</span>"+"<button type='button' class='btn btn-primary' style='height:25px;margin-left:20px;line-height: 0px' onclick='add(this)'>Add</button>"+":"+"</div>";
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
				var html = "<div class='json group main L"+level+"'>"+"<button type='button' class='btn btn-danger operationButtonsUnlockInMain' onclick='del_record(this)' style='height:25px;margin-left:20px;line-height: 0px'>Delete</button><button type='button' class='btn btn-primary operationButtonsUnlockInMain' onclick='clickUnlock(this)' style='height:25px;margin-left:20px;line-height: 0px'>Unlock</button><button type='button' class='btn btn-primary operationButtonsUnlockInMain' onclick='save(this)' style='height:25px;margin-left:20px;line-height: 0px'>Lock</button></div>";
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
	test = getSubJson(e,"main");
	console.log(test)
}

var outputTest = function outputTest(typeIt,value){
	console.log(typeIt);
	console.log(value);
	if (typeIt=="object") {
		console.log(Object.keys(value).length);
	};
	console.log("______________________");
}

var save = function(e){
	$("span").attr("contenteditable","false");
	$(".btn.btn-primary.operationButtonsUnlockInMain").prop('disabled', false);
	$(".btn.btn-default.operationButtonsUnlockInMain").html("Unlock");
	$(".btn.btn-default.operationButtonsUnlockInMain").attr("class","btn btn-primary operationButtonsUnlockInMain");
	path = getPath(e,"main");
	subJson = getSubJson(e,"main");
	add_delete_elements(path, subJson, "revise");
	reload_main();
	
}


var getSubJson = function(e,mode){
	if(mode=="lookup"){
		var wholeRawJson = $(e).parent().children("div").children(".content").parent();
	}else{
		var wholeRawJson = $(e).parent().parent().children("div").children(".content").parent();
	}
	var subJsonArray = {};
	$.each(wholeRawJson,function(index, value){
		var title = titleNameNoNumber($(value).children(".label").text());
		var text = $(value).children(".content").text();
		subJsonArray[title] = text;
	})
	return JSON.stringify(subJsonArray);
}

var titleNameNoNumber = function(titleWithNumber){
	return titleWithNumber.slice(titleWithNumber.indexOf(" ")+1);
}

var add = function(e){
	if($('#main').html().indexOf('span')>=0){
		pathTitle = getPath(e,"lookup");
		subJson = getSubJson(e,"lookup");
		console.log("here");
		console.log(subJson);
		pathTitle = [pathTitle[0]];
		//subJson = JSON.parse("[" + subJson + "]");
		subJson = JSON.parse(subJson);
			
			
		console.log(subJson);
		add_delete_elements(pathTitle, subJson, "add");
		reload_main();
	}else{
		alert("Please load the data at the right part first");
	}
}

var getPath = function(e,mode){
	if(mode=="lookup"){
		var firstPart = $(e).parent();	
	}else{
		var firstPart = $(e).parent().parent();	
	}
	var secondPart = ".children('span').text().split(' ')";
	var middlePart = ".parent()";
	var titleNum = firstPart.children('span').text().split(' ')[0];
	pathTitle = [];
	pathTitle.push(firstPart.children('span').text().split(' ')[1]);
	var test = 1;
 	while (titleNum!=1){
		firstPart = firstPart.parent();
		pathTitle.push(firstPart.children('span').text().split(' ').slice(1).join("_"));
		titleNum = firstPart.children('span').text().split(' ')[0];
		//console.log(pathTitle);
		//console.log(titleNum);
	}
	pathTitle = pathTitle.reverse();
	console.log(pathTitle);
	return pathTitle;
}

function read_class_level_array(class_levels_array){
	$.each(stru,function(i,item){
		if (filter.indexOf(i)==-1) {
			class_levels_array.push({"value":i})
		}
	});
	return class_levels_array;
}

var top_levels_menu = function(class_levels_array) {
	this.data = ko.observableArray(class_levels_array);
};

var add_new = function(){
	if(!ko.dataFor(document.getElementById("choose_a_type"))){
		class_levels_array = [];
		class_levels_array = read_class_level_array(class_levels_array);
		ko.applyBindings(new top_levels_menu(class_levels_array));		
	}

};

var remove_undefined = function(arr){
	arr_new = []
	$.each(arr,function(index,i){
		if(i!=undefined){
			console.log("hi");
			arr_new.push(i);
		}
	});

	//if(arr_new.length==0){
	//	arr_new = "";
	//}
	return arr_new;
}

function add_underline(arr){
	new_arr = [];
	$.each(arr,function(index, item){
		new_arr.push(item.replace(" ","_"))
	})
	return new_arr;
}

function reload_main(){
	$("#main").html("");
	$("#main").append("<div id='json' class='json main L1'></div>"); 
	showJson(wholeJson, 'main');	
}

//start from here
function revise_wholeJson(part_of_wholeJson, json_snap){
	// we need this because that if there is an array in in a json with some non-array, then it will cause some problem if I just repalce the partcially wholeJson by subJson
	$.each(json_snap,function(index,value){
		if(part_of_wholeJson[index]!=value){
			temp = [];
			temp["old_data"] = [index, part_of_wholeJson[index]];
			temp["new_data"] = [index, value];
			temp["path"] = path;
			temp["operation"] = "rev";	
			json_revision.push(temp);
			part_of_wholeJson[index]=value;
		}
	});
	return part_of_wholeJson;
}


function add_delete_elements(path, json_snap, mode){
	path = add_underline(path);

	//the format of path is ARRAY. The value of mode is: add/remove
	if (path.length<=5){
		switch (path.length){
			case 1:
				wholeJson_handle = wholeJson[path[0]]
				if(mode=="remove" && $.isNumeric($(path).get(-1))){					
					delete wholeJson[path[0]][path[1]];
					wholeJson[path[0]] = remove_undefined(wholeJson[path[0]]);
					//reload_main();
				}
				if($.isArray(wholeJson_handle)){
					if(mode=="add"){
						if(Array.isArray(json_snap)){
							wholeJson_handle.push(json_snap[0])
						}else{
							wholeJson_handle.push(json_snap)
						}							
					}else if(mode=="remove"){
						delete wholeJson_handle
						wholeJson_handle = wholeJson_handle.filter(function(n){ return n != undefined }); 
					}else{
						console.log("went wrong1");
					}
				}else if(Object.keys(wholeJson_handle).length>0){
					if(mode=="add"){
						wholeJson[path[0]]=json_snap
					}else if(mode=="remove"){
						wholeJson[path[0]] = stru[path[0]];
						//reload_main();
					}else if(mode="revise"){
						wholeJson[path[0]]=revise_wholeJson(wholeJson[path[0]],$.parseJSON(json_snap));
					}else{
						console.log("went wrong_1");
					}
				}
				break;
			case 2:
				wholeJson_handle = wholeJson[path[0]][path[1]]
				if(mode=="remove" && $.isNumeric($(path).get(-1))){					
					delete wholeJson[path[0]][path[1]];
					wholeJson[path[0]] = remove_undefined(wholeJson[path[0]]);
					//reload_main();
				}
				if($.isArray(wholeJson_handle)){
					if(mode=="add"){
						if(Array.isArray(json_snap)){
							wholeJson_handle.push(json_snap[0])
						}else{
							wholeJson_handle.push(json_snap)
						}	
					}else{
						console.log("went wrong2");
					}
				}else if(Object.keys(wholeJson_handle).length>0){
					if(mode=="add"){
						wholeJson[path[0]][path[1]]=json_snap
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]] = stru[path[0]][path[1]];
						//reload_main();
					}else if(mode="revise"){
						wholeJson[path[0]][path[1]]=revise_wholeJson(wholeJson[path[0]][path[1]],$.parseJSON(json_snap));
					}else{
						console.log("went wrong_2");
					}
				}
				break;
			case 3:
				console.log(path)
				wholeJson_handle = wholeJson[path[0]][path[1]][path[2]]
				if(mode=="remove" && $.isNumeric($(path).get(-1))){					
					delete wholeJson[path[0]][path[1]][path[2]];
					wholeJson[path[0]][path[1]] = remove_undefined(wholeJson[path[0]][path[1]]);
					//reload_main();
				}
				if($.isArray(wholeJson_handle)){
					if(mode=="add"){
						if(Array.isArray(json_snap)){
							wholeJson_handle.push(json_snap[0])
						}else{
							wholeJson_handle.push(json_snap)
						}	
					}else{
						console.log("went wrong");
					}
				}else if(Object.keys(wholeJson_handle).length>0){
					if(mode=="add"){
						wholeJson[path[0]][path[1]][path[2]]=json_snap
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]][path[2]] = stru[path[0]][path[1]][path[2]];
						//reload_main();						
					}else if(mode="revise"){
						wholeJson[path[0]][path[1]][path[2]] =revise_wholeJson(wholeJson[path[0]][path[1]][path[2]],$.parseJSON(json_snap));
					}else{
						console.log("went wrong");
					}
				}
				break;
			case 4:
				wholeJson_handle = wholeJson[path[0]][path[1]][path[2]][path[3]]
				if(mode=="remove" && $.isNumeric($(path).get(-1))){					
					delete wholeJson[path[0]][path[1]][path[2]][path[3]];
					wholeJson[path[0]][path[1]][path[2]] = remove_undefined(wholeJson[path[0]][path[1]][path[2]]);
					//reload_main();
				}
				if($.isArray(wholeJson_handle)){
					if(mode=="add"){
							if(Array.isArray(json_snap)){
							wholeJson_handle.push(json_snap[0])
						}else{
							wholeJson_handle.push(json_snap)
						}	
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]][path[2]][path[3]] = stru[path[0]][path[1]][path[2]][path[3]];
						//reload_main();	
					}else if(mode="revise"){
						wholeJson[path[0]][path[1]][path[2]][path[3]] =revise_wholeJson(wholeJson[path[0]][path[1]][path[2]][path[3]],$.parseJSON(json_snap));
					}else{
						console.log("went wrong");
					}
				}else if(Object.keys(wholeJson_handle).length>0){
					if(mode=="add"){
						wholeJson[path[0]][path[1]][path[2]][path[3]] = json_snap
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]][path[2]][path[3]] = stru[path[0]][path[1]][path[2]][path[3]];
					}else{
						console.log("went wrong");
					}
				}
				break;
			case 5:
				wholeJson_handle = wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]]
				if(mode=="remove" && $.isNumeric($(path).get(-1))){					
					delete wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]];
					wholeJson[path[0]][path[1]][path[2]][path[3]] = remove_undefined(wholeJson[path[0]][path[1]][path[2]][path[3]]);
					//reload_main();
				}
				if($.isArray(wholeJson_handle)){
					if(mode=="add"){
						if(Array.isArray(json_snap)){
							wholeJson_handle.push(json_snap[0])
						}else{
							wholeJson_handle.push(json_snap)
						}	
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]] = stru[path[0]][path[1]][path[2]][path[3]][path[4]];
						//reload_main();	
					}else{
						console.log("went wrong");
					}
				}else if(Object.keys(wholeJson_handle).length>0){
					if(mode=="add"){
						wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]]=json_snap
					}else if(mode=="remove"){
						wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]] = stru[path[0]][path[1]][path[2]][path[3]][path[4]];
					}else if(mode="revise"){
						wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]] =revise_wholeJson(wholeJson[path[0]][path[1]][path[2]][path[3]][path[4]],$.parseJSON(json_snap));
					}else{
						console.log("went wrong");
					}
				}
				break;
		}
		reload_main();
	}else{
		alert("your levels are more than 5,please revise the source code here")
	}
}

var add_new_type_adddata = function(index){
	class_levels_array = [];
	class_levels_array = read_class_level_array(class_levels_array);
	type_name = class_levels_array[index].value.replace(" ", "_");
	path = (data_attr[type_name]["path"]).split("|");
	//json_snap = stru[(class_levels_array[index].value)];
	json_snap = stru;
	$.each(path,function(index, value){
		json_snap = json_snap[value];
	})
	console.log(path);
	console.log(json_snap);
	add_delete_elements(path,json_snap,"add");
	//console.log(json_snap);
  reload_main();
}

var del_record = function(e){
	$("span").attr("contenteditable","false");
	$(".btn.btn-primary.operationButtonsUnlockInMain").prop('disabled', false);
	$(".btn.btn-default.operationButtonsUnlockInMain").html("Unlock");
	$(".btn.btn-default.operationButtonsUnlockInMain").attr("class","btn btn-primary operationButtonsUnlockInMain");
	path = getPath(e);
	add_delete_elements(path,"","remove");
	//subJson = getSubJson(e);	
}

//next:
//save function -> save and replace wholeJson; add to modify wholeJson(when modify, forbide add new; when modify finish, refresh the whole json; )
//delete function
//when loading, disable the save button