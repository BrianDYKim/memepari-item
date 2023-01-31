const createApp = require("../src/app");

async function main() {
  const app = await createApp();

  // 정의되지 않은 exception을 필터링해야함
  process.on("uncaughtException", (error) => {
    console.log(`uncaughtException: ${error}`);
  });

  // OS의 kill signal을 감지할 수 있게 설정
  for (const signal of ["SIGTERM", "SIGHUP", "SIGINT", "SIGUSR2"]) {
    process.on(signal, async () => {
      if (!app.isShuttingDown) {
        console.log(
          `시스템 시그널, ${signal}을 수신하였습니다. 의도된 서버 중지 신호입니다. Graceful shutdown을 시작합니다.`
        );
        await app.stop();
        console.log("Graceful shutdown이 완료되었습니다.");
        process.exit(0);
      }
    });
  }

  // 전체 애플리케이션을 시작하면 된다.
  app.start();
}

main();
