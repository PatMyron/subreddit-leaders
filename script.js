function addRows() {
    var subreddit = document.getElementById("myText").value;
    var time = document.getElementById("time").value;
    var lim = document.getElementById("myText2").value; // number of posts to get
    var numUsers = document.getElementById("myText3").value;
    var map = [];
    deleteRows();
    reddit.top(subreddit).t(time).limit(lim).fetch(function (res) {
        for (var i = 0; i < lim; i++) {
            try {
                var user = res.data.children[i].data.author;
                var score = res.data.children[i].data.score;
                if (user == "[deleted]") { // [deleted] == power user
                    continue;
                }
            } catch (err) {
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

        for (var i = 0; i < numUsers; i++) {
            if (i >= keysSorted.length) {
                break;
            }
            var key = keysSorted[i];
            addRow(key, map[key]);
        }
    });
}
function addRow(cellOne, cellTwo) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1); // last row
    row.insertCell(0).innerHTML = cellOne;
    row.insertCell(1).innerHTML = cellTwo;
}
function deleteRows() {
    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length;) { // DONT INCREMENT
        table.deleteRow(i);
    }
}
function getSortedKeys(obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys.sort(function (a, b) {
        return obj[b] - obj[a]
    });
}