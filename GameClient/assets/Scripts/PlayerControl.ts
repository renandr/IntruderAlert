import InputManager from "../Scripts/InputManager";
import PlayerBullet from "./PlayerBullet";
import RigidBody = cc.RigidBody;
import Vec2 = cc.Vec2;
import instantiate = cc.instantiate;
import Prefab = cc.Prefab;
import log = cc.log;
import GameManager from "./GameManager";

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

    @property
    shotsPerSecond: number = 2;

    private body: cc.RigidBody;
    private mainTarget: cc.Node;
    private targets: cc.Node[];

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.setDisplayStats(false);
    }

    start () {
        this.body = this.getComponent(RigidBody);
        this.targets = [];
        // GameManager.instance.node.on("kill", this.removeTarget.bind(this));
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

    private updateTarget() {
        log("target upgrade");
        let previousTarget : cc.Node = this.mainTarget;
        this.mainTarget = this.targets[0];

        if(this.mainTarget == null){
            this.unschedule(this.shoot);

        }else if(this.mainTarget != previousTarget){
            this.unschedule(this.shoot);
            this.schedule(this.shoot, 1/this.shotsPerSecond, cc.macro.REPEAT_FOREVER);
        }
    }

    private addTarget(node: cc.Node) {
        this.targets.push(node);
        this.updateTarget();
    }

    private removeTarget(node: cc.Node) {
        let index = this.targets.indexOf(node, 0);
        if (index > -1) {
            this.targets.splice(index, 1);
        }
        this.updateTarget();
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
