import InputManager from "../Scripts/InputManager";
import RigidBody = cc.RigidBody;
import log = cc.log;
import Vec2 = cc.Vec2;
import Collider = cc.Collider;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    @property (InputManager)
    inputManager: InputManager = null;

    @property
    speed: number = 2;


    private body: cc.RigidBody;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
        this.body = this.getComponent(RigidBody);
    }

    update (dt) {
        this.body.linearVelocity = this.inputManager.deltaPosition.mul(this.speed);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        log("Boom!"  + other.node.position);
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider){
        log("No no no nooo");
    }

}
