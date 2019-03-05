function addRows() {
    var subreddit = document.getElementById("myText").value;
    var time = document.getElementById("time").value;
    var numberOfPostsToGet = 10000;
    var map = [];
    deleteRows();
    reddit.top(subreddit).t(time).limit(numberOfPostsToGet).fetch(function (res) {
        for (var i = 0; i < numberOfPostsToGet; i++) {
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

        /* sorting */
        var keysSorted = getSortedKeys(map);
        for (var j = 0; j < keysSorted.length; j++) {
            var key = keysSorted[j];
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
    for (var i = 1; i < table.rows.length;) { // DON'T INCREMENT
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