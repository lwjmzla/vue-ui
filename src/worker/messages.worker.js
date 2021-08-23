let portList = [];
let CONNECTID = 1;

onconnect = ({ ports }) => {
  const port = ports[0];
  portList.push({
    connectId: CONNECTID,
    port
  });
  console.log(`SharedWorker创建连接成功,当前链接的ID为${CONNECTID},当前链接的portList数量为${portList.length}`);
  port.postMessage({
    msg: `worker：信息返回给主线程了`,
    connectID: CONNECTID
  });
  port.onmessage = (ev) => {
    console.log(ev.data);
    const {
      msg,
      connectID
    } = ev.data || {};
    if (connectID) {
      closeConnect(connectID);
    } else {
      sendMessageToPages();
    }
  };
  CONNECTID += 1;
};

// !将消息分发给各个页面
function sendMessageToPages() {
  portList.forEach(({ port }) => {
    port.postMessage({ msg: `worker：信息返回给主线程了` });
  });
}

// !根据 CONNECTID 来关闭连接及清除相应不需要的 SharedWorker 实例
function closeConnect(objId) {
  portList.forEach(({ port, connectId }, index) => {
    if (objId === connectId) {
      port.close();
      portList.splice(index, 1);
    }
  });
  // if (portList.length === 0) {
  //   closeStomp('connectIdNo');
  // }
}
