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
    private target: cc.Node;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }

    start () {
        this.body = this.getComponent(RigidBody);
    }

    update (dt) {
        this.body.linearVelocity = this.inputManager.deltaPosition.mul(this.speed);
        if(this.target != null){
            this.node.rotation = Math.atan2(this.target.y - this.node.y, -(this.target.x - this.node.x)) * 180 / Math.PI;
        }else if(!this.inputManager.deltaPosition.equals(Vec2.ZERO)){
            this.node.rotation = Math.atan2(this.inputManager.deltaPosition.y, -this.inputManager.deltaPosition.x) * 180 / Math.PI;
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        this.target = other.node;
        log("Boom!"  + other.node.position);
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider){
        this.target = null;
        log("No no no nooo");
    }

}
