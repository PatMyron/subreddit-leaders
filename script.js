function addRows () {	// ENTRY POINT     int main() lol
	var time0 = new Date().getTime();
	var subreddit = document.getElementById("myText").value;
	var time = document.getElementById("time").value;
	var type = document.getElementById("type").value;
	var url = "https://www.reddit.com/r/";
	url += subreddit+"/top/?sort=top&t="+time;
	map = new Array();
	deleteRows(); 
	var lim = document.getElementById("myText2").value; // number of posts to get
	reddit.top(subreddit).t(time).limit(lim).fetch(function(res) {
		for(var i = 0; i < lim; i++) {
			try {
				user = res.data.children[i].data.author;
				score = res.data.children[i].data.score;
				if (user == "[deleted]") { // [deleted] == power user
					continue;
				}
			}
			catch(err) {
				continue;
			}
			if (isNaN(map[user])) {
				map[user] = 0;
			}
			map[user] += score;
		} 

		/************************************
		IMPLEMENT A SORT BY VALUE
		THAT PRESERVES THE SCORE (VALUE)
		**********************************/
		var keysSorted = getSortedKeys(map);

		for (var i = 0; i < keysSorted.length; i++) {
			var key = keysSorted[i];
			addRow(key, map[key]);
		}
	});
	var timeF = new Date().getTime();
	console.log("0: "+time0);
	console.log("F: "+timeF);
	console.log("time: "+(timeF-time0));
}
function addRow (cellOne, cellTwo) {
	var table = document.getElementById("myTable");
	var row = table.insertRow(-1); // last row
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = cellOne;
	cell2.innerHTML = cellTwo;
}
function deleteRows () {
	var table = document.getElementById("myTable");
	for(var i = 1; i < table.rows.length; i += 0) { // DONT INCREMENT
		table.deleteRow(i);
	}
}
function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}