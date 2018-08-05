import InputManager from "../Scripts/InputManager";
import PlayerBullet from "./PlayerBullet";
import RigidBody = cc.RigidBody;
import Vec2 = cc.Vec2;
import instantiate = cc.instantiate;
import Prefab = cc.Prefab;
import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

    /*
    Collider tags
        0 = walls on player

        3 = Player detecting enemy
        4 = Enemy detecting player

        7 = Player Bullet hitting enemy
        8 = Enemy Bullet hitting player


     */


    @property (InputManager)
    inputManager: InputManager = null;

    @property
    speed: number = 250;

    @property (Prefab)
    bulletPrefab: Prefab = null;


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

    private shoot() {
        let bullet : PlayerBullet= instantiate(this.bulletPrefab).getComponent(PlayerBullet);
        bullet.node.parent = this.node.parent;
        bullet.node.x = this.node.x;
        bullet.node.y = this.node.y;
        bullet.shoot(this.mainTarget);
    }

    private addTarget(node: cc.Node) {
        this.targets.push(node);
        this.mainTarget = this.targets[0];
        this.shoot();
        log("addTarget");
        log(this.mainTarget);
        log(this.targets);

    }

    private removeTarget(node: cc.Node) {
        let index = this.targets.indexOf(node, 0);
        if (index > -1) {
            this.targets.splice(index, 1);
        }
        this.mainTarget = this.targets[0];
        log("removeTarget");
        log(this.mainTarget);
        log(this.targets);
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
