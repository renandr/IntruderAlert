import InputManager from "../Scripts/InputManager";
import RigidBody = cc.RigidBody;
import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property (InputManager)
    inputManager: InputManager = null;

    @property
    speed: number = 2;


    private body: cc.RigidBody;

    // onLoad () {}

    start () {
        this.body = this.getComponent(RigidBody);
        cc.director.getPhysicsManager().enabled = true;
    }

    update (dt) {
        if(this.inputManager.isActive){
            // this.node.x -= this.inputManager.deltaPosition.x * dt * this.speed * 1000;
            // this.node.y -= this.inputManager.deltaPosition.y * dt * this.speed * 1000;
            this.body.linearVelocity = this.inputManager.deltaPosition.mul(this.speed);
            // log(this.inputManager.deltaPosition);
        }
    }
}
