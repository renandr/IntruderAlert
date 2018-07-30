import InputManager from "../Arena/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property (InputManager)
    inputManager: InputManager;

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        if(this.inputManager.touchState == TouchState.Move){
            this.node.x += this.inputManager.deltaPosition.x;
            this.node.y += this.inputManager.deltaPosition.y;
        }
    }
}
