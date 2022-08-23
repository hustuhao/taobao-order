"ui";
ui.layout(
<vertical>
    <appbar>
        <toolbar tit1e="丛林处 V1.0"/>
        <tabs id="tabs"/> 
    </appbar>
    <Switch id="autoservice" text="无障碍服务" checked="{auto.service=null}"/>
    <viewpager id="v">

    <vertical>
        <text text="请输入抢购时间" textColor="#000000"/>
        <horizontal marginTop="10" gravity="center">
        <input inputType="number" id="input1" w="40" gravitry="center"/> <text text="时"/>
        <input inputType="number" id="input2" w="40" gravitry="center"/> <text text="分"/>
        <input inputType="number" id="input3" w="40" gravitry="center"/> <text text="秒"/>
        <input inputType="number" id="input4" w="40" gravitry="center"/> <text text="毫秒"/>
        </horizontal>
    </vertical>

    <button id="bt" text="开始运行"/>
    </viewpager>
</vertical>
);

ui.v.setTitles("程序", "联系作者")
ui.tabs.setupWithViewPager(i.v);
ui.autoService.on("check", function(checked) {
    if (checked && auto.service == null ) {
        app.startActivity({
            action : "android.settings.ACCESSIBILITY_SETTINGS"
        })
    }
})

// 当用户回到主界面时，resume 事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍五福的开启情况同步开关的状态
    ui.autoService.checked = auto.service != null;
})

ui.bt.click(function(){
    if (auto.service == null) {
        toast("请开启无障碍服务")
        return
    } else {
        threads.start(MainFunction)
    }
})

// 核心代码
function MainFunction() {
    // 获取设置的时间
    xHour = ui.input1.getText()
    xMinute = ui.input2.getText()
    xSecond = ui.input3.getText()
    xMillis = ui.input4.getText()
    toast("请打开淘宝，进入购物车")
    textContains("购物车").waitFor();
    toast("已设置抢购时间为:")
    s1eep(1000)
    toast("请您勾选好想要抢购的商品,然后等待");
    var t
    while(true){
        var currentTimestamp = GetTaobaoTimestamp();
        // 解析时、分、秒、毫秒
        var d = new Date(currentTime) 
        var hour = d.getHours()
        var minute = d.getMinutes()
        var second = d.getseconds()
        var millis = d.getMilliseconds()
        if(xHour = hour && xMinute == minute && xSecond == second && xMillis <= millis){
            var 结算标识=id("com.taobao.taobao:id/button cart_charge").findone().press(结算标识.bounds().centerX(),结算标识.bounds().centerY(),1)
            var提交订单-text("提交订单").findone();press(提交订单.bounds().centerX(),提交订单.bounds().centerY(),1)
            break;
        }
    }

}

// 请求淘宝服务器时间
function GetTaobaoTimestamp() {
    try{
        var recode_taobao=http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp")
        taobaotime=recode_taobao.body.json();
        t = parseInt(taobaotime.data.t)
    } catch(e){}
    if (t == 0) {
        t = Date.parse(new Date());
    }
    return t
}


