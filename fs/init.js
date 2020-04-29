load('api_mqtt.js');
load('api_gpio.js');
load('api_sys.js');
load('api_config.js');

//将引脚设置为输出并设置初始电平 0 或 1。避免虚假转换：先应用级别，然后设置模式。
//5V低电平触发继电器开机设置为1
//2=总继电器/switch0
GPIO.setup_output(2, 1)
//继电器1
GPIO.setup_output(15, 1)
//继电器2
GPIO.setup_output(13, 1)
//继电器3 = 12
GPIO.setup_output(12, 1)

let pin = 0, Topic = Cfg.get('device.id');

//按钮实列
GPIO.set_button_handler(pin, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  let msg = {total_ram: Sys.total_ram(), free_ram: Sys.free_ram()};
  MQTT.pub(Topic, JSON.stringify(msg), 1);
}, null);

//订阅主题。并监听消息,开/关继电器.
//Onenet
//$sys/{pid}/{device-name}/cmd/request/{cmdid}  系统向设备下发命令
let  CmdTopic = '$sys/'+ Cfg.get('mqtt.user') +'/' + Cfg.get('mqtt.client_id') +'/cmd/request/+';
MQTT.sub(CmdTopic, function (conn, topic, msg) {
  //json格式化收到的数据:'{"sw":"0","onff":"on"}'
  let obj = JSON.parse(msg);
  print('Topic:', topic, 'message:', msg);
  //mjs不支持switch语句??? mmp! 
  // 利用活动对象(action object) 或 命令对象(command object)代替switch语句.
  function testFn(name) {
    let names = {
      '0': function () {
        if (obj.onff === "on") {
          //开启总继电器/switch0
          GPIO.write(2, 0);
          //开启指示灯
          GPIO.write(0, 0);
          print("switch0 = ON");
        } else {
          //关闭总继电器/switch0
          GPIO.write(2, 1);
          //关闭指示灯
          GPIO.write(0, 1);
          print("switch0 = OFF");
        }
        return 'switch0';
      },
      '1': function () {
        if (obj.onff === "off") {
          //先保证开启总继电器/switch0
          GPIO.write(2, 0);
          //开启继电器1/switch1
          GPIO.write(15, 0);
          print("switch1 = ON")
        } else {
          //关闭继电器1/switch1
          GPIO.write(15, 1);
          print("switch1 = OFF");
        }
        return 'switch1';
      },
      '2': function () {
        if (obj.onff === "on") {
          //先保证开启总继电器/switch0
          GPIO.write(2, 0);
          //开启继电器2/switch2
          GPIO.write(13, 0);
          print("switch2 = ON")
        } else {
          //关闭继电器2/switch2
          GPIO.write(13, 1);
          print("switch2 = OFF");
        }
        return 'switch2';
      },
      '3': function () {
        if (obj.onff === "on") {
          //先保证开启总继电器/switch0
          GPIO.write(2, 0);
          //开启继电器3/switch3
          GPIO.write(12, 0);
          print("switch3 = ON")
        } else {
          //关闭继电器3/switch3
          GPIO.write(12, 1);
          print("switch3 = OFF");
        }
        return 'switch3';
      }
    };
    if (typeof names[name] !== 'function') {
      return "error";
    }
    return names[name]();
  }
  let Rtn = testFn(obj.sw);
  //截取Onetnet下发命令ID,长度=36,
  let Cmd = topic.slice(40, 76);
  print("Gpio Set: ", Rtn); 
  //设备接收该命令后，可通过发布消息至 topic：$sys/{pid}/{device-name}/cmd/response/{cmdid} 进行该命令结果的应
  topic = '$sys/'+ Cfg.get('mqtt.user') +'/' + Cfg.get('mqtt.client_id') +'/cmd/response/' + Cmd;
  MQTT.pub(topic, Rtn);
  //将消息发布到主题。如果未指定，则默认为 0。如果未指定，则默认为 。返回值：0 失败（例如，没有连接到服务器），成功返回值 1。qosretainfalse
}, null);


