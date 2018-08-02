import InputManager from "../Scripts/InputManager";
import RigidBody = cc.RigidBody;
import log = cc.log;
import Vec2 = cc.Vec2;
import Collider = cc.Collider;

const {ccclass, property} = cc._decorator;

@ccclass
export default class TurretControl extends cc.Component {

    @property (cc.Node)
    weaponNode: cc.Node = null;

    private target: cc.Node;

    onLoad () {
    }

    start () {
    }

    update (dt) {
        if(this.target != null){
            this.weaponNode.rotation = Math.atan2(this.target.y - this.node.y, -(this.target.x - this.node.x)) * 180 / Math.PI;
        }
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider){
        if(other.tag == 4 && self.tag == 4){
            this.target = other.node;
        }

    }

    onCollisionExit(other: cc.Collider, self: cc.Collider){
        if(other.tag == 4 && self.tag == 4) {
            this.target = null;
        }
    }

}
