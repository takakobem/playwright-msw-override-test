import { test as base, expect } from "@playwright/test";
import { HttpResponse, http } from "msw";
import { createWorkerFixture } from "playwright-msw";

const test = base.extend({
  worker: createWorkerFixture(),
  http,
});

test("test", async ({ page, worker, http }) => {
  await worker.use(
    http.get("https://hoge.com/", async () => {
      return new HttpResponse(null, {
        status: 200,
      });
    })
  );
  await worker.use(
    http.get("https://hoge.com/", async () => {
      return new HttpResponse(null, {
        status: 503,
      });
    })
  );
  await page.goto("http://127.0.0.1:1234");
  await page.pause();
  await expect(page.getByRole("button", { name: "ボタン" })).toBeVisible();
});
