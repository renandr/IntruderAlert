const {ccclass, property} = cc._decorator;

@ccclass
export default class Stretch extends cc.Component {

    @property
    width: boolean = false;

    @property
    height: boolean = false;

    // onLoad () {}

    start () {
        cc.view.setResizeCallback(this.resizeContent.bind(this));
        this.resizeContent()

    }

    private resizeContent() {
        if(this.width){
            this.node.width = cc.director.getVisibleSize().width - this.node.x;
        }
        if(this.height){
            this.node.height = cc.director.getVisibleSize().height - this.node.y;
        }
    }


    // update (dt) {}
}
