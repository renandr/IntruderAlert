import Vec2 = cc.Vec2;
import Canvas = cc.Canvas;

const {ccclass, property} = cc._decorator;



@ccclass
export default class InputManager extends cc.Component {

    private areaSize : Vec2 = new Vec2(50, 50);
    private centerRadiusRatio : Number = 0.8;

    private canvasComponent : Canvas;

    private _touchState : TouchState = TouchState.Out;
    private inPosition: Vec2;
    private _deltaPosition: Vec2 = new Vec2(0,0);


    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.mouseIn.bind(this));
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.mouseMove.bind(this));
        this.node.on(cc.Node.EventType.MOUSE_UP, this.mouseOut.bind(this));
    }

    start () {
        this.canvasComponent = this.getComponent(Canvas);
    }

    private mouseIn(e:cc.Event.EventMouse) {
        if(this._touchState == TouchState.In)return;
        this._touchState = TouchState.In;
        this.inPosition = new Vec2(e.getLocationX(), e.getLocationY());
        console.log("IN " + e.getLocationX() + " : " + e.getLocationY());
    }

    private mouseMove(e:cc.Event.EventMouse) {
        if(this._touchState == TouchState.Out)return;
        this._touchState = TouchState.Move;
        console.log("MOVE " + e.getLocationX() + " : " + e.getLocationY());

        let eventPosition : Vec2 = new Vec2(e.getLocationX(), e.getLocationY());
        let pointerDelta  : Vec2 = this.inPosition - eventPosition;

        this._deltaPosition = new Vec2(pointerDelta.x / this.areaSize.x, pointerDelta.y / this.areaSize.y);
        if (this._deltaPosition.mag > 1) this._deltaPosition = this._deltaPosition/this._deltaPosition.mag;
        if (this.centerRadiusRatio > 0){
            let newMagnitude : Number = this._deltaPosition.mag < this.centerRadiusRatio ? 0
                : (this._deltaPosition.mag - this.centerRadiusRatio) / (1 - this.centerRadiusRatio);
            this._deltaPosition = this._deltaPosition*newMagnitude;
        }
    }

    private mouseOut(e:cc.Event.EventMouse) {
        if(this._touchState == TouchState.Out)return;
        this._touchState = TouchState.Out;
        console.log("OUT " + e.getLocationX() + " : " + e.getLocationY());
        this._deltaPosition = new Vec2(0,0);
    }


    public get deltaPosition():Vec2{
        return this._deltaPosition;
    }

    public get touchState():TouchState{
        return this._touchState;
    }


    // update (dt) {}
}
