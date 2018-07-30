import Vec2 = cc.Vec2;
import Canvas = cc.Canvas;

const {ccclass, property} = cc._decorator;

export enum TouchState{
    In,
    Move,
    Out
}

@ccclass
export default class InputManager extends cc.Component {

    private areaSize : Vec2 = new Vec2(150, 150);
    private centerRadiusRatio : Number = 0.2;

    private canvasComponent : Canvas;

    private _touchState : TouchState = TouchState.Out;
    private inPosition: Vec2;
    private _deltaPosition: Vec2 = new Vec2(0,0);


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.mouseIn.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.mouseMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.mouseOut.bind(this));
    }

    start () {
        this.canvasComponent = this.getComponent(Canvas);
    }

    private mouseIn(e:cc.Event.EventMouse) {
        if(this._touchState == TouchState.In)return;
        this._touchState = TouchState.In;
        this.inPosition = new Vec2(e.getLocationX(), e.getLocationY());
        // console.log("IN " + e.getLocationX() + " : " + e.getLocationY());
    }

    private mouseMove(e:cc.Event.EventMouse) {
        if(this._touchState == TouchState.Out)return;
        this._touchState = TouchState.Move;

        this._deltaPosition.x = (this.inPosition.x - e.getLocationX()) / this.areaSize.x;
        this._deltaPosition.y = (this.inPosition.y - e.getLocationY()) / this.areaSize.y;

        // console.log("MOVE deltaPosition " + this._deltaPosition);

        if (this._deltaPosition.mag() > 1) {
            this._deltaPosition.x = this._deltaPosition.x/this._deltaPosition.mag();
            this._deltaPosition.y = this._deltaPosition.y/this._deltaPosition.mag();
        }
        // console.log("MOVE deltaPosition magnitude fixed " + this._deltaPosition);

        if (this.centerRadiusRatio > 0){
            let newMagnitude : Number;
            // console.log("MOVE magnitude " + this._deltaPosition.mag());
            if(this._deltaPosition.mag() < this.centerRadiusRatio) newMagnitude = 0;
            else newMagnitude = (this._deltaPosition.mag() - this.centerRadiusRatio) / (1 - this.centerRadiusRatio);
            this._deltaPosition.x = this._deltaPosition.x*newMagnitude;
            this._deltaPosition.y = this._deltaPosition.y*newMagnitude;
            // console.log("MOVE deltaPosition center checked " + this._deltaPosition);
        }
        // console.log("MOVE " + this._deltaPosition);
        // console.log(" ");
    }

    private mouseOut(e:cc.Event.EventMouse) {
       if(this._touchState == TouchState.Out)return;
        this._touchState = TouchState.Out;
        // console.log("OUT " + e.getLocationX() + " : " + e.getLocationY());
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
