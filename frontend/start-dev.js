import { concurrently } from "concurrently";

async function runProcesses() {
  try {
    await concurrently(
      [
        {
          command: "vite",
          name: "FRONTEND",
          prefixColor: "blue",
        },
        {
          command: "cd ../backend && python -m uvicorn main:app --reload",
          name: "BACKEND",
          prefixColor: "green",
        },
      ],
      {
        prefix: "name",
        killOthers: ["failure", "success"],
      }
    );
    console.log("All processes complete!");
  } catch (err) {
    console.error("Error:", JSON.stringify(err, null, 2));
  }
}

runProcesses();
