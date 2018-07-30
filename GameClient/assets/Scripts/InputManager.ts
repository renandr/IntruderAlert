import Vec2 = cc.Vec2;
import Canvas = cc.Canvas;
import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends cc.Component {

    private areaSize : Vec2 = new Vec2(150, 150);
    private centerRadiusRatio : number = 0.2;

    private canvasComponent : Canvas;

    private inPosition: Vec2;
    private _deltaPosition: Vec2 = new Vec2(0,0);
    private currentTouchId: number = -2;


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.mouseIn.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.mouseOut.bind(this));
    }

    start () {
        this.canvasComponent = this.getComponent(Canvas);
    }

    private mouseIn(e:cc.Event.EventTouch) {
        if(this.isActive)return;
        this.currentTouchId = e.getID();
        this.inPosition = new Vec2(e.getLocationX(), e.getLocationY());
    }

    private mouseMove(e:cc.Event.EventTouch) {
        if(this.currentTouchId != e.getID())return;

        this._deltaPosition.x = (this.inPosition.x - e.getLocationX()) / this.areaSize.x;
        this._deltaPosition.y = (this.inPosition.y - e.getLocationY()) / this.areaSize.y;


        if (this._deltaPosition.mag() > 1) {
            this._deltaPosition.x = this._deltaPosition.x/this._deltaPosition.mag();
            this._deltaPosition.y = this._deltaPosition.y/this._deltaPosition.mag();
        }

        if (this.centerRadiusRatio > 0){
            let newMagnitude : number;
            if(this._deltaPosition.mag() < this.centerRadiusRatio) newMagnitude = 0;
            else newMagnitude = (this._deltaPosition.mag() - this.centerRadiusRatio) / (1 - this.centerRadiusRatio);
            this._deltaPosition.x = this._deltaPosition.x*newMagnitude;
            this._deltaPosition.y = this._deltaPosition.y*newMagnitude;
        }
    }

    private mouseOut(e:cc.Event.EventTouch) {
       if(this.currentTouchId != e.getID())return;
        this._deltaPosition = new Vec2(0,0);
        this.currentTouchId = -2;
    }


    public get deltaPosition():Vec2{
        return this._deltaPosition;
    }

    public get isActive():boolean{
        return this.currentTouchId != -2;
    }


    // update (dt) {}
}
