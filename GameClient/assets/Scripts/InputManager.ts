import Vec2 = cc.Vec2;
import Canvas = cc.Canvas;
import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends cc.Component {

    private areaSize : Vec2 = new Vec2(150, 150);
    private centerRadiusRatio : number = 0.2;

    private canvasComponent : Canvas;

    private _deltaPosition: Vec2 = Vec2.ZERO;
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
    }

    private mouseMove(e:cc.Event.EventTouch) {
        if(this.currentTouchId != e.getID())return;

        let inPosition : Vec2 = e.getStartLocation();
        this._deltaPosition.x = (e.getLocationX() - inPosition.x) / this.areaSize.x;
        this._deltaPosition.y = (e.getLocationY() - inPosition.y) / this.areaSize.y;

        if (this._deltaPosition.mag() > 1) this._deltaPosition.normalizeSelf();

        if (this.centerRadiusRatio > 0){
            let newMagnitude : number;
            let mag : number = this._deltaPosition.mag();
            if(mag < this.centerRadiusRatio) newMagnitude = 0;
            else newMagnitude = (mag - this.centerRadiusRatio) / (1 - this.centerRadiusRatio);
            this._deltaPosition.mulSelf(newMagnitude);
        }
    }

    private mouseOut(e:cc.Event.EventTouch) {
       if(this.currentTouchId != e.getID())return;
        this._deltaPosition = Vec2.ZERO;
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
