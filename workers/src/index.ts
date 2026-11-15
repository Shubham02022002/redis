import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  while (true) {
    const response = await client.brPop("problems", 0);
    console.log(response);
    await new Promise((r) => setTimeout(r, 1000));
    // Spining up a container to actually run the end user code
    console.log("Processed user submission");
  }
}

main();

