export async function sendcommand(command, options) {
  let ip = "172.20.10.3";
  console.log(options);
  try {
    let temp = await fetch(`http://${ip}/${command}`, options);
  } catch (e) {}
}
