import InputManager, {TouchState} from "../Scripts/InputManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property (InputManager)
    inputManager: InputManager = null;

    @property (Number)
    speed: Number = 2;

    // onLoad () {}

    start () {
        
    }

    update (dt) {
        if(this.inputManager.touchState == TouchState.Move){
            // console.log("dt " + dt);
            this.node.x -= this.inputManager.deltaPosition.x * dt * this.speed * 1000;
            this.node.y -= this.inputManager.deltaPosition.y * dt * this.speed * 1000;
        }
    }
}
