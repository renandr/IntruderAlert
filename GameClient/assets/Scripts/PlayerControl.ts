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
    private mainTarget: cc.Node;
    private targets: cc.Node[];

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.setDisplayStats(false);
    }

    start () {
        this.body = this.getComponent(RigidBody);
        this.targets = [];
    }

    update (dt) {
        this.body.linearVelocity = this.inputManager.deltaPosition.mul(this.speed);
        if(this.mainTarget != null){
            this.node.rotation = Math.atan2(this.mainTarget.y - this.node.y, -(this.mainTarget.x - this.node.x)) * 180 / Math.PI;
        }else if(!this.inputManager.deltaPosition.equals(Vec2.ZERO)){
            this.node.rotation = Math.atan2(this.inputManager.deltaPosition.y, -this.inputManager.deltaPosition.x) * 180 / Math.PI;
        }
    }

    private addTarget(node: cc.Node) {
        this.targets.push(node);
        this.mainTarget = this.targets[0];
    }

    private removeTarget(node: cc.Node) {
        var index = this.targets.indexOf(node, 0);
        if (index > -1) {
            this.targets.splice(index, 1);
        }
        this.mainTarget = this.targets[0];
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if(other.tag == 3 && self.tag == 3) {
            this.addTarget(other.node);
        }
    }

    onCollisionExit(other: cc.Collider, self: cc.Collider){
        if(other.tag == 3 && self.tag == 3){
            this.removeTarget(other.node);
        }
    }
}
