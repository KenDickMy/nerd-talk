# claude-skills

Installable source for the skills published at
<https://kendickmy.github.io/nerd-talk/skills/>.

Each folder is a complete skill — copy it into `~/.claude/skills/` to install
personally, or `.claude/skills/` inside a repo to scope it to that project.

```bash
cp -r ./claude-skills/<name> ~/.claude/skills/<name>
```

| Skill | What it does |
|---|---|
| [skill-forge](./skill-forge) | Creates new skills and their catalog entries |
The catalog pages under `_skills/` are the published documentation for these.
Both need to stay in sync — `skill-forge` handles that when you use it to
create a skill.
