# Exercicio 2 - Construção de Queries

Obter dados através de queries construidas com base no ERD abaixo:

![ERD](./docs/imagens/image.png)

## Query 1:

Obter a quantidade de horas que cada professor tem comprometido em aulas

- Não é possível obter os dados desejados através da modelagem atual, pois a tabela `PROFESSOR` não possui nenhuma associação com `CLASS`.

## Query 2

- Listar salas com horários livres e ocupados

```sql
SELECT
    r.id AS room_id,
    b.name AS building,
    cs.day_of_week,
    cs.start_time,
    cs.end_time,
    c.code AS class_code,
    s.name AS subject_name
FROM public."ROOM" r
JOIN public."BUILDING" b ON r.building_id = b.id
LEFT JOIN public."CLASS_SCHEDULE" cs ON cs.room_id = r.id
LEFT JOIN public."CLASS" c ON cs.class_id = c.id
LEFT JOIN public."SUBJECT" s ON c.subject_id = s.id
ORDER BY r.id, cs.day_of_week, cs.start_time;
```
