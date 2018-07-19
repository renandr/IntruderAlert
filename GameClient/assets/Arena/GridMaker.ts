import array = cc.js.array;

const {ccclass, property} = cc._decorator;

@ccclass
export default class GridMaker extends cc.Component {

    @property(cc.Collider)
    obstacles: cc.Collider[];

    start () {
        for (let collider of this.obstacles){
            //collider.
        }
    }
}
