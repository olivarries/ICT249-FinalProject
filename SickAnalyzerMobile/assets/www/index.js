
$(function() {


	$("#query").keypress(function(e) {
        if(e.which == 13) {
        	$("#search-btn").trigger('click');
            return false;
        }
    	});

	$("#search-btn").live("click", function() {
		$.mobile.showPageLoadingMsg();
		var query = $("#query").val();
	
	$("#analyze-btn").live("click", function() {
		$.mobile.showPageLoadingMsg();
		var query = $("#query").val();	

	var request = {
		keyword : query
	}

	$.mobile.hidePageLoadingMsg();

	});
	
	$('.details').live('click', function() {
		var request = {
			reference : $(this).attr('id')
		};







	$("#addItem").live('click',function(){
		addToSavedItems(selectedData);
		$(this).hide();
		$("#removeItem").show();
	});
	
	$("#removeItem").live('click',function(){
		removeFromSavedItem(selectedData);
		$(this).hide();
		$("#addItem").show();
	});




function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function ensureTableExists(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS Favorite (id unique, reference,name,category,info,cause,symptoms,treatment,icon,url)');
}


function addToSavedItems(data) {
	var db = window.openDatabase("SavedItems", "1.0", "SavedItems", 20000000);
	db.transaction(
			function(tx) {
				ensureTableExists(tx);
				var id = (data.id != null) ? ('"' + data.id + '"') : ('""');
				var reference = (data.reference != null) ? ('"' + data.reference + '"') : ('""');
				var name = (data.name != null) ? ('"' + data.name + '"') : ('""');
				var category = (data.category != null) ? ('"' + data.category  + '"') : ('""');
				var info = (data.info != null) ? ('"' + data.info + '"') : ('""');
				var cause = (data.cause != null) ? ('"' + data.cause + '"') : ('""');
				var symptoms = (data.formatted_symptoms != null) ? ('"' + data.formatted symptoms + '"') : ('""');
				var treatment = (data.treatment != null) ? ('"' + data.treatment + '"') : ('""');
				var icon = (data.icon != null) ? ('"' + data.icon + '"') : ('""');
				var url = (data.website != null) ? ('"' + data.Website + '"') : ('""');
				var insertStmt = 'INSERT INTO Favorite (id, reference,name,category,info,cause,symptoms,treatment,icon,url) VALUES ('
						+ id + ',' + reference + ',' + category + ',' + info + ',' + cause + ',' + symptoms + ',' 
						+ treatment + ',' + icon + ',' + url + ')';
				tx.executeSql(insertStmt);
				}, function(error) {
				   console.log("Data insert failed " + error.code + " " + error.message);
				}, function() {
				   console.log("Data insert successful");
				});
}

function removeFromSavedItems(data) {
	try {
		var db = window.openDatabase("SavedItems", "1.0", "SavedItems", 20000000);
		db.transaction(function(tx) {
			ensureTableExists(tx);
			var deleteStmt = "DELETE FROM SavedItems WHERE id = '" + data.id
					+ "'";
			console.log(deleteStmt);
			tx.executeSql(deleteStmt);
		}, function(error) {
			console.log("Data Delete failed " + error.code + " "
					+ error.message);
		}, function() {
			console.log("Data Delete successful");
		});
	} catch (err) {
		console.log("Caught exception while deleting favorite " + data.name);
	}
}


function isFav(data) {
	var db = window.openDatabase("SavedItems", "1.0", "SavedItems", 200000);
	try {
		db.transaction(function (tx) {
			ensureTableExists(tx);
			var sql = "SELECT * FROM SavedItems where id='" + data.id + "'";
			tx.executeSql(sql, [], function (tx, results) {
			var result = (results != null && results.rows != null && results.rows.length > 0);
			if(result){
				$("#removeItem").show();
				$("#addItem").hide();
			}
			else{
				$("#removeItem").hide();
				$("#addItem").show();
			}
			}, function (tx, error) {		
				console.log("Got error in isFav error.code =" + error.code + "error.message = " + error.message);		
			});
		});
	} catch (err) {
		console.log("Got error in isFav " + err);
		callback(false);
	}
}

