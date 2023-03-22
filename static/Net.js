console.log("wczytano plik Net.js")

class Net {

    constructor() {
        console.log("konstruktor klasy Net")
    }

    add(user) {
        $.ajax({
            url: "/addUser",
            data: {
                action: "ADD_USER",
                user: user,
                color: ""
            },
            type: "POST",
            success: function (data) {
                console.log(data)
                var user = data.user
                var color = data.color
                if (data.action == "USER_EXIST") {
                    $("#status").empty()
                    $("#status").append("<h4>USER_EXIST</h4><h5>Jest już user: " + user + ", wybierz inny login</h5>")
                } else if (data.action == "TOO_MANY_USERS") {
                    $("#status").empty()
                    $("#status").append("<h4>TOO_MANY_USERS</h4><h5>Witaj " + user + ", jest już dwóch graczy</h5>")
                }
                else {
                    console.log(user)
                    $("#status").empty()
                    $("#status").append("<h4>USER_ADDED</h4><h5>Witaj " + user + ", grasz kolorem " + color + "</h5>")
                    if (color == "białym") {
                        game.tablica(data.tab)
                        $("#logowanie").css('display', 'none')
                        game.cam_biale()
                        this.czar = false
                        game.kolej(this.czar)
                    }
                    if (color == "czarnym") {
                        $("#logowanie").css('display', 'none')
                        $("#root").append('<h1 id="czek">oczekiwanie na drugiego gracza</h1>');
                        var int = setInterval(() => {
                            console.log("sprawdzenie")
                            net.spr(int)
                        }, 1000);
                        game.cam_czarne()
                    }
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    czekaj(wait, oldTab) {
        $.ajax({
            url: "/czek",
            data: {
                action: "CZEKANIE",
                tab: JSON.stringify(oldTab)
            },
            type: "POST",
            success: (data) => {
                console.log(data)
                if (data.split("/")[0] == "zmiana") {
                    window.clearInterval(wait)
                    var newTab = JSON.parse(data.split("/")[1])
                    console.log(newTab)
                    game.tablica2(newTab)
                    this.czar = !this.czar
                    game.kolej(this.czar)
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    spr(int) {
        $.ajax({
            url: "/spr",
            data: {
                action: "SPR"
            },
            type: "POST",
            success: (data) => {
                console.log(data)
                if (data == "czekac") {
                } else {
                    window.clearInterval(int)
                    var f = data.split("/")
                    $("#status").append("<h5>Podłączył się gracz  " + f[1] + ", gra kolorem białym</h5>")
                    console.log(JSON.parse(f[2]))
                    game.tablica(JSON.parse(f[2]))
                    $("#czek").remove()
                    this.czar = true
                    game.kolej(this.czar)
                }
                console.log("dostatwa")
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    update(newTab) {
        $.ajax({
            url: "/update",
            data: {
                action: "UPDATE",
                newTab: JSON.stringify(newTab)
            },
            type: "POST",
            success: (data) => {
                console.log(data)
                this.czar = !this.czar
                game.kolej(this.czar)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    reset() {
        $.ajax({
            url: "/reset",
            data: {
                action: "RESET"
            },
            type: "POST",
            success: function (data) {
                console.log(data)
                $("#status").empty()
                $("#status").append("<h4>USER_CLEARED</h4>")
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
}