# Validation checklist

Run through this before writing any files. Every item is pass/fail — if you
cannot answer yes, fix the draft.

## Description

- [ ] States what the skill does, naming the artifact and the operation.
- [ ] Contains an explicit "Use when…" clause.
- [ ] Trigger situations are phrased in user vocabulary, not internal jargon.
- [ ] Overlaps at least four of the five test phrasings from step 3.
- [ ] Does **not** plausibly match the two negative phrasings.
- [ ] Says nothing about implementation (no library or language names) unless
      the library is the actual subject of the skill.
- [ ] Fits in roughly two sentences.

## Name

- [ ] Kebab-case, two or three words.
- [ ] No collision with an existing skill in the target directory.
- [ ] Describes the job, not the mechanism.

## Tools

- [ ] Every listed tool is required by a specific numbered step.
- [ ] No tool is present "just in case."
- [ ] If the skill can modify or send anything, the destructive capability is
      genuinely needed — not merely convenient.

## Procedure

- [ ] Steps are numbered and in execution order.
- [ ] No step relies on a judgement call without a stated threshold or rule.
- [ ] Two runs on the same input would produce the same result.
- [ ] The final step covers the actual end of the task, not 90% of it.
- [ ] Ambiguity is handled explicitly — the procedure says when to ask rather
      than guess.

## Rules

- [ ] Every irreversible action the skill could take has a guard.
- [ ] No rule is speculative. Each maps to a real or destructive failure.
- [ ] Rules are stated as prohibitions or requirements, not suggestions.

## Progressive disclosure

- [ ] The body contains procedure and rules only.
- [ ] Reference material lives in `reference/` with a pointer line in the body.
- [ ] Each pointer says when to read the file, not just that it exists.

## Output

- [ ] `VERSION` starts at `0.1.0`.
- [ ] `README.md` is written for a human deciding whether to install, and does
      not duplicate `SKILL.md`.
- [ ] Status is honest: `experimental` unless it has actually been used.
