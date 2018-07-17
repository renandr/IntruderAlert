const {ccclass, property} = cc._decorator;

@ccclass
export default class InputManager extends cc.Component {

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.mouseStuff.bind(this));
    }

    private mouseStuff(e:cc.Event.EventMouse) {
        console.log("mousey " + e.getLocationX() + " : " + e.getLocationY());
    }

    start () {

    }

    // update (dt) {}
}
