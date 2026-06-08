# Quiz Architecture Audit

## 1. Hidden Signal Model

The quiz now uses hidden answer signals rather than only direct career slug votes.
These signals are not exposed in the UI:

- `people`
- `solitude`
- `structure`
- `chaos_tolerance`
- `movement`
- `focus`
- `hands_on`
- `technical`
- `creative`
- `service`
- `problem_solving`
- `visible_results`
- `long_projects`
- `short_tasks`
- `routine`
- `variety`
- `responsibility_for_people`
- `responsibility_for_systems`

Each career has a weighted profile across these dimensions. Each quiz answer contributes to several dimensions, including negative signals where the answer clearly rejects a work style. Results are ranked by signal similarity, with a smaller direct-career hint retained for continuity with the existing quiz feel.

## 2. Weak Spots In The Current Quiz

- The quiz has strong signals for people vs solitude, chaos vs structure, and visible results vs emotional service.
- It has weaker separation inside technical hands-on careers. `elektroniker`, `mechatroniker`, and `industriemechaniker` need more distinction through day rhythm, not through more visible questions.
- It has weak coverage for outdoor work, precision measurement, science/lab work, transport responsibility, craft-health hybrids, and work around grief/crisis without emergency speed.
- Quiet structured answers can still over-favor `bauzeichner`, because multiple current questions indirectly reward focus, structure, and low people-contact at the same time.
- Creative work is currently represented mostly by visual/customer-facing outcomes. There is little coverage for technical creativity, material creativity, or natural/environmental work.

## 3. Careers That Are Too Similar

Simulation checked all 128 possible answer paths and pairwise career signal similarity.

Highest-overlap pairs:

- `fachinformatiker-systemintegration` / `bauzeichner`: both quiet, structured, focused, long-problem/system responsibility.
- `mechatroniker` / `industriemechaniker`: both technical, hands-on, system-responsible, structured.
- `notfallsanitaeter` / `zugbegleiter`: both high movement, people, chaos tolerance, short-task rhythm.
- `pflegefachkraft` / `medizinische-fachangestellte`: both service, people, responsibility for people, structured health context.
- `friseur` / `florist`: both people/service plus creative visible results.

These overlaps are not necessarily wrong. They become a problem only if the catalog adds more careers into the same dense areas without introducing new signal combinations.

## 4. Careers Missing From The Ecosystem

Current ecosystem gaps:

- Outdoor/nature work with responsibility and routine.
- Scientific precision without heavy people contact.
- Measurement, mapping, and spatial systems.
- Health-adjacent craft roles with visible physical results.
- Transport roles where responsibility is mostly systems/safety, not customer mood.
- Industrial/material roles with process, chemistry, or quality control.
- Quiet public-service roles with order and accountability.
- Work involving difficult human moments without constant emergency tempo.

## 5. Recommended Next 20 Careers

1. `vermessungstechniker`: movement + technical + focus + responsibility_for_systems + visible_results.
2. `forstwirt`: movement + hands_on + routine + responsibility_for_systems + solitude.
3. `hoerakustiker`: technical + service + focus + responsibility_for_people + visible_results.
4. `orthopaedietechnik-mechaniker`: hands_on + technical + service + creative + responsibility_for_people.
5. `chemielaborant`: focus + routine + technical + problem_solving + responsibility_for_systems.
6. `lokfuehrer`: solitude + routine + focus + responsibility_for_people + responsibility_for_systems.
7. `bestattungsfachkraft`: service + responsibility_for_people + structure + calm people-contact + visible_results.
8. `geomatiker`: technical + focus + long_projects + structure + spatial/system thinking.
9. `werkzeugmechaniker`: hands_on + focus + technical + long_projects + visible_results.
10. `anlagenmechaniker-shk`: hands_on + movement + technical + service + visible_results.
11. `fahrzeuglackierer`: hands_on + creative + focus + visible_results + routine.
12. `zahntechniker`: hands_on + focus + technical + visible_results + solitude.
13. `operationstechnischer-assistent`: structure + focus + service + responsibility_for_people + chaos_tolerance.
14. `pharmakant`: routine + technical + responsibility_for_systems + focus + structure.
15. `umwelttechnologe-abwasser`: technical + movement + routine + responsibility_for_systems + problem_solving.
16. `technischer-produktdesigner`: creative + technical + focus + long_projects + visible_results.
17. `justizfachangestellter`: structure + routine + responsibility_for_systems + service + focus.
18. `gebaeudereiniger`: movement + routine + visible_results + solitude + hands_on.
19. `fachkraft-schutz-sicherheit`: people + structure + chaos_tolerance + responsibility_for_people + routine.
20. `medizinischer-technologe-laboratorium`: technical + service + focus + routine + responsibility_for_people.

## 6. Required Quiz Adjustments Before Expansion

- Keep the seven visible questions and answer labels unchanged for now.
- Add hidden answer signals for every answer before adding any new career.
- Add a required `signalWeights` profile for every new career.
- Run pairwise similarity after every batch of added careers and treat pairs above roughly `0.90` as needing review.
- Watch result distribution across all answer paths. If one career dominates more than about one quarter of all top results, tune hidden answer weights before adding more careers.
- Do not add careers only because they are common. Add careers that occupy missing signal combinations first.
