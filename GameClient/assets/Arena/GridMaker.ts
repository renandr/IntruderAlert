import array = cc.js.array;

const {ccclass, property} = cc._decorator;

@ccclass
export default class GridMaker extends cc.Component {

    @property(cc.Collider)
    obstacles: cc.Collider[];

    start () {

    }
}
