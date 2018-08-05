

const {ccclass, property} = cc._decorator;

@ccclass
export default class TurretControl extends cc.Component {

    @property (cc.Node)
    weaponNode: cc.Node = null;

    private target: cc.Node;
    private health: number = 5;

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
        } else if(other.tag == 7 && self.tag == 7){
            this.health --;
            if(this.health <=0)this.node.destroy();
        }

    }

    onCollisionExit(other: cc.Collider, self: cc.Collider){
        if(other.tag == 4 && self.tag == 4) {
            this.target = null;
        }
    }

}
