---
title: Spreadsheet Surgeon
category: data-docs
topics: [excel, data, extraction]
description: >-
  Reads real-world spreadsheets — merged cells, multi-row headers, notes
  wedged into column A — and gets clean tabular data out of them.
status: stable
version: 2.0.1
updated: 2026-07-21
featured: true
allowed_tools: [Bash, Read, Write]
install: |
  mkdir -p ~/.claude/skills/spreadsheet-surgeon
  cp -r ./spreadsheet-surgeon/* ~/.claude/skills/spreadsheet-surgeon/
---

## What it does

Spreadsheets built by humans are not tables. They have title rows, merged
header cells spanning three columns, a stray note in row 47, and four sheets
where only two matter.

Spreadsheet Surgeon figures out where the actual data starts, flattens
multi-row headers into single column names, and hands back something you can
load into a dataframe without swearing.

## SKILL.md

```markdown
---
name: spreadsheet-surgeon
description: >-
  Extracts clean tabular data from messy real-world spreadsheets with merged
  cells, multi-row headers, or embedded notes. Use when the user provides an
  .xlsx/.csv and wants the data analysed, converted, or cleaned.
allowed-tools: Bash, Read, Write
---

# Spreadsheet Surgeon

## Procedure

1. Inventory the workbook: sheet names, dimensions, and populated ranges.
   Report what you found before touching anything.
2. For each sheet in scope, find the header row by scanning for the first row
   where most cells are non-empty strings and the row below is heterogeneous.
3. Flatten multi-row headers top-down, joining with a space. Forward-fill
   merged header cells across the columns they span.
4. Trim leading title rows and trailing notes. A trailing block with fewer
   populated columns than the body is a note, not data.
5. Normalise column names: strip whitespace, collapse newlines, deduplicate.
6. Write the result to CSV alongside the source unless told otherwise.

## Rules

- Never modify the source workbook in place. Always write a new file.
- Preserve the original values. Do not round, reformat dates, or coerce types
  without saying so explicitly in the summary.
- If a sheet's structure is genuinely ambiguous, show the first 15 rows and ask
  rather than guessing.
- Flag any column that is more than 40% empty in the summary.

## Reference

For the openpyxl merged-cell API and date-coercion gotchas, see
`reference/openpyxl-notes.md` — do not load it unless you hit those cases.
```

## Notes

Version 2.0 moved the openpyxl details into a `reference/` file that only gets
read when it's actually needed. Cut the resident context cost by about 70% for
the common path — the progressive disclosure idea from
[Anatomy of a SKILL.md]({{ '/skills/guides/anatomy-of-a-skill/' | relative_url }}).
