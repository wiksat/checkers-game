console.log("wczytano plik Game.js")

class Game {

    constructor() {
        console.log("konstruktor klasy Game")
        this.init()
        this.who = true
        this.tymczasowe = []
        this.tabplansza = []
        this.szachownica = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ];
        this.newTab = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2]
        ];

        this.plansza()
    }
    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x484848);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(this.renderer.domElement);
        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
        this.ray()


        this.render()
        // var axes = new THREE.AxesHelper(1000)
        // this.scene.add(axes)

        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(this.scene.position)

        $(window).resize(() => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    ray() {
        $(document).mousedown((event) => {
            this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children);
            console.log(intersects.length)
            if (intersects.length > 0 && this.who == true) {
                console.log(intersects[0])
                var klik = intersects[0].object
                if (this.camera.position.x == 100 && klik.color === "ffffff") {
                    klik.color = 0xffff00
                    console.log("click:", klik.name)
                    var pod = klik.name.split("/")
                    console.log(this.tabplansza)

                    if (this.act != null) {
                        if (this.camera.position.x == 100) {
                            this.act.color = 0xffffff
                        } else if (this.camera.position.x == -100) {
                            this.act.color = 0x000000
                        }

                        if (this.pom == "czlewa") {
                            this.tabplansza[this.x + 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y2 - 1].name = this.name2
                            this.pom = null
                        }
                        if (this.pom == "czprawa") {
                            this.tabplansza[this.x + 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y1 + 1].name = this.name1
                            this.pom = null
                        }
                        if (this.pom == "bilewa") {
                            this.tabplansza[this.x - 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y2 - 1].name = this.name2
                            this.pom = null
                        }
                        if (this.pom == "biprawa") {
                            this.tabplansza[this.x - 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y1 + 1].name = this.name1
                            this.pom = null
                        }
                        if (this.pom == null) {
                            if (this.x < 8) {
                                if (this.y2 > -1) {
                                    this.tabplansza[this.x][this.y2].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y2].name = this.name2
                                }
                                if (this.y1 < 8) {
                                    this.tabplansza[this.x][this.y1].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y1].name = this.name1
                                }
                            }
                        }
                    }
                    this.x = parseInt(pod[1]) - 1
                    if (this.x > -1) {
                        this.y1 = parseInt(pod[2]) + 1
                        if (this.y1 < 8) {
                            if (this.newTab[this.x][this.y1] == 0) {
                                this.name1 = this.tabplansza[this.x][this.y1].name
                                var ny1 = this.tabplansza[this.x][this.y1].name.split("/")
                                this.tabplansza[this.x][this.y1].name = "pblackziel/" + ny1[1] + "/" + ny1[2]
                                this.tabplansza[this.x][this.y1].material.color.setHex(0x00ff00)
                            }
                            else if (this.newTab[this.x][this.y1] == 1 && this.x - 1 > -1 && this.y1 + 1 < 8 && this.newTab[this.x - 1][this.y1 + 1] == 0) {
                                this.name1 = this.tabplansza[this.x - 1][this.y1 + 1].name
                                var ny1 = this.tabplansza[this.x - 1][this.y1 + 1].name.split("/")
                                this.tabplansza[this.x - 1][this.y1 + 1].name = "pblackziel/" + ny1[1] + "/" + ny1[2]
                                this.tabplansza[this.x - 1][this.y1 + 1].material.color.setHex(0x00ff00)
                                this.pom = "biprawa"
                            }
                        }
                        this.y2 = parseInt(pod[2]) - 1
                        if (this.y2 > -1) {
                            if (this.newTab[this.x][this.y2] == 0) {
                                this.name2 = this.tabplansza[this.x][this.y2].name
                                var ny2 = this.tabplansza[this.x][this.y2].name.split("/")
                                this.tabplansza[this.x][this.y2].name = "pblackziel/" + ny2[1] + "/" + ny2[2]
                                this.tabplansza[this.x][this.y2].material.color.setHex(0x00ff00)
                            }
                            else if (this.newTab[this.x][this.y2] == 1 && this.x - 1 > -1 && this.y2 - 1 > -1 && this.newTab[this.x - 1][this.y2 - 1] == 0) {
                                this.name2 = this.tabplansza[this.x - 1][this.y2 - 1].name
                                var ny2 = this.tabplansza[this.x - 1][this.y2 - 1].name.split("/")
                                this.tabplansza[this.x - 1][this.y2 - 1].name = "pblackziel/" + ny2[1] + "/" + ny2[2]
                                this.tabplansza[this.x - 1][this.y2 - 1].material.color.setHex(0x00ff00)
                                this.pom = "bilewa"
                            }

                        }
                    }
                    this.act = klik
                } else if (this.camera.position.x == -100 && klik.color === "000000") {
                    klik.color = 0xffff00

                    var pod = klik.name.split("/")

                    if (this.act != null) {
                        if (this.camera.position.x == 100) {
                            this.act.color = 0xffffff
                        } else if (this.camera.position.x == -100) {
                            this.act.color = 0x000000
                        }

                        if (this.pom == "czlewa") {
                            this.tabplansza[this.x + 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y2 - 1].name = this.name2
                            this.pom = null
                        }
                        if (this.pom == "czprawa") {
                            this.tabplansza[this.x + 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y1 + 1].name = this.name1
                            this.pom = null
                        }
                        if (this.pom == "bilewa") {
                            this.tabplansza[this.x - 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y2 - 1].name = this.name2
                            this.pom = null
                        }
                        if (this.pom == "biprawa") {
                            this.tabplansza[this.x - 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y1 + 1].name = this.name1
                            this.pom = null
                        }
                        if (this.pom == null) {
                            if (this.x < 8) {
                                if (this.y2 > -1) {
                                    this.tabplansza[this.x][this.y2].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y2].name = this.name2
                                }
                                if (this.y1 < 8) {
                                    this.tabplansza[this.x][this.y1].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y1].name = this.name1
                                }
                            }

                        }
                    }
                    this.x = parseInt(pod[1]) + 1
                    if (this.x < 8) {
                        this.y1 = parseInt(pod[2]) + 1
                        if (this.y1 < 8) {
                            if (this.newTab[this.x][this.y1] == 0) {
                                this.name1 = this.tabplansza[this.x][this.y1].name
                                var ny1 = this.tabplansza[this.x][this.y1].name.split("/")
                                this.tabplansza[this.x][this.y1].name = "pblackziel/" + ny1[1] + "/" + ny1[2]
                                this.tabplansza[this.x][this.y1].material.color.setHex(0x00ff00)
                            }
                            else if (this.newTab[this.x][this.y1] == 2 && this.x + 1 < 8 && this.y1 + 1 < 8 && this.newTab[this.x + 1][this.y1 + 1] == 0) {
                                this.name1 = this.tabplansza[this.x + 1][this.y1 + 1].name
                                var ny1 = this.tabplansza[this.x + 1][this.y1 + 1].name.split("/")
                                this.tabplansza[this.x + 1][this.y1 + 1].name = "pblackziel/" + ny1[1] + "/" + ny1[2]
                                this.tabplansza[this.x + 1][this.y1 + 1].material.color.setHex(0x00ff00)
                                this.pom = "czprawa"
                            }
                        }

                        this.y2 = parseInt(pod[2]) - 1
                        if (this.y2 > -1) {
                            if (this.newTab[this.x][this.y2] == 0) {
                                this.name2 = this.tabplansza[this.x][this.y2].name
                                var ny2 = this.tabplansza[this.x][this.y2].name.split("/")
                                this.tabplansza[this.x][this.y2].name = "pblackziel/" + ny2[1] + "/" + ny2[2]
                                this.tabplansza[this.x][this.y2].material.color.setHex(0x00ff00)
                            }
                            else if (this.newTab[this.x][this.y2] == 2 && this.x + 1 < 8 && this.y2 - 1 > -1 && this.newTab[this.x + 1][this.y2 - 1] == 0) {
                                this.name2 = this.tabplansza[this.x + 1][this.y2 - 1].name
                                var ny2 = this.tabplansza[this.x + 1][this.y2 - 1].name.split("/")
                                this.tabplansza[this.x + 1][this.y2 - 1].name = "pblackziel/" + ny2[1] + "/" + ny2[2]
                                this.tabplansza[this.x + 1][this.y2 - 1].material.color.setHex(0x00ff00)
                                this.pom = "czlewa"
                            }

                        }
                    }

                    this.act = klik
                }
                console.log(klik.name)
                if (klik.name.split("/")[0] == "pblackziel") {

                    if (this.act != null) {
                        console.log("blak")
                        this.newTab[this.act.name.split("/")[1]][this.act.name.split("/")[2]] = 0
                        if (this.camera.position.x == -100) {
                            this.newTab[klik.name.split("/")[1]][klik.name.split("/")[2]] = 1
                        } else if (this.camera.position.x == 100) {
                            this.newTab[klik.name.split("/")[1]][klik.name.split("/")[2]] = 2
                        }
                        console.log(this.newTab)
                        this.act.name = this.act.name.split("/")[0] + "/" + klik.name.split("/")[1] + "/" + klik.name.split("/")[2]
                        this.act.position.x = klik.position.x
                        this.act.position.z = klik.position.z

                        if (this.camera.position.x == 100) {
                            this.act.color = 0xffffff
                        } else if (this.camera.position.x == -100) {
                            this.act.color = 0x000000
                        }

                        if (this.pom == "czlewa") {
                            this.tabplansza[this.x + 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y2 - 1].name = this.name2
                            this.newTab[this.x][this.y2] = 0
                            this.pom = null
                            this.tablica2(this.newTab)
                        }
                        if (this.pom == "czprawa") {
                            this.tabplansza[this.x + 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x + 1][this.y1 + 1].name = this.name1
                            this.newTab[this.x][this.y1] = 0
                            this.pom = null
                            this.tablica2(this.newTab)
                        }
                        if (this.pom == "bilewa") {
                            this.tabplansza[this.x - 1][this.y2 - 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y2 - 1].name = this.name2
                            this.newTab[this.x][this.y2] = 0
                            this.pom = null
                            this.tablica2(this.newTab)
                        }
                        if (this.pom == "biprawa") {
                            this.tabplansza[this.x - 1][this.y1 + 1].material.color.setHex(0x964b00)
                            this.tabplansza[this.x - 1][this.y1 + 1].name = this.name1
                            this.newTab[this.x][this.y1] = 0
                            this.pom = null
                            this.tablica2(this.newTab)
                        }
                        if (this.pom == null) {
                            if (this.x < 8) {
                                if (this.y2 > -1) {
                                    this.tabplansza[this.x][this.y2].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y2].name = this.name2
                                }
                                if (this.y1 < 8) {
                                    this.tabplansza[this.x][this.y1].material.color.setHex(0x964b00)
                                    this.tabplansza[this.x][this.y1].name = this.name1
                                }
                            }
                        }



                        this.act = null
                        net.update(this.newTab)
                    }
                }
            }
        })
    }
    kolej(kolor) {
        if (kolor == false) {
            this.who = false
            console.log("biały czeka")
            console.log("czarny gra")
            $("#root").css("opacity", "0.5")
            $("#licznik2").remove()
            $("#status").append('<h1 id="czas">ruch przeciwnika</h1>');
            $("#status").append('<h2 id="licznik"></h2>')
            window.clearInterval(this.czas2)
            var x = 30
            this.czas = setInterval(() => {
                if (x < 1) {
                    $("#status").empty()
                    $("#czas").remove()
                    $("#status").text("WYGRAŁEŚ - przeciwnik nie wykonał ruchu")
                }
                $('#licznik').text(x)
                x--
            }, 1000);
            var wait = setInterval(() => {
                net.czekaj(wait, this.newTab)
            }, 1000);
        } else if (document.getElementById("czas") != null) {
            this.who = true
            console.log("czarny czeka")
            console.log("biały gra")
            $("#licznik").remove()
            window.clearInterval(this.czas)
            $("#root").css("opacity", "1")
            $("#czas").remove()

            $("#status").append('<h2 id="licznik2"></h2>')
            var x = 30
            this.czas2 = setInterval(() => {
                if (x < 1) {
                    $("#status").empty()
                    $("#status").text("PRZEGRAŁEŚ - nie wykonałeś ruchu")
                }
                $('#licznik2').text(x)
                x--
            }, 1000);
        }
    }
    tablica(newTab) {
        console.log(newTab)
        this.newTab = newTab
        for (let z = 0; z < this.newTab.length; z++) {
            for (let x = 0; x < this.newTab[z].length; x++) {
                if (this.newTab[z][x] == 2) {
                    var pionek = new Pionek(0xffffff)
                    pionek.position.set(z * 10 - 40, 2, x * 10 - 40)
                    pionek.name = "bial/" + z + "/" + x
                    this.tymczasowe.push(pionek)
                    this.scene.add(pionek);
                }
                if (this.newTab[z][x] == 1) {
                    var pionek = new Pionek(0x000000)
                    pionek.position.set(z * 10 - 40, 2, x * 10 - 40)
                    pionek.name = "czar/" + z + "/" + x
                    this.tymczasowe.push(pionek)
                    this.scene.add(pionek);
                }
            }
        }
    }
    tablica2(newTab) {
        console.log(this.tymczasowe)
        for (let i = 0; i < this.tymczasowe.length; i++) {
            this.scene.remove(this.tymczasowe[i])
        }
        this.newTab = newTab
        for (let z = 0; z < this.newTab.length; z++) {
            for (let x = 0; x < this.newTab[z].length; x++) {
                if (this.newTab[z][x] == 2) {
                    var pionek = new Pionek(0xffffff)
                    pionek.position.set(z * 10 - 40, 2, x * 10 - 40)
                    pionek.name = "bial/" + z + "/" + x
                    this.tymczasowe.push(pionek)
                    this.scene.add(pionek);
                }
                if (this.newTab[z][x] == 1) {
                    var pionek = new Pionek(0x000000)
                    pionek.position.set(z * 10 - 40, 2, x * 10 - 40)
                    pionek.name = "czar/" + z + "/" + x
                    this.tymczasowe.push(pionek)
                    this.scene.add(pionek);
                }
            }
        }
        console.table(this.newTab)
    }
    plansza() {
        for (let z = 0; z < this.szachownica.length; z++) {
            this.tabplansza[z] = []
            for (var x = 0; x < this.szachownica[z].length; x++) {
                var geometry = new THREE.BoxGeometry(10, 1, 10);
                if (this.szachownica[z][x] == 1) {
                    var material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/b.jpg'),
                        transparent: true,
                        opacity: 0.8,
                    })
                    var cube = new THREE.Mesh(geometry, material);
                    cube.position.set(z * 10 - 40, 0, x * 10 - 40)
                    cube.name = "pwhite/" + z + "/" + x
                } else {
                    var material = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        map: new THREE.TextureLoader().load('mats/c.jpg'),
                        transparent: true,
                        opacity: 0.8,
                    })
                    var cube = new THREE.Mesh(geometry, material);
                    cube.position.set(z * 10 - 40, 0, x * 10 - 40)
                    cube.name = "pblack/" + z + "/" + x
                }
                this.tabplansza[z][x] = cube
                this.scene.add(cube);
            }
        }

    }
    cam_biale() {
        this.camera.position.set(100, 100, 0)
        this.camera.lookAt(this.scene.position)
    }
    cam_czarne() {
        this.camera.position.set(-100, 100, 0)
        this.camera.lookAt(this.scene.position)
    }
    render() {
        requestAnimationFrame(this.render.bind(this)); // funkcja bind(this) przekazuje obiekt this do metody render
        this.renderer.render(this.scene, this.camera);
        // console.log("render leci")
    }
}