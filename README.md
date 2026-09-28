# Шкала риска 90-дневной летальности при внутригоспитальном ишемическом инсульте

Исследовательский калькулятор: шкала риска 90-дневной летальности при внутригоспитальном ишемическом инсульте (ВГИИ), пять групп риска.

**Страница калькулятора:** https://tsurikova-nadezhda.github.io/vgii-risk-score/

## Дисклеймер

**Не является медицинским изделием.** Калькулятор предназначен для научных и образовательных целей. Модель прошла только внутреннюю и временную валидацию на данных одного мегаполиса; внешняя валидация не проводилась. Результат не является основанием для ограничения объёма медицинской помощи: тактика ведения определяется клиническими рекомендациями и комплексной клинической оценкой. Шкала прогнозирует летальность, но не эффект лечения; показания к реперфузионной терапии от группы риска не зависят.

## Начисление баллов

| Предиктор | Значение | Баллы |
|---|---|---|
| NIHSS | 0–4 / 5–9 / 10–14 / 15–19 / 20–24 / 25–29 / 30–34 / ≥ 35 | 0 / 1 / 2 / 3 / 4 / 5 / 6 / 7 |
| Индекс Чарлсона без возрастной компоненты | 0–3 / 4–7 / 8–11 / 12–15 / ≥ 16 | 0 / 1 / 2 / 3 / 4 |
| Возраст | < 60 / ≥ 60 лет | 0 / 1 |
| Сепсис на момент развития инсульта | нет / есть | 0 / 2 |
| Плановая операция до развития инсульта | выполнена / не выполнена (не оперирован или экстренная операция) | 0 / 1 |

## Пять групп риска

Когорта разработки: 365 пациентов с внутригоспитальным ишемическим инсультом без COVID-19, 169 летальных исходов за 90 суток. Границы групп заданы заранее по предсказанной вероятности смерти: менее 20 %, 20–44 %, 45–64 %, 65–94 %, 95 % и выше.

| Группа | Баллы | Пациентов в когорте | Наблюдаемая 90-дневная летальность, % (95 % ДИ) |
|---|---|---|---|
| Низкий | 0–2 | 74 | 4,1 (1,4–11,3) |
| Средний | 3–4 | 111 | 28,8 (21,2–37,9) |
| Высокий | 5–6 | 101 | 60,4 (50,6–69,4) |
| Очень высокий | 7–8 | 58 | 89,7 (79,2–95,2) |
| Экстремальный | 9 и выше | 21 | 100 (83,9–100) |

## Как цитировать

Коломенцев С. В., Цурикова Н. А. Шкала риска 90-дневной летальности при внутригоспитальном ишемическом инсульте: онлайн-калькулятор, версия 1.0. 2026.

DOI появится после архивации релиза в Zenodo и будет добавлен сюда, в `CITATION.cff` и на страницу калькулятора.

## Приватность

Введённые данные не передаются и не сохраняются: весь расчёт выполняется в вашем браузере. Страница не делает сетевых запросов, кроме загрузки самого `index.html`.

## Лицензия

Код (`index.html`, `tests/check.mjs`) — [MIT](LICENSE). Текст, таблицы и данные на странице калькулятора — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

# 90-day mortality risk score for in-hospital ischemic stroke

Research calculator: 90-day mortality risk score for in-hospital ischemic stroke, five risk groups.

**Calculator page:** https://tsurikova-nadezhda.github.io/vgii-risk-score/

## Disclaimer

**Not a medical device.** This calculator is intended for research and education. The model has undergone internal and temporal validation only, in data from a single metropolitan area; no external validation has been performed. The result is not a basis for limiting the scope of care: management follows clinical guidelines and a comprehensive clinical assessment. The score predicts mortality, not treatment effect; eligibility for reperfusion therapy does not depend on the risk group.

## Scoring

| Predictor | Value | Points |
|---|---|---|
| NIHSS | 0–4 / 5–9 / 10–14 / 15–19 / 20–24 / 25–29 / 30–34 / ≥ 35 | 0 / 1 / 2 / 3 / 4 / 5 / 6 / 7 |
| Charlson Comorbidity Index without the age component | 0–3 / 4–7 / 8–11 / 12–15 / ≥ 16 | 0 / 1 / 2 / 3 / 4 |
| Age | < 60 / ≥ 60 years | 0 / 1 |
| Sepsis at stroke onset | no / yes | 0 / 2 |
| Elective surgery before stroke onset | performed / not performed (no surgery or emergency surgery) | 0 / 1 |

## Five risk groups

Development cohort: 365 patients with in-hospital ischemic stroke without COVID-19; 169 deaths within 90 days. Group boundaries were set in advance by predicted probability of death: below 20%, 20–44%, 45–64%, 65–94%, 95% and above.

| Group | Points | Patients in cohort | Observed 90-day mortality, % (95% CI) |
|---|---|---|---|
| Low | 0–2 | 74 | 4.1 (1.4–11.3) |
| Intermediate | 3–4 | 111 | 28.8 (21.2–37.9) |
| High | 5–6 | 101 | 60.4 (50.6–69.4) |
| Very high | 7–8 | 58 | 89.7 (79.2–95.2) |
| Extreme | 9 or more | 21 | 100 (83.9–100) |

## How to cite

Kolomentsev S.V., Tsurikova N.A. 90-day mortality risk score for in-hospital ischemic stroke: online calculator, version 1.0. 2026.

The DOI will be added here, to `CITATION.cff`, and to the calculator page once the release is archived on Zenodo.

## Privacy

Nothing you enter is sent or stored: all calculations run in your browser. The page makes no network requests other than loading `index.html` itself.

## License

Code (`index.html`, `tests/check.mjs`) — [MIT](LICENSE). Text, tables, and data on the calculator page — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
