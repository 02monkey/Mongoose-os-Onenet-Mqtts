# Mongoose-os-Onenet-Mqtts

Mongoose-os-Onenet-Mqtts

esp系列物联网 MCU 开发指南 Mongoose-os 系统 MTQQS加密通信(SSL/TLS)

硬件模块支持:esp8266 nodemcu WeMos D1 esp32 esp12F esp8266EX

1: 在mos输入框键入克隆仓库命令:

   mos clone https://github.com/02monkey/Mongoose-os-Onenet-Mqtts
 
2: 转到项目目录:

   cd Mongoose-os-Onenet-Mqtts
   
3: 编译固件:

   mos build
   
4: 刷写固件:
  mos flash
  
5: 写入Onenet配置信息:

   mos config-set mqtt.client_id="设备名称" mqtt.user="产品ID" mqtt.pass="token"
   
6: 先按一下MCU的重启按钮,或者直接拔掉USB(串口),

7: 写入WiFi配置信息:

   mos wifi WiF名称 密码
   
8: 然后重启MCU,到此处已经完成MCU相关,MCU已经开始连接One net!
