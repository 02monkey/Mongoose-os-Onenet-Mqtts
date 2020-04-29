# Mongoose-os-Onenet-Mqtts

Mongoose-os-Onenet-Mqtts

esp系列物联网 MCU 开发指南 Mongoose-os 系统 MTQQS加密通信(SSL/TLS)

4: 在mos输入框键入克隆仓库命令:
   官方新建app列子:  (app1)项目文件夹
 mos clone https://github.com/mongoose-os-apps/demo-js app1
   以下是克隆我项目的Git连接:
   -
6: 转到项目目录:
  cd esp8266
7: 编译固件: 
mos build
  
8: 刷写固件:
  mos flash
  
9 : 写入Onenet配置信息:
   mos config-set mqtt.client_id="设备名称" mqtt.user="产品ID" mqtt.pass="token"
10: 先按一下MCU的重启按钮,或者直接拔掉USB(串口).
11: 写入WiFi配置信息:
   mos wifi WiF名称 密码
12:然后重启MCU,到此处已经完成MCU相关,MCU已经开始连接One net!
