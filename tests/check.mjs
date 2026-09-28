// Проверка калькулятора ВГИИ: открывает index.html локально, прогоняет контрольные
// случаи из test_cases.md, сверяет сумму баллов / группу / P, следит за консолью и
// сетевыми запросами. Требует `npm install playwright` (и `npx playwright install chromium`).
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(__dirname, "..", "index.html");
const fileUrl = "file://" + indexPath.replace(/\\/g, "/");

const cases = [
  { nihss: 3, age: 55, cci: 2, sepsis: "0", surg: "none", score: 1, groupRu: "Низкий", groupEn: "Low", p: "10,8", pEn: "10.8" },
  { nihss: 12, age: 78, cci: 6, sepsis: "0", surg: "none", score: 5, groupRu: "Высокий", groupEn: "High", p: "51,5", pEn: "51.5" },
  { nihss: 20, age: 71, cci: 6, sepsis: "1", surg: "none", score: 9, groupRu: "Экстремальный", groupEn: "Extreme", p: "98,7", pEn: "98.7" },
  { nihss: 6, age: 64, cci: 4, sepsis: "0", surg: "plan", score: 3, groupRu: "Средний" },
  { nihss: 6, age: 64, cci: 4, sepsis: "0", surg: "emerg", score: 4, groupRu: "Средний" },
  { nihss: 0, age: 40, cci: 0, sepsis: "0", surg: "plan", score: 0, groupRu: "Низкий" },
  { nihss: 42, age: 90, cci: 20, sepsis: "1", surg: "none", score: 15, groupRu: "Экстремальный", expectWarn: true },
  { nihss: 4, age: 59, cci: 3, sepsis: "0", surg: "plan", score: 0, groupRu: "Низкий" },
  { nihss: 5, age: 60, cci: 4, sepsis: "0", surg: "plan", score: 3, groupRu: "Средний" },
];

let failures = 0;
const log = (...a) => console.log(...a);

async function fill(page, c) {
  await page.fill("#nihss", String(c.nihss));
  await page.fill("#age", String(c.age));
  await page.fill("#cci", String(c.cci));
  await page.check(`input[name="sepsis"][value="${c.sepsis}"]`);
  await page.check(`input[name="surg"][value="${c.surg}"]`);
}

function extractP(formulaHtml) {
  const m = formulaHtml.match(/<b>([\d.,]+)\s*%<\/b>\s*\.?\s*$/);
  return m ? m[1] : null;
}

async function run() {
  const browser = await chromium.launch();

  // --- RU: все 9 случаев ---
  {
    const page = await browser.newPage();
    const consoleErrors = [];
    const requests = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("request", (req) => requests.push(req.url()));

    await page.goto(fileUrl);

    for (let i = 0; i < cases.length; i++) {
      const c = cases[i];
      await fill(page, c);
      const score = await page.textContent("#s");
      const groupText = await page.textContent("#g");
      const group = groupText.replace(/\s*риск\s*$/i, "").trim();
      const ok = String(score).trim() === String(c.score) && group === c.groupRu;
      if (!ok) {
        failures++;
        log(`FAIL RU#${i + 1}: ожидали score=${c.score} group=${c.groupRu}, получили score=${score} group=${group}`);
      } else {
        log(`OK   RU#${i + 1}: score=${score} group=${group}`);
      }
      if (c.p) {
        const formulaHtml = await page.innerHTML("#formula");
        const p = extractP(formulaHtml);
        if (p !== c.p) {
          failures++;
          log(`FAIL RU#${i + 1} P: ожидали ${c.p}, получили ${p}`);
        } else {
          log(`OK   RU#${i + 1} P=${p}`);
        }
      }
      if (c.expectWarn) {
        const warnOn = await page.evaluate(() => document.getElementById("warn").classList.contains("on"));
        if (!warnOn) {
          failures++;
          log(`FAIL RU#${i + 1}: ожидалось предупреждение (warn.on), его нет`);
        } else {
          log(`OK   RU#${i + 1}: предупреждение показано`);
        }
      }
    }

    if (consoleErrors.length) {
      failures++;
      log("FAIL: ошибки в консоли:", consoleErrors);
    } else {
      log("OK   консоль без ошибок (RU-проход)");
    }

    const external = requests.filter((u) => !u.startsWith("file://") && !u.startsWith("about:"));
    if (external.length) {
      failures++;
      log("FAIL: обнаружены внешние сетевые запросы:", external);
    } else {
      log(`OK   сетевых запросов кроме file:// нет (всего запросов: ${requests.length})`);
    }

    await page.close();
  }

  // --- EN: первые три случая, ?lang=en ---
  {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));

    await page.goto(fileUrl + "?lang=en");

    for (let i = 0; i < 3; i++) {
      const c = cases[i];
      await fill(page, c);
      const score = await page.textContent("#s");
      const groupText = await page.textContent("#g");
      const group = groupText.replace(/\s*risk\s*$/i, "").trim();
      const ok = String(score).trim() === String(c.score) && group === c.groupEn;
      if (!ok) {
        failures++;
        log(`FAIL EN#${i + 1}: ожидали score=${c.score} group=${c.groupEn}, получили score=${score} group=${group}`);
      } else {
        log(`OK   EN#${i + 1}: score=${score} group=${group}`);
      }
      const formulaHtml = await page.innerHTML("#formula");
      const p = extractP(formulaHtml);
      if (p !== c.pEn) {
        failures++;
        log(`FAIL EN#${i + 1} P: ожидали ${c.pEn}, получили ${p}`);
      } else {
        log(`OK   EN#${i + 1} P=${p}`);
      }
    }

    if (consoleErrors.length) {
      failures++;
      log("FAIL: ошибки в консоли (EN-проход):", consoleErrors);
    } else {
      log("OK   консоль без ошибок (EN-проход)");
    }

    await page.close();
  }

  await browser.close();

  if (failures > 0) {
    log(`\nИТОГ: ${failures} несовпадени(й). ПУБЛИКАЦИЮ ОСТАНОВИТЬ.`);
    process.exit(1);
  } else {
    log("\nИТОГ: все проверки пройдены.");
    process.exit(0);
  }
}

run();
