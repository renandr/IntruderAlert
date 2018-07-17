const {ccclass, property} = cc._decorator;

@ccclass
export default class ResizeOnWidth extends cc.Component {

    // onLoad () {}

    start () {
        cc.view.setResizeCallback(this.resizeContent.bind(this));
        this.resizeContent()
    }

    private resizeContent() {
        this.node.width = cc.director.getVisibleSize().width - 10;
    }


    // update (dt) {}
}
