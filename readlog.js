function cellEditOpen(){

var a = $(this).text();
if(a=="") //while a cell is being edited, the text will empty.
	return;

console.log(a);
var origContent = $.trim(a);
$(this).text(""); //clear the table cell
console.log(origContent);

var input = $(document.createElement('input'));
input.addClass("charCountEditor");
$(this).append(input);
input.val(origContent);
input.focus();

input.focusout(cellEditClose(origContent, isNonNegativeNum, "Word Count must be a non-negative integer"));
}


//closure function
function cellEditClose(orig, condition, errorMessage){ //if the new input does not match condition, will use original
	return function(){

	var a = $(this).val(); //this is an input element
	console.log("a: " + a);
	if(condition(a)){
		$(this).closest("td").text(a);
		$(".errorMessage").html("");
	}else{
		$(".errorMessage").html(errorMessage);
		$(this).closest("td").text(orig);
	}
	$(this).remove();
	}
}

function isNonNegativeNum(a){
	var n = parseInt(a, 10);
	console.log("isNonNegative ran");
	return $.isNumeric(n) && (n>=0);
}

function addRow(title, charCount){
	var row = $(document.createElement('tr'));
		var cell = $(document.createElement('td'));
		var cell2 = $(document.createElement('td'));
		cell.addClass("entryTitleCell")
		cell2.addClass("charCountCell");
		cell.text(title);
		cell2.text(charCount);

		row.append(cell); row.append(cell2)
		cell2.on("click", cellEditOpen);
		//TODO: update count;
		$("#readTable").children("tbody").append(row);
}

function AF_submitEntry(){ //AF stands for "add functionality"
	$(".readSubmit").on("click", function(){
		var form = $(this).closest("form");
		var title = form.find(".inputTitle").val();
		var a = form.find(".inputCharCount").val();
		var charCount = parseInt(a, 10);
		if(!($.isNumeric(a)) || !(charCount>=0) ) {
			return;
		}
		addRow(title, charCount);
	});
}

function removeEntry(){
	var entry = $(this).closest("td");
	//need to update count
	entry.remove();

}

$(document).ready(function(){
		var count = 0;
		AF_submitEntry();
		$('.charCountCell').on("click", cellEditOpen);
		$('.')

	//add a onDeFocus
	//add a onEnterkey pressed

});