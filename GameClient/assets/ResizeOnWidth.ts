// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResizeOnWidth extends cc.Component {

    // onLoad () {}

    start () {

        this.node.width = cc.director.getVisibleSize().width - 10;
        cc.log("cc.view.getVisibleSize() " + cc.view.getVisibleSize());
        cc.log("cc.view.getVisibleSizeInPixel() " + cc.view.getVisibleSizeInPixel());
        cc.log("cc.view.getViewPortRect() " + cc.view.getViewPortRect());
        cc.log("cc.view.getVisibleOrigin() " + cc.view.getVisibleOrigin());

    }

    // update (dt) {}
}
