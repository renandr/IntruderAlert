import RigidBody = cc.RigidBody;
import Vec2 = cc.Vec2;
import log = cc.log;
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerBullet extends cc.Component {

    @property
    speed: number = 900;

    private body: cc.RigidBody;
    private direction: cc.Vec2;

    // onLoad() {
    // }


    public shoot(mainTarget: cc.Node):void{
        this.direction = new Vec2(mainTarget.x - this.node.x, mainTarget.y - this.node.y).normalizeSelf();
    }

    start() {
        this.body = this.getComponent(RigidBody);
        this.body.linearVelocity = this.direction.mul(this.speed);
    }

    // update(dt) {
    // }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag == 7 && self.tag == 7) {
            this.node.destroy();
        }

    }


}