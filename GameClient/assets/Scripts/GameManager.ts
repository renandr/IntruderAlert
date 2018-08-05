const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    private static _instance: GameManager;

    onLoad () {
        GameManager._instance = this;
    }

    start () {
        
    }

    public static get instance():GameManager{
        return this._instance;
    }

    public static enemyKilled(node : cc.Node):void{
        GameManager._instance._enemyKilled(node);
    }

    private _enemyKilled(node:cc.Node):void{
        this.node.emit("kill", node);
    }

}
