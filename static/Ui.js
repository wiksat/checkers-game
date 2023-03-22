console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        this.clicks()
    }
    clicks() {
        $("#loguj").on("click", function () {
            net.add($("#usr_name").val())
        })
        $("#reset").on("click", function () {
            net.reset()
        })
    }
}

