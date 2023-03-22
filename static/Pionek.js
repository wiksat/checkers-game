class Pionek extends THREE.Mesh {

    constructor(kolor) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.geometry = new THREE.CylinderGeometry(5, 5, 4, 32);
        if (kolor == 0xffffff) {
            this.material = new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('mats/bp.jpg'),
                transparent: true,
                opacity: 1,
            })
        } else if (kolor == 0x000000) {
            this.material = new THREE.MeshBasicMaterial({
                color: 0x000000,
                side: THREE.DoubleSide,
                map: new THREE.TextureLoader().load('mats/pc.jpg'),
                transparent: true,
                opacity: 1,
            })
        }

        // console.log(this)
    }
    set color(val) {
        console.log("setter")
        this.material.color.setHex(val)
    }
    get color() {
        console.log("getter")
        return this.material.color.getHexString()
    }
}

