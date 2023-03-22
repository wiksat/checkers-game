var fs = require("fs");
var http = require("http");
var qs = require("querystring")

var users = []
var pionkiTab = [
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2]
];
function servResponse(req, res) {
    var allData = "";

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        console.log(finish)
        switch (finish.action) {
            case "ADD_USER":
                var user = finish.user
                console.log(users.includes(user))
                if (users.includes(user)) {
                    console.log(users)
                    finish.action = "USER_EXIST"
                    if (users.length > 2) {
                        finish.action = "TOO_MANY_USERS"
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(finish));
                } else {
                    users.push(user)
                    console.log(users)
                    if (users.length > 2) {
                        finish.action = "TOO_MANY_USERS"
                    }
                    if (users.length == 2) {
                        finish.color = "białym"
                    }
                    if (users.length == 1) {
                        finish.color = "czarnym"
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    finish.tab = pionkiTab
                    res.end(JSON.stringify(finish));
                }
                break
            case "RESET":
                pionkiTab = [
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [2, 0, 2, 0, 2, 0, 2, 0],
                    [0, 2, 0, 2, 0, 2, 0, 2]
                ];
                users = []
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                res.end("zresetowano");
                break
            case "SPR":
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                if (users.length > 1) {
                    res.end("grac/" + users[users.length - 1] + "/" + JSON.stringify(pionkiTab));
                }
                else {
                    res.end("czekac");
                }
                break
            case "UPDATE":
                pionkiTab = JSON.parse(finish.newTab)
                console.log(JSON.parse(finish.newTab))
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                res.end("updateowano");
                break
            case "CZEKANIE":
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                console.log(finish.tab)
                console.log(JSON.stringify(pionkiTab))
                if (finish.tab === JSON.stringify(pionkiTab)) {
                    res.end("to samo");
                } else {
                    res.end("zmiana/" + JSON.stringify(pionkiTab));
                }
                break
        }
    })
}
var server = http.createServer(function (req, res) {
    console.log(req.method)
    console.log(req.url)
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Main.js") {
                fs.readFile("static/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Net.js") {
                fs.readFile("static/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Ui.js") {
                fs.readFile("static/Ui.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Game.js") {
                fs.readFile("static/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/three.js") {
                fs.readFile("static/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Pionek.js") {
                fs.readFile("static/Pionek.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.indexOf(".jpg") != -1) {
                fs.readFile(__dirname + "/static" + decodeURI(req.url), function (error, data) {
                    console.log("SERWUJE")
                    res.writeHead(200, { "Content-type": "image/jpg" });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            servResponse(req, res)
            break;
    }
})


server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});