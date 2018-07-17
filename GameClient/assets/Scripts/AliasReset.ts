const {ccclass, property} = cc._decorator;

@ccclass
export default class AliasReset extends cc.Component {

    onLoad () {
        this.getComponent(cc.Sprite).spriteFrame.getTexture().setAliasTexParameters();
    }

    start () {

    }
}
