# Running meeting-prep on a heartbeat

Heartbeat runs the same prompt on a fixed interval during your configured work
days and hours. It is a good fit for this skill: briefs are most useful when
they appear before you go looking for them.

## Setup

In Scout, enable heartbeat and set the interval to **30 minutes**. Hourly is too
coarse — a meeting can be booked and start inside one gap.

Set the heartbeat prompt to:

```
Check my calendar. If a meeting starts in the next 30 minutes and I have not
already been briefed on it, prep me for it.
```

That phrasing matters. "Prep me for a meeting" matches this skill's description;
"check my calendar" alone may not.

## What changes in heartbeat mode

Heartbeat runs under a more restrictive permission policy than an interactive
session, and you are not there to approve anything:

| | Interactive | Heartbeat |
|---|---|---|
| Brief destination | Conversation + workspace | Workspace only |
| Outbound messages | Possible, with approval | Never |
| Actions that would prompt | You get asked | Skipped silently |
| Tentative calendar events | Ambiguous | Treated as busy |

The skill's own rules mirror this: in heartbeat mode it writes the file and
stops. It will not message you the brief, because heartbeat's outbound rules
restrict messages to generic content — a brief is the opposite of generic.

## Avoiding duplicate briefs

The skill checks the workspace for an existing brief matching the event before
producing one. That check is only as good as the filename, so leave the
`meeting-prep/<YYYY-MM-DD>-<short-slug>.md` convention alone.

## Cost

Every heartbeat tick that finds a qualifying meeting does real work — directory
lookups, mail and Teams search, document reads. On a heavy calendar day that is
a lot of runs. If that matters, raise the interval to 60 minutes and accept that
short-notice meetings will be missed, or narrow the prompt to meetings with more
than two attendees.

## When to turn it off

If you spend more time reading briefs than they save you, the problem is usually
the calendar, not the skill.
